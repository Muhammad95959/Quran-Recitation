import background from "/header.png";
import logo from "/logo.svg";
import searchIcon from "/icon-search.svg";
import { useContext } from "react";
import Context from "../../context/sortContext";

export default function Header() {
  const { activeSortOption, setActiveSortOption } = useContext(Context);
  const sortOptions = ["أبجدي", "عدد السور", "الرواية"];

  return (
    <header dir="rtl">
      <img
        className="w-full lg:h-auto h-[30vh] absolute top-0 right-0 left-0 -z-1"
        src={background}
        alt="Header Background"
      />
      <img className="w-[64px] mx-auto my-[24px]" src={logo} alt="Logo" />
      <div className="flex justify-center items-center">
        <div className="basis-[500px] h-[48px] mx-[16px] px-[16px] rounded-[10px] bg-white items-center flex gap-[8px]">
          <input className="w-full h-[48px] block mx-auto rounded-[10px] outline-none font-['Amiri']" type="text" />
          <img src={searchIcon} alt="Search Icon" />
        </div>
      </div>
      <div className="flex justify-center items-center gap-[8px] my-[24px]">
        <p className="text-white font-bold text-[18px]">ترتيب حسب :</p>
        <div className="flex justify-center items-center gap-[8px]">
          {sortOptions.map((option, index) => {
            return (
              <span
                key={index}
                className={`block px-[18px] py-[12px] rounded-[40px] text-[#624bc3] cursor-pointer outline-none ease-in-out duration-300 ${activeSortOption === option ? "bg-[#32e6c5]" : "bg-[#85e6c5]"}`}
                onClick={() => setActiveSortOption(option)}
                tabIndex={0}
              >
                {option}
              </span>
            );
          })}
        </div>
      </div>
    </header>
  );
}
