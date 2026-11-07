import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState("default");
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const dotX = useSpring(mouseX, { damping: 48, stiffness: 1400, mass: 0.08 });
  const dotY = useSpring(mouseY, { damping: 48, stiffness: 1400, mass: 0.08 });
  const ringX = useSpring(mouseX, { damping: 26, stiffness: 260, mass: 0.45 });
  const ringY = useSpring(mouseY, { damping: 26, stiffness: 260, mass: 0.45 });
  const glowX = useSpring(mouseX, { damping: 36, stiffness: 120, mass: 0.8 });
  const glowY = useSpring(mouseY, { damping: 36, stiffness: 120, mass: 0.8 });

  useEffect(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) {
      setIsTouchDevice(true);
      return;
    }

    const updateCursorStateFromTarget = (target) => {
      if (!target || !(target instanceof Element)) return;
      const isTextInput = Boolean(
        target.closest(
          'input:not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]'
        )
      );

      if (isTextInput) {
        setCursorState("text");
        return;
      }

      const clickableEl = target.closest(
        'a, button, [role="button"], input[type="submit"], input[type="button"], .cursor-pointer, [data-cursor]'
      );

      if (clickableEl) {
        const isSvgTarget = Boolean(
          target.closest("svg") ||
          target.tagName.toLowerCase() === "svg" ||
          target.tagName.toLowerCase() === "path" ||
          target.tagName.toLowerCase() === "circle" ||
          target.tagName.toLowerCase() === "g"
        );
        const hasSvgInside = Boolean(clickableEl.querySelector("svg, img[alt*='icon' i]"));
        const hasLittleOrNoText = clickableEl.textContent.trim().length <= 2;
        const isIconSized =
          clickableEl.offsetWidth > 0 &&
          clickableEl.offsetHeight > 0 &&
          clickableEl.offsetWidth <= 68 &&
          clickableEl.offsetHeight <= 68;
        const hasExplicitIconTag =
          clickableEl.getAttribute("data-cursor") === "icon" ||
          Boolean(target.closest('[data-cursor="icon"]'));

        if (
          hasExplicitIconTag ||
          isSvgTarget ||
          (hasSvgInside && (hasLittleOrNoText || isIconSized))
        ) {
          setCursorState("icon");
          return;
        }
        setCursorState("pointer");
        return;
      }

      setCursorState("default");
    };

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
      updateCursorStateFromTarget(e.target);
    };

    const handleMouseDown = (e) => {
      setIsClicked(true);
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        isIcon: cursorState === "icon",
      };
      setRipples((prev) => [...prev.slice(-3), newRipple]);
    };
    const handleMouseUp = () => {
      setIsClicked(false);
    };
    const handleMouseOver = (e) => {
      updateCursorStateFromTarget(e.target);
    };
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, cursorState]);
  if (isTouchDevice) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9990] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: glowX,
          y: glowY,
          opacity: isVisible
            ? cursorState === "text"
              ? 0.05
              : cursorState === "icon"
                ? 0.35
                : 0.22
            : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <div className={`rounded-full bg-gradient-to-tr from-[#1CD8D2]/30 via-[#00bf8f]/25 to-[#302b63]/20 blur-3xl transition-all duration-300 ${cursorState === "icon" ? "w-80 h-80" : "w-72 h-72"
          }`}
        />
      </motion.div>
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className={`pointer-events-none fixed top-0 left-0 rounded-full z-[9995] ${ripple.isIcon
            ? "border-2 border-emerald-400 shadow-[0_0_15px_#00bf8f]"
            : "border border-[#1CD8D2]"
            }`}
          style={{
            left: ripple.x,
            top: ripple.y,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ width: 10, height: 10, opacity: 0.9, scale: 0.5 }}
          animate={{
            width: ripple.isIcon ? 85 : 70,
            height: ripple.isIcon ? 85 : 70,
            opacity: 0,
            scale: 1.6,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onAnimationComplete={() => {
            setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
          }}
        />
      ))}

      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      >
        <motion.div
          animate={{
            scale:
              cursorState === "text"
                ? 0
                : cursorState === "icon"
                  ? isClicked
                    ? 1.15
                    : 1.45
                  : cursorState === "pointer"
                    ? isClicked
                      ? 1.25
                      : 1.55
                    : isClicked
                      ? 0.75
                      : 1,
            borderColor:
              cursorState === "icon"
                ? "rgba(0, 255, 210, 0.95)"
                : cursorState === "pointer"
                  ? "rgba(28, 216, 210, 0.9)"
                  : "rgba(28, 216, 210, 0.45)",
            backgroundColor:
              cursorState === "icon"
                ? "rgba(28, 216, 210, 0.16)"
                : cursorState === "pointer"
                  ? "rgba(28, 216, 210, 0.12)"
                  : "rgba(28, 216, 210, 0.03)",
            boxShadow:
              cursorState === "icon"
                ? "0 0 32px rgba(0, 255, 210, 0.6), inset 0 0 16px rgba(0, 191, 143, 0.35)"
                : cursorState === "pointer"
                  ? "0 0 25px rgba(28, 216, 210, 0.45), inset 0 0 15px rgba(28, 216, 210, 0.18)"
                  : "0 0 12px rgba(28, 216, 210, 0.15)",
          }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 24,
          }}
          className="w-9 h-9 rounded-full border backdrop-blur-[1.5px] relative flex items-center justify-center"
        >
          {cursorState === "icon" && (
            <>
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-1.5 -left-1.5 w-2 h-2 border-t-2 border-l-2 border-cyan-300 pointer-events-none"
              />
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-1.5 -right-1.5 w-2 h-2 border-t-2 border-r-2 border-cyan-300 pointer-events-none"
              />
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -bottom-1.5 -left-1.5 w-2 h-2 border-b-2 border-l-2 border-cyan-300 pointer-events-none"
              />
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -bottom-1.5 -right-1.5 w-2 h-2 border-b-2 border-r-2 border-cyan-300 pointer-events-none"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute -inset-1.5 rounded-full border border-dashed border-emerald-400/80 pointer-events-none"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 2.8, ease: "linear" }}
                className="absolute inset-0 rounded-full pointer-events-none"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-200 shadow-[0_0_8px_#1CD8D2]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_#00bf8f]" />
              </motion.div>
            </>
          )}

          {cursorState === "pointer" && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
              className="absolute inset-0 rounded-full"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#1CD8D2]" />
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: dotX,
          y: dotY,
          opacity: isVisible ? (cursorState === "text" ? 0.35 : 1) : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        <motion.div
          animate={{
            scale: isClicked
              ? 0.6
              : cursorState === "icon"
                ? 1.45
                : cursorState === "pointer"
                  ? 1.25
                  : 1,
            rotate: cursorState === "icon" ? 45 : 0,
            borderRadius: cursorState === "icon" ? "2px" : "9999px",
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          className="w-2.5 h-2.5 bg-gradient-to-tr from-[#1CD8D2] via-white to-[#00bf8f] shadow-[0_0_12px_#1CD8D2,0_0_22px_rgba(0,191,143,0.85)]"
        />
      </motion.div>
    </>
  );
}
