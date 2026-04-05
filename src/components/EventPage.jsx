import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
const bg = "https://res.cloudinary.com/drvbkxnvu/image/upload/v1775193580/ChatGPT_Image_Jan_9_2026_09_51_19_PM_jzyc55.png"
// event id added to wings anindita
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

const WINGS = ["All", ...Object.keys(EVENT_WING_MAP)];

export default function EventPage() {
  const navigate = useNavigate();
  const [activeWing, setActiveWing] = useState("All");
  const [expandedCards, setExpandedCards] = useState({});
  const [apiEvents, setApiEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/events/all`);
        const result = await response.json();
        if (result.success) {
          setApiEvents(result.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const toggleDescription = (eventId) => {
    setExpandedCards(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  const handleRegister = (event) => {
    navigate(`/events/${event.eventId}`);
  };

  const getWingForEvent = (eventId) => {
    return Object.keys(EVENT_WING_MAP).find(wing => wing !== "Flagship" && EVENT_WING_MAP[wing].includes(eventId)) || "General";
  };

  const filteredEvents = (activeWing === "All"
    ? apiEvents
      .filter(event => event.status === "active")
      .map(event => ({ ...event, wing: getWingForEvent(event.eventId) }))
    : apiEvents
      .filter(event => EVENT_WING_MAP[activeWing]?.includes(event.eventId) && event.status === "active")
      .map(event => ({ ...event, wing: getWingForEvent(event.eventId) }))
  );


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
            onClick={() => { navigate('/') }}
          >
            ← BACK TO HOME
          </motion.button>

          {/* Heading - Keep original styling */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="transition-all duration-500 hover:scale-102 cursor-pointer text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-wider text-center mb-8 md:mb-12 px-4"
            style={{
              color: "#FF8C00",
              textShadow: `2px 2px 0px #000, 4px 4px 0px #FFA500, 6px 6px 0px #FFD700`,
              WebkitTextStroke: "1px rgba(0,0,0,0.8)",
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
                ${activeWing === wing
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
            {loading ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full mb-4"
                />
                <p className="text-orange-400 font-bold animate-pulse tracking-widest uppercase">Loading...</p>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-500 text-xl font-medium tracking-wide">No events found.</p>
              </div>
            ) : (
              filteredEvents.map((event, index) => {
                const isExpanded = expandedCards[event.eventId];
                const description = event.description || "No description available for this protocol.";
                const shouldTruncate = description.length > 120;
                const displayDescription = isExpanded || !shouldTruncate
                  ? description
                  : description.slice(0, 120) + '...';

                return (
                  <motion.div
                    key={event.eventId}
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
                        src={event.posterUrl || "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=600&h=900&auto=format&fit=crop"}
                        alt={event.name}
                        className="w-full h-56 object-contain bg-black/40"
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
                    <div className="p-6 pt-3 space-y-4">
                      {/* Prize Pool Header Strip - Reveal on Hover */}
                      <motion.div
                        className="bg-gradient-to-r from-yellow-600/20 via-yellow-400/30 to-yellow-600/20 py-2.5 px-4 rounded-lg border-x-2 border-yellow-500/50 flex items-center justify-center gap-2 group-hover:bg-yellow-500/30 group-hover:scale-105 transition-all duration-500 overflow-hidden relative"
                        style={{
                          boxShadow: "0 0 15px rgba(250, 204, 21, 0.15)"
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-2"
                            style={{
                              textShadow: "0 0 12px rgba(250, 204, 21, 0.6)"
                            }}
                          >
                            <span className="text-2xl sm:text-2xl group-hover:scale-110 transition-transform duration-500">🏆</span>
                            <span className="text-sm sm:text-lg md:text-xl font-black text-yellow-400 tracking-tight sm:tracking-tighter relative"
                              style={{ textShadow: "0 0 10px rgba(250,204,21,0.5)" }}
                            >
                              {PRIZE_POOL_MAP[event.eventId] || PRIZE_POOL_MAP[event.name] ? `${PRIZE_POOL_MAP[event.eventId] || PRIZE_POOL_MAP[event.name]} PRIZE POOL` : "EXCITING REWARDS"}
                            </span>
                          </span>
                        </div>

                        {/* Animated shimmer overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                      </motion.div>

                      <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white leading-tight uppercase group-hover:text-orange-400 transition-colors line-clamp-2">
                        {event.name}
                      </h3>

                      {/* Date and Fee boxes */}
                      <div className="flex flex-col gap-1">
                        {/* Date box */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Date:</span>
                          <p className="text-sm font-bold text-orange-100">
                            {event.date || "TBA"}
                          </p>
                        </div>

                        {/* Fee box */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Entry Fee:</span>
                          <p className="text-lg font-black text-orange-400" style={{ textShadow: "2px 2px 8px rgba(255,165,0,0.4)" }}>
                            ₹{event.registrationFee !== undefined ? event.registrationFee : "0"}
                          </p>
                        </div>
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
                                onClick={() => toggleDescription(event.eventId)}
                                className="text-orange-400 text-xs font-semibold hover:text-orange-300 transition-colors uppercase tracking-wide cursor-pointer whitespace-nowrap"
                              >
                                {isExpanded ? '← Read Less' : 'Read More →'}
                              </motion.span>
                            )}
                          </motion.p>
                        </AnimatePresence>
                      </div>

                      {event.currentRegistrations >= event.maxRegistrations ? (
                        <motion.button
                          whileHover={{
                            scale: 1.02,
                            boxShadow: "0 0 12px rgba(255, 0, 0, 0.8)",
                          }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => alert("Registration is full for this event.")}
                          className="w-full px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-full bg-red-600 text-white transition-all duration-300 shadow-lg mt-4"
                        >
                          Registration Full
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{
                            scale: 1.05,
                            boxShadow: "0 0 30px rgba(255, 165, 0, 0.8)",
                            y: -3
                          }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRegister(event)}
                          className="w-full px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-black transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(255,165,0,0.6)] mt-4"
                        >
                          Register
                        </motion.button>
                      )}
                    </div>

                    {/* Hover effect: animated corner accents */}
                    <div className="absolute top-0 left-0 w-12 h-12 border-t-3 border-l-3 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-0 right-0 w-12 h-12 border-t-3 border-r-3 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 w-12 h-12 border-b-3 border-l-3 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-3 border-r-3 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                );
              })
            )}
          </div>

        </div>

        {/* Add shimmer animation */}
        <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
      `}</style>
      </section>
    </>
  );
}