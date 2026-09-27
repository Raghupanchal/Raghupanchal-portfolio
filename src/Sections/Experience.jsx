import React from 'react';
import { motion } from 'framer-motion';
import { textVariant } from '../constants/motion';
import { SectionWrapper } from '../hoc';
import { experience } from '../constants/constants';
import HighlightedText from '../components/Highlight';

const ExpCard = ({ exp, index }) => {
    return (
        <motion.div variants={textVariant(index*0.5)} className="bg-primary rounded-lg shadow-xl border-black border-2 overflow-hidden w-full md:w-[1000px] mx-auto my-6 py-6 flex flex-col md:flex-row z-20">
            <motion.div className='w-full flex justify-center items-center'>
                <motion.img src={exp.image} alt="Company Logo" className="h-28 md:w-3/5 md:h-fit" />
            </motion.div>
            <motion.div className="p-4">
                <motion.h3 className="text-2xl font-semibold mb-1">{exp.title}</motion.h3>
                <motion.p className="text-xl font-semibold mb-1 z-10"><HighlightedText text={exp.company} /></motion.p>
                <motion.p className="text-sm text-gray-700 mb-1">{exp.date}</motion.p>
                <motion.p className="text-sm ">{exp.description}</motion.p>
            </motion.div>
        </motion.div>
    );
}

const Experience = () => {
    return (
        <motion.div variants={textVariant()} className='min-h-screen flex flex-col justify-center p-8 pt-12 sm:p-20 sm:pb-8 relative overflow-hidden'>
            <motion.h1 className='text-textlight text-5xl sm:text-8xl font-semibold text-center p-0 sm:p-8 z-20'>EXPERIENCE</motion.h1>
            <motion.div style={{rotate: -45}} variants={textVariant(0.4)} className='bg-gradient-to-b from-[#464335DD] to-transparent w-[25rem] sm:w-[50rem] h-[25rem] sm:h-[40rem] absolute top-[30rem] sm:top-48 -right-28 sm:-right-80 z-10 rotate'></motion.div>
            <motion.div style={{rotate: -45}} variants={textVariant(0.6)} className='bg-gradient-to-b from-[#D9D6C5] to-transparent w-[15rem] sm:w-[35rem] h-[15rem] sm:h-[35rem] absolute top-[36rem] sm:top-72 -right-10 sm:-right-[17rem] z-10 rotate'></motion.div>
            <motion.div style={{rotate: 45}} variants={textVariant(0.8)} className='bg-gradient-to-b from-[#464335DD] to-transparent w-[20rem] sm:w-[50rem] h-[20rem] sm:h-[50rem] absolute -bottom-40 sm:-bottom-36 -left-32 sm:-left-44 z-10 rotate'></motion.div>
            <motion.div style={{rotate: 45}} variants={textVariant(1)} className='bg-gradient-to-b from-[#D9D6C5] to-transparent w-[15rem] sm:w-[35rem] h-[15rem] sm:h-[35rem] absolute -bottom-40 sm:-bottom-12 -left-20 sm:-left-20 z-10 rotate'></motion.div>
            {experience.map((exp, index) => (
                <ExpCard key={index} exp={exp} index={index} /> 
            ))}
        </motion.div>
    );
}

export default SectionWrapper(Experience, 'experience');
