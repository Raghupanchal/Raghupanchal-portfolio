import React from 'react';
import { motion } from 'framer-motion';
import { textVariant } from '../constants/motion';
import { SectionWrapper } from '../hoc';
import { experience } from '../constants/constants';
import HighlightedText from '../components/Highlight';
import LaunchIcon from '@mui/icons-material/Launch';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const TreeNode = ({ isPresent }) => (
    <div className="relative flex items-center justify-center">
        {isPresent ? (
            <>
                <span className="absolute w-8 h-8 rounded-full bg-amber-400/30 animate-ping"></span>
                <div className="w-5 h-5 rounded-full bg-amber-400 border-4 border-[#181611] shadow-lg shadow-amber-400/50 z-20"></div>
            </>
        ) : (
            <div className="w-4 h-4 rounded-full bg-[#D7CAA5] border-3 border-[#181611] shadow-md z-20 group-hover:bg-amber-400 transition-colors"></div>
        )}
    </div>
);

const DateBadge = ({ dateStr, isPresent }) => {
    if (isPresent) {
        return (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1913] border border-amber-400/40 text-amber-200 shadow-sm backdrop-blur-md whitespace-nowrap">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="text-xs sm:text-[13px] font-semibold tracking-wide font-mono text-amber-200">
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12100d] border border-neutral-800 text-[#D9D6C5] shadow-sm backdrop-blur-md whitespace-nowrap">
            <CalendarMonthIcon style={{ fontSize: 14 }} className="text-amber-400/90 flex-shrink-0" />
            <span className="text-xs font-medium text-[#EAE6D8] font-mono">
                {range}
            </span>
            {duration && (
                <span className="px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[10px] font-semibold tracking-wider uppercase">
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
            variants={textVariant(index * 0.2)}
            className={`relative flex items-center w-full my-6 sm:my-8 ${
                isEven ? 'md:flex-row-reverse' : 'md:flex-row'
            }`}
        >
            {/* Content Card Side (Half width on desktop, full width on mobile with offset) */}
            <div className="w-full md:w-[calc(50%-36px)] pl-12 md:pl-0">
                <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ type: "spring", stiffness: 350, damping: 22 }}
                    className="relative bg-gradient-to-br from-[#1c1914] via-[#14120e] to-[#100e0b] backdrop-blur-xl rounded-[24px] shadow-2xl border border-[#464335]/60 hover:border-amber-400/80 p-5 sm:p-7 z-20 transition-all duration-300 hover:shadow-amber-500/10 group"
                >
                    {/* Top Header: Logo + Info Column */}
                    <div className="flex items-start gap-4 sm:gap-5">
                        {/* Company Logo */}
                        <div className="bg-[#0b0a08] p-2.5 rounded-2xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shadow-inner border border-neutral-800 flex-shrink-0 group-hover:scale-105 group-hover:border-amber-400/50 transition-all duration-300">
                            <img
                                src={exp.image}
                                alt={exp.company}
                                className="max-h-full max-w-full object-contain filter drop-shadow select-none"
                            />
                        </div>

                        {/* Title + Company + Date Pill */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-2xl font-bold text-[#F3EEDF] leading-tight group-hover:text-amber-200 transition-colors">
                                {exp.title}
                            </h3>
                            
                            <div className="text-sm sm:text-base font-semibold text-amber-300 flex items-center gap-1.5 mt-1">
                                {exp.link ? (
                                    <a
                                        href={exp.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline flex items-center gap-1 group/link truncate"
                                    >
                                        <span>{exp.company}</span>
                                        <LaunchIcon className="opacity-60 group-hover/link:opacity-100 flex-shrink-0" style={{ fontSize: '14px' }} />
                                    </a>
                                ) : (
                                    <span className="truncate">
                                        {exp.company}
                                    </span>
                                )}
                            </div>

                            {/* Date Badge positioned cleanly below company */}
                            <div className="mt-2.5 flex items-center">
                                <DateBadge dateStr={exp.date} isPresent={isPresent} />
                            </div>
                        </div>
                    </div>

                    {/* Subtle Separator */}
                    <div className="w-full h-px bg-neutral-800/80 my-4"></div>

                    {/* Role Description */}
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                        {exp.description}
                    </p>
                </motion.div>
            </div>

            {/* Central Node on Trunk (Desktop center, Mobile left-5) */}
            <div className="absolute left-5 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                <TreeNode isPresent={isPresent} />
            </div>

            {/* Empty Branch Space for Alternating Layout on Desktop */}
            <div className="hidden md:block md:w-[calc(50%-36px)]"></div>
        </motion.div>
    );
};

const Experience = () => {
    return (
        <motion.div
            variants={textVariant()}
            className="min-h-screen flex flex-col justify-center p-6 pt-16 sm:p-20 sm:pb-16 relative overflow-hidden"
        >
            <motion.h1 className="text-textlight text-5xl sm:text-8xl font-semibold text-center p-0 sm:p-4 mb-3 z-20">
                EXPERIENCE
            </motion.h1>
            <motion.p className="text-center text-textlight/75 text-base sm:text-lg mb-12 sm:mb-16 z-20 max-w-xl mx-auto">
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
                {/* Vertical Central Tree Trunk Spine */}
                <div className="absolute top-2 bottom-2 left-5 md:left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-amber-400 via-[#464335] to-[#A89F82] rounded-full z-10"></div>

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
