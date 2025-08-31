import { useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import SurasList from "./components/SurasList/SurasList";
import type IReciter from "./interfaces/IReciter";
import { useEffect, useState } from "react";
import heartIcon from "/icon-heart.svg";
import filledHeartIcon from "/icon-heart-filled.svg";
import Player from "./components/Player/Player";
import ReciterContext from "./context/ReciterContext";

export default function Reciter() {
  const [favorite, setFavorite] = useState(false);
  const [favorites, setFavorites] = useState<Record<number, boolean>>(
    JSON.parse(window.localStorage.getItem("favorites") || "{}"),
  );

  const reciter: IReciter = useLocation().state?.reciter;
  if (!reciter) window.location.href = "/";

  const [suraSearchQuery, setSuraSearchQuery] = useState("");
  const [currentSura, setCurrentSura] = useState(+reciter.suras.split(",")[0]);
  const [isPlaying, setIsPlaying] = useState(false);

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
    <ReciterContext.Provider
      value={{ currentSura, setCurrentSura, isPlaying, setIsPlaying, suraSearchQuery, setSuraSearchQuery }}
    >
      <div className="min-h-[calc(100vh-94px)]">
        <Header forLandingPage={false} />
        <div dir="rtl" className="my-[24px] flex justify-center items-center gap-[24px]">
          <p className="rounded-[36px] px-[24px] py-[6px] bg-white text-[24px] font-bold text-[#828282] shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
            {reciter.name}
          </p>
          <div
            className="cursor-pointer bg-white rounded-[50%] p-[12px] flex items-center jusitfy-center shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
            onClick={toggleFavorite}
          >
            <img
              tabIndex={0}
              className="w-[24px] relative top-[2px] outline-none"
              src={favorite ? filledHeartIcon : heartIcon}
              alt="Heart Icon"
            />
          </div>
        </div>
        <SurasList reciter={reciter} />
      </div>
      <Player reciter={reciter} />
    </ReciterContext.Provider>
  );
}
