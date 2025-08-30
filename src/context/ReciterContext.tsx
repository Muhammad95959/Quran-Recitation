import { createContext } from "react";

type ReciterContextType = {
  currentSura?: number;
  setCurrentSura: (value: number) => void;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
};

const ReciterContext = createContext<ReciterContextType>({
  currentSura: undefined,
  setCurrentSura: () => {},
  isPlaying: false,
  setIsPlaying: () => {},
});

export default ReciterContext;
