"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { GamePhase, Bullet as BulletType, Enemy as EnemyType, PlayerPos } from "../presentation/types";
import {
  PLAYER_SIZE,
  BULLET_SIZE,
  MOVE_SPEED,
  BULLET_SPEED,
  SHOOT_INTERVAL,
  ENEMY_SIZE,
  ENEMY_SPEED,
  ENEMY_SLOW_FACTOR,
  ENEMY_HEALTH,
  BULLET_DAMAGE,
  ENEMY_XP,
  EXPLOSION_DURATION,
  MAX_STAT_LEVEL,
  getXpForLevel,
  upgradeMoveSpeed,
  upgradeShootSpeed,
  upgradeDamage,
} from "../presentation/constants";
import StarsBackground from "../presentation/components/StarsBackground";
import Player from "../presentation/components/Player";
import Enemy from "../presentation/components/Enemy";
import Bullet from "../presentation/components/Bullet";
import HUD from "../presentation/components/HUD";
import XPBar from "../presentation/components/XPBar";
import LevelUpModal from "../presentation/components/LevelUpModal";
import PreGameScreen from "../presentation/components/PreGameScreen";

const Home = () => {
  const [phase, setPhase] = useState<GamePhase>("pregame");
  const [renderKey, setRenderKey] = useState(0);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [damageLevel, setDamageLevel] = useState(1);
  const [shootSpeedLevel, setShootSpeedLevel] = useState(1);
  const [moveSpeedLevel, setMoveSpeedLevel] = useState(1);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [autoFire, setAutoFire] = useState(true);
  const autoFireRef = useRef(true);

  useEffect(() => {
    autoFireRef.current = autoFire;
  }, [autoFire]);

  const gameState = useRef({
    playerPos: { x: 0, y: 0 } as PlayerPos,
    bullets: [] as BulletType[],
    enemies: [] as EnemyType[],
    xp: 0,
    level: 1,
    playerHp: 3,
    pendingLevelUp: false,
  });

  const bulletIdRef = useRef(0);
  const enemyIdRef = useRef(0);
  const keysRef = useRef<Set<string>>(new Set());
  const lastAutoShotRef = useRef(0);
  const animationIdRef = useRef<number>(0);

  const handleResize = useCallback(() => {
    const width = Math.min(window.innerWidth, 432) - 8;
    const height = window.innerHeight;
    setScreenSize({ width, height });
    gameState.current.playerPos = { x: width / 2, y: height * 0.75 };
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    if (phase !== "playing") return;

    const update = (timestamp: number) => {
      const state = gameState.current;
      const keys = keysRef.current;

      let { x, y } = state.playerPos;
      if (keys.has("w") || keys.has("arrowup")) y -= MOVE_SPEED;
      if (keys.has("s") || keys.has("arrowdown")) y += MOVE_SPEED;
      if (keys.has("a") || keys.has("arrowleft")) x -= MOVE_SPEED;
      if (keys.has("d") || keys.has("arrowright")) x += MOVE_SPEED;

      x = Math.max(PLAYER_SIZE / 2, Math.min(screenSize.width - PLAYER_SIZE / 2, x));
      y = Math.max(PLAYER_SIZE / 2, Math.min(screenSize.height - PLAYER_SIZE / 2 - 24, y));
      state.playerPos = { x, y };

      state.bullets = state.bullets
        .map((b) => {
          if (b.explodeFrame !== undefined) {
            if (b.explodeFrame > 0) {
              return { ...b, explodeFrame: b.explodeFrame - 1 };
            }
            return null;
          }
          return { ...b, y: b.y - BULLET_SPEED };
        })
        .filter((b) => b !== null && (b.explodeFrame === undefined || b.explodeFrame > 0)) as BulletType[];

      state.enemies = state.enemies.map((enemy) => {
        if (enemy.isExploding) return enemy;

        const hitBullet = state.bullets.find(
          (b) =>
            b.explodeFrame === undefined &&
            Math.abs(b.x - enemy.x) < (BULLET_SIZE + ENEMY_SIZE) / 2 &&
            Math.abs(b.y - enemy.y) < (BULLET_SIZE + ENEMY_SIZE) / 2
        );

        if (hitBullet) {
          const updatedBullets = state.bullets.map((b) =>
            b.id === hitBullet.id ? { ...b, explodeFrame: 7 } : b
          );
          state.bullets = updatedBullets;
          const newHealth = enemy.health - BULLET_DAMAGE;

          const hitPlayerOnBullet =
            Math.abs(state.playerPos.x - enemy.x) < (PLAYER_SIZE + ENEMY_SIZE) / 2 &&
            Math.abs(state.playerPos.y - enemy.y) < (PLAYER_SIZE + ENEMY_SIZE) / 2;
          if (hitPlayerOnBullet && state.playerHp > 0) {
            state.playerHp -= 1;
          }

          if (newHealth <= 0) {
            return { ...enemy, health: 0, isExploding: true, explodeFrame: EXPLOSION_DURATION };
          }
          return { ...enemy, health: newHealth, flashFrame: 5, slowFrame: 10 };
        }

        const hitPlayer =
          Math.abs(state.playerPos.x - enemy.x) < (PLAYER_SIZE + ENEMY_SIZE) / 2 &&
          Math.abs(state.playerPos.y - enemy.y) < (PLAYER_SIZE + ENEMY_SIZE) / 2;
        if (hitPlayer && state.playerHp > 0) {
          state.playerHp -= 1;
          return { ...enemy, health: 0, isExploding: true, explodeFrame: EXPLOSION_DURATION };
        }

        const speed = enemy.slowFrame !== undefined ? ENEMY_SPEED * ENEMY_SLOW_FACTOR : ENEMY_SPEED;
        const newEnemy = { ...enemy, y: enemy.y + speed };
        if (newEnemy.slowFrame !== undefined && newEnemy.slowFrame > 0) {
          newEnemy.slowFrame = newEnemy.slowFrame - 1;
          if (newEnemy.slowFrame === 0) delete newEnemy.slowFrame;
        }
        if (newEnemy.flashFrame !== undefined && newEnemy.flashFrame > 0) {
          newEnemy.flashFrame = newEnemy.flashFrame - 1;
          if (newEnemy.flashFrame === 0) delete newEnemy.flashFrame;
        }
        return newEnemy;
      }).filter((e) => e.y < screenSize.height + ENEMY_SIZE || e.isExploding);

      state.enemies = state.enemies
        .map((e) => {
          if (e.isExploding && e.explodeFrame !== undefined && e.explodeFrame > 0) {
            return { ...e, explodeFrame: e.explodeFrame - 1 };
          }
          return e;
        })
        .filter((e) => {
          if (e.isExploding && e.explodeFrame === 0) {
            state.xp += ENEMY_XP;
            const xpNeeded = getXpForLevel(state.level);
            if (state.xp >= xpNeeded) {
              state.xp -= xpNeeded;
              state.level += 1;
              state.pendingLevelUp = true;
            }
            return false;
          }
          return !e.isExploding || (e.explodeFrame !== undefined && e.explodeFrame > 0);
        });

      if (autoFireRef.current && timestamp - lastAutoShotRef.current > SHOOT_INTERVAL) {
        lastAutoShotRef.current = timestamp;
        state.bullets.push({
          x: state.playerPos.x,
          y: state.playerPos.y - PLAYER_SIZE / 2,
          id: bulletIdRef.current++,
        });
      }

      setRenderKey((k) => k + 1);
      animationIdRef.current = requestAnimationFrame(update);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysRef.current.add(key);
      if (e.key === " ") e.preventDefault();
      if (key === "r" && phase === "playing") {
        spawnEnemy();
      }
      if (key === "t" && phase === "playing") {
        const state = gameState.current;
        state.xp = getXpForLevel(state.level);
        state.level += 1;
        state.pendingLevelUp = true;
        setRenderKey((k) => k + 1);
      }
      if (key === "f" && phase === "playing") {
        setAutoFire((prev) => !prev);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    animationIdRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationIdRef.current);
    };
  }, [phase, screenSize]);

  useEffect(() => {
    if (gameState.current.pendingLevelUp && phase === "playing") {
      gameState.current.pendingLevelUp = false;
      setShowLevelUp(true);
      setPhase("levelup");
    }
  }, [phase, renderKey]);

  const handleUpgrade = (type: "damage" | "shootSpeed" | "moveSpeed") => {
    if (type === "damage" && damageLevel < MAX_STAT_LEVEL) {
      upgradeDamage();
      setDamageLevel((l) => l + 1);
    } else if (type === "shootSpeed" && shootSpeedLevel < MAX_STAT_LEVEL) {
      upgradeShootSpeed();
      setShootSpeedLevel((l) => l + 1);
    } else if (type === "moveSpeed" && moveSpeedLevel < MAX_STAT_LEVEL) {
      upgradeMoveSpeed();
      setMoveSpeedLevel((l) => l + 1);
    }
    setShowLevelUp(false);
    setPhase("playing");
  };

  const handlePlay = () => {
    handleResize();
    gameState.current = {
      playerPos: { x: screenSize.width / 2, y: screenSize.height * 0.75 },
      bullets: [],
      enemies: [],
      xp: 0,
      level: 1,
      playerHp: 3,
      pendingLevelUp: false,
    };
    bulletIdRef.current = 0;
    enemyIdRef.current = 0;
    setPhase("playing");
  };

  const spawnEnemy = () => {
    gameState.current.enemies.push({
      x: ENEMY_SIZE / 2 + Math.random() * (screenSize.width - ENEMY_SIZE),
      y: -ENEMY_SIZE,
      id: enemyIdRef.current++,
      health: ENEMY_HEALTH,
    });
  };

  const { playerPos, bullets, enemies, xp, level, playerHp } = gameState.current;

  return (
    <div className="h-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="w-[432px] h-screen bg-black border-x-2 border-green-500 relative overflow-hidden shrink-0">
        {phase === "pregame" && <PreGameScreen onPlay={handlePlay} />}

        {(phase === "playing" || phase === "levelup") && (
          <>
            <StarsBackground />
            <HUD playerHp={playerHp} />
            {enemies.map((enemy) => (
              <Enemy key={enemy.id} enemy={enemy} />
            ))}
            {bullets.map((bullet) => (
              <Bullet key={bullet.id} bullet={bullet} />
            ))}
            <Player playerPos={playerPos} />
            <XPBar level={level} xp={xp} />
          </>
        )}

        {showLevelUp && (
          <LevelUpModal
            damageLevel={damageLevel}
            shootSpeedLevel={shootSpeedLevel}
            moveSpeedLevel={moveSpeedLevel}
            onUpgrade={handleUpgrade}
            onSkip={() => {
              setShowLevelUp(false);
              setPhase("playing");
            }}
          />
        )}
      </div>
      {(phase === "playing" || phase === "levelup") && (
        <>
          <button
            onClick={spawnEnemy}
            className="fixed left-4 top-1/2 -translate-y-1/2 px-2 py-4 border border-green-500 text-green-500 text-xs uppercase hover:bg-green-500 hover:text-black"
          >
            Spawn Enemy (R)
          </button>
          <button
            onClick={() => {
              const state = gameState.current;
              state.xp = getXpForLevel(state.level);
              state.level += 1;
              state.pendingLevelUp = true;
              setRenderKey((k) => k + 1);
            }}
            className="fixed left-4 top-[60%] -translate-y-1/2 px-2 py-4 border border-green-500 text-green-500 text-xs uppercase hover:bg-green-500 hover:text-black"
          >
            Level Up (T)
          </button>
          <button
            onClick={() => setAutoFire((prev) => !prev)}
            className={`fixed left-4 top-[70%] -translate-y-1/2 px-2 py-4 border text-xs uppercase hover:bg-green-500 hover:text-black ${
              autoFire
                ? "bg-green-500 text-black border-green-500"
                : "border-green-500 text-green-500"
            }`}
          >
            Auto Fire (F): {autoFire ? "ON" : "OFF"}
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
