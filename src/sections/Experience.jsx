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
          className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
          style={{ scale: markerScale, opacity: markerOpacity }}
        />
        <motion.div
          className={`absolute ${isAbove ? "-top-8" : "-bottom-8"} w-[3px] bg-white/40`}
          style={{ height: 36, opacity: cardOpacity }}
        />
        <motion.article
          className={`absolute ${isAbove ? "bottom-12" : "top-12"} bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-[260px] xl:w-[285px] shadow-lg`}
          style={{ opacity: cardOpacity, y: cardY, maxWidth: "90vw" }}
          transition={{ duration: 0.4, delay: idx * 0.15 }}
        >
          <h3 className="text-lg font-semibold">{exp.role}</h3>
          <p className="text-sm text-gray-400 mb-2">{exp.company} | {exp.duration}</p>
          <p className="text-sm text-gray-300 break-words leading-relaxed">{exp.description}</p>
        </motion.article>
      </div>
    );
  }

  return (
    <div key={`${exp.company}-${exp.role}-m-${idx}`} className="relative flex items-start w-full">
      <motion.div
        className="absolute -left-[23px] top-3 z-10 w-6 h-6 rounded-full bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.1)]"
        style={{ scale: markerScale, opacity: markerOpacity }}
      />
      <motion.article
        className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-4 sm:p-5 w-full max-w-sm ml-4 shadow-lg"
        style={{ opacity: cardOpacity, x: cardX }}
        transition={{ duration: 0.4, delay: idx * 0.15 }}
      >
        <h3 className="text-base sm:text-lg font-semibold break-words">{exp.role}</h3>
        <p className="text-xs sm:text-sm text-gray-400 mb-2 break-words">{exp.company} | {exp.duration}</p>
        <p className="text-xs sm:text-sm text-gray-300 break-words leading-relaxed">{exp.description}</p>
      </motion.article>
    </div>
  );
}

const Experience = () => {
  const sceneRef = React.useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
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
        <div className="sticky top-0 h-screen flex flex-col justify-between py-6">
          <div className="shrink-0 px-6 pt-4">
            <h2 className="text-4xl sm:text-5xl font-semibold text-center">Experience</h2>
          </div>
          <div className="flex-1 flex items-center justify-center px-6 py-25 pb-6">
            <div className="relative w-full max-w-6xl hidden md:block">
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

            <div className="relative w-full max-w-md md:hidden px-4">
              <div className="absolute left-[26px] top-0 bottom-0 w-[4px] bg-white/15 rounded">
                <motion.div className="absolute top-0 left-0 w-full bg-white rounded origin-top" style={{ height: lineHeight }} />
              </div>
              <div className="relative flex flex-col gap-6 ml-9 mt-4 pb-16">
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
