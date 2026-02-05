import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { timelineData } from "../constants/Timeline_Data";

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="w-full py-20 px-4 text-white">
      {/* Heading - GTA Style */}
      <div className="text-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="transition-all duration-500 hover:scale-102 cursor-pointer text-6xl font-black uppercase tracking-wider"
          style={{
            color: "#FF8C00",
            textShadow: `3px 3px 0px #000, 5px 5px 0px #FFA500, 7px 7px 0px #FFD700`,
            WebkitTextStroke: "2px rgba(0,0,0,0.8)",
            perspective: 800,
          }}
        >
          Timeline
        </motion.h2>

        <div className="flex justify-center items-center gap-3 mt-4">
          {/* LEFT FADE LINE */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.9, ease: "easeOut" }}
            style={{ transformOrigin: "100% 50%" }}
            className="h-1 w-32 bg-linear-to-r from-transparent via-yellow-500 to-yellow-500"
          ></motion.div>

          {/* DIAMOND */}
          <motion.div
            initial={{ scale: 0, rotate: 45 }}
            whileInView={{ scale: 1, rotate: 45 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35, ease: "backOut" }}
            className="w-3 h-3 bg-orange-500 shadow-[0_0_12px_#f97316]"
          />

          {/* RIGHT FADE LINE */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.9, ease: "easeOut" }}
            style={{ transformOrigin: "0% 50%" }}
            className="h-1 w-32 bg-gradient-to-l from-transparent via-yellow-500 to-yellow-500"
          ></motion.div>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-5xl mx-auto">
        {/* Vertical line - Orange/Yellow Gradient */}
        <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-linear-to-b from-yellow-400 via-orange-500 to-transparent" />

        {timelineData.map((item, index) => (
          <TimelineItem
            key={index}
            item={item}
            index={index}
            setActiveIndex={setActiveIndex}
            isActive={activeIndex === index}
          />
        ))}
      </div>
    </section>
  );
}

function TimelineItem({ item, index, setActiveIndex, isActive }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    margin: "-45% 0px -45% 0px", // Only consider it "in view" when it's in the center 10% of viewport
  });

  React.useEffect(() => {
    if (isInView) {
      setActiveIndex(index);
    }
  }, [isInView, index, setActiveIndex]);

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: item.side === "left" ? -60 : 60,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className={`relative mb-7 flex ${
        item.side === "left" ? "justify-start" : "justify-end"
      }`}
    >
      {/* Animated Glowing Card */}
      <motion.div
        animate={{
          boxShadow: [
            "0px 0px 15px rgba(250, 204, 21, 0.1)",
            "0px 0px 30px rgba(249, 115, 22, 0.3)",
            "0px 0px 15px rgba(250, 204, 21, 0.1)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="w-full md:w-[45%] backdrop-blur-md bg-black/60 border border-yellow-500/40 rounded-xl p-5 relative z-10"
      >
        <span className="text-lg text-orange-500 font-black tracking-widest">
          {item.year}
        </span>
        <h3 className="text-2xl font-extrabold mt-1 text-yellow-400 uppercase tracking-tight">
          {item.title}
        </h3>
        <p className="text-gray-300 mt-3 text-sm leading-relaxed font-medium">
          {item.description}
        </p>
      </motion.div>

      {/* Pulsing Dot on Timeline - Only glows when active */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        className="absolute left-1/2 top-10 -translate-x-1/2 z-20"
      >
        {isActive && (
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 w-6 h-6 -ml-0.5 rounded-full bg-yellow-500 blur-md"
          />
        )}
        <div
          className={`relative w-5 h-5 rounded-full border-2 border-black bg-gradient-to-r from-yellow-400 to-orange-600 transition-shadow duration-300 ${
            isActive ? "shadow-[0_0_15px_#facc15]" : "shadow-none"
          }`}
        />
      </motion.div>
    </motion.div>
  );
}