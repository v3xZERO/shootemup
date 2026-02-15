import { Enemy as EnemyType } from "../types";
import { ENEMY_SIZE } from "../constants";

interface EnemyProps {
  enemy: EnemyType;
}

const Enemy = ({ enemy }: EnemyProps) => {
  const getDeathColor = () => {
    if ((enemy.explodeFrame ?? 0) > 10) return "yellow";
    if ((enemy.explodeFrame ?? 0) > 5) return "darkorange";
    return "#808080";
  };

  return (
    <div
      key={enemy.id}
      className="absolute text-2xl font-bold"
      style={{
        left: enemy.x - ENEMY_SIZE / 2,
        top: enemy.y - ENEMY_SIZE / 2,
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
};

export default Enemy;
