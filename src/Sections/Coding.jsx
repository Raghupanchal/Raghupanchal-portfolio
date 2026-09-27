import React from 'react';
import { motion } from 'framer-motion';
import { textVariant } from '../constants/motion';
import { SectionWrapper } from '../hoc';
import { coding } from '../constants/constants';
import HighlightedText from '../components/Highlight';

const CodeCard = ({ exp, index }) => {
    return (
        <motion.div
            variants={textVariant(index * 0.5)}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-primary rounded-lg shadow-xl border-black border-2 overflow-hidden w-full sm:w-[500px] h-[300px] sm:h-[400px] mx-auto my-6 py-6 flex flex-col z-20"
        >
            <motion.a href={exp.url} target='_blank'>
            <motion.div className="w-full flex justify-center items-center h-[150px] sm:h-[250px] p-4">
                <motion.img src={exp.image} alt="Logo" className="w-full" />
            </motion.div>
            <motion.div className="p-4">
                <motion.h3 className="text-2xl font-semibold mb-1">{exp.title}</motion.h3>
                <motion.p className="text-md">{exp.description}</motion.p>
            </motion.div>
            </motion.a>
        </motion.div>
    );
};


const Coding = () => {
    return (
        <motion.div variants={textVariant()} className='min-h-screen flex flex-col justify-center p-8 pt-12 sm:p-20 sm:pb-8 relative overflow-hidden'>
            <motion.h1 className='text-textlight text-5xl sm:text-8xl font-semibold text-center p-0 sm:p-8 md:mb-12 z-20'>CODING PROFILES</motion.h1>
            <motion.div style={{ rotate: -45 }} variants={textVariant(1.6)} className='bg-gradient-to-b from-[#464335DD] to-transparent w-[25rem] sm:w-[50rem] h-[25rem] sm:h-[40rem] rounded-full absolute top-[20rem] sm:top-48 -right-28 sm:-right-80 z-10 rotate'></motion.div>
            <motion.div style={{ rotate: -45 }} variants={textVariant(1.7)} className='bg-gradient-to-b from-[#D9D6C5] to-transparent w-[15rem] sm:w-[35rem] h-[15rem] sm:h-[35rem] rounded-full absolute top-[26rem] sm:top-72 -right-10 sm:-right-[17rem] z-10 rotate'></motion.div>
            <motion.div style={{ rotate: 45 }} variants={textVariant(1.9)} className='bg-gradient-to-b from-[#464335DD] to-transparent w-[20rem] sm:w-[50rem] h-[20rem] sm:h-[50rem] rounded-full absolute bottom-40 sm:-bottom-36 -left-32 sm:-left-44 z-10 rotate'></motion.div>
            <motion.div style={{ rotate: 45 }} variants={textVariant(2)} className='bg-gradient-to-b from-[#D9D6C5] to-transparent w-[15rem] sm:w-[35rem] h-[15rem] sm:h-[25rem] rounded-full absolute bottom-40 sm:bottom-8 -left-20 sm:-left-8 z-10 rotate'></motion.div>
            <motion.div className='flex justify-center items-center flex-col lg:flex-row flex-wrap'>
                {coding.map((exp, index) => (
                    <CodeCard key={index} exp={exp} index={index} />
                ))}
            </motion.div>
        </motion.div>
    );
}

export default SectionWrapper(Coding, 'coding');
