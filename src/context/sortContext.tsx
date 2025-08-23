import { createContext } from "react";

type Context = {
  activeSortOption: string;
  setActiveSortOption: (value: string) => void;
};

// default value (just placeholders)
const Context = createContext<Context>({
  activeSortOption: "أبجدي",
  setActiveSortOption: () => {},
});

export default Context;
