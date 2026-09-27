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
    <motion.div variants={textVariant()} className='min-h-screen flex justify-center items-center flex-col bg-primary'>
      <motion.div variants={textVariant(0.8)} className='bg-gradient-to-b from-[#D9D6B2A9] to-transparent rounded-full w-[15rem] sm:w-[35rem] h-[15rem] sm:h-[35rem] absolute z-10'></motion.div>
      <motion.div variants={textVariant(0.4)} className='bg-gradient-to-b from-[#96934510] to-transparent rounded-full w-[22rem] sm:w-[50rem] h-[25rem] sm:h-[50rem] absolute z-10'></motion.div>
      <motion.div className='p-10 sm:p-20 z-10' style={{ opacity: calculateOpacity() }}>
        <motion.p variants={textVariant(0.2)} className='text-textlight text-2xl sm:text-7xl tracking-widest text-left'>HELLO THERE, <span className='font-bold'>I'M</span></motion.p>
        <motion.p variants={textVariant(0.1)} className='text-textlight text-6xl sm:text-[9rem] font-bold tracking-tighter mt-0 -sm:mt-10 -ml-1'>RAGHU PANCHAL</motion.p>
        <motion.p variants={textVariant(0.05)} className='text-textlight text-lg sm:text-2xl text-left sm:text-center -sm:mt-8'>Full-Stack Developer | AI/ML Enthusiast | Product Builder</motion.p>
      </motion.div>
    </motion.div>
  )
}

export default SectionWrapper(Home, 'home');
