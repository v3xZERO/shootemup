interface PreGameScreenProps {
  onPlay: () => void;
}

const PreGameScreen = ({ onPlay }: PreGameScreenProps) => {
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex-1" />
      <button
        onClick={onPlay}
        className="w-full py-4 bg-green-500 text-black font-bold text-xl uppercase tracking-wider hover:bg-green-400"
      >
        Play
      </button>
    </div>
  );
};

export default PreGameScreen;
