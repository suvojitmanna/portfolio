import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaGraduationCap,
  FaSchool,
  FaAward,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaStar,
  FaBookOpen,
  FaChevronDown,
  FaCheckCircle,
  FaLightbulb,
} from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";

gsap.registerPlugin(ScrollTrigger);

// Numerical Animated Counter powered by GSAP ScrollTrigger
function AnimatedCounter({ value, decimals = 2, suffix = "" }) {
  const numRef = useRef(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;

    const countObj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(countObj, {
        val: value,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          once: true,
        },
        onUpdate: () => {
          if (el) {
            el.innerText = countObj.val.toFixed(decimals) + suffix;
          }
        },
      });
    });

    return () => ctx.revert();
  }, [value, decimals, suffix]);

  return <span ref={numRef}>0{suffix}</span>;
}

// College Data (Phase 1)
const collegeData = {
  institution: "Meghnad Saha Institute of Technology",
  degree: "B.Tech in Computer Science & Engineering",
  affiliation: "Affiliated with MAKAUT",
  scoreNum: 7.33,
  scoreDecimals: 2,
  scoreLabel: "CGPA",
  scorePercentage: 73.3, // 7.33 / 10
  duration: "2024 - 2028",
  isCurrent: true,
  location: "Kolkata, West Bengal",
  icon: FaGraduationCap,
  category: "Undergraduate Degree",
  description:
    "Affiliated with Maulana Abul Kalam Azad University of Technology (MAKAUT). Developing deep expertise in Data Structures & Algorithms, Object-Oriented Architecture, Full-Stack Engineering, and AI application systems.",
  highlights: [
    "DSA & Algorithms",
    "Full Stack Development",
    "System Architecture",
    "AI & GenAI Apps",
    "Database Systems",
  ],
  modules: [
    "Advanced Data Structures & Algorithms",
    "Object-Oriented Programming (OOP)",
    "Database Management Systems (DBMS)",
    "Operating Systems & Architecture",
    "Discrete Mathematics & Analysis",
  ],
  achievement: "Active 4-Year Engineering Program (2024 - 2028)",
};

// Both Schools Data (Phase 2)
const schoolData = [
  {
    institution: "Amarpur Bimala Agricultural Institution",
    degree: "Higher Secondary Education (WBCHSE)",
    affiliation: "West Bengal Council of Higher Secondary Education",
    scoreNum: 69.5,
    scoreDecimals: 1,
    scoreLabel: "%",
    scorePercentage: 69.5,
    duration: "2022 - 2024",
    isCurrent: false,
    location: "Purba Bardhaman, West Bengal",
    icon: FaSchool,
    category: "Higher Secondary (10+2)",
    description:
      "Completed 10+2 Senior Secondary in the Pure Science stream with intensive study across Mathematics, Physics, Chemistry, and analytical scientific reasoning.",
    highlights: [
      "Pure Science",
      "Advanced Mathematics",
      "Physics Mechanics",
      "Chemical Sciences",
    ],
    modules: [
      "Differential & Integral Calculus",
      "Classical & Modern Physics",
      "Physical & Organic Chemistry",
      "Analytical Problem Solving",
    ],
    achievement: "Completed Senior Secondary in Pure Science Stream",
  },
  {
    institution: "Sonargoria Vivekananda Vidyamandir",
    degree: "Secondary Education (WBBSE)",
    affiliation: "West Bengal Board of Secondary Education",
    scoreNum: 80.28,
    scoreDecimals: 2,
    scoreLabel: "%",
    scorePercentage: 80.28,
    duration: "2016 - 2022",
    isCurrent: false,
    location: "Purba Bardhaman, West Bengal",
    icon: FaAward,
    category: "Secondary School (10th)",
    description:
      "Graduated with Distinction and 80%+ Honors across core STEM disciplines, foundational mathematics, physical science, life sciences, and languages.",
    highlights: [
      "Distinction 80%+",
      "WBBSE Board Honors",
      "Foundational Science",
      "Analytical Mathematics",
    ],
    modules: [
      "Foundational Mathematics & Geometry",
      "Physical Science & Mechanics",
      "Life Sciences & Biology",
      "Bengali & English Languages",
    ],
    achievement: "Secured 80.28% Distinction Honors (1st Division)",
  },
];

