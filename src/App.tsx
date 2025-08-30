import { useState } from "react";
import Header from "./components/Header/Header";
import RecitersList from "./components/RecitersList/RecitersList";
import AppContext from "./context/AppContext";
import Footer from "./components/Footer/Footer";

export default function App() {
  const [activeSortOption, setActiveSortOption] = useState("أبجدي");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AppContext.Provider value={{ activeSortOption, setActiveSortOption, searchQuery, setSearchQuery }}>
      <div className="min-h-[calc(100vh-94px)]">
        <Header withSorting={true} />
        <RecitersList />
      </div>
      <Footer />
    </AppContext.Provider>
  );
}
