import React from 'react';
import { motion } from 'framer-motion';
import { textVariant } from '../constants/motion';
import { SectionWrapper } from '../hoc';
import { beyondCode, coding } from '../constants/constants';

const tilts = [-1.5, 1.5, -1, 1.2];

const StickerCard = ({ item, index }) => {
    return (
        <motion.div
            variants={textVariant(index * 0.2)}
            initial={{ rotate: tilts[index % tilts.length] }}
            whileHover={{
                scale: 1.05,
                y: -12,
                rotate: 0,
                boxShadow: "0 25px 50px -12px rgba(70, 67, 53, 0.35)"
            }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="bg-primary/90 backdrop-blur-md rounded-[32px] shadow-lg hover:shadow-2xl overflow-hidden w-full max-w-[320px] sm:max-w-[340px] min-h-[440px] sm:min-h-[470px] mx-auto my-4 p-6 sm:p-7 flex flex-col items-center justify-between text-center z-20 transition-all duration-300 group"
        >
            {/* Sticker Image with continuous floating & hover zoom animation */}
            <div className="w-full flex justify-center items-center h-48 sm:h-56 p-2 mb-3 relative">
                {/* Subtle soft background aura */}
                <div className="absolute w-36 h-36 bg-gradient-to-tr from-[#DAD7C7]/60 to-transparent rounded-full blur-xl -z-10 group-hover:scale-125 transition-transform duration-500"></div>

                <motion.img
                    src={item.image}
                    alt={item.title}
                    animate={{
                        y: [0, -7, 0],
                        rotate: [0, index % 2 === 0 ? 1.5 : -1.5, 0]
                    }}
                    transition={{
                        duration: 3 + (index * 0.6),
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut"
                    }}
                    whileHover={{
                        scale: 1.14,
                        rotate: index % 2 === 0 ? 4 : -4,
                        transition: { duration: 0.3 }
                    }}
                    className="max-h-full max-w-full object-contain filter drop-shadow-xl cursor-pointer select-none"
                />
            </div>

            {/* Content Details */}
            <div className="flex flex-col items-center w-full">
                <h3 className="text-xl sm:text-2xl font-bold text-textlight mb-2">{item.title}</h3>
                <p className="text-sm sm:text-base text-textlight/85 leading-relaxed">{item.description}</p>
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
