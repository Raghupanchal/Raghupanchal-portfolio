import React from 'react';
import { motion } from 'framer-motion';
import { textVariant } from '../constants/motion';
import { SectionWrapper } from '../hoc';
import { beyondCode, coding } from '../constants/constants';

const tilts = [-1.5, 1.5, -1, 1];

const StickerCard = ({ item, index }) => {
    return (
        <motion.div
            variants={textVariant(index * 0.15)}
            initial={{ rotate: tilts[index % tilts.length] }}
            whileHover={{
                scale: 1.05,
                y: -12,
                rotate: 0,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
            }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="group relative bg-[#1c1914]/90 backdrop-blur-md rounded-[26px] border border-neutral-700/70 hover:border-amber-400/70 shadow-xl hover:shadow-2xl overflow-hidden w-full max-w-[270px] sm:max-w-[290px] mx-auto p-4 sm:p-5 flex flex-col items-center justify-between text-center z-20 transition-all duration-300 cursor-pointer"
        >
            {/* Visual Canvas */}
            <div className="w-full h-52 sm:h-56 rounded-2xl bg-gradient-to-b from-[#26221b] via-[#1a1813] to-[#12110e] border border-neutral-800/80 p-4 flex items-center justify-center relative overflow-hidden group-hover:border-amber-400/40 transition-all duration-300">
                {/* Soft ambient lighting */}
                <div className="absolute w-28 h-28 bg-amber-400/10 rounded-full blur-xl group-hover:scale-150 group-hover:bg-amber-400/20 transition-all duration-500 pointer-events-none"></div>

                {/* Floating Artwork */}
                <motion.img
                    src={item.image}
                    alt={item.title}
                    animate={{
                        y: [0, -6, 0],
                    }}
                    transition={{
                        duration: 3 + (index * 0.4),
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut"
                    }}
                    whileHover={{
                        scale: 1.12,
                        transition: { duration: 0.25 }
                    }}
                    className="max-h-full max-w-full object-contain filter drop-shadow-xl select-none transition-transform duration-300"
                />
            </div>

            {/* Seamless Title Bar */}
            <div className="w-full pt-3.5 pb-1 flex flex-col items-center justify-center">
                <span className="text-sm sm:text-base font-semibold tracking-wide text-[#EAE6D8] group-hover:text-amber-300 transition-colors duration-300">
                    {item.title}
                </span>
                <span className="w-6 h-0.5 mt-1.5 rounded-full bg-amber-400/30 group-hover:w-12 group-hover:bg-amber-400 transition-all duration-300"></span>
            </div>
        </motion.div>
    );
};

const Coding = () => {
    const list = beyondCode || coding;
    return (
        <motion.div variants={textVariant()} className='min-h-screen flex flex-col justify-center p-6 pt-16 sm:p-20 sm:pb-16 relative overflow-hidden'>
            <motion.h1 className='text-textlight text-5xl sm:text-8xl font-semibold text-center p-0 sm:p-4 mb-3 z-20'>
                BEYOND THE CODE
            </motion.h1>
            <motion.p className='text-center text-textlight/75 text-base sm:text-lg mb-10 sm:mb-14 z-20 max-w-2xl mx-auto'>
                A glimpse into the passions, habits, and daily rituals that fuel my creativity & energy
            </motion.p>

            {/* Background Decorative Rings */}
            <motion.div style={{ rotate: -45 }} variants={textVariant(1.6)} className='bg-gradient-to-b from-[#464335DD] to-transparent w-[25rem] sm:w-[50rem] h-[25rem] sm:h-[40rem] rounded-full absolute top-[20rem] sm:top-48 -right-28 sm:-right-80 z-10 rotate'></motion.div>
            <motion.div style={{ rotate: -45 }} variants={textVariant(1.7)} className='bg-gradient-to-b from-[#D9D6C5] to-transparent w-[15rem] sm:w-[35rem] h-[15rem] sm:h-[35rem] rounded-full absolute top-[26rem] sm:top-72 -right-10 sm:-right-[17rem] z-10 rotate'></motion.div>
            <motion.div style={{ rotate: 45 }} variants={textVariant(1.9)} className='bg-gradient-to-b from-[#464335DD] to-transparent w-[20rem] sm:w-[50rem] h-[20rem] sm:h-[50rem] rounded-full absolute bottom-40 sm:-bottom-36 -left-32 sm:-left-44 z-10 rotate'></motion.div>
            <motion.div style={{ rotate: 45 }} variants={textVariant(2)} className='bg-gradient-to-b from-[#D9D6C5] to-transparent w-[15rem] sm:w-[35rem] h-[15rem] sm:h-[25rem] rounded-full absolute bottom-40 sm:bottom-8 -left-20 sm:-left-8 z-10 rotate'></motion.div>

            {/* Sticker Cards Grid */}
            <motion.div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto w-full z-20 px-2 sm:px-4'>
                {list.map((item, index) => (
                    <StickerCard key={index} item={item} index={index} />
                ))}
            </motion.div>
        </motion.div>
    );
}

export default SectionWrapper(Coding, 'coding');
