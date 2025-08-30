import { createContext } from "react";

type ReciterContextType = {
  suraSearchQuery: string;
  setSuraSearchQuery: (value: string) => void;
  currentSura?: number;
  setCurrentSura: (value: number) => void;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
};

const ReciterContext = createContext<ReciterContextType>({
  suraSearchQuery: "",
  setSuraSearchQuery: () => {},
  currentSura: undefined,
  setCurrentSura: () => {},
  isPlaying: false,
  setIsPlaying: () => {},
});

export default ReciterContext;
