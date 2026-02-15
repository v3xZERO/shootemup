import { memo } from "react";
import { PlayerPos } from "../types";
import { PLAYER_SIZE } from "../constants";

interface PlayerProps {
  playerPos: PlayerPos;
}

const Player = memo(({ playerPos }: PlayerProps) => {
  return (
    <div
      className="absolute text-4xl font-bold will-change-transform"
      style={{
        transform: `translate(${playerPos.x - PLAYER_SIZE / 2}px, ${playerPos.y - PLAYER_SIZE / 2}px)`,
      }}
    >
      Δ
    </div>
  );
});

Player.displayName = "Player";

export default Player;
