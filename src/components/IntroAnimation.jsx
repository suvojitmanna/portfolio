import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useTheme } from "../context/ThemeContext";

gsap.registerPlugin(MorphSVGPlugin);

const greetings = [
  "Hello", "नमस्ते", "Hola", "Bonjour",
  "Ciao", "Olá", "Здравствуйте",
  "Merhaba", "Γειά", "Hej", "Hallo", "Salam"
];

export default function IntroAnimation({ onFinish }) {
  const { isDark } = useTheme();
  const [index, setIndex] = useState(0);
  const overlayRef = useRef(null);
  const greetingRef = useRef(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const preventScroll = (e) => {
      e.preventDefault();
    };

    const handleKeydown = (e) => {
      if (
        [
          "Space",
          "ArrowUp",
          "ArrowDown",
          "PageUp",
          "PageDown",
          "Home",
          "End",
        ].includes(e.code)
      ) {
        e.preventDefault();
      }
    };

    const forceScrollTop = () => {
      if (window.scrollY !== 0 || window.scrollX !== 0) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("scroll", forceScrollTop);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("scroll", forceScrollTop);
      window.scrollTo(0, 0);
    };
  }, []);

  useEffect(() => {
    let greetingTimer;

    if (index < greetings.length - 1) {
      gsap.fromTo(
        greetingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.12 }
      );
      greetingTimer = setTimeout(() => setIndex(i => i + 1), 180);
    } else {
      gsap.fromTo(
        greetingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.12 }
      );

      greetingTimer = setTimeout(() => {
        window.scrollTo(0, 0);
        const tl = gsap.timeline({
          onComplete: () => {
            window.scrollTo(0, 0);
            if (onFinish) onFinish();
          },
        });

        tl.to([overlayRef.current, greetingRef.current], {
          duration: 1.8,
          y: "-100vh",
          ease: "power4.inOut",
        }).to(
          overlayRef.current.querySelector("path"),
          {
            duration: 1.8,
            morphSVG: "M0,0 L0,300 Q720,900 1440,300 L1440,0 Z",
            ease: "power4.inOut",
          },
          "<"
        );
      }, 300);
    }

    return () => clearTimeout(greetingTimer);
  }, [index, onFinish]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center text-slate-900 dark:text-white overflow-hidden pointer-events-auto touch-none select-none transition-colors duration-300"
    >
      <h1
        ref={greetingRef}
        className="text-5xl md:text-7xl lg:text-8xl font-bold absolute z-20 text-slate-900 dark:text-white"
      >
        {greetings[index]}
      </h1>

      <svg
        className="absolute inset-0 w-full h-full fill-[#f8fafc] dark:fill-black transition-colors duration-300"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <path
          fill={isDark ? "#000000" : "#f8fafc"}
          className="fill-[#f8fafc] dark:fill-black"
          d="M0,0 L0,900 L1440,900 L1440,0 Z"
        />
      </svg>
    </div>
  );
}
