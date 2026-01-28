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
    <section className="w-full px-20 py-24 text-white overflow-x-hidden ">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="transition-all duration-500 hover:scale-105 cursor-pointer text-6xl font-black uppercase tracking-wider"
          style={{
            color: "#FF8C00",
            textShadow: `3px 3px 0px #000, 5px 5px 0px #FFA500, 7px 7px 0px #FFD700`,
            WebkitTextStroke: "2px rgba(0,0,0,0.8)",
            perspective: 800,
          }}
        >
          About Avenir
        </motion.h2>
        
          {/* Decorative divider (DRAW-ON-SCROLL) */}
          <div className="flex items-center justify-center gap-4 mt-6">
            
            {/* LEFT LINE */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.9, ease: "easeOut" }}
              style={{ transformOrigin: "100% 50%" }} // draw from center → left
              className="h-1 w-32 bg-gradient-to-r from-transparent via-yellow-500 to-yellow-500"
            />

            {/* DIAMOND */}
            <motion.div
              initial={{ scale: 0, rotate: 45 }}
              whileInView={{ scale: 1, rotate: 45 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4, ease: "backOut" }}
              className="w-4 h-4 bg-orange-500"
            />

            {/* RIGHT LINE */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.9, ease: "easeOut" }}
              style={{ transformOrigin: "0% 50%" }} // draw from center → right
              className="h-1 w-32 bg-gradient-to-l from-transparent via-yellow-500 to-yellow-500"
            />
          </div>

        
        <p className="font-bold text-gray-300 max-w-2xl mx-auto mt-6 text-lg">
          Discover the magic behind NSEC's premier technical festival and the team that brings it to life.
        </p>
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h3 className="text-4xl font-black uppercase" style={{
            color: "#FFD700",
            textShadow: "2px 2px 0px #000, 4px 4px 0px rgba(255,140,0,0.7)",
            letterSpacing: "0.05em"
          }}>
            The Techno-Magical Experience
          </h3>

          <p className="text-gray-300 text-base leading-relaxed">
            Avenir is NSEC's flagship technical festival, bringing together the brightest minds from across the country to compete, collaborate, and celebrate the marvels of technology and innovation.
          </p>

          <p className="text-gray-300 text-base leading-relaxed">
            With a unique blend of technical competitions, workshops, talks, and cultural events, Avenir creates a platform for students to showcase their talents, learn from experts, and push the boundaries of what's possible.
          </p>

          <p className="text-gray-300 text-base leading-relaxed">
            What sets Avenir apart is our commitment to creating an immersive experience where technology meets creativity, where innovation meets imagination, and where the future is shaped by the brilliant minds of today.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
            <StatCard icon="👥" value={5000} suffix="+" label="Participants" />
            <StatCard icon="📅" value={10} suffix="th" label="Edition" />
            <StatCard icon="🏆" value={50} suffix="+" label="Events" />
            <StatCard icon="💰" value={10} suffix="L+" label="Prize Pool" />
          </div>
        </motion.div>

        {/* Right Image Placeholder (3D GTA-style tilt) */}
        <motion.div
          initial={{ opacity: 0, rotateY: -15, scale: 0.95 }}
          whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ rotateY: 6, rotateX: -4 }}
          className="relative h-[295px] rounded-xl border-2 border-orange-500/50 backdrop-blur-md shadow-[0_8px_40px_rgba(255,140,0,0.4)] flex items-center justify-center mb-40"
          style={{ transformStyle: "preserve-3d" }}
        >
          <img className="rounded-xl object-fill text-gray-400 text-sm font-bold uppercase" src="/Sponsorship_Brochure.png" alt="Sponsorship Brochure" />

          {/* GTA Neon Edge */}
          <div className="absolute inset-0 rounded-xl pointer-events-none border-2 border-yellow-400/80" />
                    {/* Phoenix Club Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 30, x: 30 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="
              absolute 
              -bottom-30 
              -right-14 
              bg-gradient-to-br from-gray-900/95 to-black/90 
              backdrop-blur-md 
              border-2 border-yellow-500/90 
              rounded-lg 
              p-4 
              shadow-[0_15px_50px_rgba(255,215,0,0.6)] 
              max-w-[200px]
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

        </motion.div>
      </div>
    </section>
  );
}

