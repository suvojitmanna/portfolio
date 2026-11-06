import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaCalendarAlt, FaCode, FaAward } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { RiRobot2Line } from "react-icons/ri";
import { TbNetwork } from "react-icons/tb";

const experiences = [
  {
    role: "Full Stack Web Developer",
    company: "Personal & Academic Projects",
    duration: "2024 - Present",
    type: "Full Stack Engineering",
    icon: FaCode,
    description:
      "Built full-stack web applications using React, Node.js, Express, MongoDB, and REST APIs, with role-based authentication, real-time messaging, file uploads, and responsive UI.",
    skills: ["React", "Node.js", "Express", "MongoDB", "REST APIs", "Tailwind CSS"],
  },
  {
    role: "AI Application Developer",
    company: "AI & GenAI Projects",
    duration: "2026 - Present",
    type: "GenAI & RAG Systems",
    icon: RiRobot2Line,
    description:
      "Developed AI-powered solutions using Gemini and local LLM architectures, including conversational chatbots, automated resume parsing, voice assistants, and RAG pipelines.",
    skills: ["Gemini API", "GenAI", "RAG Systems", "Prompt Eng", "AI Chatbots"],
  },
  {
    role: "Real-Time Application Developer",
    company: "WebRTC & Socket.IO Projects",
    duration: "2026 - Present",
    type: "Real-Time Architectures",
    icon: TbNetwork,
    description:
      "Engineered low-latency real-time applications with Socket.IO and WebRTC, powering live classrooms, video streaming, instant group messaging, and live user presence tracking.",
    skills: ["Socket.IO", "WebRTC", "Video Calling", "WebSockets", "Presence"],
  },
  {
    role: "Hackathon Developer",
    company: "Smart India Hackathon",
    duration: "2026",
    type: "National Level Innovation",
    icon: FaAward,
    description:
      "Architected an AI-enabled smart education platform identifying student competency gaps, delivering personalized curriculum paths, and generating dynamic quizzes.",
    skills: ["SIH 2026", "EdTech Solution", "AI Recommendation", "System Design"],
  },
];

