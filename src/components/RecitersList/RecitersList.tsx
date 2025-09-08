import { useContext, useEffect, useMemo, useState } from "react";
import heartIcon from "/icon-heart.svg";
import filledHeartIcon from "/icon-heart-filled.svg";
import markIcon from "/icon-mark.svg";
import bookIcon from "/icon-book.svg";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";
import type IReciter from "../../interfaces/IReciter";

export default function RecitersList() {
  const [loading, setLoading] = useState(true);
  const [reciters, setReciters] = useState<IReciter[]>([]);
  const { activeSortOption, reciterSearchQuery } = useContext(AppContext);
  const favorites: Record<number, string> = JSON.parse(window.localStorage.getItem("favorites") || "{}");

  useEffect(() => {
    const recitersFromSessionStorage = JSON.parse(window.sessionStorage.getItem("reciters") || "[]");
    if (recitersFromSessionStorage.length > 0) {
      setReciters(recitersFromSessionStorage);
      setLoading(false);
      return;
    }
    fetch("https://www.mp3quran.net/api/_arabic.json")
      .then((res) => res.json())
      .then((data) => {
        setReciters(data.reciters);
        window.sessionStorage.setItem("reciters", JSON.stringify(data.reciters));
        setLoading(false);
      });
  }, []);

  const sortedReciters = useMemo(() => {
    const filteredReciters =
      reciterSearchQuery.trim() !== ""
        ? reciters.filter(
            (reciter) =>
              reciter.name.includes(reciterSearchQuery) ||
              reciter.rewaya.includes(reciterSearchQuery) ||
              reciter.count.toString().includes(reciterSearchQuery),
          )
        : reciters;
    switch (activeSortOption) {
      case "أبجدي":
        return filteredReciters.sort((a, b) => a.name.localeCompare(b.name, "ar"));
      case "عدد السور":
        return filteredReciters.sort((a, b) => a.count - b.count);
      case "الرواية":
        return filteredReciters.sort((a, b) => a.rewaya.localeCompare(b.rewaya, "ar"));
      default:
        return filteredReciters;
    }
  }, [activeSortOption, reciters, reciterSearchQuery]);

  return (
    <div
      dir="rtl"
      className="max-w-[1440px] mx-auto px-[12px] sm:px-[24px] grid grid-cols-[1fr] sm:grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-[24px] mb-[24px]"
    >
      {loading && <div className="loader"></div>}
      {sortedReciters.map((reciter) => {
        return (
          <Link to={`/reciter/${reciter.id}`} key={reciter.id} state={{ reciter }}>
            <div className="h-full cursor-pointer p-[16px] bg-white rounded-[12px] flex flex-col items-center justify-center gap-[16px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.35)]">
              <p className="font-['Amiri']">{reciter.name}</p>
              <div>
                <div className="flex items-center gap-4 px-[16px]">
                  <div className="bg-[#F2F2F2] flex items-center gap-2 px-[8px] py-[5px] rounded-[6px] w-fit flex-shrink-0">
                    <span className="text-4 text-[#828282]">{reciter.count}</span>
                    <span className="text-8 text-[#828282]">{reciter.count <= 10 ? "سور" : "سورة"}</span>
                    <img className="w-[14px]" src={bookIcon} alt="Kaaba Icon" />
                  </div>
                  <div className="w-[7px] h-[7px] bg-[#828282] rounded-[50%] flex-shrink-0"></div>
                  <div className="bg-[#F2F2F2] flex items-center gap-2 px-[8px] py-[5px] rounded-[6px]">
                    <span className="text-8 text-[#828282] text-center">{reciter.rewaya}</span>
                    <img className="w-[14px]" src={markIcon} alt="Kaaba Icon" />
                  </div>
                  <img
                    className="w-[20px]"
                    src={favorites[+reciter.id] ? filledHeartIcon : heartIcon}
                    alt="Heart Icon"
                  />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
