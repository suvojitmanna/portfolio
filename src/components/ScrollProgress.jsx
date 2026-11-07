import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("Home");
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [sectionMarkers, setSectionMarkers] = useState([]);
  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const isDraggingRef = useRef(false);
  const rafId = useRef(null);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  const calculateSectionMarkers = useCallback(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    const markers = sections
      .map((sec) => {
        const el = document.getElementById(sec.id);
        if (!el) return null;
        const ratio = Math.max(0, Math.min(1, el.offsetTop / maxScroll));
        return { ...sec, ratio };
      })
      .filter(Boolean);

    setSectionMarkers(markers);
  }, []);

  const handleScroll = useCallback(() => {
    if (isDraggingRef.current) return;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.max(0, Math.min(1, scrollY / maxScroll)) : 0;
      setScrollProgress(progress);

      const scrollPos = scrollY + window.innerHeight * 0.35;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(sections[i].label);
          break;
        }
      }
    });
  }, []);

  useEffect(() => {
    handleScroll();
    calculateSectionMarkers();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", () => {
      handleScroll();
      calculateSectionMarkers();
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [handleScroll, calculateSectionMarkers]);

  const updateScrollFromPointer = (clientY, isSmooth = false) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const thumbHeight = thumbRef.current?.offsetHeight || 28;
    const usableHeight = rect.height - thumbHeight;

    if (usableHeight <= 0) return;

    const relativeY = clientY - rect.top - thumbHeight / 2;
    const clampedY = Math.max(0, Math.min(usableHeight, relativeY));
    const newProgress = clampedY / usableHeight;

    setScrollProgress(newProgress);

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll > 0) {
      window.scrollTo({
        top: newProgress * maxScroll,
        behavior: isSmooth ? "smooth" : "instant",
      });
    }
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    isDraggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateScrollFromPointer(e.clientY, false);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    updateScrollFromPointer(e.clientY, false);
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    setIsDragging(false);
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (e) {
      console.log(e);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: maxScroll, behavior: "smooth" });
  };

  const scrollToSection = (e, id) => {
    e.stopPropagation();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const percentage = Math.round(scrollProgress * 100);

  return (
    <div
      className="fixed right-0 sm:right-4 top-1/2 -translate-y-1/2 z-40 select-none flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Scroll percentage navigator"
    >
      <button
        onClick={scrollToTop}
        data-cursor="icon"
        className="mb-2 p-1.5 rounded-full text-white/50 hover:text-cyan-300 hover:bg-white/10 transition-colors duration-200 cursor-pointer focus:outline-none"
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <FaChevronUp size={10} />
      </button>

      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative h-56 sm:h-72 w-8 flex items-center justify-center cursor-pointer group"
      >
        <div className="absolute w-1 sm:w-1.5 h-full rounded-full bg-white/10 backdrop-blur-md overflow-hidden">
          <div
            className="w-full rounded-full bg-gradient-to-b from-[#00f0ff] via-[#1CD8D2] to-[#00ff80] shadow-[0_0_10px_rgba(0,240,255,0.7)] transition-all duration-75"
            style={{ height: `${percentage}%` }}
          />
        </div>

        {sectionMarkers.map((sec) => (
          <button
            key={sec.id}
            onClick={(e) => scrollToSection(e, sec.id)}
            style={{ top: `${sec.ratio * 100}%` }}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/30 hover:bg-cyan-300 hover:scale-150 transition-all duration-200 z-10 focus:outline-none"
            title={sec.label}
            aria-label={`Jump to ${sec.label}`}
          />
        ))}
        <div
          ref={thumbRef}
          style={{
            top: `${scrollProgress * 100}%`,
            transform: "translateY(-50%)",
          }}
          className={`absolute z-20 flex items-center ${isDragging ? "cursor-grabbing" : "cursor-grab"
            } transition-transform duration-75 active:scale-105`}
        >
          <div
            className={`flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-neutral-900/90 backdrop-blur-md border border-cyan-400/60 shadow-[0_0_14px_rgba(0,240,255,0.45)] text-[10px] sm:text-xs font-mono font-bold text-cyan-200 transition-all duration-200 ${isDragging || isHovered
              ? "border-[#00ff80] shadow-[0_0_18px_rgba(0,255,128,0.55)] scale-105"
              : ""
              }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${isDragging ? "bg-emerald-400 animate-ping" : "bg-cyan-400"
                }`}
            />
            <span>{percentage}%</span>
          </div>

          <div
            className={`absolute right-full mr-3 px-2.5 py-1 rounded-lg bg-neutral-900/95 backdrop-blur-md border border-cyan-400/40 text-white text-[11px] font-medium shadow-[0_0_15px_rgba(0,0,0,0.6)] whitespace-nowrap pointer-events-none transition-all duration-200 flex items-center gap-1.5 ${isHovered || isDragging
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-2"
              }`}
          >
            <span className="text-cyan-400 font-semibold">{activeSection}</span>
            <span className="text-gray-400">•</span>
            <span className="text-emerald-300 font-mono font-bold">{percentage}%</span>
            {isDragging && <span className="text-[10px] text-gray-400 ml-1">(Dragging)</span>}
          </div>
        </div>
      </div>

      <button
        onClick={scrollToBottom}
        data-cursor="icon"
        className="mt-2 p-1.5 rounded-full text-white/50 hover:text-cyan-300 hover:bg-white/10 transition-colors duration-200 cursor-pointer focus:outline-none"
        aria-label="Scroll to bottom"
        title="Scroll to bottom"
      >
        <FaChevronDown size={10} />
      </button>
    </div>
  );
}
