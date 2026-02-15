import { PlayerPos } from "../types";
import { PLAYER_SIZE } from "../constants";

interface PlayerProps {
  playerPos: PlayerPos;
}

const Player = ({ playerPos }: PlayerProps) => {
  return (
    <div
      className="absolute text-green-500 text-2xl font-bold"
      style={{
        left: playerPos.x - PLAYER_SIZE / 2,
        top: playerPos.y - PLAYER_SIZE / 2,
      }}
    >
      △
    </div>
  );
};

export default Player;
