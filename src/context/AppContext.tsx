import { createContext } from "react";

type AppContextType = {
  activeSortOption: string;
  setActiveSortOption: (value: string) => void;
  reciterSearchQuery: string;
  setReciterSearchQuery: (value: string) => void;
};

const AppContext = createContext<AppContextType>({
  activeSortOption: "أبجدي",
  setActiveSortOption: () => {},
  reciterSearchQuery: "",
  setReciterSearchQuery: () => {},
});

export default AppContext;
