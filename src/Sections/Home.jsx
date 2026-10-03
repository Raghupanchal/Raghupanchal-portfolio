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
    <motion.div variants={textVariant()} className='min-h-screen flex justify-center items-center flex-col bg-primary relative overflow-hidden px-4 sm:px-8'>
      <motion.div variants={textVariant(0.8)} className='bg-gradient-to-b from-[#D9D6B2A9] to-transparent rounded-full w-[15rem] sm:w-[35rem] h-[15rem] sm:h-[35rem] absolute z-10 pointer-events-none'></motion.div>
      <motion.div variants={textVariant(0.4)} className='bg-gradient-to-b from-[#96934510] to-transparent rounded-full w-[22rem] sm:w-[50rem] h-[25rem] sm:h-[50rem] absolute z-10 pointer-events-none'></motion.div>
      <motion.div className='p-6 sm:p-12 lg:p-16 z-10 pt-20 sm:pt-16 max-w-6xl w-full flex flex-col items-start sm:items-center' style={{ opacity: calculateOpacity() }}>
        <motion.p variants={textVariant(0.2)} className='text-textlight text-xl sm:text-4xl md:text-5xl lg:text-6xl tracking-widest text-left sm:text-center w-full'>HELLO THERE, <span className='font-bold'>I'M</span></motion.p>
        <motion.p variants={textVariant(0.1)} className='text-textlight text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold tracking-tighter leading-none my-1 sm:my-3 text-left sm:text-center w-full'>RAGHU PANCHAL</motion.p>
        <motion.p variants={textVariant(0.05)} className='text-textlight text-base sm:text-xl md:text-2xl text-left sm:text-center w-full mt-2 sm:mt-4 font-normal tracking-wide'>Full-Stack Developer | AI/ML Enthusiast | Product Builder</motion.p>
      </motion.div>
    </motion.div>
  )
}

export default SectionWrapper(Home, 'home');
