import { getShotsPerSec, MOVE_SPEED, BULLET_DAMAGE } from "../constants";

interface HUDProps {
  playerHp: number;
  bulletCount: number;
}

const HUD = ({ playerHp, bulletCount }: HUDProps) => {
  return (
    <div className="absolute top-2 right-2 text-green-500 text-sm text-right leading-snug">
      HP: {playerHp}<br />
      SHOOT SPEED: {getShotsPerSec()}/s<br />
      MOVE SPEED: {MOVE_SPEED.toFixed(1)}<br />
      DAMAGE: {BULLET_DAMAGE}<br />
      BULLETS: {bulletCount}
    </div>
  );
};

export default HUD;
