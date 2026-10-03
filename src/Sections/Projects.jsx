import React, { useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { projects } from '../constants/constants';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import { textVariant } from '../constants/motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const ProjectCard = ({ project, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isLongText = project.description && project.description.length > 140;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: "easeOut" }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:max-w-[450px] z-20 flex"
        >
            <Tilt
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                scale={1.02}
                transitionSpeed={400}
                className="relative p-4 xs:p-5 sm:p-6 shadow-2xl glass rounded-2xl sm:rounded-3xl border border-neutral-700/80 hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between w-full h-full"
            >
                <div>
                    {/* Project Image Frame */}
                    <div className="block">
                        <div className="w-full h-[10.5rem] xs:h-[12rem] sm:h-[14rem] rounded-xl mb-3.5 sm:mb-4 bg-[#0f0e0c] border border-neutral-800 flex items-center justify-center p-2 overflow-hidden relative">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="max-h-full max-w-full object-contain rounded-lg select-none"
                            />
                        </div>

                        {/* Title */}
                        <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
                            <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-[#F3EEDF] drop-shadow-md">
                                {project.title}
                            </h3>
                        </div>
                    </div>

                    {/* Description with Read More Toggle */}
                    <div className="mt-1 mb-3.5 sm:mb-4">
                        <p className={`text-neutral-300 text-xs sm:text-sm leading-relaxed ${!isExpanded && isLongText ? 'line-clamp-3' : ''}`}>
                            {project.description}
                        </p>

                        {isLongText && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setIsExpanded(!isExpanded);
                                }}
                                className="mt-1 text-xs font-semibold text-amber-300 hover:text-amber-200 inline-flex items-center gap-0.5 transition-colors focus:outline-none"
                            >
                                <span>{isExpanded ? 'Show less' : 'Read more'}</span>
                                {isExpanded ? (
                                    <ExpandLessIcon style={{ fontSize: 16 }} />
                                ) : (
                                    <ExpandMoreIcon style={{ fontSize: 16 }} />
                                )}
                            </button>
                        )}
                    </div>
                </div>

                {/* Tech Tags */}
                {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-800/80">
                        {project.tags.slice(0, 5).map((tag, idx) => (
                            <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md bg-[#181611] text-neutral-300 border border-neutral-800 text-[10px] xs:text-[11px] font-mono hover:border-amber-400/40 hover:text-amber-200 transition-colors"
                            >
                                {tag}
                            </span>
                        ))}
                        {project.tags.length > 5 && (
                            <span className="px-1.5 py-0.5 rounded-md bg-[#181611] text-neutral-500 border border-neutral-800 text-[10px] xs:text-[11px] font-mono">
                                +{project.tags.length - 5}
                            </span>
                        )}
                    </div>
                )}
            </Tilt>
        </motion.div>
    );
};

const Projects = () => {
    return (
        <motion.div
            variants={textVariant()}
            className='bg-black rounded-[24px] sm:rounded-[50px] p-4 xs:p-6 sm:p-14 lg:p-20 pt-12 sm:pt-16 min-h-screen relative overflow-hidden'
        >
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className='text-textdark1 text-4xl xs:text-5xl sm:text-8xl font-semibold text-center p-2 sm:p-8 mb-4 sm:mb-8 z-20'
            >
                PROJECTS
            </motion.h1>

            {/* Ambient Lighting Orbs */}
            <motion.div
                variants={textVariant(1.3)}
                className='bg-gradient-to-b from-[#C9C69288] to-transparent rounded-full w-[15rem] sm:w-[35rem] h-[15rem] sm:h-[35rem] absolute top-[25rem] sm:bottom-20 -right-10 sm:-right-10 z-10 pointer-events-none blur-3xl'
            ></motion.div>
            <motion.div
                variants={textVariant(1.5)}
                className='bg-gradient-to-b from-[#56533588] to-transparent rounded-full w-[25rem] sm:w-[40rem] h-[25rem] sm:h-[40rem] absolute top-[20rem] sm:top-20 -right-28 sm:-right-20 z-10 pointer-events-none blur-3xl'
            ></motion.div>
            <motion.div
                variants={textVariant(1.7)}
                className='bg-gradient-to-b from-[#56533588] to-transparent rounded-full w-[20rem] sm:w-[50rem] h-[20rem] sm:h-[50rem] absolute bottom-[35rem] sm:bottom-36 -left-32 sm:-left-44 z-10 pointer-events-none blur-3xl'
            ></motion.div>
            <motion.div
                variants={textVariant(1.9)}
                className='bg-gradient-to-b from-[#C9C69288] to-transparent rounded-full w-[15rem] sm:w-[35rem] h-[15rem] sm:h-[35rem] absolute bottom-[35rem] sm:bottom-2 -left-28 sm:-left-20 z-10 pointer-events-none blur-3xl'
            ></motion.div>

            {/* Grid of Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 z-20 max-w-7xl mx-auto w-full justify-items-center">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} index={index} />
                ))}
            </div>
        </motion.div>
    );
};

export default SectionWrapper(Projects, 'projects');
