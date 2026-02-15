import { Star } from "../types";

const generateStars = (count: number, size: string, opacity: string, duration: string): Star[] => {
  const colors = ["white", "cyan", "fuchsia"] as const;
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: "0%",
    width: size,
    height: size,
    opacity,
    delay: `-${Math.random() * parseFloat(duration)}s`,
    color: colors[Math.floor(Math.random() * colors.length)],
    duration,
  }));
};

export const farStars = generateStars(60, "2px", "0.3", "8s");
export const midStars = generateStars(40, "3px", "0.5", "5s");
export const nearStars = generateStars(25, "4px", "0.7", "3s");

const StarsBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {farStars.map((star) => (
        <div
          key={`far-${star.id}-${star.color}`}
          className="absolute rounded-full star-far"
          style={{
            left: star.left,
            top: star.top,
            width: star.width,
            height: star.height,
            opacity: star.opacity,
            animationDelay: star.delay,
            backgroundColor: star.color,
          }}
        />
      ))}
      {midStars.map((star) => (
        <div
          key={`mid-${star.id}-${star.color}`}
          className="absolute rounded-full star-mid"
          style={{
            left: star.left,
            top: star.top,
            width: star.width,
            height: star.height,
            opacity: star.opacity,
            animationDelay: star.delay,
            backgroundColor: star.color,
          }}
        />
      ))}
      {nearStars.map((star) => (
        <div
          key={`near-${star.id}-${star.color}`}
          className="absolute rounded-full star-near"
          style={{
            left: star.left,
            top: star.top,
            width: star.width,
            height: star.height,
            opacity: star.opacity,
            animationDelay: star.delay,
            backgroundColor: star.color,
          }}
        />
      ))}
    </div>
  );
};

export default StarsBackground;
