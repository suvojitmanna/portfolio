import React from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import photo1 from "../assets/photo1.png";
import photo2 from "../assets/photo2.PNG";
import photo3 from "../assets/photo3.png";

const MH3 = motion.h3;

const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener?.("change", handler) || mql.addListener(handler);

    setIsMobile(mql.matches);
    return () =>
      mql.removeEventListener?.("change", handler) || mql.removeListener(handler);
  }, [query]);

  return isMobile;
};

export default function Projects() {
  const isMobile = useIsMobile();
  const projects = React.useMemo(
    () => [
      {
        title: "Whatsapp-Clone",
        link: "https://whatsapp-gilt-alpha.vercel.app/",
        bgColor: isMobile ? "#012b1c" : "#075e54",
        image: isMobile ? photo1 : img1,
      },
      {
        title: "Live-classes",
        link: "https://live-classes.vercel.app/",
        bgColor: isMobile ? "#0f0436" : "#4c1d95",
        image: isMobile ? photo2 : img2,
      },
      {
        title: "Interview-IQ",
        link: "https://ai-interview-two-sigma.vercel.app/",
        bgColor: isMobile ? "#08122d" : "#312e81",
        image: isMobile ? photo3 : img3,
      },
    ],
    [isMobile]
  );

  const sceneRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = projects.map((_, i) => (i + 1) / projects.length);
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      const idx = thresholds.findIndex((t) => v <= t);
      setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress, thresholds]);

  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-white"
      style={{
        height: `${100 * projects.length}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      {isMobile ? (
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-between px-3 py-9">
          <div className="relative z-20 flex flex-col items-center pt-5">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-wide">My Work</h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/15 border border-white/20">
                0{activeIndex + 1} / 0{projects.length}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              {projects.map((proj, idx) => (
                <motion.div
                  key={proj.title}
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`h-1.5 rounded-full ${activeIndex === idx ? "w-9 bg-white" : "w-2 bg-white/35"
                    }`}
                />
              ))}
            </div>
          </div>
          <div
            className="relative z-20 flex-1 w-full flex flex-col items-center justify-center my-2"
            style={{ perspective: "1200px" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.title}
                initial={{ opacity: 0, y: 70, scale: 0.86, rotateX: 14 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, y: -60, scale: 0.88, rotateX: -12 }}
                transition={{
                  type: "spring",
                  stiffness: 210,
                  damping: 22,
                  mass: 0.9,
                }}
                className="w-full max-w-[390px] flex flex-col items-center"
              >
                <MH3
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.35 }}
                  className="text-3xl font-bangers italic font-semibold tracking-wider text-white/95 mb-2 drop-shadow-md text-center"
                >
                  {activeProject.title}
                </MH3>
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{
                    duration: 3.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-full h-[63vh] flex items-center justify-center"
                >
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-contain rounded-2xl"
                    style={{
                      filter: `drop-shadow(0 22px 40px rgba(0,0,0,0.75)) drop-shadow(0 0 28px ${activeProject.bgColor})`,
                    }}
                    loading="lazy"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative z-30 pb-8">
            <AnimatePresence mode="wait">
              <motion.a
                key={`btn-${activeProject.title}`}
                href={activeProject?.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                whileTap={{ scale: 0.94 }}
                className="group flex items-center gap-2 px-7 py-3 font-semibold rounded-full bg-white text-black shadow-xl text-sm"
                style={{
                  boxShadow: `0 12px 30px -5px ${activeProject.bgColor}95, 0 8px 20px -6px rgba(0,0,0,0.65)`,
                }}
                aria-label={`View ${activeProject?.title}`}
              >
                <span>View Project</span>
                <motion.span
                  animate={{ x: [0, 3, 0], y: [0, -3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <FiArrowUpRight className="w-4 h-4" />
                </motion.span>
              </motion.a>
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
          <h2 className="text-3xl font-semibold z-10 text-center mt-2">
            My Work
          </h2>
          <div className="relative w-full flex-1 flex items-center justify-center -mt-8">
            {projects.map((project, idx) => (
              <div
                key={project.title}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${activeIndex === idx
                  ? "opacity-100 z-20"
                  : "opacity-0 z-0 sm:z-10"
                  }`}
                style={{ width: "85%", maxWidth: "1200px" }}
              >
                <AnimatePresence mode="wait">
                  {activeIndex === idx && (
                    <MH3
                      key={project.title}
                      initial={{ opacity: 0, y: -30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="block text-center text-[clamp(2rem,5vw,3.2rem)] text-white/95 sm:absolute sm:-top-21 sm:left-[45%] lg:left-[0%] sm:mb-0 font-bangers italic font-semibold mt-6"
                      style={{ zIndex: 5, textAlign: "left" }}
                    >
                      {project.title}
                    </MH3>
                  )}
                </AnimatePresence>
                <div
                  className="relative w-full overflow-hidden bg-black/20 mt-3 sm:ml-15 mb-10 sm:mb-1 rounded-xl h-[55vh] sm:h-[78vh] w-[44vh] sm:w-[150vh]"
                  style={{
                    zIndex: 10,
                    boxShadow: `0 30px 70px -15px ${project.bgColor}, 0 20px 40px -15px rgba(0,0,0,0.7), 0 0 50px ${project.bgColor}40`,
                    transition: "box-shadow 400ms ease",
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    style={{
                      position: "relative",
                      zIndex: 10,
                      filter: `drop-shadow(0 20px 35px ${project.bgColor}) drop-shadow(0 12px 25px rgba(0,0,0,0.65))`,
                      transition: "filter 350ms ease",
                    }}
                    loading="lazy"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      zIndex: 11,
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 40%)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="absolute z-30 flex items-center justify-center bottom-5 sm:bottom-3">
            <motion.a
              href={activeProject?.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="group flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 font-semibold rounded-full bg-white text-black hover:bg-white/95 transition-all duration-300 text-sm sm:text-base cursor-pointer shadow-lg"
              style={{
                boxShadow: `0 12px 30px -5px ${activeProject.bgColor}90, 0 8px 20px -6px rgba(0,0,0,0.6)`,
              }}
              aria-label={`View ${activeProject?.title}`}
            >
              <span>View Project</span>
              <FiArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.a>
          </div>
        </div>
      )}
    </section>
  );
}