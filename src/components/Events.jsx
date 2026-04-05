import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";



// Advanced animation variants


const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
  hover: {
    scale: 1.02,
    y: -8,
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
    transition: { type: "spring", stiffness: 400, damping: 20 },
  },
};

const statVariants = {
  hover: {
    scale: 1.15,
    rotate: [0, -2, 2, -2, 0],
    transition: { type: "spring", stiffness: 300, damping: 10 },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    y: -4,
    boxShadow: "0 15px 40px rgba(250, 204, 21, 0.4)",
    transition: { type: "spring", stiffness: 400, damping: 15 },
  },
  tap: {
    scale: 0.92,
    transition: { type: "spring", stiffness: 600, damping: 15 },
  },
};



const EVENT_WING_MAP = {
  Robonix: ["EVT00016", "EVT00014", "EVT00017", "EVT00018"],
  Eloquense: ["EVT00011", "EVT00012", "EVT00015", "EVT00019"],
  Cybernix: ["EVT00010", "EVT00013"],
  Virtuix: ["EVT00021"],
  Illustro: ["EVT00007", "EVT00008", "EVT00009", "EVT00020"],
  Flagship: ["EVT00013", "EVT00020", "EVT00022", "EVT00023"]
};

// Prize Pool Data Mapping (Strict ID and Name mapping)
const PRIZE_POOL_MAP = {
  // ROBONIX
  "EVT00016": "₹12,000", "Vice Velocity ( ROBO RACE )": "₹12,000", "Vice Velocity": "₹12,000",
  "EVT00014": "₹10,000", "Chaos Cup ( ROBO SOCCER )": "₹10,000", "Chaos Cup": "₹10,000",
  "EVT00017": "₹5,000",  "Track of the triads (LINE FOLLOWER ROBOT)": "₹5,000", "Track of triads": "₹5,000",
  "EVT00018": "₹27,000", "Steel Heist ( ROBO WAR (8KG) )": "₹27,000", "Steel Heist": "₹27,000",
  
  // ELOQUENSE
  "EVT00011": "₹4,500",  "Butterfly Effect San Andreas Tales": "₹4,500", "Butterfly Effect": "₹4,500",
  "EVT00012": "₹4,500",  "NOT GUILTY GRIND": "₹4,500", "The Not Guilty Grind": "₹4,500",
  "EVT00015": "₹8,000",  "Turf War: The Verbal Shootout": "₹8,000", "Turf War": "₹8,000",
  "EVT00019": "₹6,500",  "Big Brain Heist": "₹6,500", "The Big Brain Heist (Quiz)": "₹6,500",
  
  // ILLUSTRO
  "EVT00007": "₹7,000",  "Vice Visage": "₹7,000", "Vice Visage (Face Painting)": "₹7,000",
  "EVT00008": "₹4,500",  "Vice City Reborn - Best out of Waste": "₹4,500", "Vice City Reborn": "₹4,500",
  "EVT00009": "₹7,000",  "Tales from Vice City - Short Film Competition": "₹7,000", "Tales from Vice City": "₹7,000",
  "EVT00020": "₹5,500",  "Click": "₹5,500", "Click (Photo Exhibition)": "₹5,500",
  
  // CYBERNIX
  "EVT00010": "₹7,500",  "The UX Factor": "₹7,500",
  "EVT00013": "₹23,000", "INNOVATRIX": "₹23,000", "Innovatrix (Hackathon)": "₹23,000",
  
  // VIRTUIX
  "EVT00021": "₹7,500",  "E Football": "₹7,500",
  
  // FLAGSHIP (GENERAL)
  "EVT00022": "₹11,000", "Sansad Syndicate": "₹11,000",
  "EVT00023": "1.5k+ Goodies", "Golden Heist": "1.5k+ Goodies"
};

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  const totalEventCount = events.length;

  const getWingForEvent = (eventId) => {
    return Object.keys(EVENT_WING_MAP).find(wing => wing !== "Flagship" && EVENT_WING_MAP[wing].includes(eventId)) || "General";
  };

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/events/all`);
        const result = await response.json();
        if (result.success && result.data) {
          // Only show active events on home events section
          setEvents(result.data.filter(event => event.status === "active"));
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (!events.length) return;

    const interval = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % events.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [events]);

  const changeEvent = (index) => {
    setCurrentEventIndex(index);
  };

  return (
    <div className="min-h-screen text-white relative bg-transparent">
      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8">
        <div className="text-center mb-7">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="hover:scale-105 transition-all duration-500 cursor-pointer text-5xl sm:text-7xl lg:text-[90px] font-black uppercase tracking-wider"
            style={{
              color: "#FF8C00",
              textShadow: `2px 2px 0px #000, 4px 4px 0px #FFA500, 5px 5px 0px #FFD700`,
              WebkitTextStroke: "1.5px rgba(0,0,0,0.8)",
              transformStyle: "preserve-3d",
              perspective: 800,
            }}
          >
            Events
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            className="text-sm sm:text-base md:text-lg text-yellow-300 max-w-3xl mx-auto mt-1 font-semibold uppercase tracking-wider px-4"
          >
            Compete. Dominate. Celebrate Victory.
          </motion.p>
        </div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          className="bg-gradient-to-br from-slate-950 via-black to-slate-900 border-2 border-yellow-500/50 rounded-2xl overflow-hidden backdrop-blur"
          style={{
            boxShadow:
              "0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(250, 204, 21, 0.3)",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-6 md:p-8 border-b-2 border-orange-500/30 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center"
          >
            <motion.div
              variants={statVariants}
              whileHover="hover"
              className="p-4 rounded-xl bg-slate-800/50 border border-yellow-400/20 hover:border-yellow-400/60 transition"
            >
              <h3 className="text-[10px] sm:text-xs text-yellow-300/80 uppercase font-semibold tracking-wide">
                Total Events
              </h3>
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-yellow-400 mt-2">
                {totalEventCount}
              </p>
            </motion.div>
            <motion.div
              variants={statVariants}
              whileHover="hover"
              className="p-4 rounded-xl bg-slate-800/50 border border-orange-500/20 hover:border-orange-500/60 transition"
            >
              <h3 className="text-[10px] sm:text-xs text-orange-300/80 uppercase font-semibold tracking-wide">
                Prize Pool
              </h3>
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-orange-400 mt-2">
                2L+
              </p>
            </motion.div>
            <motion.div
              variants={buttonVariants}
              whileTap="tap"
              className="flex items-center justify-center pt-2 sm:pt-0"
            >
              <Link
                to="/events"
                className="w-full sm:w-auto hover:scale-110 transition-all duration-500 inline-block bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 px-6 md:px-8 py-4 font-black uppercase tracking-wider text-black rounded-xl border-2 border-black text-sm sm:text-base md:text-lg"
              >
                Explore More →
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Event Carousel */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-12 text-center"
          >
            <p className="text-lg text-yellow-300">Loading events...</p>
          </motion.div>
        ) : events.length > 0 ? (
          <>
            {/* Current Event Display */}
            <motion.div
              key={events[currentEventIndex]?.eventId}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mt-8 md:mt-12 bg-gradient-to-br from-slate-950 via-slate-900 to-black border-2 border-orange-500/50 rounded-2xl overflow-hidden backdrop-blur relative"
              style={{
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 140, 0, 0.3)",
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 p-4 md:p-8">
                {/* Event Image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="rounded-xl overflow-hidden border-2 border-yellow-400/30 relative"
                >
                  <motion.span
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 bg-gradient-to-r from-orange-500 to-yellow-500 text-black text-[10px] sm:text-xs font-bold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full uppercase tracking-wider shadow-lg"
                  >
                    {getWingForEvent(events[currentEventIndex]?.eventId)} presents
                  </motion.span>
                  <img
                    src={events[currentEventIndex]?.posterUrl || "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=600&h=900&auto=format&fit=crop"}
                    alt={events[currentEventIndex]?.name}
                    className="w-full h-full object-contain bg-black/40 aspect-[4/5] lg:aspect-auto max-h-[400px] lg:max-h-none"
                  />
                </motion.div>

                {/* Event Details */}
                <div className="flex flex-col justify-between">
                  <div className="text-center lg:text-left">
                    <motion.h3
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-2xl sm:text-4xl md:text-5xl font-black text-orange-400 mb-2 uppercase leading-tight line-clamp-2"
                    >
                      {events[currentEventIndex]?.name}
                    </motion.h3>

                    {/* Prize Pool Display - Reveal on Hover */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mb-6 inline-block group"
                    >
                      <div className="bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 p-[2px] rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.4)] group-hover:shadow-[0_0_30px_rgba(250,204,21,0.7)] transition-all duration-500">
                        <div className="bg-black/90 backdrop-blur-xl px-6 py-2 rounded-[10px] flex items-center gap-3 relative overflow-hidden">
                          <span className="text-xl sm:text-3xl group-hover:scale-110 transition-transform duration-500">🏆</span>
                          <span className="text-sm sm:text-2xl md:text-3xl font-black text-yellow-400 tracking-tight md:tracking-tighter relative"
                            style={{ textShadow: "0 0 10px rgba(250,204,21,0.5)" }}
                          >
                            {PRIZE_POOL_MAP[events[currentEventIndex]?.eventId] || PRIZE_POOL_MAP[events[currentEventIndex]?.name] ? `${PRIZE_POOL_MAP[events[currentEventIndex]?.eventId] || PRIZE_POOL_MAP[events[currentEventIndex]?.name]} PRIZE POOL` : "EXCITING REWARDS"}
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 leading-relaxed"
                    >
                      {events[currentEventIndex]?.description}
                    </motion.p>

                    {/* Event Info Grid */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="grid grid-cols-2 gap-3 sm:gap-4 mb-8"
                    >
                      <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg border border-yellow-400/20">
                        <p className="text-[10px] text-yellow-300/80 uppercase font-semibold mb-1 tracking-widest">
                          Entry
                        </p>
                        <p className="text-lg sm:text-xl md:text-2xl font-black text-yellow-400">
                          ₹{events[currentEventIndex]?.registrationFee || "0"}
                        </p>
                      </div>

                      <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg border border-orange-500/20">
                        <p className="text-[10px] text-orange-300/80 uppercase font-semibold mb-1 tracking-widest">
                          Date
                        </p>
                        <p className="text-lg sm:text-xl md:text-2xl text-orange-400 font-black">
                          {events[currentEventIndex]?.date || "TBA"}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Register Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-4"
                  >
                    {events[currentEventIndex]?.currentRegistrations >= events[currentEventIndex]?.maxRegistrations ? (
                      <div className="flex-1 bg-red-600 px-6 py-4 font-black uppercase tracking-wider text-white rounded-xl border-2 border-red-600 text-center">
                        Registration Full
                      </div>
                    ) : (
                      <Link
                        to="/events"
                        className="flex-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 px-6 py-4 font-black uppercase tracking-wider text-black rounded-xl border-2 border-black text-center hover:scale-105 transition-all duration-300 shadow-[0_10px_30px_rgba(255,165,0,0.3)]"
                      >
                        Register ASAP
                      </Link>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Carousel Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              className="flex justify-center gap-2 mt-10 flex-wrap"
            >
              {events.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => changeEvent(index)}
                  whileHover={{
                    scale: 1.4,
                    boxShadow: "0 0 25px rgba(250, 204, 21, 0.8)",
                  }}
                  whileTap={{ scale: 0.85 }}
                  animate={
                    index === currentEventIndex
                      ? {
                        backgroundColor: "#FCD34D",
                        boxShadow: "0 0 30px rgba(250, 204, 21, 0.9)",
                        scale: 1.2,
                      }
                      : {
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        boxShadow: "0 0 0px transparent",
                        scale: 1,
                      }
                  }
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-3 h-3 border-2 border-yellow-400 rounded-full"
                />
              ))}
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-12 text-center"
          >
            <p className="text-lg text-yellow-300">No events available</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
