import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { textVariant } from '../constants/motion';
import { SectionWrapper } from '../hoc';
import { experience } from '../constants/constants';
import LaunchIcon from '@mui/icons-material/Launch';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const TreeNode = ({ isPresent }) => (
    <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
        className="relative flex items-center justify-center"
    >
        {isPresent ? (
            <>
                <span className="absolute w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-400/30 animate-ping"></span>
                <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-amber-400 border-3 sm:border-4 border-[#181611] shadow-lg shadow-amber-400/60 z-20"></div>
            </>
        ) : (
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#D7CAA5] border-2 sm:border-3 border-[#181611] shadow-md z-20 group-hover:bg-amber-400 transition-colors"></div>
        )}
    </motion.div>
);

const DateBadge = ({ dateStr, isPresent }) => {
    if (isPresent) {
        return (
            <div className="inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-0.5 xs:py-1 rounded-full bg-[#1c1913] border border-amber-400/40 text-amber-200 shadow-sm backdrop-blur-md whitespace-nowrap">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="text-[11px] xs:text-xs sm:text-[13px] font-semibold tracking-wide font-mono text-amber-200">
                    Present
                </span>
            </div>
        );
    }

    // Split date range and duration if separated by bullet/dot
    const parts = dateStr.split('·').map(s => s.trim());
    const range = parts[0];
    const duration = parts[1];

    return (
        <div className="inline-flex flex-wrap items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-0.5 xs:py-1 rounded-full bg-[#12100d] border border-neutral-800 text-[#D9D6C5] shadow-sm backdrop-blur-md">
            <CalendarMonthIcon style={{ fontSize: 13 }} className="text-amber-400/90 flex-shrink-0" />
            <span className="text-[11px] xs:text-xs font-medium text-[#EAE6D8] font-mono">
                {range}
            </span>
            {duration && (
                <span className="px-1.5 xs:px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[9px] xs:text-[10px] font-semibold tracking-wider uppercase">
                    {duration}
                </span>
            )}
        </div>
    );
};

const TreeCard = ({ exp, index }) => {
    const isEven = index % 2 === 0;
    const isPresent = exp.date.toLowerCase().includes('present');

    return (
        <motion.div
            initial={{ 
                opacity: 0, 
                y: 35, 
                scale: 0.94,
                filter: "blur(4px)"
            }}
            whileInView={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                filter: "blur(0px)"
            }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ 
                duration: 0.55, 
                delay: (index % 2) * 0.12, 
                ease: [0.22, 1, 0.36, 1] 
            }}
            className={`relative flex items-center w-full my-4 xs:my-6 sm:my-8 ${
                isEven ? 'md:flex-row-reverse' : 'md:flex-row'
            }`}
        >
            {/* Content Card Side (Half width on desktop, full width on mobile with left offset) */}
            <div className="w-full md:w-[calc(50%-36px)] pl-7 xs:pl-9 sm:pl-12 md:pl-0">
                <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 350, damping: 22 }}
                    className="relative bg-gradient-to-br from-[#1c1914] via-[#14120e] to-[#100e0b] backdrop-blur-xl rounded-[20px] sm:rounded-[24px] shadow-2xl border border-[#464335]/60 hover:border-amber-400/80 p-3.5 xs:p-4.5 sm:p-7 z-20 transition-all duration-300 hover:shadow-amber-500/10 group"
                >
                    {/* Top Header: Logo + Info Column */}
                    <div className="flex items-start gap-3 sm:gap-5">
                        {/* Company Logo */}
                        <div className="bg-[#0b0a08] p-1.5 xs:p-2 sm:p-2.5 rounded-xl sm:rounded-2xl w-12 h-12 xs:w-14 xs:h-14 sm:w-20 sm:h-20 flex items-center justify-center shadow-inner border border-neutral-800 flex-shrink-0 group-hover:scale-105 group-hover:border-amber-400/50 transition-all duration-300">
                            <img
                                src={exp.image}
                                alt={exp.company}
                                className="max-h-full max-w-full object-contain filter drop-shadow select-none"
                            />
                        </div>

                        {/* Title + Company + Date Pill */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm xs:text-base sm:text-2xl font-bold text-[#F3EEDF] leading-tight group-hover:text-amber-200 transition-colors">
                                {exp.title}
                            </h3>
                            
                            <div className="text-xs xs:text-sm sm:text-base font-semibold text-amber-300 flex items-center gap-1 mt-0.5 sm:mt-1">
                                {exp.link ? (
                                    <a
                                        href={exp.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline flex items-center gap-1 group/link truncate"
                                    >
                                        <span className="truncate">{exp.company}</span>
                                        <LaunchIcon className="opacity-60 group-hover/link:opacity-100 flex-shrink-0" style={{ fontSize: '13px' }} />
                                    </a>
                                ) : (
                                    <span className="truncate">
                                        {exp.company}
                                    </span>
                                )}
                            </div>

                            {/* Date Badge */}
                            <div className="mt-1.5 sm:mt-2.5 flex items-center flex-wrap">
                                <DateBadge dateStr={exp.date} isPresent={isPresent} />
                            </div>
                        </div>
                    </div>

                    {/* Subtle Separator */}
                    <div className="w-full h-px bg-neutral-800/80 my-3 sm:my-4"></div>

                    {/* Role Description */}
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                        {exp.description}
                    </p>
                </motion.div>
            </div>

            {/* Central Node on Trunk (Desktop center, Mobile left) */}
            <div className="absolute left-2.5 xs:left-3.5 sm:left-5 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                <TreeNode isPresent={isPresent} />
            </div>

            {/* Empty Branch Space for Alternating Layout on Desktop */}
            <div className="hidden md:block md:w-[calc(50%-36px)]"></div>
        </motion.div>
    );
};

const Experience = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 75%", "end 80%"]
    });
    
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            ref={containerRef}
            variants={textVariant()}
            className="min-h-screen flex flex-col justify-center p-4 pt-14 sm:p-20 sm:pb-16 relative overflow-hidden"
        >
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-textlight text-3xl xs:text-5xl sm:text-8xl font-semibold text-center p-0 sm:p-4 mb-2 sm:mb-3 z-20"
            >
                EXPERIENCE
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center text-textlight/75 text-xs xs:text-sm sm:text-lg mb-8 sm:mb-16 z-20 max-w-xl mx-auto px-2"
            >
                My professional journey, key roles, and engineering milestones
            </motion.p>

            {/* Background Decorative Rings */}
            <motion.div
                style={{ rotate: -45 }}
                variants={textVariant(0.4)}
                className="bg-gradient-to-b from-[#464335DD] to-transparent w-[25rem] sm:w-[50rem] h-[25rem] sm:h-[40rem] rounded-full absolute top-[30rem] sm:top-48 -right-28 sm:-right-80 z-10 rotate pointer-events-none"
            ></motion.div>
            <motion.div
                style={{ rotate: -45 }}
                variants={textVariant(0.6)}
                className="bg-gradient-to-b from-[#D9D6C5] to-transparent w-[15rem] sm:w-[35rem] h-[15rem] sm:h-[35rem] rounded-full absolute top-[36rem] sm:top-72 -right-10 sm:-right-[17rem] z-10 rotate pointer-events-none"
            ></motion.div>
            <motion.div
                style={{ rotate: 45 }}
                variants={textVariant(0.8)}
                className="bg-gradient-to-b from-[#464335DD] to-transparent w-[20rem] sm:w-[50rem] h-[20rem] sm:h-[50rem] rounded-full absolute -bottom-40 sm:-bottom-36 -left-32 sm:-left-44 z-10 rotate pointer-events-none"
            ></motion.div>
            <motion.div
                style={{ rotate: 45 }}
                variants={textVariant(1)}
                className="bg-gradient-to-b from-[#D9D6C5] to-transparent w-[15rem] sm:w-[35rem] h-[15rem] sm:h-[35rem] rounded-full absolute -bottom-40 sm:-bottom-12 -left-20 sm:-left-20 z-10 rotate pointer-events-none"
            ></motion.div>

            {/* Tree Branch Container */}
            <div className="relative max-w-6xl mx-auto w-full z-20">
                {/* Static Background Trunk Line */}
                <div className="absolute top-2 bottom-2 left-2.5 xs:left-3.5 sm:left-5 md:left-1/2 -translate-x-1/2 w-[3px] bg-neutral-800/60 rounded-full z-10"></div>
                
                {/* Progressive Animated Glowing Timeline Line */}
                <motion.div 
                    className="absolute top-2 bottom-2 left-2.5 xs:left-3.5 sm:left-5 md:left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-amber-400 via-amber-300 to-amber-500 rounded-full origin-top z-10 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                    style={{ scaleY }}
                />

                {/* Experience Nodes / Branches */}
                <div className="flex flex-col w-full relative z-20">
                    {experience.map((exp, index) => (
                        <TreeCard key={index} exp={exp} index={index} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default SectionWrapper(Experience, 'experience');