// Interactive 3D Card combining GSAP quickTo Physics & Framer Motion Spotlight + Expandable Modules
function EducationCard({ item, index, isFeatured = false }) {
  const cardRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // GSAP quickTo setters for high-performance 120fps magnetic tilt
  const rotXQuickTo = useRef(null);
  const rotYQuickTo = useRef(null);

  // Framer Motion Spring-Smoothed Cursor Spotlight Coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 180, damping: 22 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 180, damping: 22 });

  useEffect(() => {
    if (!cardRef.current) return;
    rotXQuickTo.current = gsap.quickTo(cardRef.current, "rotateX", {
      duration: 0.35,
      ease: "power2.out",
    });
    rotYQuickTo.current = gsap.quickTo(cardRef.current, "rotateY", {
      duration: 0.35,
      ease: "power2.out",
    });
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);

    rotXQuickTo.current?.(-y * 0.03);
    rotYQuickTo.current?.(x * 0.03);
  };

  const handleMouseLeave = () => {
    rotXQuickTo.current?.(0);
    rotYQuickTo.current?.(0);
  };

  const spotlightBg = useMotionTemplate`radial-gradient(550px circle at ${smoothMouseX}px ${smoothMouseY}px, rgba(28, 216, 210, 0.18), transparent 75%)`;
  const IconComponent = item.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformPerspective: 1000 }}
      className={`education-card group relative rounded-2xl p-5 sm:p-7 bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-white/[0.02] backdrop-blur-2xl border border-white/10 shadow-[0_12px_45px_rgba(0,0,0,0.5)] hover:border-[#1CD8D2]/60 hover:shadow-[0_20px_60px_rgba(28,216,210,0.22)] transition-colors duration-500 flex flex-col justify-between overflow-hidden will-change-transform ${
        isFeatured ? "border-[#1CD8D2]/35 shadow-[0_16px_50px_rgba(28,216,210,0.14)]" : ""
      }`}
    >
      {/* Framer Motion Spring-Smoothed Dynamic Cursor Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlightBg }}
      />

      {/* Top Animated Laser Gradient Accent Line */}
      <motion.div
        className="absolute top-0 left-0 h-[2.5px] bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63]"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{
          duration: 1.1,
          delay: 0.15 + index * 0.15,
          ease: "easeOut",
        }}
        viewport={{ once: true }}
      />

      {/* Card Body */}
      <div className="relative z-10">
        {/* Header row: Icon, Category & Status Badge */}
        <div className="flex items-center justify-between flex-wrap gap-2.5 mb-4 sm:mb-5">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.14 }}
              animate={{ y: [0, -3, 0] }}
              transition={{
                y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                rotate: { type: "spring", stiffness: 320, damping: 15 },
              }}
              className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#1CD8D2]/25 via-[#00bf8f]/20 to-[#302b63]/35 border border-[#1CD8D2]/40 text-[#1CD8D2] shadow-[0_0_20px_rgba(28,216,210,0.25)]"
            >
              <IconComponent className="w-5 h-5" />
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-[#1CD8D2] uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10">
                  {isFeatured ? "COLLEGE • 01" : `SCHOOL • 0${index}`}
                </span>
                <span className="text-[11px] text-gray-400 font-medium hidden sm:inline">
                  • {item.affiliation}
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-1 font-medium">
                {item.category}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {item.isCurrent ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/35 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Active Program
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/5 text-gray-300 border border-white/10">
                <FaCheckCircle className="w-3 h-3 text-[#00bf8f]" />
                Graduated
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-200 bg-white/5 border border-white/10 rounded-full px-3 py-1 backdrop-blur-md">
              <FaCalendarAlt className="w-3 h-3 text-[#1CD8D2]" />
              {item.duration}
            </span>
          </div>
        </div>

        {/* Institution Title */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-[#1CD8D2] transition-colors duration-300">
          {item.institution}
        </h3>

        {/* Degree & Score Highlight Badge with GSAP CountUp */}
        <div className="mt-2.5 flex items-center flex-wrap gap-2.5">
          <span className="text-xs sm:text-sm font-medium text-gray-200">
            {item.degree}
          </span>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-[#1CD8D2]/20 via-[#00bf8f]/15 to-[#302b63]/30 text-[#1CD8D2] border border-[#1CD8D2]/45 shadow-[0_0_18px_rgba(28,216,210,0.18)]"
          >
            <FaStar className="w-3 h-3 text-[#00bf8f]" />
            <span>
              <AnimatedCounter
                value={item.scoreNum}
                decimals={item.scoreDecimals}
                suffix={item.scoreLabel === "%" ? "%" : ` ${item.scoreLabel}`}
              />
            </span>
          </motion.div>
        </div>

        {/* Visual Animated Score Progress Gauge */}
        <div className="mt-3.5">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <FaLightbulb className="w-2.5 h-2.5 text-[#00bf8f]" />
              Academic Performance Index
            </span>
            <span className="font-semibold text-gray-300 text-[11px]">
              {item.scorePercentage}% Scale
            </span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1.5 p-0.5 overflow-hidden border border-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] shadow-[0_0_10px_rgba(28,216,210,0.7)]"
              initial={{ width: 0 }}
              whileInView={{ width: `${item.scorePercentage}%` }}
              transition={{
                duration: 1.3,
                delay: 0.2 + index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
            />
          </div>
        </div>

        {/* Narrative Description */}
        <p className="mt-3 text-xs sm:text-sm text-gray-300/90 leading-relaxed font-light">
          {item.description}
        </p>

        {/* Skill / Focus Area Tags with Framer Motion spring interactions */}
        {item.highlights && (
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {item.highlights.map((tag, tIdx) => (
              <motion.span
                key={tIdx}
                whileHover={{
                  scale: 1.06,
                  y: -2,
                  backgroundColor: "rgba(28, 216, 210, 0.14)",
                  borderColor: "rgba(28, 216, 210, 0.5)",
                }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
                className="text-[11px] sm:text-xs px-2.5 py-0.5 rounded-lg bg-white/[0.04] text-gray-300 border border-white/10 group-hover:text-white transition-all duration-300 cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        )}

        {/* Interactive Expandable Coursework Accordion */}
        {item.modules && (
          <div className="mt-3.5">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1CD8D2] hover:text-[#00bf8f] transition-colors duration-200 cursor-pointer focus:outline-none"
              aria-expanded={isExpanded}
            >
              <span>{isExpanded ? "Hide Coursework Details" : "Explore Core Coursework"}</span>
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <FaChevronDown className="w-2.5 h-2.5" />
              </motion.span>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden mt-2.5 pt-2.5 border-t border-white/10"
                >
                  <p className="text-[11px] text-gray-400 font-medium mb-2">
                    Key Modules & Fundamental Focus Areas:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {item.modules.map((mod, mIdx) => (
                      <motion.div
                        key={mIdx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: mIdx * 0.04 }}
                        className="flex items-center gap-2 text-[11px] text-gray-300 bg-white/[0.03] p-1.5 rounded-lg border border-white/5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1CD8D2] shrink-0" />
                        <span className="truncate">{mod}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Footer / Location & Status Details */}
      <div className="relative z-10 flex items-center justify-between flex-wrap gap-2 mt-4 pt-3 border-t border-white/10">
        <div className="flex items-center gap-1.5">
          <FaMapMarkerAlt className="w-3 h-3 text-[#00bf8f] shrink-0" />
          <span className="text-[11px] sm:text-xs text-gray-400">
            {item.location}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-mono">
          <FaBookOpen className="w-3 h-3 text-[#1CD8D2]" />
          <span className="truncate max-w-[220px]">{item.achievement}</span>
        </div>
      </div>

      {/* Ambient background glow orb */}
      <div className="absolute -bottom-16 -right-16 w-36 h-36 rounded-full bg-[#1CD8D2]/10 blur-3xl group-hover:bg-[#1CD8D2]/25 transition-all duration-500 pointer-events-none" />
    </div>
  );
}

export default function Education() {
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activePhase, setActivePhase] = useState(1); // 1: College, 2: Both Schools

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Pinned scene height matching Experience.jsx scroll mechanism
  const SCENE_HEIGHT_VH = isMobile ? 240 : 210;

  // Scroll Progress across the pinned section
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  // Track active phase for interactive buttons & accessibility
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.48) {
      if (activePhase !== 1) setActivePhase(1);
    } else {
      if (activePhase !== 2) setActivePhase(2);
    }
  });

  // Scroll-driven laser line width
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Phase 1 (College) transforms: Visible from 0 to ~0.45, then fades out as schools arrive
  const collegeOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.42, 0.5],
    [1, 1, 1, 0]
  );
  const collegeY = useTransform(
    scrollYProgress,
    [0, 0.05, 0.42, 0.5],
    [0, 0, 0, -35]
  );
  const collegeScale = useTransform(
    scrollYProgress,
    [0, 0.05, 0.42, 0.5],
    [1, 1, 1, 0.94]
  );

  // Phase 2 (Both Schools) transforms: Fades in from ~0.48 to 1.0
  const schoolsOpacity = useTransform(
    scrollYProgress,
    [0.46, 0.54, 0.95, 1],
    [0, 1, 1, 1]
  );
  const schoolsY = useTransform(
    scrollYProgress,
    [0.46, 0.54, 0.95, 1],
    [35, 0, 0, 0]
  );
  const schoolsScale = useTransform(
    scrollYProgress,
    [0.46, 0.54, 0.95, 1],
    [0.94, 1, 1, 1]
  );

  // Click handler to jump to a specific milestone phase
  const scrollToPhase = (phase) => {
    if (!sceneRef.current) return;
    const rect = sceneRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const sceneTop = rect.top + scrollTop;
    const sceneHeight = rect.height - window.innerHeight;
    const targetScroll = sceneTop + (phase === 1 ? 0.08 : 0.8) * sceneHeight;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <section id="education" className="relative bg-black text-white">
      {/* Scrollable scene wrapper creating scroll runway for the sticky frame */}
      <div
        ref={sceneRef}
        style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "150vh" }}
        className="relative"
      >
        {/* Sticky viewport container */}
        <div className="sticky top-0 h-screen flex flex-col justify-between overflow-hidden px-4 sm:px-6 md:px-10 lg:px-12 py-6 sm:py-8">
          {/* Ambient Parallax Blobs & Cybernetic Grid */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1CD8D2] opacity-20 blur-[130px]" />
            <div className="absolute -bottom-40 -right-32 w-[450px] h-[450px] rounded-full bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] opacity-15 blur-[140px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-[#00bf8f]/10 blur-[130px]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />
          </div>

          {/* Section Header */}
          <div className="relative z-10 shrink-0 text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#1CD8D2] font-semibold mb-2 px-3 py-1 rounded-full bg-[#1CD8D2]/10 border border-[#1CD8D2]/25 shadow-[0_0_15px_rgba(28,216,210,0.15)]"
            >
              <IoSparkles className="w-3.5 h-3.5 text-[#00bf8f]" />
              <span>Academic Progression</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63]">
              Education & Milestones
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-1 max-w-xl mx-auto font-light">
              Scroll down to navigate through the timeline: first College, followed by both foundational schools.
            </p>
          </div>

          {/* Interactive Scroll-Driven Timeline Progress Bar (Like Experience) */}
          <div className="relative z-10 w-full max-w-4xl mx-auto my-3 shrink-0">
            <div className="flex items-center justify-between mb-2 text-xs font-semibold gap-2">
              {/* Step 1 Button: College */}
              <button
                onClick={() => scrollToPhase(1)}
                className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all duration-300 cursor-pointer ${
                  activePhase === 1
                    ? "bg-[#1CD8D2]/20 text-[#1CD8D2] border border-[#1CD8D2]/45 shadow-[0_0_15px_rgba(28,216,210,0.25)]"
                    : "text-gray-400 hover:text-white bg-white/5 border border-white/5"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    activePhase === 1 ? "bg-[#1CD8D2] animate-pulse" : "bg-gray-500"
                  }`}
                />
                <span className="text-[11px] sm:text-xs font-mono">
                  01 • College (B.Tech CSE)
                </span>
              </button>

              {/* Step 2 Button: Both Schools */}
              <button
                onClick={() => scrollToPhase(2)}
                className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all duration-300 cursor-pointer ${
                  activePhase === 2
                    ? "bg-[#00bf8f]/20 text-[#00bf8f] border border-[#00bf8f]/45 shadow-[0_0_15px_rgba(0,191,143,0.25)]"
                    : "text-gray-400 hover:text-white bg-white/5 border border-white/5"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    activePhase === 2 ? "bg-[#00bf8f] animate-pulse" : "bg-gray-500"
                  }`}
                />
                <span className="text-[11px] sm:text-xs font-mono">
                  02 • Both Schools (HS & Secondary)
                </span>
              </button>
            </div>

            {/* Glowing Laser Progress Track Line */}
            <div className="relative h-[5px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] shadow-[0_0_12px_#1CD8D2] origin-left"
                style={{ width: lineWidth }}
              />
            </div>
          </div>

          {/* Dynamic Scroll Stages Content Container */}
          <div className="relative z-10 flex-1 flex items-center justify-center w-full max-w-6xl mx-auto my-auto min-h-0">
            {/* FIRST STAGE: College (Meghnad Saha Institute of Technology) */}
            <motion.div
              style={{
                opacity: collegeOpacity,
                y: collegeY,
                scale: collegeScale,
                pointerEvents: activePhase === 1 ? "auto" : "none",
              }}
              className="absolute inset-0 flex flex-col items-center justify-center w-full"
            >
              <div className="w-full max-w-3xl max-h-[66vh] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#1CD8D2]/30 [&::-webkit-scrollbar-track]:bg-transparent">
                <EducationCard item={collegeData} index={0} isFeatured={true} />
              </div>

              {/* Scroll down prompt */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="mt-3 flex items-center justify-center gap-2 text-xs text-[#1CD8D2] font-medium"
              >
                <span>Scroll down to reveal High School & Secondary (Both Schools)</span>
                <span className="text-sm">↓</span>
              </motion.div>
            </motion.div>

            {/* SECOND STAGE: Both Schools (Amarpur Bimala & Sonargoria Vivekananda) */}
            <motion.div
              style={{
                opacity: schoolsOpacity,
                y: schoolsY,
                scale: schoolsScale,
                pointerEvents: activePhase === 2 ? "auto" : "none",
              }}
              className="absolute inset-0 flex flex-col items-center justify-center w-full"
            >
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-h-[66vh] overflow-y-auto p-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#00bf8f]/30 [&::-webkit-scrollbar-track]:bg-transparent">
                {schoolData.map((item, idx) => (
                  <EducationCard key={idx} item={item} index={idx + 1} />
                ))}
              </div>

              {/* Completion badge */}
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
                <FaCheckCircle className="w-3.5 h-3.5 text-[#00bf8f]" />
                <span>Foundational Schooling: Higher Secondary (10+2) & Secondary (10th)</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom subtle divider line */}
          <div className="relative z-10 shrink-0 max-w-6xl mx-auto w-full pt-2">
            <div className="h-px bg-gradient-to-r from-transparent via-[#1CD8D2]/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
