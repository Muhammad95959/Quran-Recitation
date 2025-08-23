import { useContext, useEffect, useMemo, useState } from "react";
import heartIcon from "/icon-heart.svg";
import kaabaIcon from "/icon-kaaba.svg";
import bookIcon from "/icon-book.svg";
import Context from "../../context/sortContext";

type Reciter = {
  id: string;
  name: string;
  Server: string;
  rewaya: string;
  count: number;
  letter: string;
  suras: string;
};

export default function RecitersList() {
  const [reciters, setReciters] = useState<Reciter[]>([]);
  const { activeSortOption } = useContext(Context);

  useEffect(() => {
    fetch("https://www.mp3quran.net/api/_arabic.json")
      .then((res) => res.json())
      .then((data) => setReciters(data.reciters));
  }, []);

  const sortedReciters = useMemo(() => {
    switch (activeSortOption) {
      case "أبجدي":
        return [...reciters].sort((a, b) => a.name.localeCompare(b.name, "ar"));
      case "عدد السور":
        return [...reciters].sort((a, b) => a.count - b.count);
      case "الرواية":
        return [...reciters].sort((a, b) => a.rewaya.localeCompare(b.rewaya, "ar"));
      default:
        return reciters;
    }
  }, [activeSortOption, reciters]);

  return (
    <div
      dir="rtl"
      className="max-w-[1440px] mx-auto px-[24px] grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-[24px] mb-[24px]"
    >
      {sortedReciters.map((reciter) => {
        return (
          <div
            tabIndex={0}
            key={reciter.id}
            className="cursor-pointer p-[16px] bg-white rounded-[12px] flex flex-col items-center gap-[16px] hover:shadow-[inset_0_0_0_4px_#909090]"
          >
            <p className="font-['Amiri']">{reciter.name}</p>
            <div>
              <div className="flex items-center gap-4 px-[16px]">
                <div className="bg-[#F2F2F2] flex items-center gap-2 px-[8px] py-[5px] rounded-[6px]">
                  <span className="text-4 text-[#828282]">{reciter.count}</span>
                  <span className="text-8 text-[#828282]">سورة</span>
                  <img className="w-[14px]" src={bookIcon} alt="Kaaba Icon" />
                </div>
                <div className="w-[7px] h-[7px] bg-[#828282] rounded-[50%]"></div>
                <div className="bg-[#F2F2F2] flex items-center gap-2 px-[8px] py-[5px] rounded-[6px]">
                  <span className="text-8 text-[#828282] text-center">{reciter.rewaya}</span>
                  <img className="w-[14px]" src={kaabaIcon} alt="Kaaba Icon" />
                </div>
                <img className="w-[20px]" src={heartIcon} alt="Heart Icon" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
