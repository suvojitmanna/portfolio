
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import avatar from "../assets/avator.png";
import { FaXTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { FaYoutube, FaInstagram } from "react-icons/fa6";
import ParticleBackground from "../components/ParticlesBackground";

const socials = [
  { Icon: FaXTwitter, label: "X", href: "https://x.com/Suvojit9093" },
  { Icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/in/suvojit-manna-505614327/" },
  { Icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/suvo.jit2006/" },
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/suvojitmanna" },
];


const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: {
    scale: 0.95,
    y: 0,
    transition: { duration: 0.08 },
  },
};

const Home = React.forwardRef((props, ref) => {
  const roles = useMemo(
    () => [
      "Software Developer",
      "MERN Stack Web Developer",
      "AI Application Developer",
      "Real-Time Web Application Developer",
    ],
    []
  );
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(() => {
      if (!deleting && subIndex < current.length) setSubIndex((v) => v + 1);
      else if (!deleting && subIndex === current.length)
        setTimeout(() => setDeleting(true), 1200);
      else if (deleting && subIndex > 0) setSubIndex((v) => v - 1);
      else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((p) => (p + 1) % roles.length);
      }
    }, deleting ? 40 : 60);
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, roles]);

  return (
    <section
      ref={ref}
      id="home"
      className="min-h-screen w-full relative overflow-hidden bg-black flex items-center lg:pl-40 py-20 sm:py-24 lg:py-0 pr-2 -pl-5 sm:pl-0 sm:pr-0"
    >
      <ParticleBackground />

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 -left-32 
          w-[70vw] sm:w-[50vw] md:w-[40vw] 
          h-[70vw] sm:h-[50vw] md:h-[40vw]
          max-w-[500px] max-h-[500px]
          rounded-full
          bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1CD8D2]
          opacity-30 sm:opacity-20 md:opacity-10 
          blur-[100px] sm:blur-[130px] md:blur-[150px]
          animate-pulse"
        />
        <div
          className="absolute bottom-0 right-0 
          w-[70vw] sm:w-[50vw] md:w-[40vw] 
          h-[70vw] sm:h-[50vw] md:h-[40vw] 
          max-w-[500px] max-h-[500px] 
          rounded-full 
          bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] 
          opacity-40 sm:opacity-30 
          blur-[100px] sm:blur-[130px] md:blur-[150px] 
          animate-pulse delay-500"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 items-center">
        <motion.div
          className="flex flex-col justify-center text-center lg:text-left relative py-6 lg:py-0"
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="w-full lg:pr-12 xl:pr-24 mx-auto max-w-[48rem]">
            <motion.div
              className="pt-20 sm:mb-3 text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span>{roles[index].substring(0, subIndex)}</span>
              <span
                className="inline-block w-[2px] ml-1 bg-white animate-pulse align-middle"
                style={{ height: "0.5em" }}
              />
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-bold text-transparent bg-clip-text 
              bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] drop-shadow-lg leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Hello, I&apos;m
              <br />
              <span className="text-white font-bold text-4xl sm:text-6xl md:text-7xl lg:text-7xl block break-words lg:whitespace-nowrap">
                Suvojit Manna
              </span>
            </motion.h1>

            <motion.p
              className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              I turn complex ideas into modern, scalable web applications <br />
              — building fast,interactive, and real-time experiences with a focus on clean architecture,
              seamless UX, intuitive design, and practical AI integration.
            </motion.p>

            <motion.div
              className="mt-6 sm:mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <a
                href="#projects"
                className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-base sm:text-lg font-medium text-white 
                bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63]
                shadow-lg hover:scale-105 transition-all"
              >
                View My Work
              </a>
              <a
                href="/Resume.pdf"
                download
                className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-base sm:text-lg font-medium text-black bg-white 
                hover:bg-gray-200 shadow-lg hover:scale-105 transition-all"
              >
                My Resume
              </a>
            </motion.div>

            <motion.div
              className="mt-6 sm:mt-10 flex gap-4 sm:gap-5 text-xl sm:text-2xl md:text-3xl justify-center lg:justify-start"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              {socials.map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={glowVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="text-gray-300"
                >
                  <Icon />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          <div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              right: "10px",
              width: "min(22vw, 410px)",
              height: "min(40vw, 760px)",
              borderRadius: "50%",
              filter: "blur(38px)",
              opacity: 0.32,
              background:
                "conic-gradient(from 0deg, #1CD8D2, #00bf8f, #302b63, #1CD8D2)",
            }}
          />
          <motion.img
            src={avatar}
            alt="Suvojit Manna avatar"
            className="absolute top-1/2 -translate-y-1/2 object-contain select-none pointer-events-none"
            style={{ right: "-30px", width: "min(45vw, 780px)", maxHeight: "90vh" }}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
          />
        </motion.div>
      </div>
    </section>
  );
});

export default Home;
