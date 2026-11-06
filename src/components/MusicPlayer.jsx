import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const MusicPlayer = () => {
  const playlist = [
    "/iwasneverthere.mp3",
    "/escapism.mp3",
    "/blue.mp3",
    "/YAD.mp3",
    "/stars.mp3",
  ];

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [infoText, setInfoText] = useState("Wanna play music while scrolling?");
  const [isHovered, setIsHovered] = useState(false);
  const [showMobileHint, setShowMobileHint] = useState(false);

  const audioRef = useRef(null);
  const lastTapTime = useRef(0);
  const clickTimeout = useRef(null);
  const mobileHintTimeout = useRef(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const triggerMobileHint = () => {
    setShowMobileHint(true);
    if (mobileHintTimeout.current) clearTimeout(mobileHintTimeout.current);
    mobileHintTimeout.current = setTimeout(() => {
      setShowMobileHint(false);
    }, 2500);
  };

  const setSourceAndMaybePlay = (src, shouldPlay) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = src;
    audio.load();
    audio.muted = false;
    if (audio.volume === 0) audio.volume = 0.5;

    if (!shouldPlay) return;
    const onCanPlay = () => {
      const p = audio.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          setIsPlaying(false);
          setInfoText("Wanna play music while scrolling?");
        });
      }
      audio.removeEventListener("canplay", onCanPlay);
    };
    audio.addEventListener("canplay", onCanPlay);
  };

  const playTrack = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setInfoText("Double tap to change the music");
    setSourceAndMaybePlay(playlist[index], true);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlayingRef.current) {
      audio.pause();
      setIsPlaying(false);
      setInfoText("Wanna play music while scrolling?");
    } else {
      setSourceAndMaybePlay(playlist[currentTrackIndex], true);
      setIsPlaying(true);
      setInfoText("Double tap to change the music");
    }
  };

  const shuffleNextTrack = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const wasPlaying = isPlayingRef.current;
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } while (nextIndex === currentTrackIndex && playlist.length > 1);

    setCurrentTrackIndex(nextIndex);
    setSourceAndMaybePlay(playlist[nextIndex], wasPlaying);
  };

  const handleTrackEnd = () => {
    shuffleNextTrack();
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.preload = "auto";
    audio.volume = 0.6;
    audio.muted = false;
    const onError = () => {
      console.warn("Audio error loading/playing:", audio.error);
    };
    audio.addEventListener("error", onError);
    return () => audio.removeEventListener("error", onError);
  }, []);

  useEffect(() => {
    const handleVolumeKeys = (e) => {
      const audio = audioRef.current;
      if (!audio) return;

      // Do not block keys if user is typing in form inputs or if audio is not playing
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target.isContentEditable ||
        !isPlayingRef.current
      ) {
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        audio.volume = Math.min(1, Math.round((audio.volume + 0.05) * 100) / 100);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        audio.volume = Math.max(0, Math.round((audio.volume - 0.05) * 100) / 100);
      }
    };
    window.addEventListener("keydown", handleVolumeKeys, { passive: false });
    return () => window.removeEventListener("keydown", handleVolumeKeys);
  }, []);

  const handleDoubleTapMobile = () => {
    const now = Date.now();
    if (now - lastTapTime.current < 400) {
      shuffleNextTrack();
    }
    lastTapTime.current = now;
  };

  const handleClick = () => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      shuffleNextTrack();
    } else {
      clickTimeout.current = setTimeout(() => {
        togglePlay();
        clickTimeout.current = null;
      }, 250);
    }
  };

  const isVisible = isHovered || showMobileHint;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`mb-2.5 pointer-events-none transition-all duration-300 ease-out transform ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-2 scale-95"
        } group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100`}
      >
        <div className="relative px-3.5 py-1.5 rounded-full text-xs font-medium text-cyan-200 bg-neutral-900/90 backdrop-blur-md border border-cyan-400/40 shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center gap-2 whitespace-nowrap">
          <span className="text-sm">🎵</span>
          <span>{infoText}</span>
          <div className="absolute -bottom-1.5 right-5 w-2.5 h-2.5 bg-neutral-900/90 border-r border-b border-cyan-400/40 rotate-45" />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={playlist[currentTrackIndex]}
        onEnded={handleTrackEnd}
        preload="auto"
      />

      <button
        onClick={handleClick}
        onTouchStart={() => {
          triggerMobileHint();
          handleDoubleTapMobile();
        }}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className="p-4 rounded-full shadow-lg transition transform hover:scale-110 active:scale-95 cursor-pointer relative flex items-center justify-center focus:outline-none"
        style={{
          background: "linear-gradient(135deg, #00f0ff, #00ff80)",
          boxShadow: isPlaying
            ? "0 0 20px #00f0ff, 0 0 35px #00ff80"
            : "0 0 15px #00f0ff, 0 0 25px #00ff80",
          color: "white",
        }}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        title={infoText}
      >
        {isPlaying && (
          <span className="absolute inset-0 rounded-full animate-ping bg-cyan-400/30 pointer-events-none" />
        )}
        {isPlaying ? (
          <FaPause size={20} />
        ) : (
          <FaPlay size={20} className="translate-x-[1px]" />
        )}
      </button>
    </div>
  );
};

export default MusicPlayer;
