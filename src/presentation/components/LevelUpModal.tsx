import {
  getShotsPerSec,
  MOVE_SPEED,
  BULLET_DAMAGE,
  SHOOT_INTERVAL,
  MAX_STAT_LEVEL,
} from "../constants";

interface LevelUpModalProps {
  damageLevel: number;
  shootSpeedLevel: number;
  moveSpeedLevel: number;
  onUpgrade: (type: "damage" | "shootSpeed" | "moveSpeed") => void;
  onSkip: () => void;
}

const LevelUpModal = ({
  damageLevel,
  shootSpeedLevel,
  moveSpeedLevel,
  onUpgrade,
  onSkip,
}: LevelUpModalProps) => {
  return (
    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4">
      <div className="text-green-500 text-xl font-bold mb-6">LEVEL UP!</div>
      <div className="flex gap-4">
        <button
          onClick={() => onUpgrade("damage")}
          disabled={damageLevel >= MAX_STAT_LEVEL}
          className={`w-28 h-36 border-2 p-2 flex flex-col items-center justify-center ${
            damageLevel >= MAX_STAT_LEVEL
              ? "border-gray-600 text-gray-600 cursor-not-allowed"
              : "border-green-500 text-green-500 hover:bg-green-500 hover:text-black"
          }`}
        >
          <span className="text-sm font-bold">DAMAGE</span>
          <span className="text-xs mt-2">Current: {BULLET_DAMAGE}</span>
          <span className="text-xs mt-1">→ {damageLevel < MAX_STAT_LEVEL ? BULLET_DAMAGE + 1 : "MAX"}</span>
          <span className="text-xs mt-2">lvl {damageLevel}/{MAX_STAT_LEVEL}</span>
        </button>
        <button
          onClick={() => onUpgrade("shootSpeed")}
          disabled={shootSpeedLevel >= MAX_STAT_LEVEL}
          className={`w-28 h-36 border-2 p-2 flex flex-col items-center justify-center ${
            shootSpeedLevel >= MAX_STAT_LEVEL
              ? "border-gray-600 text-gray-600 cursor-not-allowed"
              : "border-green-500 text-green-500 hover:bg-green-500 hover:text-black"
          }`}
        >
          <span className="text-sm font-bold">SHOOT SPEED</span>
          <span className="text-xs mt-2">Current: {getShotsPerSec()}/s</span>
          <span className="text-xs mt-1">→ {shootSpeedLevel < MAX_STAT_LEVEL ? (1000 / (SHOOT_INTERVAL - 50)).toFixed(1) : "MAX"}/s</span>
          <span className="text-xs mt-2">lvl {shootSpeedLevel}/{MAX_STAT_LEVEL}</span>
        </button>
        <button
          onClick={() => onUpgrade("moveSpeed")}
          disabled={moveSpeedLevel >= MAX_STAT_LEVEL}
          className={`w-28 h-36 border-2 p-2 flex flex-col items-center justify-center ${
            moveSpeedLevel >= MAX_STAT_LEVEL
              ? "border-gray-600 text-gray-600 cursor-not-allowed"
              : "border-green-500 text-green-500 hover:bg-green-500 hover:text-black"
          }`}
        >
          <span className="text-sm font-bold">MOVE SPEED</span>
          <span className="text-xs mt-2">Current: {MOVE_SPEED.toFixed(1)}</span>
          <span className="text-xs mt-1">→ {moveSpeedLevel < MAX_STAT_LEVEL ? (MOVE_SPEED + 0.5).toFixed(1) : "MAX"}</span>
          <span className="text-xs mt-2">lvl {moveSpeedLevel}/{MAX_STAT_LEVEL}</span>
        </button>
      </div>
      <button
        onClick={onSkip}
        className="mt-6 px-6 py-2 border border-green-500 text-green-500 text-sm uppercase hover:bg-green-500 hover:text-black"
      >
        Skip
      </button>
    </div>
  );
};

export default LevelUpModal;
