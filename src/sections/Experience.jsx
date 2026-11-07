import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experiences = [
  {
    role: "Full Stack Web Developer",
    company: "Personal & Academic Projects",
    duration: "2024 - Present",
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
      <div className="absolute -left-5 sm:-left-6 top-2.5 sm:top-3 -translate-x-1/2 z-10 flex items-center justify-center">
        <motion.div
          className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.15)] sm:shadow-[0_0_0_6px_rgba(255,255,255,0.1)]"
          style={{ scale: markerScale, opacity: markerOpacity }}
        />
      </div>
      <motion.article
        className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-3 sm:p-4 lg:p-5 w-full max-w-sm sm:max-w-md shadow-lg"
        style={{ opacity: cardOpacity, x: cardX }}
        transition={{ duration: 0.4, delay: idx * 0.15 }}
      >
        <h3 className="text-sm sm:text-base font-semibold break-words">{exp.role}</h3>
        <p className="text-[11px] sm:text-xs text-gray-400 mb-1 sm:mb-2 break-words">{exp.company} | {exp.duration}</p>
        <p className="text-[11px] sm:text-xs text-gray-300 break-words leading-snug sm:leading-relaxed">{exp.description}</p>
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

  const SCENE_HEIGHT_VH = isMobile ? 100 * experiences.length * 0.8 : 100 * experiences.length * 0.6;
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
        <div className="sticky top-0 h-screen flex flex-col justify-between py-4 sm:py-6">
          <div className="shrink-0 px-4 sm:px-6 pt-2 sm:pt-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-center">Experience</h2>
          </div>
          <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-2 sm:py-4 lg:py-8">
            <div className="relative w-full max-w-6xl hidden lg:block">
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

            <div className="relative w-full max-w-md lg:hidden pl-8 sm:pl-10 pr-2 sm:pr-4">
              <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-[3px] bg-white/15 rounded -translate-x-1/2">
                <motion.div className="absolute top-0 left-0 w-full bg-white rounded origin-top" style={{ height: lineHeight }} />
              </div>
              <div className="relative flex flex-col gap-2.5 sm:gap-4 mt-2 sm:mt-4 pb-4 sm:pb-8">
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
        </div>
      </div>
    </section>
  );
};

export default Experience;
