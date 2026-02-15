import { getXpForLevel } from "../constants";

interface XPBarProps {
  level: number;
  xp: number;
}

const XPBar = ({ level, xp }: XPBarProps) => {
  const xpForNextLevel = getXpForLevel(level);
  const xpPercent = (xp / xpForNextLevel) * 100;

  return (
    <div className="absolute bottom-0 left-0 right-0 h-6 border-t border-green-500 bg-black">
      <div className="h-full bg-green-500" style={{ width: `${xpPercent}%` }} />
      <div className="absolute inset-0 flex items-center justify-center text-xs text-black font-bold bg-green-500/30">
        lvl {level} {xp}/{xpForNextLevel} XP
      </div>
    </div>
  );
};

export default XPBar;
