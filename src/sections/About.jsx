import { motion } from "framer-motion";
import p from "../assets/p.png";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden"
      aria-label="About me"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-[360px] h-[360px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1CD8D2] opacity-20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-10 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] opacity-15 blur-[140px] animate-pulse delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-20 w-[220px] h-[220px] rounded-full bg-gradient-to-r from-[#00bf8f] to-[#1CD8D2] opacity-10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12">
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div
            className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#1CD8D2]/20 to-[#302b63]/20 border border-[#1CD8D2]/25"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            aria-hidden="true"
          >

            <div className="absolute inset-0 " />
            <img src={p} alt="test" />
          </motion.div>

          <div className="flex-1 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63]">
              Suvojit Manna
            </h2>
            <p className="mt-2 text-lg sm:text-xl text-white/90 font-semibold">
              Full Stack Web Developer
            </p>

            <p className="mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl">
              I build scalable, modern applications with a strong focus on clean architecture, intuitive UX, and performance. My toolkit spans React, Next.js, Node.js, Express.js, MongoDB, TypeScript, Tailwind CSS, Socket.IO, WebRTC, and AI technologies—bringing ideas to life from concept to production with robust APIs, real-time experiences, and smooth interfaces.
            </p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl">
              {[
                { label: "Experience", value: "2+ years" },
                { label: "Specialty", value: "Full Stack Development" },
                { label: "Focus", value: "Modern AI & Scalable Applications" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="text-sm text-gray-400">{item.label}</div>
                  <div className="text-base font-semibold text-white">
                    {item.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              About Me
            </h3>

            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
              I’m <span className="font-semibold text-white">Suvojit Manna</span>, a B.Tech Computer Science student and Full Stack Developer with hands-on experience building modern, scalable web applications using the{" "}
              <span className="font-semibold text-white">
                MERN stack, Next.js, and TypeScript
              </span>.
              <br />
              <br />

              I enjoy turning complex ideas into user-friendly digital products with
              clean architecture, efficient backend logic, intuitive interfaces, and
              reliable software. My experience includes building{" "}
              <span className="font-semibold text-white">
                real-time applications, authentication systems, REST APIs, dashboards,
                database-driven workflows, and AI-powered applications
              </span>.
              <br />
              <br />

              Alongside full-stack development, I’m exploring{" "}
              <span className="font-semibold text-white">
                AI/ML and AI application development
              </span>
              , combining modern web technologies with intelligent features to solve
              practical problems. I’m passionate about learning, experimenting with
              new technologies, and turning ideas into meaningful products that are
              built to scale.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="rounded-2xl p-6 bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:border-[#1CD8D2]/40 hover:bg-white/[0.07] transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <h4 className="text-lg font-bold text-white mb-3">
                Full-Stack Development
              </h4>
              <p className="text-gray-400 leading-relaxed">
                MERN stack, REST APIs, authentication, dashboards
              </p>
            </motion.div>

            <motion.div
              className="rounded-2xl p-6 bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:border-[#00bf8f]/40 hover:bg-white/[0.07] transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <h4 className="text-lg font-bold text-white mb-3">
                Backend & Databases
              </h4>
              <p className="text-gray-400 leading-relaxed">
                Node.js, Express, MongoDB, SQL,Redis
              </p>
            </motion.div>

            <motion.div
              className="rounded-2xl p-6 bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:border-[#1CD8D2]/40 hover:bg-white/[0.07] transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <h4 className="text-lg font-bold text-white mb-3">
                AI & Application Development
              </h4>
              <p className="text-gray-400 leading-relaxed">
                AI/ML, AI-powered applications, RAG, intelligent features
              </p>
            </motion.div>

            <motion.div
              className="rounded-2xl p-6 bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:border-[#00bf8f]/40 hover:bg-white/[0.07] transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <h4 className="text-lg font-bold text-white mb-3">
                Tools & Deployment
              </h4>

              <p className="text-gray-400 leading-relaxed">
                Git, GitHub, Docker, Vercel, Render, Postman
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

