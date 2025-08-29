import { useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import SurasList from "./components/SurasList/SurasList";
import type IReciter from "./interfaces/Reciter";
import { useEffect, useState } from "react";
import heartIcon from "/icon-heart.svg";
import filledHeartIcon from "/icon-heart-filled.svg";
import Footer from "./components/Footer/Footer";

export default function Reciter() {
  const [favorite, setFavorite] = useState(false);
  const [favorites, setFavorites] = useState<Record<number, boolean>>(
    JSON.parse(window.localStorage.getItem("favorites") || "{}"),
  );

  const reciter: IReciter = useLocation().state?.reciter;
  if (!reciter) window.location.href = "/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("favorites", JSON.stringify(favorites));
    setFavorite(favorites[+reciter.id] || false);
  }, [favorites, reciter]);

  function toggleFavorite() {
    setFavorite((prevFav) => {
      const newFav = !prevFav;
      setFavorites({ ...favorites, [reciter.id]: newFav });
      return newFav;
    });
  }

  return (
    <>
      <div className="min-h-[calc(100vh-94px)]">
        <Header withSorting={false} />
        <div dir="rtl" className="max-w-[500px] mx-auto my-[24px] flex justify-between items-center">
          <p className="text-[40px] font-['Poppins'] font-bold text-white">{reciter.name}</p>
          <div className="flex-1 flex justify-center">
            <img
              className={`w-[36px] cursor-pointer ${favorite || "invert brightness-0"}`}
              src={favorite ? filledHeartIcon : heartIcon}
              alt="Heart Icon"
              onClick={toggleFavorite}
            />
          </div>
        </div>
        <SurasList reciter={reciter} />
      </div>
      <Footer />
    </>
  );
}
