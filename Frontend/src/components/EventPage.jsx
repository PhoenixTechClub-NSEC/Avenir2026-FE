import { useState } from "react";
import { EVENT_DATA } from "../constants/Event_Data";
import { useNavigate } from "react-router";
import bg from '../assets/Hero.jpeg';
import { motion, AnimatePresence } from "framer-motion";
import { Fireworks } from 'fireworks-js';

const WINGS = ["All", ...Object.keys(EVENT_DATA)];

export default function EventPage() {
  const navigate = useNavigate();
  const [activeWing, setActiveWing] = useState("All");
  const [expandedCards, setExpandedCards] = useState({});

  const toggleDescription = (eventId) => {
    setExpandedCards(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };


  return (
    <>

    <div
      className="fixed inset-0 z-0 bg-cover bg-center blur-sm scale-110"
      style={{ backgroundImage: `url(${bg})` }}
    />

    <div className="fixed inset-0 z-0 bg-black/60" />

    <section
      className="w-full bg-no-repeat bg-cover bg-fixed bg-center px-6 py-16 text-white overflow-hidden"
      style={{ backgroundImage: `url(${bg})` }}
    >

      {/* Content */}
      <div className="relative z-10">
        {/* Back to home button */}
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 20px rgba(255, 165, 0, 0.6)"
          }}
          whileTap={{ scale: 0.95 }}
          className="bg-transparent text-orange-400 px-6 py-3 font-bold text-lg text-center rounded-full cursor-pointer border-2 border-orange-500 hover:bg-orange-500/10 transition-all mb-8 backdrop-blur-sm"
          onClick={()=>{navigate('/')}}
        >
          ← BACK TO HOME
        </motion.button>

        {/* Heading - Keep original styling */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="transition-all duration-500 hover:scale-102 cursor-pointer text-6xl font-black uppercase tracking-wider text-center mb-12"
          style={{
            color: "#FF8C00",
            textShadow: `3px 3px 0px #000, 5px 5px 0px #FFA500, 7px 7px 0px #FFD700`,
            WebkitTextStroke: "2px rgba(0,0,0,0.8)",
            perspective: 800,
          }}
        >
          Explore Events
        </motion.h2>

        {/* Wing Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {WINGS.map((wing, index) => (
            <motion.button
              key={wing}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.1,
                y: -5,
                boxShadow: "0 10px 30px rgba(255, 165, 0, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveWing(wing)}
              className={`px-8 py-3 rounded-full font-bold uppercase tracking-wide transition-all duration-300 backdrop-blur-sm
                ${
                  activeWing === wing
                    ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-black shadow-[0_0_30px_rgba(255,165,0,0.6)]"
                    : "bg-black/40 text-orange-400 border-2 border-orange-700 hover:border-orange-500 hover:bg-orange-500/20"
                }
              `}
            >
              {wing}
            </motion.button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {(activeWing === "All" 
            ? Object.entries(EVENT_DATA).flatMap(([wing, events]) => 
                events.map(event => ({ ...event, wing }))
              )
            : EVENT_DATA[activeWing].map(event => ({ ...event, wing: activeWing }))
          ).map((event, index) => {
            const isExpanded = expandedCards[event.id];
            const shouldTruncate = event.description.length > 120;
            const displayDescription = isExpanded || !shouldTruncate 
              ? event.description 
              : event.description.slice(0, 120) + '...';

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.15, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -15, 
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
                className="relative bg-black/60 backdrop-blur-md rounded-2xl overflow-hidden border-2 border-orange-600/40 hover:border-orange-500 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_48px_rgba(255,165,0,0.3)] group"
              >
                {/* Wing label */}
                <motion.span 
                  whileHover={{ scale: 1.1 }}
                  className="absolute top-4 left-4 z-10 bg-gradient-to-r from-orange-500 to-yellow-500 text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg"
                >
                  {event.wing} presents
                </motion.span>

                {/* Poster with overlay effect */}
                <div className="relative overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.15, rotate: 2 }}
                    transition={{ duration: 0.6 }}
                    src={event.poster}
                    alt="event poster"
                    className="w-full h-56 object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                  
                  {/* Animated border glow on hover */}
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(45deg, transparent, rgba(255,165,0,0.3), transparent)',
                      animation: 'shimmer 2s infinite'
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-2">
                  {/* Date and Fee boxes */}
                  <div>
                    {/* Date box */}
                    <motion.div 
                      className="rounded-xl p-2"
                    >
                      <p className="text-sm font-bold text-orange-100">
                        {event.date || "TBA"}
                      </p>
                    </motion.div>

                    {/* Fee box */}
                    <motion.div 
                      className="rounded-xl p-2 "
                    >
                      <p className="text-xl font-black text-orange-400" style={{ textShadow: "2px 2px 8px rgba(255,165,0,0.6)" }}>
                        Registration Fee: ₹{event.registrationFee}
                      </p>
                    </motion.div>
                  </div>

                  {/* Description with inline Read More button */}
                  <div className="pt-1">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={isExpanded ? 'expanded' : 'collapsed'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm text-gray-300 leading-relaxed max-w-[90%] mx-auto"
                      >
                        {displayDescription}{shouldTruncate && ' '}
                        {shouldTruncate && (
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleDescription(event.id)}
                            className="text-orange-400 text-xs font-semibold hover:text-orange-300 transition-colors uppercase tracking-wide cursor-pointer whitespace-nowrap"
                          >
                            {isExpanded ? '← Read Less' : 'Read More →'}
                          </motion.span>
                        )}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  {/* Full-width Register button */}
                  <motion.button 
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 30px rgba(255, 165, 0, 0.8)",
                      y: -3
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRegister(event.id)}
                    className="w-full px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 text-black transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(255,165,0,0.6)] mt-4"
                  >
                    Register Now
                  </motion.button>
                </div>

                {/* Hover effect: animated corner accents */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-3 border-l-3 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t-3 border-r-3 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-3 border-l-3 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-3 border-r-3 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Add shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
      `}</style>
    </section>
    </>
  );
}