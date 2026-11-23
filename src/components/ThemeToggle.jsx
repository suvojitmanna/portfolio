import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle({ className = "", compact = false }) {
  const { toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 350, damping: 18 }}
      className={`relative inline-flex items-center justify-center cursor-pointer focus:outline-none transition-all duration-300 ${compact
          ? "w-8 h-8 rounded-full bg-black/[0.06] dark:bg-white/[0.08] hover:bg-[#1CD8D2]/20 border border-black/15 dark:border-white/15 text-slate-700 dark:text-white hover:text-[#0d9488] dark:hover:text-[#1CD8D2] shadow-sm backdrop-blur-md"
          : "px-3 py-1.5 rounded-full bg-black/[0.06] dark:bg-white/[0.08] hover:bg-[#1CD8D2]/20 border border-black/15 dark:border-white/15 text-slate-700 dark:text-white hover:text-[#0d9488] dark:hover:text-[#1CD8D2] shadow-sm hover:shadow-[0_0_15px_rgba(28,216,210,0.3)] backdrop-blur-md gap-1.5 text-xs font-semibold"
        } ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      data-cursor="icon"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex items-center justify-center text-cyan-300"
          >
            <FiMoon className="w-4 h-4" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex items-center justify-center text-amber-500"
          >
            <FiSun className="w-4 h-4" />
          </motion.div>
        )}
      </AnimatePresence>

      {!compact && (
        <span className="hidden sm:inline font-mono tracking-wider text-[11px] uppercase">
          {isDark ? "Dark" : "Light"}
        </span>
      )}
    </motion.button>
  );
}
