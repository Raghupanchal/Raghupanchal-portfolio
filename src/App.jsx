import React, { useEffect } from 'react'
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

  return (
    <div className='bg-primary'>
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
