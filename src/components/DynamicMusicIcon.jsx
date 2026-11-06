import React from "react";
import { FaPlay, FaPause } from "react-icons/fa";
export default function DynamicMusicIcon({
  isPlaying = false,
  isHovered = false,
  size = "md",
  showPauseOnHover = true,
  className = "",
}) {
  if (size === "sm") {
    if (!isPlaying) {
      return <span className={`text-sm select-none ${className}`}>🎵</span>;
    }
    return (
      <span
        className={`inline-flex items-end justify-center gap-[2px] h-3.5 w-3.5 pb-0.5 ${className}`}
        aria-hidden="true"
      >
        <span className="w-[2.5px] bg-cyan-300 rounded-full animate-musicBar1" />
        <span className="w-[2.5px] bg-cyan-200 rounded-full animate-musicBar2" />
        <span className="w-[2.5px] bg-emerald-300 rounded-full animate-musicBar3" />
      </span>
    );
  }

  if (!isPlaying) {
    const iconSize = size === "lg" ? 22 : 18;
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <FaPlay
          size={iconSize}
          className="translate-x-[1px] text-white transition-transform duration-300 group-hover:scale-110"
        />
      </div>
    );
  }

  if (isHovered && showPauseOnHover) {
    const iconSize = size === "lg" ? 22 : 18;
    return (
      <div className={`relative flex items-center justify-center transition-transform duration-200 scale-105 ${className}`}>
        <FaPause size={iconSize} className="text-white" />
      </div>
    );
  }

  const barWidth = size === "lg" ? "w-1.5" : "w-1";
  const containerSize = size === "lg" ? "h-6 w-6" : "h-5 w-5";

  return (
    <div
      className={`relative flex items-end justify-center gap-[3px] ${containerSize} ${className}`}
      aria-label="Audio visualizer playing"
    >
      <span
        className={`${barWidth} bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.7)] animate-musicBar1`}
      />
      <span
        className={`${barWidth} bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.7)] animate-musicBar2`}
      />
      <span
        className={`${barWidth} bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.7)] animate-musicBar3`}
      />
      <span
        className={`${barWidth} bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.7)] animate-musicBar4`}
      />
    </div>
  );
}

