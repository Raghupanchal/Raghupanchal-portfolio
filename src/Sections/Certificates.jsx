import React, { useEffect } from 'react';
import { achievements } from '../constants/constants';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import { textVariant } from '../constants/motion';
import HighlightedText from '../components/Highlight';
import { Parallax, Background, Layer } from 'react-parallax';


const AchCard = ({ project, index }) => {
    return (
        <motion.div
            variants={textVariant(index * 0.12)}
            whileHover={{
                scale: 1.03,
                y: -5,
                boxShadow: "0px 15px 35px rgba(251, 191, 36, 0.2)",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                transition: { duration: 0.3, type: "spring", stiffness: 400 },
            }}
            className="relative p-3.5 xs:p-4 sm:p-5 shadow-2xl w-full max-w-[370px] z-20 glass rounded-2xl border border-neutral-700/70 hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between"
        >
            <motion.a href={project.image} target="_blank" rel="noopener noreferrer" className="flex flex-col h-full">
                <div className="w-full h-[160px] xs:h-[180px] sm:h-[200px] rounded-xl mb-3 sm:mb-3.5 bg-[#0e0d0b] border border-neutral-800 flex items-center justify-center p-2 sm:p-2.5 overflow-hidden group">
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        className="max-h-full max-w-full object-contain rounded transition-transform duration-300 group-hover:scale-105 select-none"
                    />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <motion.h3 className="text-xs xs:text-sm sm:text-base font-bold text-[#F3EEDF] leading-snug line-clamp-1">
                            {project.title}
                        </motion.h3>
                        <motion.h4 className="text-[10px] xs:text-[11px] sm:text-xs font-semibold text-amber-300 mt-0.5 mb-1 sm:mb-1.5 line-clamp-1">
                            {project.subtitle}
                        </motion.h4>
                        <motion.p className="text-neutral-300/85 mb-2.5 sm:mb-3 text-[11px] xs:text-xs leading-relaxed line-clamp-2">
                            {project.text}
                        </motion.p>
                    </div>
                    <div>
                        {project.date && (
                            <span className="inline-flex items-center gap-1.5 text-[10px] xs:text-[11px] font-mono text-amber-200/90 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                                <span>~</span>
                                <span>{project.date}</span>
                            </span>
                        )}
                    </div>
                </div>
            </motion.a>
        </motion.div>
    );
};


const Certificates = () => {

    return (
        <motion.div className='bg-black rounded-[24px] sm:rounded-[50px] p-4 xs:p-6 sm:p-14 lg:p-20 pt-12 sm:pt-16 min-h-screen relative overflow-hidden'>
            <motion.h1 className='text-textdark1 text-3xl xs:text-4xl sm:text-8xl font-semibold text-center p-2 pb-1 sm:pb-2 z-200'>CERTIFICATES</motion.h1>
            <motion.h1 className='text-textdark1 text-lg xs:text-xl sm:text-5xl font-semibold text-center p-2 pt-0 mb-6 sm:mb-10 z-20'><HighlightedText text={'& Achievements'} color='#565335' /></motion.h1>
            
            {/* Background Geometric Polygonal Animations */}
            <motion.div variants={textVariant(1.3)} className='bg-gradient-to-b from-[#C9C69288] to-transparent w-[15rem] sm:w-[26rem] h-[15rem] sm:h-[26rem] absolute top-[25rem] sm:top-[28rem] -right-10 sm:right-10 z-10 pointer-events-none' style={{ clipPath: 'polygon(33% 0%, 66% 0%, 100% 33%, 100% 66%, 66% 100%, 33% 100%, 0% 66%, 0% 33%, 33% 0%)' }}></motion.div>
            <motion.div variants={textVariant(1.5)} className='bg-gradient-to-b from-[#56533588] to-transparent w-[22rem] sm:w-[32rem] h-[22rem] sm:h-[32rem] absolute top-36 -right-24 sm:-right-10 z-10 pointer-events-none' style={{ clipPath: 'polygon(33% 0%, 66% 0%, 100% 33%, 100% 66%, 67% 100%, 33% 100%, 0% 66%, 0% 33%, 33% 0%)' }}></motion.div>
            <motion.div variants={textVariant(1.7)} className='bg-gradient-to-b from-[#56533588] to-transparent w-[18rem] sm:w-[38rem] h-[18rem] sm:h-[38rem] absolute bottom-36 -left-28 sm:-left-10 z-10 pointer-events-none' style={{ clipPath: 'polygon(33% 0%, 66% 0%, 100% 33%, 100% 66%, 66% 100%, 33% 100%, 0% 66%, 0% 33%, 33% 0%)' }}></motion.div>
            <motion.div variants={textVariant(1.9)} className='bg-gradient-to-b from-[#C9C69288] to-transparent w-[14rem] sm:w-[24rem] h-[14rem] sm:h-[24rem] absolute bottom-4 -left-20 sm:left-40 z-10 pointer-events-none' style={{ clipPath: 'polygon(33% 0%, 66% 0%, 100% 33%, 100% 66%, 66% 100%, 33% 100%, 0% 66%, 0% 33%, 33% 0%)' }}></motion.div>

            {/* Ambient Background Glows */}
            <motion.div variants={textVariant(0.8)} className='bg-gradient-to-b from-[#C9C6B244] to-transparent rounded-full w-[20rem] sm:w-[35rem] h-[20rem] sm:h-[35rem] absolute top-1/3 -right-20 z-10 blur-3xl pointer-events-none'></motion.div>
            <motion.div variants={textVariant(1.2)} className='bg-gradient-to-b from-[#46433544] to-transparent rounded-full w-[20rem] sm:w-[40rem] h-[20rem] sm:h-[40rem] absolute bottom-1/4 -left-20 z-10 blur-3xl pointer-events-none'></motion.div>

            {/* 3 Columns Grid on Desktop */}
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 z-20 max-w-7xl mx-auto w-full justify-items-center">
                {achievements.map((project, index) => (
                    <AchCard key={index} project={project} index={index} />
                ))}
            </motion.div>
        </motion.div>
    );
};

export default SectionWrapper(Certificates, 'certificates');
