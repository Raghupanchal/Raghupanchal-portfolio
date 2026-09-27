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
    <li className="text-textdark2 sm:text-xl sm:leading-9 px-0 py-2 sm:py-2 sm:px-20 flex items-start">
        <DoubleArrowIcon className="text-amber-200 mr-2 sm:mt-[6px]" size={10} />
        <span>{children}</span>
    </li>
);

const About = () => {
    return (
        <motion.div variants={textVariant()} className='bg-black flex flex-col justify-center rounded-[50px] p-8 pt-12 sm:p-20 sm:pb-8 relative overflow-hidden'>
            <AnimatedTitle text={"ABOUT ME"} />
            <motion.div variants={textVariant(0.8)} className='bg-gradient-to-b from-[#C9C6B2DD] to-transparent rounded-full w-[15rem] sm:w-[35rem] h-[15rem] sm:h-[35rem] absolute top-[25rem] sm:top-72 -right-10 sm:right-10 z-10 overflow-hidden'></motion.div>
            <motion.div variants={textVariant(0.4)} className='bg-gradient-to-b from-[#464335DD] to-transparent rounded-full w-[25rem] sm:w-[40rem] h-[25rem] sm:h-[40rem] absolute top-[20rem] sm:top-40 -right-28 sm:-right-20 z-10 overflow-hidden'></motion.div>
            <motion.div variants={textVariant(1.4)} className='bg-gradient-to-b from-[#464335DD] to-transparent rounded-full w-[20rem] sm:w-[50rem] h-[20rem] sm:h-[50rem] absolute -bottom-32 sm:-bottom-36 -left-32 sm:-left-44 z-10'></motion.div>
            <motion.div variants={textVariant(1.8)} className='bg-gradient-to-b from-[#C9C6B2DD] to-transparent rounded-full w-[15rem] sm:w-[35rem] h-[15rem] sm:h-[35rem] absolute -bottom-28 sm:-bottom-12 -left-28 sm:-left-20 z-10'></motion.div>
            <div className='flex flex-col p-8 flex-wrap lg:flex-row z-20'>
                <motion.div variants={textVariant(0.5)} className='lg:flex-1 flex justify-center lg:justify-end items-center'>
                    <img src={profilePic} alt='Raghu Panchal' className='w-[90vw] sm:w-[50vw] md:w-[25vw] rounded-[20px]'></img>
                </motion.div>
                <motion.div variants={textVariant(0.5)} className='lg:flex-1 flex flex-col justify-center mt-4'>
                    <CustomBullet>
                        I am a <span className='underline decoration-amber-200 text-#D7CC45 font-semibold'>CSE / AI-ML engineering developer</span> with hands-on experience building complete applications, not just academic projects.
                    </CustomBullet>
                    <CustomBullet>
                        Strong frontend background in <span className='underline decoration-amber-200 text-#D7CC45 font-semibold'>React, TypeScript, Next.js, Vite, Tailwind CSS & shadcn/ui</span>.
                    </CustomBullet>
                    <CustomBullet>
                        Robust backend engineering with <span className='underline decoration-amber-200 text-#D7CC45 font-semibold'>Python, Django/DRF, FastAPI, Flask, REST APIs, WebSockets & Celery</span>.
                    </CustomBullet>
                    <CustomBullet>
                        Experienced across databases & cloud infrastructure with <span className='underline decoration-amber-200 text-#D7CC45 font-semibold'>PostgreSQL, Supabase, Redis, Firebase, Cloudflare R2, Vercel & DigitalOcean</span>.
                    </CustomBullet>
                    <CustomBullet>
                        Passionate about AI & Computer Vision including <span className='underline decoration-amber-200 text-#D7CC45 font-semibold'>OpenCV, dlib, TensorFlow/Keras, facial recognition, AI-based automation & OCR</span>.
                    </CustomBullet>
                    <CustomBullet>
                        Creator of production-style systems like <span className='underline decoration-amber-200 text-#D7CC45 font-semibold'>Stalight Campus ERP, NeuroCampus AI & KLABO Marketplace</span>.
                    </CustomBullet>
                </motion.div>
            </div>
            <motion.div variants={textVariant(1)} className='sm:p-12 z-20'>
                <motion.h1 className='text-textdark1 text-5xl sm:text-6xl font-semibold text-center p-0 sm:p-8'>Education</motion.h1>
                <Education />
            </motion.div>
            <motion.div variants={textVariant(1)} className='sm:p-12 z-20'>
                <motion.h1 className='text-textdark1 text-5xl sm:text-6xl font-semibold text-center p-0 sm:p-8'>Skills</motion.h1>
                <Skills />
            </motion.div>
        </motion.div>
    );
}

export default SectionWrapper(About, 'about');
