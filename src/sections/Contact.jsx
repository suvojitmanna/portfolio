import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import ParticlesBackground from "../components/ParticlesBackground.jsx";
import Astra from "../assets/Astra.png";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    idea: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "budget" && value && !/^\d+$/.test(value)) return;

    setFormData((p) => ({ ...p, [name]: value }));

    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const required = ["name", "email", "service", "idea"];
    const newErrors = {};

    required.forEach(
      (f) => !formData[f].trim() && (newErrors[f] = "Fill this field")
    );

    if (formData.service !== "other" && !formData.budget.trim())
      newErrors.budget = "Fill this field";

    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...formData,
          from_name: formData.name,
          reply_to: formData.email,
        },
        PUBLIC_KEY
      );

      setStatus("success");
      setFormData({ name: "", email: "", service: "", budget: "", idea: "" });
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="w-full min-h-screen relative bg-slate-50 dark:bg-black overflow-hidden text-slate-900 dark:text-white py-18 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10 transition-colors duration-300"
    >
      <ParticlesBackground />

      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <motion.img
            src={Astra}
            alt="Contact"
            className="w-72 md:w-140 rounded-2xl object-cover"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 bg-white/80 dark:bg-white/5 px-8 py-6 rounded-2xl shadow-xl dark:shadow-lg border border-black/10 dark:border-white/10 backdrop-blur-md transition-colors duration-300"
        >
          <h2 className="text-3xl font-bold mb-5 text-slate-900 dark:text-white">Let’s Work Together</h2>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="mb-1 text-slate-700 dark:text-gray-200 font-medium">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className={`p-3 rounded-md bg-black/[0.04] dark:bg-white/10 border ${
                  errors.name ? "border-red-500" : "border-slate-300 dark:border-gray-500"
                } text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-400 focus:outline-none focus:border-cyan-500 transition-colors`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-slate-700 dark:text-gray-200 font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className={`p-3 rounded-md bg-black/[0.04] dark:bg-white/10 border ${
                  errors.email ? "border-red-500" : "border-slate-300 dark:border-gray-500"
                } text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-400 focus:outline-none focus:border-cyan-500 transition-colors`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-slate-700 dark:text-gray-200 font-medium">
                Service Needed <span className="text-red-500">*</span>
              </label>

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`p-3 rounded-md bg-black/[0.04] dark:bg-white/10 border ${
                  errors.service ? "border-red-500" : "border-slate-300 dark:border-gray-500"
                } text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors`}
              >
                <option value="" disabled className="text-slate-500 dark:text-gray-400 bg-white dark:bg-neutral-900">
                  Something in mind?
                </option>
                <option value="Web Development" className="text-slate-900 dark:text-white bg-white dark:bg-neutral-900">
                  Web Development
                </option>
                <option value="Mobile Application" className="text-slate-900 dark:text-white bg-white dark:bg-neutral-900">
                  Mobile Application
                </option>
                <option value="Others" className="text-slate-900 dark:text-white bg-white dark:bg-neutral-900">
                  Others
                </option>
              </select>

              {errors.service && (
                <p className="text-red-500 text-xs mt-1">{errors.service}</p>
              )}
            </div>

            {formData.service && formData.service !== "other" && (
              <div className="flex flex-col">
                <label className="mb-1 text-slate-700 dark:text-gray-200 font-medium">
                  Budget <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="budget"
                  placeholder="Your Budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={`p-3 rounded-md bg-black/[0.04] dark:bg-white/10 border ${
                    errors.budget ? "border-red-500" : "border-slate-300 dark:border-gray-500"
                  } text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-400 focus:outline-none focus:border-cyan-500 transition-colors`}
                />

                {errors.budget && (
                  <p className="text-red-500 text-xs mt-1">{errors.budget}</p>
                )}
              </div>
            )}

            <div className="flex flex-col">
              <label className="mb-1 text-slate-700 dark:text-gray-200 font-medium">
                Idea <span className="text-red-500">*</span>
              </label>

              <textarea
                name="idea"
                rows={5}
                placeholder="Enter your idea"
                value={formData.idea}
                onChange={handleChange}
                className={`p-3 rounded-md bg-black/[0.04] dark:bg-white/10 border ${
                  errors.idea ? "border-red-500" : "border-slate-300 dark:border-gray-500"
                } text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-400 focus:outline-none focus:border-cyan-500 transition-colors`}
              />

              {errors.idea && (
                <p className="text-red-500 text-xs mt-1">{errors.idea}</p>
              )}
            </div>

            {status && (
              <p
                className={`text-sm ${
                  status === "success"
                    ? "text-emerald-500 dark:text-green-400"
                    : status === "error"
                    ? "text-red-500 dark:text-red-400"
                    : "text-amber-500 dark:text-yellow-400"
                }`}
              >
                {status === "sending"
                  ? "Sending..."
                  : status === "success"
                  ? "Message sent successfully ✅"
                  : "Something went wrong ❌"}
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={status === "sending"}
              type="submit"
              className="
                bg-blue-600 
                hover:bg-blue-700 
                disabled:opacity-60 
                text-white 
                py-3 
                rounded-md 
                font-semibold 
                transition
                cursor-pointer
              "
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
