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

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseDown = (e) => {
      setIsClicked(true);
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-3), newRipple]);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      const isInteractive = Boolean(
        target.closest(
          'a, button, [role="button"], input[type="submit"], input[type="button"], .cursor-pointer, [data-cursor="pointer"]'
        )
      );

      const isTextInput = Boolean(
        target.closest(
          'input:not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]'
        )
      );

      if (isTextInput) {
        setCursorState("text");
      } else if (isInteractive) {
        setCursorState("pointer");
      } else {
        setCursorState("default");
      }
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
  }, [mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9990] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: glowX,
          y: glowY,
          opacity: isVisible ? (cursorState === "text" ? 0.05 : 0.22) : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <div className="w-72 h-72 rounded-full bg-gradient-to-tr from-[#1CD8D2]/25 via-[#00bf8f]/20 to-[#302b63]/15 blur-3xl" />
      </motion.div>
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="pointer-events-none fixed top-0 left-0 rounded-full border border-[#1CD8D2] z-[9995]"
          style={{
            left: ripple.x,
            top: ripple.y,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ width: 10, height: 10, opacity: 0.85, scale: 0.5 }}
          animate={{ width: 70, height: 70, opacity: 0, scale: 1.5 }}
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
                : cursorState === "pointer"
                  ? isClicked
                    ? 1.25
                    : 1.55
                  : isClicked
                    ? 0.75
                    : 1,
            borderColor:
              cursorState === "pointer"
                ? "rgba(28, 216, 210, 0.9)"
                : "rgba(28, 216, 210, 0.45)",
            backgroundColor:
              cursorState === "pointer"
                ? "rgba(28, 216, 210, 0.12)"
                : "rgba(28, 216, 210, 0.03)",
            boxShadow:
              cursorState === "pointer"
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
              : cursorState === "pointer"
                ? 1.25
                : 1,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#1CD8D2] via-[#00bf8f] to-white shadow-[0_0_10px_#1CD8D2,0_0_18px_rgba(0,191,143,0.8)]"
        />
      </motion.div>
    </>
  );
}
