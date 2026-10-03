import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Overlay = ({ onClose }) => {
  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Beyond Code", href: "#coding" },
    { name: "Certificates", href: "#certificates" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Hamburger Drawer */}
      <motion.div
        className="fixed top-3 sm:top-4 left-3 sm:left-4 h-[calc(100vh-24px)] max-h-[96vh] w-[90vw] sm:w-[360px] md:w-[400px] bg-[#464335] flex flex-col justify-between z-40 rounded-[30px] overflow-hidden p-5 sm:p-7 pt-20 sm:pt-24 pb-5 sm:pb-6 shadow-2xl"
        initial={{ opacity: 0.5, x: '-120px' }}
        animate={{ opacity: 1, x: '0' }}
        exit={{ opacity: 0.5, x: '-120px' }}
        transition={{ duration: 0.4, ease: 'backOut' }}
      >
        {/* Diagonal Ribbon Stripe */}
        <div className="absolute w-[2000px] h-80 bg-[#DAD7C733] -rotate-[40deg] z-0 pointer-events-none mt-32"></div>

        {/* Menu Items Container */}
        <div className="relative z-10 flex-1 flex flex-col justify-center my-auto overflow-y-auto no-scrollbar">
          <motion.ul className="text-textdark2 flex flex-col space-y-0.5 sm:space-y-1">
            {menuItems.map((item, idx) => (
              <motion.li
                key={item.name}
                className="text-xl sm:text-2xl md:text-3xl font-bold hover:text-[#262010] py-1 sm:py-1.5 px-2 rounded-xl transition-all duration-200"
                initial={{ opacity: 0, x: '-30px' }}
                animate={{ opacity: 1, x: '0px' }}
                exit={{ opacity: 0, x: '-30px' }}
                transition={{ duration: 0.35, ease: 'backOut', delay: 0.08 + idx * 0.04 }}
              >
                <a href={item.href} onClick={onClose} className="block w-full">
                  {item.name}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Footer info */}
        <div className="relative z-10 pt-3 border-t border-[#DAD7C733] text-xs font-mono text-textdark2/80 flex items-center justify-between">
          <span>&lt;RaghuPanchal /&gt;</span>
          <span>Bengaluru, IN</span>
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
        className={`fixed w-14 h-14 sm:w-16 sm:h-16 top-5 sm:top-7 left-5 sm:left-7 navbar-icon z-50 rounded-full cursor-pointer transition-all duration-300 shadow-xl ${
          isCross ? 'cross bg-primary' : 'bg-primary'
        }`}
        onClick={handleClick}
        aria-label="Navigation Menu"
      >
        <div className="rounded-full p-3.5 sm:p-4 flex flex-col justify-evenly items-center h-full w-full">
          <div
            className={`w-7 sm:w-9 h-1 bg-textlight rounded transition-transform duration-300 ${
              isCross ? 'rotate-45 translate-y-2 sm:translate-y-2.5' : ''
            }`}
          ></div>
          <div
            className={`w-7 sm:w-9 h-1 bg-textlight rounded transition-opacity duration-300 ${
              isCross ? 'opacity-0' : ''
            }`}
          ></div>
          <div
            className={`w-7 sm:w-9 h-1 bg-textlight rounded transition-transform duration-300 ${
              isCross ? '-rotate-45 -translate-y-2 sm:-translate-y-2.5' : ''
            }`}
          ></div>
        </div>
      </div>
      <div>{isCross && <Overlay onClose={handleCloseOverlay} />}</div>
    </>
  );
};

export default Navbar;
