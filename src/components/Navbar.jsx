import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import OverlayMenu from "./OverlayMenu";
import { FiArrowUpRight } from "react-icons/fi";
import Logo from "../../public/logo.png";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [forceVisible, setForceVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredLink, setHoveredLink] = useState(null);

  const lastScrollY = useRef(0);
  const timerId = useRef(null);
  const mobileMenuBtnRef = useRef(null);

  useEffect(() => {
    const homeSection = document.querySelector("#home");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setForceVisible(true);
          setVisible(true);
        } else {
          setForceVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (homeSection) observer.observe(homeSection);

    return () => {
      if (homeSection) observer.unobserve(homeSection);
    };
  }, []);

  useEffect(() => {
    const sections = [
      "home",
      "about",
      "skills",
      "projects",
      "experience",
      "education",
      "testimonials",
      "contact",
    ];

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 40);

      const scrollPos = currentScrollY + 220;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }

      if (forceVisible) {
        setVisible(true);
        return;
      }

      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        setVisible(false);
      } else {
        setVisible(true);
        if (timerId.current) clearTimeout(timerId.current);
        timerId.current = setTimeout(() => {
          if (window.scrollY > 120) setVisible(false);
        }, 3200);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, [forceVisible]);

  const handleMobileMenuMouseMove = (e) => {
    if (!mobileMenuBtnRef.current) return;
    const rect = mobileMenuBtnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(mobileMenuBtnRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMobileMenuMouseLeave = () => {
    if (!mobileMenuBtnRef.current) return;
    gsap.to(mobileMenuBtnRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-5 sm:px-8 md:px-10 py-3 sm:py-3.5 z-50 transition-colors duration-300 ${isScrolled
            ? "bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : "bg-transparent border-b border-transparent"
          }`}
      >
        <motion.a
          href="#home"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2.5 group cursor-pointer focus:outline-none"
        >
          <div className="relative">
            <img
              src={Logo}
              alt="Logo"
              className="w-8 h-8 rounded-lg shadow-[0_0_15px_rgba(28,216,210,0.3)] group-hover:shadow-[0_0_20px_rgba(28,216,210,0.6)] transition-all duration-300"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border-2 border-black" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-1.5">
            <span>Suvojit</span>
          </div>
        </motion.a>

        <div className="hidden lg:flex items-center">
          <ul className="flex items-center gap-1 bg-white/[0.05] border border-white/10 px-1 py-1 rounded-full backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.35)]">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              const isHovered = hoveredLink === item.name;

              return (
                <li key={item.name} className="relative">
                  <a
                    href={item.href}
                    onMouseEnter={() => setHoveredLink(item.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className={`relative z-10 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-colors duration-200 block ${isActive
                        ? "text-white font-bold"
                        : "text-gray-400 hover:text-white"
                      }`}
                  >
                    {item.name}

                    {isActive && (
                      <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1CD8D2] shadow-[0_0_8px_#1CD8D2]" />
                    )}
                  </a>

                  {isHovered && (
                    <motion.div
                      layoutId="desktopNavHover"
                      className="absolute inset-0 rounded-full bg-white/10 border border-[#1CD8D2]/35 shadow-[0_0_15px_rgba(28,216,210,0.15)] pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 18 }}
            className="group inline-flex items-center gap-1.5 bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] text-black hover:text-white px-4 py-2 rounded-full font-semibold text-xs shadow-[0_0_20px_rgba(28,216,210,0.25)] hover:shadow-[0_0_30px_rgba(28,216,210,0.5)] transition-all duration-300"
          >
            <span>Reach Out</span>
            <FiArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>

        <div className="block lg:hidden">
          <div
            ref={mobileMenuBtnRef}
            onMouseMove={handleMobileMenuMouseMove}
            onMouseLeave={handleMobileMenuMouseLeave}
          >
            <motion.button
              onClick={() => setMenuOpen(true)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 350, damping: 18 }}
              className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-[#1CD8D2]/20 border border-white/15 hover:border-[#1CD8D2]/45 backdrop-blur-md text-white hover:text-[#1CD8D2] shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(28,216,210,0.3)] transition-all duration-300 cursor-pointer focus:outline-none"
              aria-label="Open navigation menu bar"
            >
              <div className="flex flex-col gap-1 w-4">
                <span className="h-[2px] w-full bg-white group-hover:bg-[#1CD8D2] transition-colors rounded-full" />
                <span className="h-[2px] w-3/4 bg-[#1CD8D2] rounded-full group-hover:w-full transition-all duration-200" />
                <span className="h-[2px] w-full bg-white group-hover:bg-[#00bf8f] transition-colors rounded-full" />
              </div>
              <span className="text-xs font-semibold tracking-wider uppercase font-mono">
                Menu
              </span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
