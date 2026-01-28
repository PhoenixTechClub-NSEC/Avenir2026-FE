import React, { useEffect, useState } from 'react'
import Hero from '../assets/Hero.jpeg'
import Navbar from './Navbar'
import About from './About'
import { motion, useScroll, useTransform } from 'framer-motion'
import Timeline from './Timeline'
import FAQ from './FAQ'
import Footer from './Footer'
import Map from '../assets/Home_map.jpeg'
import Events from './Events'


const Home = () => {

  const { scrollY } = useScroll()

  // Enhanced parallax transforms for the map
  const mapY = useTransform(scrollY, [0, 1000], [0, -250])
  const mapScale = useTransform(scrollY, [0, 600], [1, 1.2])
  const mapRotate = useTransform(scrollY, [0, 600], [0, -5])
  const mapOpacity = useTransform(scrollY, [0, 400, 800], [1, 0.95, 0.75])
  const borderGlow = useTransform(scrollY, [0, 500], [0.3, 0.8])

  // Mouse parallax state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      // Calculate relative position (-1 to 1)
      const x = (clientX / innerWidth - 0.5) * 2
      const y = (clientY / innerHeight - 0.5) * 2
      
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div>
        <div className="brightness-35 fixed inset-0 -z-10">
          <img
            src={Hero}
            alt="hero"
            className="h-full w-full object-cover"/>
        </div>
        <Navbar/>

        <div className="container px-4 sm:px-6 md:px-10 pt-6 md:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-15 items-start">
            {/* Left Content */}
            <div className="text-white ml-0 md:ml-10">
              <div className="relative inline-block p-[1px] overflow-hidden rounded-full">
                {/* The revolving light layer */}
                <motion.div
                  className="absolute inset-[-1000%] opacity-70"
                  style={{
                    background: "conic-gradient(from 0deg, transparent 0%, transparent 30%, #facc15 50%, transparent 70%, transparent 100%)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* The Content Container (Covers the middle to create the "border" look) */}
                <div className="relative bg-black/80 backdrop-blur-xl px-4 py-2 rounded-full text-xs sm:text-sm text-white">
                  PHOENIX PRESENTS
                </div>
              </div>
              
              <h1 
                className="text-[40px] sm:text-[60px] lg:text-[80px] font-extrabold text-yellow-500 leading-tight flex"
                style={{ perspective: "1000px" }}
              >
                {"AVENIR'26".split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: 0, z: 0, textShadow: "0px 0px 0px rgba(255, 165, 0, 0)" }}
                    animate={{ 
                      y: [0, -10, 0],
                      z: [0, 20, 0],
                      textShadow: [
                        "0px 0px 0px rgba(255, 165, 0, 0)",
                        "0px 0px 25px rgba(255, 200, 0, 0.6)",
                        "0px 0px 0px rgba(255, 165, 0, 0)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.15,
                    }}
                    style={{ display: "inline-block" }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>
              
              <p className="text-[13px] sm:text-[15px] text-gray-200 leading-relaxed mb-5">
                The annual Tech Fest of NSEC (Netaji Subhash Engineering College) organized by Phoenix. Join us for 24 hours of coding, creativity, and collaboration.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-yellow-500">Month DD-DD, 2026</span>
                </div>
                <div className="hidden sm:block border-l-2 h-9 border-white"></div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[15px] sm:text-[17px] text-yellow-500">NSEC</span>
                </div>
              </div>
              <hr className='mt-[20px]'/>
              {/* Countdown Timer */}
                <div className="pt-5">
                <h2 className="text-[18px] mb-3 font-semibold">TECH FEST STARTS IN</h2>
                <div className="grid grid-cols-6 gap-2">
                  <div className="bg-black bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-500">00</div>
                    <div className=" mt-2 text-gray-300 text-center">DAYS</div>
                  </div>
                  <div className="bg-black bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-500">00</div>
                    <div className="text-sm mt-2 text-gray-300">HOURS</div>
                  </div>
                  <div className="bg-black bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-500">00</div>
                    <div className="text-sm mt-2 text-gray-300">MIN</div>
                  </div>
                  <div className="bg-black bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-500">00</div>
                    <div className="text-sm mt-2 text-gray-300">SEC</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Map - INSANE PARALLAX */}
            <div className="flex items-start justify-center ml-0 lg:ml-20 pt-3 mt-8 lg:mt-0" style={{ perspective: "1800px" }}>
              <motion.div 
                className="rounded-3xl w-full max-w-md aspect-square relative"
                style={{
                  rotateX: mousePosition.y * 10,
                  rotateY: mousePosition.x * 10,
                  transformStyle: "preserve-3d",
                }}
                transition={{ type: "spring", stiffness: 100, damping: 25 }}
              >
                {/* Outer glowing ring */}
                <motion.div
                  className="absolute inset-0 rounded-3xl blur-3xl"
                  style={{
                    background: "radial-gradient(circle, rgba(255,215,0,1.3) 0%, transparent 80%)",
                    opacity: borderGlow,
                  }}
                  animate={{
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Middle container with padding */}
                <div className="relative p-3 sm:p-5 w-full h-full">
                  


                  {/* Map container with overflow hidden */}
                  <motion.div 
                    className="relative w-full h-full overflow-hidden rounded-2xl"
                    style={{
                      opacity: mapOpacity,
                      transformStyle: "preserve-3d",
                      transform: "translateZ(50px)",
                    }}
                  >
                    {/* Background layer - deeper parallax */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 via-transparent to-yellow-900/20"
                      style={{
                        y: mapY * 0.5,
                        scale: mapScale * 0.95,
                      }}
                    />

                    {/* Main map image - primary parallax */}
                    <motion.img
                      src={Map}
                      alt="NSEC Campus Map"
                      style={{ 
                        y: mapY,
                        scale: mapScale,
                        rotate: mapRotate,
                        x: mousePosition.x * 10,
                      }}
                      className="absolute inset-0 w-full h-full object-cover"
                      transition={{ type: "spring", stiffness: 80, damping: 20 }}
                    />

                    {/* Foreground overlay - faster parallax */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        y: mapY * 1.5,
                        background: "radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.3) 100%)",
                      }}
                    />

                    {/* Scan line effect */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "linear-gradient(180deg, transparent 0%, rgba(255,215,0,0.15) 45%, rgba(255,215,0,0.25) 50%, rgba(255,215,0,0.15) 55%, transparent 100%)",
                      }}
                      animate={{
                        y: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    {/* Grid overlay */}
                    <div 
                      className="absolute inset-0 opacity-20 pointer-events-none"
                      style={{
                        backgroundImage: "linear-gradient(rgba(255,215,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.3) 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                      }}
                    />

                    {/* Border with gradient */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-yellow-500/40 shadow-[0_0_30px_rgba(255,215,0,0.3)]"></div>
                  </motion.div>

                  {/* Corner dots - static anchors */}
                  <div className="absolute top-4 sm:top-7 left-4 sm:left-7 w-2 h-2 bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(255,215,0,0.8)]"></div>
                  <div className="absolute top-4 sm:top-7 right-4 sm:right-7 w-2 h-2 bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(255,215,0,0.8)]"></div>
                  <div className="absolute bottom-4 sm:bottom-7 left-4 sm:left-7 w-2 h-2 bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(255,215,0,0.8)]"></div>
                  <div className="absolute bottom-4 sm:bottom-7 right-4 sm:right-7 w-2 h-2 bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(255,215,0,0.8)]"></div>
                </div>

                {/* Floating particles */}
                <motion.div
                  className="absolute top-1/4 left-1/4 w-1 h-1 bg-yellow-400 rounded-full blur-sm"
                  animate={{
                    y: [-20, 20, -20],
                    x: [-10, 10, -10],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-yellow-300 rounded-full blur-sm"
                  animate={{
                    y: [20, -20, 20],
                    x: [10, -10, 10],
                    opacity: [0.4, 0.9, 0.4],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>


        <section id='events' className='scroll-mt-24'>
          <Events/>
        </section>
        
        <section id='timeline' className="scroll-mt-24">
          <Timeline/>
        </section>
        
        <section id='about' className="scroll-mt-24">
          <About/>
        </section> 

        <section id='faq' className="scroll-mt-24">
          <FAQ/>         
        </section>
        
        <section id='footer' className="scroll-mt-24">
          <Footer/>
        </section>
        
      </div>
    </>
  )
}

export default Home


