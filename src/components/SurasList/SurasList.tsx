import starIcon from "/icon-star.svg";
import bookIcon from "/icon-book.svg";
import kaabaIcon from "/icon-kaaba.svg";
import mosqueIcon from "/icon-mosque.svg";
import type Reciter from "../../interfaces/Reciter";
import { SURAS } from "../../constants";

export default function SurasList(props: { reciter: Reciter }) {
  const { reciter } = props;

  return (
    <div
      dir="rtl"
      className="max-w-[1440px] mx-auto px-[24px] grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-[24px] mb-[24px]"
    >
      {reciter.suras.split(",").map((suraNum) => {
        const sura = SURAS[+suraNum];
        return (
          <div tabIndex={0} className="cursor-pointer p-[16px] bg-white rounded-[12px] flex justify-between items-center gap-[16px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.35)]">
            <div className="relative">
              <img className="w-[56px]" src={starIcon} alt="Star Icon" />
              <p className="absolute top-1/2 left-1/2 -translate-1/2 font-semibold">{suraNum}</p>
            </div>
            <p className="font-['Amiri'] flex-shrink-0 text-[20px]">{sura.name}</p>
            <div>
              <div className="flex items-center gap-4 px-[16px]">
                <div className="bg-[#F2F2F2] flex items-center gap-2 px-[8px] py-[5px] rounded-[6px] w-fit flex-shrink-0">
                  <span className="text-4 text-[#828282]">{sura.verces}</span>
                  <span className="text-8 text-[#828282]">{sura.verces <= 10 ? "آيات" : "آية"}</span>
                  <img className="w-[14px]" src={bookIcon} alt="Kaaba Icon" />
                </div>
                <div className="w-[7px] h-[7px] bg-[#828282] rounded-[50%] flex-shrink-0"></div>
                <div className="bg-[#F2F2F2] flex items-center gap-2 px-[8px] py-[5px] rounded-[6px]">
                  <span className="text-8 text-[#828282] text-center">{sura.type}</span>
                  <img className="w-[14px]" src={sura.type === "مكية" ? kaabaIcon : mosqueIcon} alt="Kaaba Icon" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
