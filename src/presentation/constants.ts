const gameStats = {
  moveSpeed: 5,
  bulletSpeed: 8,
  shootInterval: 300,
  bulletDamage: 1,
};

export const PLAYER_SIZE = 48;
export const BULLET_SIZE = 16;
export const MOVE_SPEED = gameStats.moveSpeed;
export const BULLET_SPEED = gameStats.bulletSpeed;
export let SHOOT_INTERVAL = gameStats.shootInterval;

export const getShotsPerSec = () => (1000 / SHOOT_INTERVAL).toFixed(1);

export const ENEMY_SIZE = 32;
export const ENEMY_WIDTH = 64;
export const ENEMY_SPEED = 2;
export const ENEMY_SLOW_FACTOR = 0.5;
export const ENEMY_HEALTH = 5;
export let BULLET_DAMAGE = gameStats.bulletDamage;
export const ENEMY_XP = 10;
export const BASE_XP_FOR_LEVEL = 50;
export const XP_MULTIPLIER = 1.5;
export const EXPLOSION_DURATION = 15;
export const MAX_STAT_LEVEL = 5;
export const EXPLOSION_BULLET_DISPLAY = 8;

export const getXpForLevel = (lvl: number) => Math.floor(BASE_XP_FOR_LEVEL * Math.pow(XP_MULTIPLIER, lvl - 1));

export const upgradeMoveSpeed = () => { gameStats.moveSpeed += 0.5; };
export const upgradeShootSpeed = () => { gameStats.shootInterval = Math.max(100, gameStats.shootInterval - 50); SHOOT_INTERVAL = gameStats.shootInterval; };
export const upgradeDamage = () => { gameStats.bulletDamage += 1; BULLET_DAMAGE = gameStats.bulletDamage; };

export const resetGameStats = () => {
  gameStats.moveSpeed = 5;
  gameStats.bulletSpeed = 8;
  gameStats.shootInterval = 300;
  gameStats.bulletDamage = 1;
  BULLET_DAMAGE = 1;
  SHOOT_INTERVAL = 300;
};
