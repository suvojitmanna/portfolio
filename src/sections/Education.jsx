import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
  useMotionValueEvent,
} from "framer-motion";
import {
  FaGraduationCap,
  FaSchool,
  FaAward,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";

const collegeData = {
  institution: "Meghnad Saha Institute of Technology",
  degree: "B.Tech in Computer Science & Engineering",
  affiliation: "Affiliated with MAKAUT",
  score: "7.33 CGPA",
  duration: "2024 - 2028",
  isCurrent: true,
  location: "Kolkata, West Bengal",
  icon: FaGraduationCap,
  category: "Undergraduate Degree",
  description:
    "Developing deep expertise in Data Structures, Algorithms, Object-Oriented Architecture, Full-Stack Development, and AI Applications.",
  highlights: [
    "DSA & Algorithms",
    "Full Stack Development",
    "System Architecture",
    "AI & GenAI Apps",
    "Database Systems",
  ],
};

const schoolData = [
  {
    institution: "Amarpur Bimala Agricultural Institution",
    degree: "Higher Secondary (10+2)",
    affiliation: "WBCHSE Council",
    score: "69.5%",
    duration: "2022 - 2024",
    isCurrent: false,
    location: "Purba Bardhaman, WB",
    icon: FaSchool,
    category: "Senior Secondary (Pure Science)",
    description:
      "Completed 10+2 in the Pure Science stream with intensive study across Advanced Mathematics, Classical Physics, and Chemical Sciences.",
    highlights: [
      "Pure Science",
      "Advanced Mathematics",
      "Physics Mechanics",
      "Chemical Sciences",
    ],
  },
  {
    institution: "Sonargoria Vivekananda Vidyamandir",
    degree: "Secondary Education (10th)",
    affiliation: "WBBSE Board",
    score: "80.28% Distinction",
    duration: "2016 - 2022",
    isCurrent: false,
    location: "Purba Bardhaman, WB",
    icon: FaAward,
    category: "Secondary School (10th Board)",
    description:
      "Graduated with 80%+ Distinction First Division across foundational mathematics, physical science, life sciences, and languages.",
    highlights: [
      "Distinction 80%+",
      "WBBSE Honors",
      "Foundational Science",
      "Mathematics",
    ],
  },
];

function EducationCard({ item, isFeatured = false }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlightBg = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(28, 216, 210, 0.14), transparent 80%)`;
  const IconComponent = item.icon;

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
      onMouseMove={handleMouseMove}
      className={`relative rounded-2xl p-5 sm:p-6 bg-gray-900/85 backdrop-blur-xl border flex flex-col justify-between overflow-hidden group transition-all duration-300 ${
        isFeatured
          ? "border-[#1CD8D2]/45 shadow-[0_12px_40px_rgba(28,216,210,0.14)]"
          : "border-gray-800 hover:border-gray-700 shadow-xl"
      }`}
    >
      {/* Modern Cursor Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlightBg }}
      />

      {/* Top Laser Accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-transparent opacity-80" />

      {/* Card Content Top */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#1CD8D2] group-hover:scale-105 group-hover:bg-[#1CD8D2]/10 transition-all duration-300">
              <IconComponent className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#1CD8D2] font-semibold">
                {item.category}
              </span>
              <p className="text-[11px] text-gray-400 font-medium">{item.duration}</p>
            </div>
          </div>

          {item.isCurrent ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Active
            </span>
          ) : (
            <span className="inline-flex items-center text-[10px] font-medium text-gray-400 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
              Completed
            </span>
          )}
        </div>

        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-[#1CD8D2] transition-colors leading-snug">
          {item.degree}
        </h3>
        <p className="text-xs sm:text-sm font-semibold text-gray-300 mt-1">{item.institution}</p>
        <p className="text-[11px] text-gray-500 mb-2.5">{item.affiliation}</p>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-[#1CD8D2] mb-3">
          <FaStar className="w-3 h-3 text-[#00bf8f]" />
          <span className="font-bold">{item.score}</span>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-3">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-white/5">
          {item.highlights.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-300 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-gray-400 pt-2.5 mt-3 border-t border-white/10">
        <span className="flex items-center gap-1">
          <FaCalendarAlt className="w-2.5 h-2.5 text-[#1CD8D2]" />
          {item.duration}
        </span>
        <span className="flex items-center gap-1">
          <FaMapMarkerAlt className="w-2.5 h-2.5 text-[#00bf8f]" />
          {item.location}
        </span>
      </div>
    </motion.div>
  );
}

export default function Education() {
  const sceneRef = useRef(null);
  const [activeStage, setActiveStage] = useState(1);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.48) {
      if (activeStage !== 1) setActiveStage(1);
    } else {
      if (activeStage !== 2) setActiveStage(2);
    }
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Horizontal scroll: Stage 1 (College) slides to the left
  const collegeX = useTransform(scrollYProgress, [0.35, 0.55], ["0%", "-115%"]);
  const collegeOpacity = useTransform(scrollYProgress, [0.35, 0.52], [1, 0]);
  const collegeScale = useTransform(scrollYProgress, [0.35, 0.55], [1, 0.92]);

  // Horizontal scroll: Stage 2 (Both Schools) slides in from the right
  const schoolsX = useTransform(scrollYProgress, [0.45, 0.65], ["115%", "0%"]);
  const schoolsOpacity = useTransform(scrollYProgress, [0.45, 0.62], [0, 1]);
  const schoolsScale = useTransform(scrollYProgress, [0.45, 0.65], [0.92, 1]);

  const scrollToStage = (stage) => {
    if (!sceneRef.current) return;
    const rect = sceneRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const sceneTop = rect.top + scrollTop;
    const sceneHeight = rect.height - window.innerHeight;
    const target = sceneTop + (stage === 1 ? 0.08 : 0.85) * sceneHeight;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section id="education" className="relative bg-black text-white">
      {/* Scroll Runway */}
      <div
        ref={sceneRef}
        style={{ height: "240vh", minHeight: "140vh" }}
        className="relative"
      >
        {/* Pinned Sticky Frame */}
        <div className="sticky top-0 h-screen flex flex-col justify-between overflow-hidden px-4 sm:px-6 md:px-10 py-6 sm:py-8">
          {/* Ambient Lighting Orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1CD8D2] opacity-15 blur-[140px]" />
            <div className="absolute bottom-1/4 -right-20 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] opacity-15 blur-[140px]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
          </div>

          {/* Section Header */}
          <div className="relative z-10 shrink-0 text-center max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#1CD8D2] font-semibold mb-2 px-3.5 py-1 rounded-full bg-[#1CD8D2]/10 border border-[#1CD8D2]/25 shadow-[0_0_12px_rgba(28,216,210,0.15)]"
            >
              <IoSparkles className="w-3.5 h-3.5 text-[#00bf8f]" />
              <span>Academic Progression</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63]">
              Education
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1.5 font-light">
              Scroll down to navigate through the horizontal timeline: College first, then both foundational schools.
            </p>
          </div>

          {/* Horizontal Step Navigation & Laser Track */}
          <div className="relative z-10 w-full max-w-xl mx-auto my-2 shrink-0">
            <div className="flex items-center justify-center gap-3 mb-2.5">
              <button
                onClick={() => scrollToStage(1)}
                className={`flex items-center gap-2 px-3.5 py-1 rounded-full transition-all duration-300 text-xs font-mono cursor-pointer ${
                  activeStage === 1
                    ? "bg-[#1CD8D2]/20 text-[#1CD8D2] border border-[#1CD8D2]/50 shadow-[0_0_15px_rgba(28,216,210,0.25)]"
                    : "text-gray-400 hover:text-white bg-white/5 border border-white/5"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${activeStage === 1 ? "bg-[#1CD8D2] animate-pulse" : "bg-gray-500"}`} />
                <span>01 • College</span>
              </button>

              <button
                onClick={() => scrollToStage(2)}
                className={`flex items-center gap-2 px-3.5 py-1 rounded-full transition-all duration-300 text-xs font-mono cursor-pointer ${
                  activeStage === 2
                    ? "bg-[#00bf8f]/20 text-[#00bf8f] border border-[#00bf8f]/50 shadow-[0_0_15px_rgba(0,191,143,0.25)]"
                    : "text-gray-400 hover:text-white bg-white/5 border border-white/5"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${activeStage === 2 ? "bg-[#00bf8f] animate-pulse" : "bg-gray-500"}`} />
                <span>02 • Both Schools (10+2 & 10th)</span>
              </button>
            </div>

            {/* Laser Line */}
            <div className="relative h-[3px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] shadow-[0_0_10px_#1CD8D2] origin-left"
                style={{ width: lineWidth }}
              />
            </div>
          </div>

          {/* Horizontal Scroll Stages Center Stage */}
          <div className="relative z-10 flex-1 flex items-center justify-center w-full max-w-5xl mx-auto my-auto min-h-0">
            {/* FIRST STAGE: College Card */}
            <motion.div
              style={{
                x: collegeX,
                opacity: collegeOpacity,
                scale: collegeScale,
                pointerEvents: activeStage === 1 ? "auto" : "none",
              }}
              className="absolute inset-0 flex flex-col items-center justify-center w-full px-2"
            >
              <div className="w-full max-w-2xl">
                <EducationCard item={collegeData} isFeatured={true} />
              </div>

              {/* Scroll prompt */}
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-[#1CD8D2] font-medium">
                <span>Scroll down to slide to Both Schools</span>
                <span className="text-sm">&rarr;</span>
              </div>
            </motion.div>

            {/* SECOND STAGE: Both Schools Side-by-Side */}
            <motion.div
              style={{
                x: schoolsX,
                opacity: schoolsOpacity,
                scale: schoolsScale,
                pointerEvents: activeStage === 2 ? "auto" : "none",
              }}
              className="absolute inset-0 flex flex-col items-center justify-center w-full px-2"
            >
              <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {schoolData.map((item, idx) => (
                  <EducationCard key={idx} item={item} isFeatured={false} />
                ))}
              </div>

              {/* Completion badge */}
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-[#00bf8f] font-medium">
                <IoSparkles className="w-3.5 h-3.5" />
                <span>Foundational Schooling: Higher Secondary (10+2) & Secondary (10th)</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom Divider */}
          <div className="relative z-10 shrink-0 max-w-5xl mx-auto w-full pt-2">
            <div className="h-px bg-gradient-to-r from-transparent via-[#1CD8D2]/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
