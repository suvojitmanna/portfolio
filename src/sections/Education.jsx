import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
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
    "Developing deep expertise in Data Structures & Algorithms, Object-Oriented Architecture, Full-Stack Development, and AI Applications with extensive practical project work.",
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
      "Completed 10+2 Senior Secondary in the Pure Science stream with intensive study across Advanced Mathematics, Classical Physics, and Chemical Sciences.",
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
      "Analytical Math",
    ],
  },
];

function EducationCard({ item, isFeatured = false }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { stiffness: 220, damping: 25 });
  const smoothTiltY = useSpring(tiltY, { stiffness: 220, damping: 25 });
  const rotateX = useTransform(smoothTiltY, [-180, 180], [5, -5]);
  const rotateY = useTransform(smoothTiltX, [-180, 180], [-5, 5]);

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);

    tiltX.set(x - rect.width / 2);
    tiltY.set(y - rect.height / 2);
  }

  function handleMouseLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

  const spotlightBg = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(28, 216, 210, 0.16), transparent 75%)`;
  const IconComponent = item.icon;

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-white/[0.02] backdrop-blur-2xl border flex flex-col justify-between overflow-hidden group transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.5)] ${isFeatured
        ? "border-[#1CD8D2]/45 hover:border-[#1CD8D2]/70 shadow-[0_15px_45px_rgba(28,216,210,0.16)] min-h-[380px] sm:min-h-[420px]"
        : "border-white/10 hover:border-[#1CD8D2]/50 hover:shadow-[0_15px_40px_rgba(28,216,210,0.12)] min-h-[350px] sm:min-h-[420px]"
        }`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl sm:rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlightBg }}
      />

      <div className="absolute top-0 left-0 right-0 h-[2px] sm:h-[2.5px] bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-transparent opacity-90" />
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2.5 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1CD8D2]/20 via-[#00bf8f]/15 to-[#302b63]/30 border border-[#1CD8D2]/35 flex items-center justify-center text-[#1CD8D2] shadow-[0_0_15px_rgba(28,216,210,0.25)] shrink-0">
              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#1CD8D2] font-bold">
                {item.category}
              </span>
              <p className="text-[11px] sm:text-xs text-gray-400 font-medium">{item.duration}</p>
            </div>
          </div>

          {item.isCurrent ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/35 shadow-[0_0_12px_rgba(16,185,129,0.25)] shrink-0">
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500" />
              </span>
              Active Program
            </span>
          ) : (
            <span className="inline-flex items-center text-[10px] sm:text-[11px] font-medium text-gray-300 px-2.5 py-0.5 sm:py-1 rounded-full bg-white/5 border border-white/10 shrink-0">
              Graduated
            </span>
          )}
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white group-hover:text-[#1CD8D2] transition-colors leading-snug mb-1">
          {item.degree}
        </h3>
        <p className="text-xs sm:text-sm font-semibold text-gray-200">
          {item.institution}
        </p>
        <p className="text-[11px] sm:text-xs text-gray-400 mb-2.5">{item.affiliation}</p>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#1CD8D2]/15 via-[#00bf8f]/10 to-[#302b63]/20 border border-[#1CD8D2]/35 text-xs sm:text-sm font-mono text-[#1CD8D2] shadow-[0_0_12px_rgba(28,216,210,0.12)] mb-2.5 self-start">
          <FaStar className="w-3 h-3 text-[#00bf8f]" />
          <span className="font-bold">{item.score}</span>
        </div>

        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light mb-3 line-clamp-3 sm:line-clamp-none">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2.5 mt-auto border-t border-white/10">
          {item.highlights.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="text-[10px] sm:text-xs px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-white/[0.05] border border-white/10 text-gray-200 font-medium group-hover:border-[#1CD8D2]/30 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[11px] sm:text-xs text-gray-400 pt-2.5 mt-3 border-t border-white/10">
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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest < 0.48) {
      if (activeStage !== 1) setActiveStage(1);
    } else {
      if (activeStage !== 2) setActiveStage(2);
    }
  });

  const lineWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const collegeX = useTransform(smoothProgress, [0.28, 0.58], ["0%", "-112%"]);
  const collegeOpacity = useTransform(smoothProgress, [0.30, 0.54], [1, 0]);
  const collegeScale = useTransform(smoothProgress, [0.28, 0.58], [1, 0.88]);
  const collegeRotateY = useTransform(smoothProgress, [0.28, 0.58], [0, 10]);
  const schoolsX = useTransform(smoothProgress, [0.42, 0.72], ["112%", "0%"]);
  const schoolsOpacity = useTransform(smoothProgress, [0.44, 0.68], [0, 1]);
  const schoolsScale = useTransform(smoothProgress, [0.42, 0.72], [0.88, 1]);
  const schoolsRotateY = useTransform(smoothProgress, [0.42, 0.72], [-10, 0]);

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
      <div
        ref={sceneRef}
        style={{ height: "260vh", minHeight: "150vh" }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col justify-between overflow-hidden px-4 sm:px-6 md:px-10 py-4 sm:py-6 md:py-7">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1CD8D2] opacity-20 blur-[140px]" />
            <div className="absolute bottom-1/4 -right-20 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] opacity-15 blur-[140px]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
          </div>
          <div className="relative z-10 shrink-0 text-center max-w-2xl mx-auto pt-1 sm:pt-2">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-widest text-[#1CD8D2] font-semibold mb-1 px-3 py-0.5 sm:py-1 rounded-full bg-[#1CD8D2]/10 border border-[#1CD8D2]/25 shadow-[0_0_12px_rgba(28,216,210,0.15)]"
            >
              <IoSparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00bf8f]" />
              <span>Academic Progression</span>
            </motion.div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63]">
              Education
            </h2>
          </div>
          <div className="relative z-10 w-full max-w-xl mx-auto my-2 sm:my-3 shrink-0">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
              <button
                onClick={() => scrollToStage(1)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 rounded-full transition-all duration-300 text-[11px] sm:text-xs font-mono cursor-pointer ${activeStage === 1
                  ? "bg-[#1CD8D2]/20 text-[#1CD8D2] border border-[#1CD8D2]/50 shadow-[0_0_15px_rgba(28,216,210,0.25)]"
                  : "text-gray-400 hover:text-white bg-white/5 border border-white/5"
                  }`}
              >
                <span className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full ${activeStage === 1 ? "bg-[#1CD8D2] animate-pulse" : "bg-gray-500"}`} />
                <span>01 • College</span>
              </button>

              <button
                onClick={() => scrollToStage(2)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 rounded-full transition-all duration-300 text-[11px] sm:text-xs font-mono cursor-pointer ${activeStage === 2
                  ? "bg-[#00bf8f]/20 text-[#00bf8f] border border-[#00bf8f]/50 shadow-[0_0_15px_rgba(0,191,143,0.25)]"
                  : "text-gray-400 hover:text-white bg-white/5 border border-white/5"
                  }`}
              >
                <span className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full ${activeStage === 2 ? "bg-[#00bf8f] animate-pulse" : "bg-gray-500"}`} />
                <span className="sm:hidden">02 • Schools</span>
                <span className="hidden sm:inline">02 • Both Schools (10+2 & 10th)</span>
              </button>
            </div>
            <div className="relative h-[2.5px] sm:h-[3px] bg-white/10 rounded-full overflow-hidden max-w-sm sm:max-w-md mx-auto">
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] shadow-[0_0_12px_#1CD8D2] origin-left"
                style={{ width: lineWidth }}
              />
            </div>
          </div>
          <div className="relative z-20 w-full max-w-xl mx-auto mt-2 mb-3 sm:mb-4 px-2">
            <div className="flex items-center justify-center gap-2 sm:gap-4" />
          </div>
          <div className="relative z-10 flex-1 flex items-center justify-center w-full max-w-6xl mx-auto min-h-0 px-2 sm:px-4">
            <motion.div
              style={{
                x: collegeX,
                opacity: collegeOpacity,
                scale: collegeScale,
                rotateY: collegeRotateY,
                transformPerspective: 1200,
                pointerEvents: activeStage === 1 ? "auto" : "none",
              }}
              className="absolute inset-0 flex flex-col items-center justify-center w-full">
              <div className="w-full max-w-lg sm:max-w-2xl xl:max-w-3xl px-1 sm:px-2">
                <EducationCard
                  item={collegeData}
                  isFeatured={true}
                />
              </div>
              <div className="mt-4 sm:mt-5 flex items-center justify-center gap-2 text-[10px] sm:text-xs text-[#1CD8D2] font-medium">
                <span>
                  Scroll down to slide to Both Schools
                </span>

                <motion.span
                  animate={{
                    x: [0, 5, 0],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                  className="font-bold text-sm"
                >
                  →
                </motion.span>
              </div>
            </motion.div>
            <motion.div
              style={{
                x: schoolsX,
                opacity: schoolsOpacity,
                scale: schoolsScale,
                rotateY: schoolsRotateY,
                transformPerspective: 1200,
                pointerEvents: activeStage === 2 ? "auto" : "none",
              }}
              className="absolute inset-0 flex flex-col items-center justify-center w-full px-2 sm:px-4">

              <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5 md:gap-7 items-stretch">
                {schoolData.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={activeStage === 2 ? {
                      opacity: 1,
                      y: 0,
                    } : {
                      opacity: 0,
                      y: 20,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: idx * 0.12,
                      ease: "easeOut",
                    }}
                  >
                    <EducationCard
                      item={item}
                      isFeatured={false}
                    />
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={activeStage === 2 ? {
                  opacity: 1,
                  y: 0,
                } : {
                  opacity: 0,
                  y: 10,
                }}
                transition={{
                  delay: 0.35,
                  duration: 0.4,
                }}
                className="mt-3 sm:mt-4 flex items-center justify-center gap-1.5 text-[10px] sm:text-xs text-[#00bf8f] font-medium text-center px-2">
                <IoSparkles className="w-3 h-3 text-[#1CD8D2] shrink-0" />
                <span>
                  Foundational Schooling: 10+2 Science & Secondary 10th
                </span>
              </motion.div>

            </motion.div>
          </div>

          <div className="relative z-10 shrink-0 max-w-5xl mx-auto w-full pt-1 pb-1">
            <div className="h-px bg-gradient-to-r from-transparent via-[#1CD8D2]/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
