import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";



const useCountUp = (end, duration = 7000, shouldStart = true) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) {
      setCount(0);
      return;
    }

    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 60);

    return () => clearInterval(timer);
  }, [end, duration, shouldStart]);

  return count;
};


const StatCard = ({ icon, value, label, suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(value, 800, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-gray-900/95 to-black/90 backdrop-blur-md border-2 border-orange-500/50 rounded-xl p-5 text-center shadow-[0_8px_40px_rgba(0,0,0,0.8)]"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-2xl font-black" style={{
        color: "#FFD700",
        textShadow: "2px 2px 0px #000, 3px 3px 0px rgba(255,140,0,0.7)"
      }}>
        {count}
        {suffix}
      </h3>
      <p className="text-sm text-gray-300 font-bold tracking-tight mt-1">{label}</p>
    </motion.div>
  );
};


export default function About() {
  return (
    <section className="w-full px-6 md:px-20 py-16 md:py-24 text-white overflow-x-hidden">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12 md:mb-16"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="transition-all duration-500 hover:scale-105 cursor-pointer text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-wider"
          style={{
            color: "#FF8C00",
            textShadow: `2px 2px 0px #000, 3px 3px 0px #FFA500, 4px 4px 0px #FFD700`,
            WebkitTextStroke: "1.5px rgba(0,0,0,0.8)",
            perspective: 800,
          }}
        >
          About Avenir
        </motion.h2>
        
          {/* Decorative divider (DRAW-ON-SCROLL) */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-6">
            
            {/* LEFT LINE */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.9, ease: "easeOut" }}
              style={{ transformOrigin: "100% 50%" }} // draw from center → left
              className="h-1 w-16 sm:w-32 bg-gradient-to-r from-transparent via-yellow-500 to-yellow-500"
            />

            {/* DIAMOND */}
            <motion.div
              initial={{ scale: 0, rotate: 45 }}
              whileInView={{ scale: 1, rotate: 45 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4, ease: "backOut" }}
              className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-500"
            />

            {/* RIGHT LINE */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.9, ease: "easeOut" }}
              style={{ transformOrigin: "0% 50%" }} // draw from center → right
              className="h-1 w-16 sm:w-32 bg-gradient-to-l from-transparent via-yellow-500 to-yellow-500"
            />
          </div>

        
        <p className="font-bold text-gray-300 max-w-2xl mx-auto mt-6 text-base sm:text-lg px-4">
          The campus awaits the extravaganza fueled by NSEC's premier techno-management festival, and the energetic team that makes it euphoric.
        </p>
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-14 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6 text-center lg:text-left"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase" style={{
            color: "#FFD700",
            textShadow: "2px 2px 0px #000, 4px 4px 0px rgba(255,140,0,0.7)",
            letterSpacing: "0.05em"
          }}>
           THE TECHNO–STREETS WON'T FORGET !!! 

          </h3>

          <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
            <p>
              Avenir is NSEC’s flagship techno-management festival, bringing together talented students from across the country to compete, collaborate, and innovate. It proudly stands as one of the institution’s most established and anticipated events.
            </p>

            <p>
              The fest comprises of many wings such as Public Speaking, Robotics, Designing, Coding, and E-Gaming, each hosting engaging competitions and skill-based challenges. In addition to technical events, Avenir also features exciting fun activities.
            </p>

            <p>
              Avenir continues to be a platform where technology, creativity, and entertainment come together seamlessly.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6">
            <StatCard icon="👥" value={1000} suffix="+" label="Participants" />
            <StatCard icon="📅" value={20} suffix="th" label="Edition" />
            <StatCard icon="🏆" value={20} suffix="+" label="Events" />
            <StatCard icon="💰" value={2} suffix="L+" label="Prize Pool" />
          </div>
        </motion.div>

        {/* Right Image Placeholder (3D GTA-style tilt) */}
        <div className="relative mt-20 lg:mt-0 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, rotateY: -15, scale: 0.95 }}
            whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ rotateY: 6, rotateX: -4 }}
            className="relative w-full max-w-[500px] aspect-video sm:h-[295px] rounded-xl border-2 border-orange-500/50 backdrop-blur-md shadow-[0_8px_40px_rgba(255,140,0,0.4)] flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <img className="rounded-xl object-contain w-full h-full p-2" src="https://res.cloudinary.com/drvbkxnvu/image/upload/f_auto,q_auto,c_limit/v1771424038/Sponsorship_Brochure_v4xv47.webp" alt="Sponsorship Brochure" />

            {/* GTA Neon Edge */}
            <div className="absolute inset-0 rounded-xl pointer-events-none border-2 border-yellow-400/80" />
          </motion.div>

          {/* Phoenix Club Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="
              relative lg:absolute 
              mt-8 lg:mt-0
              lg:bottom-[-80px] 
              lg:right-[-20px] 
              bg-gradient-to-br from-gray-900/95 to-black/90 
              backdrop-blur-md 
              border-2 border-yellow-500/90 
              rounded-lg 
              p-4 
              shadow-[0_15px_50px_rgba(255,215,0,0.6)] 
              max-w-[280px]
              z-20
            "
          >
            <h4 className="text-center bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent font-black text-md mb-2 uppercase tracking-wide">
              Phoenix Club
            </h4>
            <p className="text-center text-gray-300 text-xs leading-relaxed">
              The organizing team behind Avenir, Phoenix is NSEC's premier technical club dedicated to fostering innovation and technical excellence.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

