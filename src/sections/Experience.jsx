import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experiences = [
  {
    role: "Full Stack Web Developer",
    company: "Personal & Academic Projects",
    duration: "2025 - Present",
    description:
      "Built full-stack web applications using React, Node.js, Express, MongoDB, and REST APIs, with features including authentication, role-based access, real-time communication, file uploads, and responsive UI.",
  },
  {
    role: "AI Application Developer",
    company: "AI & GenAI Projects",
    duration: "2026 - Present",
    description:
      "Developed AI-powered applications using Gemini and local AI technologies, including AI chatbots, resume analysis, interview question generation, voice assistants, and RAG-based conversational systems.",
  },
  {
    role: "Real-Time Application Developer",
    company: "WebRTC & Socket.IO Projects",
    duration: "2026 - Present",
    description:
      "Developed real-time applications with Socket.IO and WebRTC, including live classes, video calling, chat systems, typing indicators, online presence, and real-time user communication.",
  },
  {
    role: "Hackathon Developer",
    company: "Smart India Hackathon",
    duration: "2026",
    description:
      "Worked on an AI-enabled smart education solution focused on identifying competency gaps, personalized learning recommendations, and AI-generated quizzes from learning materials.",
  },
];

function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
  const markerScale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const markerOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const cardOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const isAbove = idx % 2 === 0;
  const cardY = useTransform(scrollYProgress, [start, end], [isAbove ? 30 : -30, 0]);
  const cardX = useTransform(scrollYProgress, [start, end], [-24, 0]);

  if (layout === "desktop") {
    return (
      <div className="relative flex-1 flex justify-center items-center min-w-0" key={`${exp.company}-${exp.role}-${idx}`}>
        <motion.div
          className="z-10 w-6 h-6 xl:w-7 xl:h-7 rounded-full bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.15)] xl:shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
          style={{ scale: markerScale, opacity: markerOpacity }}
        />
        <motion.div
          className={`absolute ${isAbove ? "-top-8" : "-bottom-8"} w-[3px] bg-white/40`}
          style={{ height: 36, opacity: cardOpacity }}
        />
        <motion.article
          className={`absolute ${isAbove ? "bottom-12" : "top-12"} bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-3.5 xl:p-5 w-[220px] xl:w-[265px] 2xl:w-[285px] shadow-lg`}
          style={{ opacity: cardOpacity, y: cardY, maxWidth: "90vw" }}
          transition={{ duration: 0.4, delay: idx * 0.15 }}
        >
          <h3 className="text-base xl:text-lg font-semibold">{exp.role}</h3>
          <p className="text-xs xl:text-sm text-gray-400 mb-1.5 xl:mb-2">{exp.company} | {exp.duration}</p>
          <p className="text-xs xl:text-sm text-gray-300 break-words leading-relaxed">{exp.description}</p>
        </motion.article>
      </div>
    );
  }

  return (
    <div key={`${exp.company}-${exp.role}-m-${idx}`} className="relative flex items-start w-full">
      <div className="absolute -left-[18px] sm:-left-[22px] top-2 sm:top-2.5 -translate-x-1/2 z-10 flex items-center justify-center">
        <motion.div
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white shadow-[0_0_0_3px_rgba(28,216,210,0.35)] sm:shadow-[0_0_0_4px_rgba(28,216,210,0.25)]"
          style={{ scale: markerScale, opacity: markerOpacity }}
        />
      </div>
      <motion.article
        className="bg-gray-900/90 backdrop-blur-md border border-white/10 rounded-xl p-2.5 sm:p-3.5 w-full shadow-lg hover:border-[#1CD8D2]/40 transition-colors"
        style={{ opacity: cardOpacity, x: cardX }}
        transition={{ duration: 0.4, delay: idx * 0.15 }}
      >
        <div className="flex items-start justify-between gap-1 mb-0.5">
          <h3 className="text-xs sm:text-sm font-bold text-white break-words">{exp.role}</h3>
          <span className="text-[9px] sm:text-[10px] font-mono text-[#1CD8D2] bg-[#1CD8D2]/10 border border-[#1CD8D2]/25 px-1.5 py-0.5 rounded shrink-0">
            {exp.duration}
          </span>
        </div>
        <p className="text-[10px] sm:text-xs text-gray-400 mb-1 font-medium break-words">{exp.company}</p>
        <p className="text-[10px] sm:text-xs text-gray-300 break-words leading-snug line-clamp-3 sm:line-clamp-none">{exp.description}</p>
      </motion.article>
    </div>
  );
}

const Experience = () => {
  const sceneRef = React.useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const SCENE_HEIGHT_VH = isMobile ? 100 * experiences.length * 0.75 : 100 * experiences.length * 0.6;
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end end"] });
  const numExperiences = experiences.length;
  const thresholds = React.useMemo(
    () => Array.from({ length: numExperiences }, (_, i) => (i + 1) / numExperiences),
    [numExperiences]
  );
  const lineWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const lineHeight = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section id="experience" className="relative bg-black text-white">
      <div ref={sceneRef} style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }} className="relative">
        <div className="sticky top-10 h-screen flex flex-col justify-between py-4 sm:py-6">
          <div className="shrink-0 px-4 sm:px-6 sm:-mt-14 sm:p-15">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-center">Experience</h2>
          </div>
          <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-2 sm:py-4 lg:py-8">
            <div className="relative w-full max-w-6xl hidden lg:block -mt-10">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[4px] bg-white/15 rounded">
                <motion.div className="absolute left-0 top-0 h-full bg-white rounded origin-left" style={{ width: lineWidth }} />
              </div>
              <div className="relative flex justify-between items-center w-full">
                {experiences.map((exp, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];
                  return (
                    <ExperienceItem
                      key={`${exp.company}-${exp.role}-${idx}`}
                      exp={exp}
                      idx={idx}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                    />
                  );
                })}
              </div>
            </div>

            <div className="relative w-full max-w-sm sm:max-w-md lg:hidden pl-7 sm:pl-9 pr-1 sm:pr-3">
              <div className="absolute left-2.5 sm:left-3 top-0 bottom-0 w-[2.5px] bg-white/15 rounded -translate-x-1/2">
                <motion.div
                  className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#1CD8D2] via-[#00bf8f] to-white rounded origin-top"
                  style={{ height: lineHeight }}
                />
              </div>
              <div className="relative flex flex-col gap-2 sm:gap-3 mt-1 sm:mt-2 pb-2 sm:pb-4">
                {experiences.map((exp, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];
                  return (
                    <ExperienceItem
                      key={`${exp.company}-${exp.role}-m-${idx}`}
                      exp={exp}
                      idx={idx}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative z-10 shrink-0 max-w-5xl mx-auto w-full pt-1 pb-1">
            <div className="h-px bg-gradient-to-r from-transparent via-[#1CD8D2]/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
