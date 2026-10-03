import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { technologies } from "../constants/constants";

const categories = ["All", "Frontend", "Backend", "Cloud & DB", "AI & Tools"];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.85 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 },
  },
};

function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTechnologies =
    activeCategory === "All"
      ? technologies
      : technologies.filter((tech) => tech.category === activeCategory);

  return (
    <div className="w-full flex flex-col items-center justify-center py-6">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-8 px-4 z-20">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 focus:outline-none ${
                isActive
                  ? "text-black font-semibold shadow-md shadow-amber-400/20"
                  : "text-[#D9D6C5]/80 hover:text-white bg-[#464335]/40 hover:bg-[#464335]/70 border border-neutral-700/50"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeSkillTab"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Animated Skills Grid */}
      <motion.div
        layout
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-row justify-center items-center flex-wrap gap-3.5 sm:gap-5 max-w-5xl px-2 sm:px-6"
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
                scale: 1.1,
                y: -6,
                rotate: [0, -2, 2, 0],
                transition: { type: "spring", stiffness: 400, damping: 15 },
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-24 sm:w-28 p-3 rounded-2xl bg-gradient-to-b from-[#2e2a21]/90 to-[#1f1c16]/90 border border-neutral-700/60 hover:border-amber-400/70 hover:shadow-[0_0_20px_rgba(251,191,36,0.25)] backdrop-blur-md flex flex-col items-center justify-between cursor-pointer transition-colors duration-300"
            >
              {/* Icon Container with subtle glow and contrast */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#181818] border border-neutral-700/80 flex items-center justify-center p-2 mb-2 group-hover:bg-[#222] group-hover:border-amber-400/50 group-hover:shadow-[0_0_12px_rgba(251,191,36,0.2)] transition-all duration-300">
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-full h-full object-contain filter drop-shadow group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Skill Name */}
              <p className="text-center text-[0.72rem] sm:text-[0.8rem] font-medium text-[#EAE6D8] group-hover:text-amber-300 transition-colors duration-300 tracking-wide line-clamp-1">
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