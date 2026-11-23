import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

export default function OverlayMenu({ isOpen, onClose }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const origin = isMobile ? "95% 8%" : "50% 8%";
  const { isDark } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center z-50 backdrop-blur-2xl"
          initial={{ clipPath: `circle(0% at ${origin})` }}
          animate={{ clipPath: `circle(150% at ${origin})` }}
          exit={{ clipPath: `circle(0% at ${origin})` }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ backgroundColor: isDark ? "rgba(0,0,0,0.96)" : "rgba(255,255,255,0.96)" }}
        >
          <div className="absolute top-6 right-6 flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={onClose}
              className="text-slate-800 dark:text-white text-3xl p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <FiX />
            </button>
          </div>
          <ul className="space-y-6 text-center">
            {[
              "Home",
              "About",
              "Skills",
              "Projects",
              "Experience",
              "Education",
              "Testimonials",
              "Contact",
            ].map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={onClose}
                  className="text-4xl text-slate-900 dark:text-white font-semibold hover:text-cyan-500 dark:hover:text-pink-400 transition-colors duration-300"
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
