import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import RecitersList from "./components/RecitersList/RecitersList";
import Context from "./context/sortContext";
import Footer from "./components/Footer/Footer";

export default function App() {
  const [activeSortOption, setActiveSortOption] = useState("أبجدي");

  return (
    <Context.Provider value={{ activeSortOption, setActiveSortOption }}>
      <div className="min-h-[calc(100vh-94px)]">
        <Header />
        <RecitersList />
      </div>
      <Footer />
    </Context.Provider>
  );
}
