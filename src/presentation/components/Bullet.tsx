import { Bullet as BulletType } from "../types";
import { BULLET_SIZE } from "../constants";

interface BulletProps {
  bullet: BulletType;
}

const Bullet = ({ bullet }: BulletProps) => {
  return (
    <div
      key={bullet.id}
      className="absolute text-xl"
      style={{
        left: bullet.x - BULLET_SIZE / 2,
        top: bullet.y - BULLET_SIZE / 2,
        color: bullet.explodeFrame !== undefined ? "orange" : "#00ff00",
      }}
    >
      {bullet.explodeFrame !== undefined ? "@" : "○"}
    </div>
  );
};

export default Bullet;
