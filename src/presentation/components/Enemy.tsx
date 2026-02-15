import { memo } from "react";
import { Enemy as EnemyType } from "../types";
import { ENEMY_SIZE } from "../constants";

interface EnemyProps {
  enemy: EnemyType;
}

const Enemy = memo(({ enemy }: EnemyProps) => {
  const getDeathColor = () => {
    if ((enemy.explodeFrame ?? 0) > 10) return "yellow";
    if ((enemy.explodeFrame ?? 0) > 5) return "darkorange";
    return "#808080";
  };

  return (
    <div
      className="absolute text-2xl font-bold will-change-transform"
      style={{
        transform: `translate(${enemy.x - ENEMY_SIZE / 2}px, ${enemy.y - ENEMY_SIZE / 2}px)`,
        color: enemy.flashFrame !== undefined ? "red" : enemy.isExploding ? getDeathColor() : "#00ff00",
      }}
    >
      {enemy.isExploding
        ? (enemy.explodeFrame ?? 0) > 10
          ? "@@@"
          : (enemy.explodeFrame ?? 0) > 5
          ? "-@-"
          : " - "
        : "<*>"}
    </div>
  );
});

Enemy.displayName = "Enemy";

export default Enemy;
