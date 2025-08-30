import { createContext } from "react";

type AppContextType = {
  activeSortOption: string;
  setActiveSortOption: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

const AppContext = createContext<AppContextType>({
  activeSortOption: "أبجدي",
  setActiveSortOption: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
});

export default AppContext;
