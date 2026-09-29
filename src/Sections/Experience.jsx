import React from 'react';
import { motion } from 'framer-motion';
import { textVariant } from '../constants/motion';
import { SectionWrapper } from '../hoc';
import { experience } from '../constants/constants';
import HighlightedText from '../components/Highlight';
import LaunchIcon from '@mui/icons-material/Launch';

const TreeNode = ({ isPresent }) => (
    <div className="relative flex items-center justify-center">
        {isPresent && (
            <span className="absolute w-8 h-8 rounded-full bg-amber-400/40 animate-ping"></span>
        )}
        <div className={`w-5 h-5 rounded-full border-4 border-[#262010] z-20 ${isPresent ? 'bg-amber-400' : 'bg-[#D9D6C5]'}`}></div>
    </div>
);

const TreeCard = ({ exp, index }) => {
    const isEven = index % 2 === 0;
    const isPresent = exp.date.toLowerCase().includes('present');

    return (
        <motion.div
            variants={textVariant(index * 0.25)}
            className={`relative flex items-center w-full my-6 sm:my-10 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
        >
            {/* Content Card Side (Half width on desktop, full width on mobile with offset) */}
            <div className="w-full md:w-[calc(50%-40px)] pl-14 md:pl-0">
                <motion.div
                    whileHover={{ scale: 1.02, y: -6 }}
                    transition={{ type: "spring", stiffness: 350, damping: 22 }}
                    className="bg-primary/95 backdrop-blur-md rounded-[28px] shadow-xl border-black border-2 p-6 sm:p-7 relative z-20 transition-all duration-300 hover:shadow-2xl group"
                >
                    {/* Top Header with Logo, Date Badge, and Company */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-[#121212] p-2.5 rounded-2xl w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center shadow-lg border border-neutral-700/80 overflow-hidden flex-shrink-0 group-hover:scale-105 group-hover:border-amber-400/40 transition-all duration-300">
                                <img
                                    src={exp.image}
                                    alt={exp.company}
                                    className="max-h-full max-w-full object-contain filter drop-shadow"
                                />
                            </div>
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-textlight leading-tight">
                                    {exp.title}
                                </h3>
                                <div className="text-base sm:text-lg font-semibold text-[#464335] flex items-center gap-1.5 mt-1">
                                    {exp.link ? (
                                        <a
                                            href={exp.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline flex items-center gap-1 group/link"
                                        >
                                            <HighlightedText text={exp.company} />
                                            <LaunchIcon className="text-xs opacity-60 group-hover/link:opacity-100" style={{ fontSize: '16px' }} />
                                        </a>
                                    ) : (
                                        <HighlightedText text={exp.company} />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Date Pill Badge */}
                        <div className="self-start sm:self-center">
                            <span
                                className={`text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full border shadow-sm inline-block ${isPresent
                                        ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                                        : 'bg-[#464335]/10 text-textlight border-black/15'
                                    }`}
                            >
                                {exp.date}
                            </span>
                        </div>
                    </div>

                    {/* Role Description */}
                    <p className="text-sm sm:text-base text-textlight/85 leading-relaxed">
                        {exp.description}
                    </p>
                </motion.div>
            </div>

            {/* Central Node on Trunk (Desktop center, Mobile left-6) */}
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                <TreeNode isPresent={isPresent} />
            </div>

            {/* Empty Branch Space for Alternating Layout on Desktop */}
            <div className="hidden md:block md:w-[calc(50%-40px)]"></div>
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
                className="bg-gradient-to-b from-[#464335DD] to-transparent w-[25rem] sm:w-[50rem] h-[25rem] sm:h-[40rem] rounded-full absolute top-[30rem] sm:top-48 -right-28 sm:-right-80 z-10 rotate"
            ></motion.div>
            <motion.div
                style={{ rotate: -45 }}
                variants={textVariant(0.6)}
                className="bg-gradient-to-b from-[#D9D6C5] to-transparent w-[15rem] sm:w-[35rem] h-[15rem] sm:h-[35rem] rounded-full absolute top-[36rem] sm:top-72 -right-10 sm:-right-[17rem] z-10 rotate"
            ></motion.div>
            <motion.div
                style={{ rotate: 45 }}
                variants={textVariant(0.8)}
                className="bg-gradient-to-b from-[#464335DD] to-transparent w-[20rem] sm:w-[50rem] h-[20rem] sm:h-[50rem] rounded-full absolute -bottom-40 sm:-bottom-36 -left-32 sm:-left-44 z-10 rotate"
            ></motion.div>
            <motion.div
                style={{ rotate: 45 }}
                variants={textVariant(1)}
                className="bg-gradient-to-b from-[#D9D6C5] to-transparent w-[15rem] sm:w-[35rem] h-[15rem] sm:h-[35rem] rounded-full absolute -bottom-40 sm:-bottom-12 -left-20 sm:-left-20 z-10 rotate"
            ></motion.div>

            {/* Tree Branch Container */}
            <div className="relative max-w-6xl mx-auto w-full z-20">
                {/* Vertical Central Tree Trunk Spine */}
                <div className="absolute top-2 bottom-2 left-6 md:left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-[#464335] via-[#A89F82] to-[#464335] rounded-full z-10"></div>

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