function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
  const markerScale = useTransform(scrollYProgress, [start, end], [0.65, 1.1]);
  const markerOpacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
  const cardOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const cardScale = useTransform(scrollYProgress, [start, end], [0.92, 1]);

  const isAbove = idx % 2 === 0;
  const cardY = useTransform(scrollYProgress, [start, end], [isAbove ? 25 : -25, 0]);
  const cardX = useTransform(scrollYProgress, [start, end], [-25, 0]);

  const IconComponent = exp.icon;

  if (layout === "desktop") {
    return (
      <div
        className="relative flex-1 flex justify-center items-center min-w-0"
        key={`${exp.company}-${exp.role}-${idx}`}
      >
        {/* Milestone Beacon Node on Timeline Line */}
        <motion.div
          className="z-20 w-8 h-8 rounded-full bg-black/90 border-2 border-[#1CD8D2] flex items-center justify-center text-[#1CD8D2] shadow-[0_0_16px_rgba(28,216,210,0.5)] transition-shadow duration-300"
          style={{ scale: markerScale, opacity: markerOpacity }}
        >
          <IconComponent className="w-3.5 h-3.5" />
        </motion.div>

        {/* Vertical Connector Line from Beacon to Card */}
        <motion.div
          className={`absolute ${isAbove ? "-top-7" : "-bottom-7"} w-[2px] bg-gradient-to-b from-[#1CD8D2] to-[#00bf8f] shadow-[0_0_8px_#1CD8D2]`}
          style={{ height: 28, opacity: cardOpacity }}
        />

        {/* Card */}
        <motion.article
          className={`absolute ${
            isAbove ? "bottom-11" : "top-11"
          } bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-white/[0.02] backdrop-blur-2xl border border-white/10 hover:border-[#1CD8D2]/50 hover:shadow-[0_15px_45px_rgba(28,216,210,0.18)] rounded-2xl p-4 sm:p-5 w-[255px] xl:w-[290px] shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden group`}
          style={{
            opacity: cardOpacity,
            y: cardY,
            scale: cardScale,
            maxWidth: "92vw",
          }}
        >
          {/* Top Laser Accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63]" />

          {/* Header: Tag & Duration */}
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#1CD8D2] uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10">
              0{idx + 1} • {exp.type}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] text-gray-300 bg-white/5 border border-white/10 rounded-full px-2 py-0.5">
              <FaCalendarAlt className="w-2.5 h-2.5 text-[#1CD8D2]" />
              {exp.duration}
            </span>
          </div>

          {/* Role Title */}
          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#1CD8D2] transition-colors leading-snug">
            {exp.role}
          </h3>

          {/* Company / Project Context */}
          <p className="text-xs font-semibold text-[#00bf8f] mt-0.5 mb-2">
            {exp.company}
          </p>

          {/* Description */}
          <p className="text-xs text-gray-300/90 leading-relaxed font-light line-clamp-3">
            {exp.description}
          </p>

          {/* Skill Pills */}
          {exp.skills && (
            <div className="flex flex-wrap gap-1 mt-3 pt-2.5 border-t border-white/10">
              {exp.skills.slice(0, 4).map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-gray-300 border border-white/10 group-hover:border-[#1CD8D2]/30 transition-colors"
                >
                  {skill}
                </span>
              ))}
              {exp.skills.length > 4 && (
                <span className="text-[10px] px-1.5 py-0.5 text-gray-400 font-mono">
                  +{exp.skills.length - 4}
                </span>
              )}
            </div>
          )}
        </motion.article>
      </div>
    );
  }

  // Mobile Layout
  return (
    <div
      key={`${exp.company}-${exp.role}-m-${idx}`}
      className="relative flex items-start"
    >
      {/* Mobile Beacon Node */}
      <motion.div
        className="absolute -left-[14px] top-4 z-20 w-7 h-7 rounded-full bg-black/90 border-2 border-[#1CD8D2] flex items-center justify-center text-[#1CD8D2] shadow-[0_0_12px_rgba(28,216,210,0.5)]"
        style={{ scale: markerScale, opacity: markerOpacity }}
      >
        <IconComponent className="w-3 h-3" />
      </motion.div>

      {/* Mobile Card */}
      <motion.article
        className="bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-white/[0.02] backdrop-blur-2xl border border-white/10 hover:border-[#1CD8D2]/50 rounded-2xl p-4 sm:p-5 w-[85vw] max-w-sm ml-6 shadow-[0_12px_40px_rgba(0,0,0,0.5)] overflow-hidden relative"
        style={{ opacity: cardOpacity, x: cardX, scale: cardScale }}
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63]" />

        <div className="flex items-center justify-between gap-1 mb-2">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#1CD8D2] uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10">
            0{idx + 1} • {exp.type}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] text-gray-300 bg-white/5 border border-white/10 rounded-full px-2 py-0.5">
            <FaCalendarAlt className="w-2.5 h-2.5 text-[#1CD8D2]" />
            {exp.duration}
          </span>
        </div>

        <h3 className="text-base font-bold text-white leading-snug">
          {exp.role}
        </h3>
        <p className="text-xs font-semibold text-[#00bf8f] mt-0.5 mb-2">
          {exp.company}
        </p>
        <p className="text-xs text-gray-300/90 leading-relaxed font-light">
          {exp.description}
        </p>

        {exp.skills && (
          <div className="flex flex-wrap gap-1 mt-3 pt-2.5 border-t border-white/10">
            {exp.skills.map((skill, sIdx) => (
              <span
                key={sIdx}
                className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-gray-300 border border-white/10"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </motion.article>
    </div>
  );
}

export default function Experience() {
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Optimized scene height for responsive smooth scroll without lagging
  const SCENE_HEIGHT_VH = isMobile ? 260 : 220;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const numExperiences = experiences.length;
  const thresholds = useMemo(
    () => Array.from({ length: numExperiences }, (_, i) => (i + 1) / numExperiences),
    [numExperiences]
  );

  const lineWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const lineHeight = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section id="experience" className="relative bg-black text-white overflow-hidden">
      {/* Background Animated Gradient Blobs & Ambient Lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1CD8D2] opacity-15 blur-[130px]" />
        <div className="absolute -bottom-40 -right-32 w-[450px] h-[450px] rounded-full bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] opacity-15 blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      <div
        ref={sceneRef}
        style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "140vh" }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col justify-between py-6 sm:py-8 overflow-hidden">
          {/* Header */}
          <div className="shrink-0 px-6 text-center max-w-3xl mx-auto z-10">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#1CD8D2] font-semibold mb-2 px-3 py-0.5 rounded-full bg-[#1CD8D2]/10 border border-[#1CD8D2]/25 shadow-[0_0_12px_rgba(28,216,210,0.15)]"
            >
              <IoSparkles className="w-3.5 h-3.5 text-[#00bf8f]" />
              <span>Professional Journey & Milestones</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63]">
              Work Experience
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl mx-auto font-light">
              Scroll down to traverse through my full-stack web, AI engineering, real-time architectures, and hackathon milestones.
            </p>
          </div>

          {/* Interactive Timeline Center Stage */}
          <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 pb-8 z-10">
            
            {/* Desktop Horizontal Laser Timeline */}
            <div className="relative w-full max-w-7xl hidden lg:block">
              {/* Timeline Track & Active Laser Beam */}
              <div className="relative h-[4px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] shadow-[0_0_15px_#1CD8D2] rounded-full origin-left"
                  style={{ width: lineWidth }}
                />
              </div>

              {/* 4 Alternating Desktop Experience Items */}
              <div className="relative flex justify-between mt-0">
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

            {/* Mobile Vertical Laser Timeline */}
            <div className="relative w-full max-w-md lg:hidden max-h-[70vh] overflow-y-auto pr-1">
              {/* Vertical Laser Track */}
              <div className="absolute left-[3px] top-0 bottom-0 w-[3px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#1CD8D2] via-[#00bf8f] to-[#302b63] shadow-[0_0_12px_#1CD8D2] rounded-full origin-top"
                  style={{ height: lineHeight }}
                />
              </div>

              {/* Mobile Experience Items Stack */}
              <div className="relative flex flex-col gap-8 ml-2 py-4">
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

          {/* Bottom Divider */}
          <div className="relative z-10 max-w-6xl mx-auto w-full px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-[#1CD8D2]/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
