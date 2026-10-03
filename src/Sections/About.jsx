import React from 'react';
import profilePic from '../assets/images/profile pic.jpg';
import Education from '../components/Education';
import { motion } from 'framer-motion';
import { fallText, textVariant } from '../constants/motion';
import { SectionWrapper } from '../hoc';
import AnimatedTitle from '../components/AnimatedTitle';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Skills from '../components/Skills';

const CustomBullet = ({ children }) => (
    <li className="text-textdark2 text-xs sm:text-base md:text-[1.05rem] lg:text-[1.15rem] leading-relaxed sm:leading-8 flex items-start gap-2.5 sm:gap-3">
        <DoubleArrowIcon className="text-amber-200 mt-0.5 sm:mt-1.5 flex-shrink-0 text-sm sm:text-base md:text-lg" />
        <span className="flex-1">{children}</span>
    </li>
);

const About = () => {
    return (
        <motion.div variants={textVariant()} className='bg-black flex flex-col justify-center rounded-[24px] sm:rounded-[50px] p-4 sm:p-16 lg:p-20 pt-12 sm:pt-16 pb-8 relative overflow-hidden'>
            <AnimatedTitle text={"ABOUT ME"} />
            <motion.div variants={textVariant(0.8)} className='bg-gradient-to-b from-[#C9C6B288] to-transparent rounded-full w-[15rem] sm:w-[35rem] h-[15rem] sm:h-[35rem] absolute top-[25rem] sm:top-72 -right-10 sm:right-10 z-10 blur-2xl pointer-events-none'></motion.div>
            <motion.div variants={textVariant(0.4)} className='bg-gradient-to-b from-[#46433588] to-transparent rounded-full w-[25rem] sm:w-[40rem] h-[25rem] sm:h-[40rem] absolute top-[20rem] sm:top-40 -right-28 sm:-right-20 z-10 blur-2xl pointer-events-none'></motion.div>
            <motion.div variants={textVariant(1.4)} className='bg-gradient-to-b from-[#46433588] to-transparent rounded-full w-[20rem] sm:w-[50rem] h-[20rem] sm:h-[50rem] absolute -bottom-32 sm:-bottom-36 -left-32 sm:-left-44 z-10 blur-2xl pointer-events-none'></motion.div>
            <motion.div variants={textVariant(1.8)} className='bg-gradient-to-b from-[#C9C6B288] to-transparent rounded-full w-[15rem] sm:w-[35rem] h-[15rem] sm:h-[35rem] absolute -bottom-28 sm:-bottom-12 -left-28 sm:-left-20 z-10 blur-2xl pointer-events-none'></motion.div>
            
            {/* Side by side on md and above */}
            <div className='flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-14 p-1 sm:p-6 md:p-8 z-20 max-w-7xl mx-auto w-full'>
                <motion.div variants={textVariant(0.5)} className='w-full md:w-[35%] lg:w-[30%] flex justify-center md:justify-end items-center flex-shrink-0'>
                    <div className="relative group">
                        {/* Animated Gradient Glow Aura */}
                        <div className="absolute -inset-1 rounded-[24px] bg-gradient-to-r from-amber-500/40 via-amber-300/30 to-amber-600/40 blur-lg opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse pointer-events-none"></div>
                        
                        <img 
                            src={profilePic} 
                            alt='Raghu Panchal' 
                            className='relative w-[170px] xs:w-[200px] sm:w-[240px] md:w-[260px] lg:w-[300px] max-w-full rounded-[20px] shadow-2xl object-cover border-2 border-amber-400/30 group-hover:border-amber-400/70 transition-all duration-300'
                        />
                    </div>
                </motion.div>
                
                <motion.div variants={textVariant(0.5)} className='w-full md:w-[65%] lg:w-[70%] flex flex-col justify-center md:pl-4 lg:pl-8'>
                    <ul className='flex flex-col space-y-3.5 sm:space-y-5'>
                        <CustomBullet>
                            I’m a <span className='text-amber-200 font-semibold'>Software Engineer | AI/ML</span> who enjoys turning ideas into products that are simple, useful, and well built. I like working from the ground up — understanding the problem, designing the experience, and building the technology behind it.
                        </CustomBullet>
                        <CustomBullet>
                            My work spans <span className='text-amber-200 font-semibold'>full-stack development, AI, Computer Vision, and modern web technologies</span>, with hands-on experience across frontend, backend, databases, and cloud.
                        </CustomBullet>
                        <CustomBullet>
                            I’m driven by curiosity, problem-solving, and the habit of learning by building. <span className='text-amber-200 font-semibold'>I care about writing good software, solving meaningful problems, and continuously getting better.</span>
                        </CustomBullet>
                    </ul>
                </motion.div>
            </div>

            <motion.div variants={textVariant(1)} className='p-0 sm:p-12 z-20 mt-6 sm:mt-8'>
                <motion.h1 className='text-textdark1 text-3xl sm:text-6xl font-semibold text-center p-0 sm:p-8 mb-2 sm:mb-4'>Education</motion.h1>
                <Education />
            </motion.div>

            <motion.div variants={textVariant(1)} className='p-0 sm:p-12 z-20 mt-6 sm:mt-8'>
                <motion.h1 className='text-textdark1 text-3xl sm:text-6xl font-semibold text-center p-0 sm:p-8 mb-2 sm:mb-4'>Skills</motion.h1>
                <Skills />
            </motion.div>
        </motion.div>
    );
}

export default SectionWrapper(About, 'about');
