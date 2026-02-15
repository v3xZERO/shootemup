import {
  getShotsPerSec,
  MOVE_SPEED,
  BULLET_DAMAGE,
  SHOOT_INTERVAL,
  MAX_STAT_LEVEL,
} from "../constants";

export type UpgradeType = "damage" | "shootSpeed" | "moveSpeed" | "bulletCount";
export type UpgradeRarity = "common" | "rare";

export interface UpgradeOption {
  type: UpgradeType;
  rarity: UpgradeRarity;
}

interface LevelUpModalProps {
  damageLevel: number;
  shootSpeedLevel: number;
  moveSpeedLevel: number;
  bulletCount: number;
  options: UpgradeOption[];
  onUpgrade: (type: UpgradeType) => void;
  onSkip: () => void;
}

const getUpgradeContent = (
  type: UpgradeType,
  rarity: UpgradeRarity,
  damageLevel: number,
  shootSpeedLevel: number,
  moveSpeedLevel: number,
  bulletCount: number
) => {
  const commonClass = "border-green-500 text-green-500 hover:bg-green-500 hover:text-black";
  const rareClass = "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-black";
  const commonDisabledClass = "border-gray-600 text-gray-600 cursor-not-allowed";
  const rareDisabledClass = "border-gray-600 text-gray-600 cursor-not-allowed";

  const isDisabled =
    (type === "damage" && damageLevel >= MAX_STAT_LEVEL) ||
    (type === "shootSpeed" && shootSpeedLevel >= MAX_STAT_LEVEL) ||
    (type === "moveSpeed" && moveSpeedLevel >= MAX_STAT_LEVEL);

  const baseClass = rarity === "rare" ? rareClass : commonClass;
  const disabledClass = rarity === "rare" ? rareDisabledClass : commonDisabledClass;

  const rarityLabel = rarity === "rare" ? "RARE" : "COMMON";
  const rarityColor = rarity === "rare" ? "text-blue-400" : "text-green-400";

  switch (type) {
    case "damage":
      return {
        label: "DAMAGE",
        current: `Current: ${BULLET_DAMAGE}`,
        next: damageLevel < MAX_STAT_LEVEL ? `→ ${BULLET_DAMAGE + 1}` : "→ MAX",
        level: `lvl ${damageLevel}/${MAX_STAT_LEVEL}`,
        rarityLabel,
        rarityColor,
        className: isDisabled ? disabledClass : baseClass,
        disabled: isDisabled,
      };
    case "shootSpeed":
      return {
        label: "SHOOT SPEED",
        current: `Current: ${getShotsPerSec()}/s`,
        next: shootSpeedLevel < MAX_STAT_LEVEL ? `→ ${(1000 / (SHOOT_INTERVAL - 50)).toFixed(1)}/s` : "→ MAX/s",
        level: `lvl ${shootSpeedLevel}/${MAX_STAT_LEVEL}`,
        rarityLabel,
        rarityColor,
        className: isDisabled ? disabledClass : baseClass,
        disabled: isDisabled,
      };
    case "moveSpeed":
      return {
        label: "MOVE SPEED",
        current: `Current: ${MOVE_SPEED.toFixed(1)}`,
        next: moveSpeedLevel < MAX_STAT_LEVEL ? `→ ${(MOVE_SPEED + 0.5).toFixed(1)}` : "→ MAX",
        level: `lvl ${moveSpeedLevel}/${MAX_STAT_LEVEL}`,
        rarityLabel,
        rarityColor,
        className: isDisabled ? disabledClass : baseClass,
        disabled: isDisabled,
      };
    case "bulletCount":
      const bulletCountDisabled = bulletCount >= 3;
      return {
        label: "BULLETS",
        current: `Current: ${bulletCount}`,
        next: bulletCountDisabled ? "→ MAX" : `→ ${bulletCount + 1}`,
        level: "",
        rarityLabel,
        rarityColor,
        className: bulletCountDisabled ? rareDisabledClass : rareClass,
        disabled: bulletCountDisabled,
      };
  }
};

const LevelUpModal = ({
  damageLevel,
  shootSpeedLevel,
  moveSpeedLevel,
  bulletCount,
  options,
  onUpgrade,
  onSkip,
}: LevelUpModalProps) => {
  return (
    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4">
      <div className="text-green-500 text-xl font-bold mb-6">LEVEL UP!</div>
      <div className="flex gap-4">
        {options.map((option, index) => {
          const content = getUpgradeContent(
            option.type,
            option.rarity,
            damageLevel,
            shootSpeedLevel,
            moveSpeedLevel,
            bulletCount
          );
          return (
            <button
              key={index}
              onClick={() => onUpgrade(option.type)}
              disabled={content.disabled}
              className={`w-28 h-36 border-2 p-2 flex flex-col items-center justify-center ${content.className}`}
            >
              <span className="text-sm font-bold">{content.label}</span>
              <span className="text-xs mt-2">{content.current}</span>
              <span className="text-xs mt-1">{content.next}</span>
              {content.level && <span className="text-xs mt-2">{content.level}</span>}
              <span className={`text-[10px] mt-auto ${content.rarityColor}`}>{content.rarityLabel}</span>
            </button>
          );
        })}
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
