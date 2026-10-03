import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { SectionWrapper } from '../hoc';
import { motion } from 'framer-motion';
import { textVariant } from '../constants/motion';

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      setScrollPosition(currentPosition);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const calculateOpacity = () => {
    return Math.max(0, 1 - scrollPosition / 500);
  };

  return (
    <motion.div
      variants={textVariant()}
      className="min-h-screen flex justify-center items-center flex-col bg-primary relative overflow-hidden px-5 sm:px-8"
    >
      {/* Background Glowing Circular Halos - Larger and softer on mobile */}
      <motion.div
        variants={textVariant(0.8)}
        className="bg-gradient-to-b from-[#D9D6B2B5] to-transparent rounded-full w-[22rem] xs:w-[26rem] sm:w-[35rem] h-[22rem] xs:h-[26rem] sm:h-[35rem] absolute z-10 pointer-events-none blur-[1px]"
      ></motion.div>
      <motion.div
        variants={textVariant(0.4)}
        className="bg-gradient-to-b from-[#96934520] to-transparent rounded-full w-[30rem] xs:w-[36rem] sm:w-[50rem] h-[30rem] xs:h-[36rem] sm:h-[50rem] absolute z-10 pointer-events-none blur-sm"
      ></motion.div>

      {/* Hero Content */}
      <motion.div
        className="p-2 xs:p-4 sm:p-10 lg:p-12 z-10 pt-10 sm:pt-0 max-w-7xl w-full flex flex-col items-center justify-center text-center my-auto"
        style={{ opacity: calculateOpacity() }}
      >
        <motion.p
          variants={textVariant(0.2)}
          className="text-textlight text-base xs:text-xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.18em] sm:tracking-widest text-center uppercase font-medium sm:font-normal"
        >
          HELLO THERE, <span className="font-bold">I'M</span>
        </motion.p>
        <motion.h1
          variants={textVariant(0.1)}
          className="text-textlight text-[2.75rem] xs:text-[3.5rem] sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[8rem] font-bold tracking-tighter leading-tight sm:leading-none my-1.5 sm:my-3 text-center select-none sm:whitespace-nowrap"
        >
          RAGHU PANCHAL
        </motion.h1>
        <motion.p
          variants={textVariant(0.05)}
          className="text-textlight text-xs xs:text-sm sm:text-lg md:text-xl lg:text-2xl text-center mt-2 sm:mt-3 font-normal tracking-wide max-w-xs xs:max-w-md sm:max-w-3xl mx-auto leading-relaxed"
        >
          Full-Stack Developer | AI/ML Enthusiast | Product Builder
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default SectionWrapper(Home, 'home');
