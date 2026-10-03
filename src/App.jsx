import React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Home from './Sections/Home'
import About from './Sections/About'
import Navbar from './components/Navbar'
import Experience from './Sections/Experience'
import Projects from './Sections/Projects'
import Coding from './Sections/Coding'
import Certificates from './Sections/Certificates'
import Contact from './Sections/Contact'
import Footer from './Sections/Footer'
import RPAssistant from './components/RPAssistant'

const App = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className='bg-primary overflow-x-hidden w-full relative'>
      {/* Sleek Native App Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 origin-left z-50 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
        style={{ scaleX }}
      />
      <Navbar />
      <Home />
      <About />
      <Experience />
      <Projects />
      <Coding />
      <Certificates />
      <Contact />
      <Footer />
      <RPAssistant />
    </div>
  )
}

export default App
