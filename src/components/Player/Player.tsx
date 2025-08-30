import { useContext, useEffect, useRef, useState, type CSSProperties } from "react";
import nextIcon from "/icon-next.svg";
import pauseIcon from "/icon-pause.svg";
import playIcon from "/icon-play.svg";
import prevIcon from "/icon-prev.svg";
import randomIcon from "/icon-random.svg";
import repeatIcon from "/icon-repeat.svg";
import soundIcon from "/icon-sound.svg";
import type IReciter from "../../interfaces/IReciter";
import ReciterContext from "../../context/ReciterContext";
import { SURAS } from "../../constants";

export default function Player(props: { reciter: IReciter }) {
  const [repeat, setRepeat] = useState(0);
  const [random, setRandom] = useState(false);
  const surasArray = props.reciter.suras.split(",").map((s) => +s);
  const { currentSura, setCurrentSura, isPlaying, setIsPlaying } = useContext(ReciterContext);
  const [currentSuraIndex, setCurrentSuraIndex] = useState(surasArray.indexOf(currentSura || surasArray[0]));
  const formattedSuraNumber = currentSura?.toString().padStart(3, "0");
  const needSlash = !props.reciter.Server.endsWith("/");
  const currentSuraAudio = `${props.reciter.Server}${needSlash ? "/" : ""}${formattedSuraNumber}.mp3`;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentAudioTime, setCurrentAudioTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (repeat === 0 && !random) setIsPlaying(false);
  }, [currentSura, random, repeat, setIsPlaying]);

  useEffect(() => {
    if (currentSura) setCurrentSuraIndex(surasArray.indexOf(currentSura));
  }, [currentSura, surasArray]);

  function handleTimeUpdate() {
    setCurrentAudioTime(audioRef.current!.currentTime);
  }

  function handleLoadedMetadata() {
    setAudioDuration(audioRef.current!.duration);
  }

  function playPrev() {
    setCurrentSura(surasArray[currentSuraIndex - 1]);
  }

  function playNext() {
    setCurrentSura(surasArray[currentSuraIndex + 1]);
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    audioRef.current!.currentTime = Number(e.target.value);
    setCurrentAudioTime(Number(e.target.value));
  }

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVolume(Number(e.target.value));
  }

  function getCurrentAudioTimeFormatted() {
    return `${Math.floor(currentAudioTime / 60)
      .toString()
      .padStart(2, "0")}:${Math.floor(currentAudioTime % 60)
      .toFixed()
      .toString()
      .padStart(2, "0")}`;
  }

  function getAudioDurationFormatted() {
    return `${Math.floor(audioDuration / 60)
      .toString()
      .padStart(2, "0")}:${Math.floor(audioDuration % 60)
      .toFixed()
      .toString()
      .padStart(2, "0")}`;
  }

  function handleOnAudioEnd() {
    if (repeat === 0 && !random) {
      setIsPlaying(false);
      return;
    }
    if (repeat > 0) {
      if (repeat < 6) setRepeat((r) => r - 1);
      audioRef.current!.currentTime = 0;
      setIsPlaying(true);
      return;
    }
    if (random) {
      const nextSura =
        surasArray.length > 1
          ? surasArray[Math.floor(Math.random() * (surasArray.length - 1))]
          : currentSura || surasArray[0];
      setCurrentSura(nextSura);
      setIsPlaying(true);
    }
  }

  return (
    <div
      dir="rtl"
      className="h-[100px] bg-[#32B7C5] sticky bottom-0 flex items-center justify-center gap-[48px] px-[48px] shadow-[0_-2px_12px_rgba(0,0,0,0.2)]"
    >
      <audio
        src={currentSuraAudio}
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={handleOnAudioEnd}
      ></audio>
      <p className="text-white text-[20px] font-['Amiri'] font-bold w-[70px]">{SURAS[currentSura!].name}</p>
      <div className="left flex gap-[12px] items-center justify-center">
        <img
          src={prevIcon}
          alt="Previous Icon"
          className={`${currentSuraIndex > 0 ? "cursor-pointer" : "opacity-[50%] pointer-events-none"}`}
          onClick={playPrev}
        />
        <img
          src={isPlaying ? pauseIcon : playIcon}
          alt="Play Icon"
          className="w-[48px] cursor-pointer"
          onClick={() => setIsPlaying(!isPlaying)}
        />
        <img
          src={nextIcon}
          alt="Next Icon"
          className={`${currentSuraIndex < surasArray.length - 1 ? "cursor-pointer" : "opacity-[50%] pointer-events-none"}`}
          onClick={playNext}
        />
      </div>
      <div className="center flex items-center justify-center gap-[24px]">
        <div className="flex items-center justify-center gap-[8px]">
          <p className="text-[10px] text-white w-[40px] text-center">{getCurrentAudioTimeFormatted()}</p>
          <input
            type="range"
            className="progress-bar"
            value={currentAudioTime}
            max={audioDuration || 100}
            onInput={handleSeek}
            style={{ "--progress": `${(currentAudioTime / (audioDuration || 1)) * 100}%` } as CSSProperties}
          />
          <p className="text-[10px] text-white w-[40px] text-center">{getAudioDurationFormatted()}</p>
        </div>
        <img
          src={randomIcon}
          alt="Random Icon"
          className={`cursor-pointer scale-x-[-1] ${!random ? "opacity-[50%]" : ""}`}
          onClick={() => setRandom((r) => !r)}
        />
        <div className="relative">
          <img
            src={repeatIcon}
            alt="Repeat Icon"
            className={`cursor-pointer ${!(repeat > 0) ? "opacity-[50%]" : ""}`}
            onClick={() => setRepeat((r) => (r + 1) % 7)}
          />
          {repeat > 0 && (
            <div className="absolute -top-2 -right-2 bg-white text-[#32B7C5] text-[10px] font-bold w-[16px] h-[16px] rounded-[50%] flex items-center justify-center">
              {repeat <= 5 ? repeat : "∞"}
            </div>
          )}
        </div>
      </div>
      <div className="right flex items-center justify-center gap-[24px]">
        <img src={soundIcon} alt="Sound Icon" className="scale-x-[-1]" />
        <input
          type="range"
          className="volume-slider"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onInput={handleVolumeChange}
          style={
            {
              "--volume-percent": `${volume * 100}%`,
            } as CSSProperties
          }
        />
      </div>
    </div>
  );
}
