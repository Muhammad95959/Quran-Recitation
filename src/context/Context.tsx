import { createContext } from "react";

type Context = {
  activeSortOption: string;
  setActiveSortOption: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

const Context = createContext<Context>({
  activeSortOption: "أبجدي",
  setActiveSortOption: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
});

export default Context;
