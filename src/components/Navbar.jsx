import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Overlay = ({ onClose }) => {
  return (
    <AnimatePresence>
      <motion.div className={`fixed top-2 sm:top-4 left-2 sm:left-4 h-[98vh] w-[96vw] sm:w-2/3 lg:w-1/3 bg-[#464335] flex items-center justify-center z-40 rounded-[30px] overflow-hidden pl-2`}
        onClick={onClose}
        initial={{ opacity: 0.5, x: '-120px' }}
        animate={{ opacity: 1, x: '0' }}
        exit={{ opacity: 0.5, x: '-120px' }}
        transition={{ duration: 0.7, ease: 'backOut' }}
      >
        <div className='absolute w-[2000px] h-80 bg-[#DAD7C733] -rotate-[40deg] z-0 mt-80'></div>
        <div className="overlay-content text-primarylight z-10">
          <motion.ul className='text-textdark2'>
            <motion.li className='text-6xl sm:text-6xl font-bold hover:text-[#262010] p-4 py-2'
                        initial = {{opacity: 0, x:'-50px'}}
                        animate = {{opacity : 1, x: '0px'}}
                        exit = {{ opacity: 0, x: '-50px'}}
                        transition = {{ duration: 0.5, ease: 'backOut', delay: 0.3}}
                        ><a href='#home'>Home</a></motion.li>
            <motion.li className='text-6xl sm:text-6xl font-bold hover:text-[#262010] p-4 py-2'
                        initial = {{opacity: 0, x:'-50px'}}
                        animate = {{opacity : 1, x: '0px'}}
                        exit = {{ opacity: 0, x: '-50px'}}
                        transition = {{ duration: 0.5, ease: 'backOut', delay: 0.4}}
                        ><a href='#about'>About</a></motion.li>
            <motion.li className='text-5xl sm:text-6xl font-bold hover:text-[#262010] p-4 py-2'
                        initial = {{opacity: 0, x:'-50px'}}
                        animate = {{opacity : 1, x: '0px'}}
                        exit = {{ opacity: 0, x: '-50px'}}
                        transition = {{ duration: 0.5, ease: 'backOut', delay: 0.5}}
                        ><a href='#experience'>Experience</a></motion.li>
            <motion.li className='text-6xl sm:text-6xl font-bold hover:text-[#262010] p-4 py-2'
                        initial = {{opacity: 0, x:'-50px'}}
                        animate = {{opacity : 1, x: '0px'}}
                        exit = {{ opacity: 0, x: '-50px'}}
                        transition = {{ duration: 0.5, ease: 'backOut', delay: 0.6}}
                        ><a href='#projects'>Projects</a></motion.li>
            <motion.li className='text-6xl sm:text-6xl font-bold hover:text-[#262010] p-4 py-2'
                        initial = {{opacity: 0, x:'-50px'}}
                        animate = {{opacity : 1, x: '0px'}}
                        exit = {{ opacity: 0, x: '-50px'}}
                        transition = {{ duration: 0.5, ease: 'backOut', delay: 0.6}}
                        ><a href='#coding'>Profiles</a></motion.li>
            <motion.li className='text-5xl sm:text-6xl font-bold hover:text-[#262010] p-4 py-2'
                        initial = {{opacity: 0, x:'-50px'}}
                        animate = {{opacity : 1, x: '0px'}}
                        exit = {{ opacity: 0, x: '-50px'}}
                        transition = {{ duration: 0.5, ease: 'backOut', delay: 0.7}}
                        ><a href='#certificates'>Certificates</a></motion.li>
            <motion.li className='text-6xl sm:text-6xl font-bold hover:text-[#262010] p-4 py-2'
                        initial = {{opacity: 0, x:'-50px'}}
                        animate = {{opacity : 1, x: '0px'}}
                        exit = {{ opacity: 0, x: '-50px'}}
                        transition = {{ duration: 0.5, ease: 'backOut', delay: 0.8}}
                        ><a href='#contact'>Contact</a></motion.li>
          </motion.ul>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [isCross, setIsCross] = useState(false);

  const handleClick = () => {
    setIsCross((prevIsCross) => !prevIsCross);
  };

  const handleCloseOverlay = () => {
    setIsCross(false);
  };

  return (
    <>
      <div
        className={`fixed w-16 h-16 top-6 sm:top-8 left-6 sm:left-8 navbar-icon z-50 rounded-full ${isCross ? 'cross bg-primary' : ''
          } bg-primary`}
        onClick={handleClick}
      >
        <div className="rounded-full p-4 flex flex-col justify-evenly items-center h-full w-full">
          <div
            className={`w-10 h-1 bg-textlight rounded transition-transform ${isCross ? 'rotate-45 mt-1' : ''
              }`}
          ></div>
          <div
            className={`w-10 h-1 bg-textlight rounded transition-opacity ${isCross ? 'opacity-0' : ''
              }`}
          ></div>
          <div
            className={`w-10 h-1 bg-textlight rounded transition-transform ${isCross ? '-rotate-45 -mt-8' : ''
              }`}
          ></div>
        </div>
      </div>
      <div>{isCross && <Overlay onClose={handleCloseOverlay} />}</div>
    </>
  );
};

export default Navbar;
