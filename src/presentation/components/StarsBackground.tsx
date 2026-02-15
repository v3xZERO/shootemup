import { memo } from "react";
import { Star } from "../types";

const generateStars = (count: number, opacity: string, duration: string, fontSize: string, char: string, colorOverride?: string): Star[] => {
  const colors = colorOverride ? [colorOverride] : (["white", "cyan", "magenta", "yellow"] as const);
  const durationNum = parseFloat(duration);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: "0%",
    opacity,
    delay: `-${Math.random() * durationNum}s`,
    color: colorOverride ? colorOverride : colors[Math.floor(Math.random() * colors.length)],
    duration,
    fontSize,
    twinkleDelay: `-${Math.random() * 2}s`,
    char,
  }));
};

export const farStars = generateStars(120, "0.3", "12s", "0.75rem", "✦");
export const midStars = generateStars(80, "0.5", "8s", "0.75rem", "✶");
export const nearStars = generateStars(50, "0.7", "5s", "1rem", "✷");

interface StarsBackgroundProps {
  horizontalOffset?: number;
}

const StarsBackground = memo(
  ({ horizontalOffset = 0 }: StarsBackgroundProps) => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div style={{ transform: `translateX(${horizontalOffset * 0.2}px)` }}>
          {farStars.map((star) => (
          <span
            key={`far-${star.id}-${star.color}`}
            className="absolute star-far"
            style={{
              left: star.left,
              top: star.top,
              opacity: star.opacity,
              animationDelay: star.delay,
              color: star.color,
              fontSize: star.fontSize,
            }}
          >
            {star.char}
          </span>
        ))}
      </div>
      <div style={{ transform: `translateX(${horizontalOffset * 0.4}px)` }}>
        {midStars.map((star) => (
          <span
            key={`mid-${star.id}-${star.color}`}
            className="absolute star-mid"
            style={{
              left: star.left,
              top: star.top,
              opacity: star.opacity,
              animationDelay: star.delay,
              color: star.color,
              fontSize: star.fontSize,
            }}
          >
            {star.char}
          </span>
        ))}
      </div>
      <div style={{ transform: `translateX(${horizontalOffset * 0.6}px)` }}>
        {nearStars.map((star) => (
          <span
            key={`near-${star.id}-${star.color}`}
            className="absolute star-near"
            style={{
              left: star.left,
              top: star.top,
              opacity: star.opacity,
              animationDelay: star.delay,
              color: star.color,
              fontSize: star.fontSize,
            }}
          >
            {star.char}
          </span>
        ))}
      </div>
      </div>
    );
  }
);

StarsBackground.displayName = "StarsBackground";

export default StarsBackground;
