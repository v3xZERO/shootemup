import { memo } from "react";
import { Bullet as BulletType } from "../types";
import { BULLET_SIZE } from "../constants";

interface BulletProps {
  bullet: BulletType;
}

const Bullet = memo(({ bullet }: BulletProps) => {
  return (
    <div
      className={`absolute text-xl will-change-transform ${bullet.explodeFrame === undefined ? "bullet-twinkle" : ""}`}
      style={{
        transform: `translate(${bullet.x - BULLET_SIZE / 2 - 12}px, ${bullet.y - BULLET_SIZE / 2}px)`,
        color: bullet.explodeFrame !== undefined ? "orange" : undefined,
      }}
    >
      {bullet.explodeFrame !== undefined ? "@" : "0"}
    </div>
  );
});

Bullet.displayName = "Bullet";

export default Bullet;
