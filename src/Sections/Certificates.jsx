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
            variants={textVariant(index * 0.2)}
            whileHover={{
                scale: 1.1,
                rotateY: 15,
                rotateX: -15,
                boxShadow: "0px 10px 30px rgba(255, 255, 255, 0.5)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transition: { duration: 0.5, type: "spring", stiffness: 500 },
            }}
            className="relative p-8 shadow-lg glass w-full sm:max-w-[350px] z-20 glass rounded-lg"
        >
            <motion.a href={project.image} target="_blank" rel="noopener noreferrer">
                <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full rounded-lg mb-4 h-[200px] transition-all"
                />
                <motion.h3 className="text-xl font-semibold text-textdark2 drop-shadow-xl">
                    {project.title}
                </motion.h3>
                <motion.h3 className="text-md font-medium mb-2 text-textdark2 drop-shadow-xl">
                    {project.subtitle}
                </motion.h3>
                <motion.p className="text-textdark2 mb-4 text-sm">{project.text}</motion.p>
                <motion.p className="text-textdark2 mb-4 text-sm">
                    {project.date ? "~" : ""} {project.date}
                </motion.p>
            </motion.a>
        </motion.div>
    );
};


const Certificates = () => {

    return (
        <motion.div className='bg-black rounded-[50px] p-8 sm:p-20 min-h-screen relative overflow-hidden'>
            <motion.h1 className='text-textdark1 text-4xl sm:text-8xl font-semibold text-center p-8 pb-2 z-200'>CERTIFICATES</motion.h1>
            <motion.h1 className='text-textdark1 text-2xl sm:text-5xl font-semibold text-center p-8 pt-2 z-20'><HighlightedText text={'& Achievements'} color='#565335' /></motion.h1>
            {/* <Parallax strength={300}> */}
                <motion.div variants={textVariant(1.3)} className='bg-gradient-to-b from-[#C9C692] to-transparent w-[15rem] sm:w-[25rem] h-[15rem] sm:h-[25rem] absolute top-[105rem] sm:top-[30rem] -right-10 sm:-right-10 z-10 parallax-layer' style={{ clipPath: 'polygon(33% 0%, 66% 0%, 100% 33%, 100% 66%, 66% 100%, 33% 100%, 0% 66%, 0% 33%, 33% 0%)' }} data-speed="20"></motion.div>
                <motion.div variants={textVariant(1.5)} className='bg-gradient-to-b from-[#565335] to-transparent w-[25rem] sm:w-[30rem] h-[25rem] sm:h-[30rem] absolute top-[90rem] sm:top-40 -right-28 sm:-right-20 z-10 parallax-layer' style={{ clipPath: 'polygon(33% 0%, 66% 0%, 100% 33%, 100% 66%, 67% 100%, 33% 100%, 0% 66%, 0% 33%, 33% 0%)' }} data-speed="20"></motion.div>
                <motion.div variants={textVariant(1.7)} className='bg-gradient-to-b from-[#565335] to-transparent w-[20rem] sm:w-[40rem] h-[20rem] sm:h-[40rem] absolute bottom-[100rem] sm:bottom-36 -left-32 sm:-left-0 z-10 parallax-layer' style={{ clipPath: 'polygon(33% 0%, 66% 0%, 100% 33%, 100% 66%, 66% 100%, 33% 100%, 0% 66%, 0% 33%, 33% 0%)' }} data-speed="20"></motion.div>
                <motion.div variants={textVariant(1.9)} className='bg-gradient-to-b from-[#C9C692] to-transparent w-[15rem] sm:w-[25rem] h-[15rem] sm:h-[25rem] absolute bottom-[85rem] sm:bottom-2 -left-28 sm:left-80 z-10 parallax-layer' style={{ clipPath: 'polygon(33% 0%, 66% 0%, 100% 33%, 100% 66%, 66% 100%, 33% 100%, 0% 66%, 0% 33%, 33% 0%)' }} data-speed="20"></motion.div>
                <motion.div variants={textVariant(1.3)} className='bg-gradient-to-b from-[#C9C692] to-transparent w-[15rem] sm:w-[25rem] h-[15rem] sm:h-[25rem] absolute top-[35rem] sm:top-[30rem] -left-10 sm:-left-10 z-10 parallax-layer' style={{ clipPath: 'polygon(33% 0%, 66% 0%, 100% 33%, 100% 66%, 66% 100%, 33% 100%, 0% 66%, 0% 33%, 33% 0%)' }} data-speed="20"></motion.div>
                <motion.div variants={textVariant(1.5)} className='bg-gradient-to-b from-[#565335] to-transparent w-[25rem] sm:w-[30rem] h-[25rem] sm:h-[30rem] absolute top-[20rem] sm:top-40 -left-28 sm:-left-20 z-10 parallax-layer' style={{ clipPath: 'polygon(33% 0%, 66% 0%, 100% 33%, 100% 66%, 67% 100%, 33% 100%, 0% 66%, 0% 33%, 33% 0%)' }} data-speed="20"></motion.div>
                <motion.div variants={textVariant(1.7)} className='bg-gradient-to-b from-[#565335] to-transparent w-[20rem] sm:w-[40rem] h-[20rem] sm:h-[40rem] absolute bottom-[30rem] sm:bottom-36 -right-32 sm:-right-0 z-10 parallax-layer' style={{ clipPath: 'polygon(33% 0%, 66% 0%, 100% 33%, 100% 66%, 66% 100%, 33% 100%, 0% 66%, 0% 33%, 33% 0%)' }} data-speed="20"></motion.div>
                <motion.div variants={textVariant(1.9)} className='bg-gradient-to-b from-[#C9C692] to-transparent w-[15rem] sm:w-[25rem] h-[15rem] sm:h-[25rem] absolute bottom-[20rem] sm:bottom-2 -right-28 sm:right-80 z-10 parallax-layer' style={{ clipPath: 'polygon(33% 0%, 66% 0%, 100% 33%, 100% 66%, 66% 100%, 33% 100%, 0% 66%, 0% 33%, 33% 0%)' }} data-speed="20"></motion.div>
            {/* </Parallax> */}

            <motion.div className="flex flex-wrap justify-center gap-10 sm:gap-20 z-20">
                {achievements.map((project, index) => (
                    <AchCard key={index} project={project} index={index} />
                ))}
            </motion.div>
        </motion.div>
    );
};

export default SectionWrapper(Certificates, 'certificates');
