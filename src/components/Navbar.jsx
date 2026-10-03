import React, { useState, useEffect } from 'react';
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

  const handleNavClick = (e, href) => {
    e.preventDefault();
    onClose();
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = href;
      }
    }, 120);
  };

  return (
    <>
      {/* Dim Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />

      {/* Hamburger Drawer */}
      <motion.div
        className="fixed top-2.5 xs:top-3 sm:top-4 left-2.5 xs:left-3 sm:left-4 h-[calc(100dvh-20px)] sm:h-[calc(100dvh-28px)] max-h-[96vh] w-[82vw] max-w-[320px] sm:w-[360px] md:w-[380px] bg-[#363023] border border-amber-900/30 flex flex-col justify-between z-50 rounded-[24px] sm:rounded-[30px] overflow-hidden p-4 xs:p-5 sm:p-7 pt-20 xs:pt-24 sm:pt-28 pb-5 sm:pb-6 shadow-2xl"
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -80 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute w-72 h-72 bg-amber-500/10 rounded-full blur-3xl -top-10 -right-10 pointer-events-none"></div>

        {/* Drawer Header Badge */}
        <div className="relative z-10 -mt-2 mb-3 px-2 flex items-center justify-between">
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#D7CAA5]/70 uppercase">
            Navigation
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        </div>

        {/* Menu Items Container */}
        <div className="relative z-10 flex-1 flex flex-col justify-start overflow-y-auto no-scrollbar py-2">
          <motion.ul className="text-textdark2 flex flex-col space-y-1 sm:space-y-2">
            {menuItems.map((item, idx) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.22, delay: 0.04 + idx * 0.03 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="group flex items-center justify-between py-2 sm:py-2.5 px-3 rounded-xl hover:bg-white/10 active:bg-white/15 transition-all duration-200"
                >
                  <span className="text-base xs:text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-[#F0EFE8] group-hover:text-amber-200 group-hover:translate-x-1 transition-all duration-200">
                    {item.name}
                  </span>
                  <span className="text-[11px] font-mono text-[#D7CAA5]/50 group-hover:text-amber-200 transition-colors">
                    0{idx + 1}
                  </span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Footer info */}
        <div className="relative z-10 pt-3 border-t border-white/10 text-[11px] sm:text-xs font-mono text-textdark2/70 flex items-center justify-between">
          <span className="text-amber-200/90">&lt;RaghuPanchal /&gt;</span>
          <span>Bengaluru, IN</span>
        </div>
      </motion.div>
    </>
  );
};

const Navbar = () => {
  const [isCross, setIsCross] = useState(false);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isCross) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCross]);

  const handleClick = (e) => {
    e.stopPropagation();
    setIsCross((prev) => !prev);
  };

  const handleCloseOverlay = () => {
    setIsCross(false);
  };

  return (
    <>
      {/* Floating Toggle Button with z-[60] so it sits clearly above drawer and backdrop */}
      <button
        type="button"
        className="fixed w-11 h-11 xs:w-13 xs:h-13 sm:w-16 sm:h-16 top-4 xs:top-5 sm:top-7 left-4 xs:left-5 sm:left-7 z-[60] rounded-full cursor-pointer transition-all duration-300 shadow-2xl bg-[#F0EFE8] border border-amber-900/15 outline-none focus:outline-none flex items-center justify-center active:scale-95"
        onClick={handleClick}
        aria-label={isCross ? 'Close Navigation Menu' : 'Open Navigation Menu'}
      >
        <div className="rounded-full p-2.5 xs:p-3 sm:p-4 flex flex-col justify-evenly items-center h-full w-full">
          <span
            className={`w-5 xs:w-6 sm:w-8 h-[2.5px] sm:h-1 bg-[#262010] rounded-full transition-transform duration-300 origin-center ${
              isCross ? 'rotate-45 translate-y-[6px] xs:translate-y-[7px] sm:translate-y-[9px]' : ''
            }`}
          ></span>
          <span
            className={`w-5 xs:w-6 sm:w-8 h-[2.5px] sm:h-1 bg-[#262010] rounded-full transition-opacity duration-300 ${
              isCross ? 'opacity-0' : 'opacity-100'
            }`}
          ></span>
          <span
            className={`w-5 xs:w-6 sm:w-8 h-[2.5px] sm:h-1 bg-[#262010] rounded-full transition-transform duration-300 origin-center ${
              isCross ? '-rotate-45 -translate-y-[6px] xs:-translate-y-[7px] sm:-translate-y-[9px]' : ''
            }`}
          ></span>
        </div>
      </button>

      <AnimatePresence>
        {isCross && <Overlay onClose={handleCloseOverlay} />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
