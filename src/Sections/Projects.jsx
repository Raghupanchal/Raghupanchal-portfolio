import React from 'react';
import Tilt from 'react-parallax-tilt';
import { projects } from '../constants/constants';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import { textVariant } from '../constants/motion';

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div variants={textVariant(index * 0.2)} className="w-full sm:max-w-[500px] z-20">
            <Tilt
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                scale={1.05}
                transitionSpeed={400}
                className="relative p-8 shadow-lg glass rounded-lg"
            >
                <a href={project.github} target='_blank' className='block'>
                    <img
                        src={project.image}
                        alt={project.title}
                        className="h-[8rem] sm:h-[14rem] w-full object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-2xl font-semibold mb-2 text-textdark2 drop-shadow-xl">
                        {project.title}
                    </h3>
                    <p className="text-textdark2 mb-4">{project.description}</p>
                </a>
            </Tilt>
        </motion.div>
    );
};

const Projects = () => {
    return (
        <motion.div
            variants={textVariant()}
            className='bg-black rounded-[50px] p-8 sm:p-20 min-h-screen relative overflow-hidden'
        >
            <motion.h1 className='text-textdark1 text-5xl sm:text-8xl font-semibold text-center p-8 z-20'>
                PROJECTS
            </motion.h1>
            <motion.div
                variants={textVariant(1.3)}
                className='bg-gradient-to-b from-[#C9C692] to-transparent rounded-full w-[15rem] sm:w-[35rem] h-[15rem] sm:h-[35rem] absolute top-[25rem] sm:bottom-20 -right-10 sm:-right-10 z-10'
            ></motion.div>
            <motion.div
                variants={textVariant(1.5)}
                className='bg-gradient-to-b from-[#565335] to-transparent rounded-full w-[25rem] sm:w-[40rem] h-[25rem] sm:h-[40rem] absolute top-[20rem] sm:top-20 -right-28 sm:-right-20 z-10'
            ></motion.div>
            <motion.div
                variants={textVariant(1.7)}
                className='bg-gradient-to-b from-[#565335] to-transparent rounded-full w-[20rem] sm:w-[50rem] h-[20rem] sm:h-[50rem] absolute bottom-[35rem] sm:bottom-36 -left-32 sm:-left-44 z-10'
            ></motion.div>
            <motion.div
                variants={textVariant(1.9)}
                className='bg-gradient-to-b from-[#C9C692] to-transparent rounded-full w-[15rem] sm:w-[35rem] h-[15rem] sm:h-[35rem] absolute bottom-[35rem] sm:bottom-2 -left-28 sm:-left-20 z-10'
            ></motion.div>
            <div className="flex flex-wrap justify-center gap-10 sm:gap-20 z-20">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} index={index} />
                ))}
            </div>
        </motion.div>
    );
};

export default SectionWrapper(Projects, 'projects');
