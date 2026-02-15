import { Star } from "../types";

const generateStars = (count: number, opacity: string, duration: string, fontSize: string): Star[] => {
  const colors = ["white", "cyan", "magenta", "yellow"] as const;
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: "0%",
    opacity,
    delay: `-${Math.random() * parseFloat(duration)}s`,
    color: colors[Math.floor(Math.random() * colors.length)],
    duration,
    fontSize,
  }));
};

export const farStars = generateStars(60, "0.3", "8s", "0.75rem");
export const midStars = generateStars(40, "0.5", "5s", "0.75rem");
export const nearStars = generateStars(25, "0.7", "3s", "1rem");

interface StarsBackgroundProps {
  horizontalOffset?: number;
}

const StarsBackground = ({ horizontalOffset = 0 }: StarsBackgroundProps) => {
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
            *
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
            *
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
            *
          </span>
        ))}
      </div>
    </div>
  );
};

export default StarsBackground;
