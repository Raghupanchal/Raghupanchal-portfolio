import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { technologies } from "../constants/constants";

const categories = ["All", "Frontend", "Backend", "Cloud & DB", "AI & Tools"];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.88 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 22,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.82,
    transition: { duration: 0.15 },
  },
};

function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTechnologies =
    activeCategory === "All"
      ? technologies
      : technologies.filter((tech) => tech.category === activeCategory);

  return (
    <div className="w-full flex flex-col items-center justify-center py-4 sm:py-6">
      {/* Category Filter Pills */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-3 mb-6 sm:mb-8 px-2 sm:px-4 z-20"
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`relative px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] xs:text-xs sm:text-sm font-medium transition-all duration-300 focus:outline-none cursor-pointer ${
                isActive
                  ? "text-black font-bold shadow-md shadow-amber-400/30 scale-105"
                  : "text-[#D9D6C5]/80 hover:text-white bg-[#464335]/40 hover:bg-[#464335]/70 border border-neutral-700/50 hover:scale-102 active:scale-95"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeSkillTab"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300"
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Animated Skills Grid */}
      <motion.div
        layout
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="flex flex-row justify-center items-center flex-wrap gap-2.5 xs:gap-3.5 sm:gap-5 max-w-5xl px-1 sm:px-6 z-20"
      >
        <AnimatePresence mode="popLayout">
          {filteredTechnologies.map((tech) => (
            <motion.div
              layout
              key={tech.name}
              variants={cardVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              whileHover={{
                scale: 1.08,
                y: -5,
                transition: { type: "spring", stiffness: 400, damping: 16 },
              }}
              whileTap={{ scale: 0.94 }}
              className="group relative w-[76px] xs:w-24 sm:w-28 p-2 xs:p-2.5 sm:p-3 rounded-2xl bg-gradient-to-b from-[#2e2a21]/90 to-[#1f1c16]/90 border border-neutral-700/60 hover:border-amber-400/70 hover:shadow-[0_0_20px_rgba(251,191,36,0.25)] backdrop-blur-md flex flex-col items-center justify-between cursor-pointer transition-colors duration-300 select-none"
            >
              {/* Icon Container */}
              <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-xl bg-[#181818] border border-neutral-700/80 flex items-center justify-center p-1.5 xs:p-2 mb-1.5 sm:mb-2 group-hover:bg-[#222] group-hover:border-amber-400/50 group-hover:shadow-[0_0_12px_rgba(251,191,36,0.2)] transition-all duration-300">
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="max-w-full max-h-full object-contain filter drop-shadow group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Skill Name */}
              <p className="text-center text-[0.65rem] xs:text-[0.72rem] sm:text-[0.8rem] font-medium text-[#EAE6D8] group-hover:text-amber-300 transition-colors duration-300 tracking-wide line-clamp-1 w-full truncate">
                {tech.name}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Skills;