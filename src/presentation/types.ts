export type Bullet = {
  x: number;
  y: number;
  id: number;
  explodeFrame?: number;
};

export type Enemy = {
  x: number;
  y: number;
  id: number;
  health: number;
  isExploding?: boolean;
  explodeFrame?: number;
  flashFrame?: number;
  slowFrame?: number;
};

export type PlayerPos = {
  x: number;
  y: number;
};

export type GamePhase = "pregame" | "playing" | "levelup";

export type Star = {
  id: number;
  left: string;
  top: string;
  opacity: string;
  delay: string;
  color: string;
  duration: string;
  fontSize: string;
  twinkleDelay: string;
  char: string;
};
