import background from "/header.png";
import logo from "/logo.svg";
import searchIcon from "/icon-search.svg";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import ReciterContext from "../../context/ReciterContext";

export default function Header(props: { forLandingPage: boolean }) {
  const { activeSortOption, setActiveSortOption, setReciterSearchQuery } = useContext(AppContext);
  const { setSuraSearchQuery } = useContext(ReciterContext);
  const [inputValue, setInputValue] = useState("");
  const sortOptions = ["أبجدي", "عدد السور", "الرواية"];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (props.forLandingPage) setReciterSearchQuery(inputValue);
      else setSuraSearchQuery(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, props.forLandingPage, setReciterSearchQuery, setSuraSearchQuery]);

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  return (
    <header dir="rtl">
      <img
        className="w-full lg:h-auto h-[33vh] absolute top-0 right-0 left-0 -z-1"
        src={background}
        alt="Header Background"
      />
      <img className="w-[64px] mx-auto my-[24px]" src={logo} alt="Logo" />
      <div className="flex justify-center items-center">
        <div className="basis-[500px] h-[48px] mx-[16px] px-[16px] rounded-[10px] bg-white items-center flex gap-[8px]">
          <input
            value={inputValue}
            onChange={onChangeHandler}
            className="w-full h-[48px] block mx-auto rounded-[10px] outline-none font-['Amiri']"
            type="text"
          />
          <img src={searchIcon} alt="Search Icon" />
        </div>
      </div>
      {props.forLandingPage && (
        <div className="flex justify-center items-center gap-[8px] my-[24px] px-[8px]">
          <p className="text-white font-bold text-[18px] shrink-0 text-shadow-[0_0_5px_rgba(0,0,0,0.9)]">ترتيب حسب :</p>
          <div className="flex justify-center items-center gap-[8px]">
            {sortOptions.map((option, index) => {
              return (
                <span
                  key={index}
                  className={`text-center block px-[18px] py-[12px] rounded-[40px] text-[#624bc3] cursor-pointer shrink-0 outline-none ease-in-out duration-300 ${activeSortOption === option ? "bg-[#32e6c5]" : "bg-[#85e6c5]"}`}
                  onClick={() => setActiveSortOption(option)}
                  tabIndex={0}
                >
                  {option}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
