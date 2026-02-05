import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { EVENT_DATA } from "../constants/Event_Data";


const colorSchemes = [
  {
    accent: 'border-yellow-400',
    glow: 'shadow-yellow-400/30',
    titleColor: 'text-yellow-300',
    iconBg: 'bg-slate-900',
    iconBorder: 'border-yellow-400',
    buttonGradient: 'from-yellow-500 to-yellow-600',
    dotColor: 'bg-yellow-400',
    accentLight: 'rgba(250, 204, 21, 0.6)'
  },
  {
    accent: 'border-orange-500',
    glow: 'shadow-orange-500/30',
    titleColor: 'text-orange-300',
    iconBg: 'bg-slate-900',
    iconBorder: 'border-orange-500',
    buttonGradient: 'from-orange-500 to-orange-600',
    dotColor: 'bg-orange-500',
    accentLight: 'rgba(249, 115, 22, 0.6)'
  },
  {
    accent: 'border-red-600',
    glow: 'shadow-red-600/30',
    titleColor: 'text-red-400',
    iconBg: 'bg-slate-900',
    iconBorder: 'border-red-600',
    buttonGradient: 'from-red-600 to-red-700',
    dotColor: 'bg-red-600',
    accentLight: 'rgba(220, 38, 38, 0.6)'
  },
  {
    accent: 'border-yellow-500',
    glow: 'shadow-yellow-500/30',
    titleColor: 'text-yellow-400',
    iconBg: 'bg-slate-900',
    iconBorder: 'border-yellow-500',
    buttonGradient: 'from-yellow-600 to-orange-700',
    dotColor: 'bg-yellow-500',
    accentLight: 'rgba(234, 179, 8, 0.6)'
  }
]

// Advanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  },
  hover: {
    scale: 1.02,
    y: -8,
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
    transition: { type: 'spring', stiffness: 400, damping: 20 }
  }
}

const statVariants = {
  hover: {
    scale: 1.15,
    rotate: [0, -2, 2, -2, 0],
    transition: { type: 'spring', stiffness: 300, damping: 10 }
  }
}

const buttonVariants = {
  hover: {
    scale: 1.05,
    y: -4,
    boxShadow: '0 15px 40px rgba(250, 204, 21, 0.4)',
    transition: { type: 'spring', stiffness: 400, damping: 15 }
  },
  tap: {
    scale: 0.92,
    transition: { type: 'spring', stiffness: 600, damping: 15 }
  }
}

const pulseGlow = {
  animate: {
    rotate: 360,
    transition: { duration: 2, repeat: Infinity, ease: "linear" }
  }
}

const glitchAnimation = {
  animate: {
    x: [-20, 0, 20, 0],
    transition: { duration: 0.5, repeat: Infinity, ease: "linear" }
  }
}

export default function Events() {
  const totalEventCount = Object.values(EVENT_DATA)
  .reduce((sum, events) => sum + events.length, 0);

  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentEventIndex, setCurrentEventIndex] = useState(0)

  const scrollRef = useRef(null)
  const cardRefs = useRef([])


  useEffect(() => {
    if (!events.length) return

    const interval = setInterval(() => {
      setCurrentEventIndex(prev => {
        const next = (prev + 1) % events.length
        animateCardTransition(next)
        return next
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [events])

  const animateCardTransition = (index) => {
    const card = cardRefs.current[index]
    if (!card) return

    card.classList.add("animate-card-entrance")
    setTimeout(() => {
      card.classList.remove("animate-card-entrance")
    }, 1000)
  }

  const changeEvent = (index) => {
    setCurrentEventIndex(index)
    animateCardTransition(index)
  }

  const getColorScheme = (index) => {
    return colorSchemes[index % colorSchemes.length]
  }

  return (
    <div className="min-h-screen text-white relative bg-transparent">
      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8">
        <div className="text-center mb-7">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="hover:scale-105 transition-all duration-500 cursor-pointer text-[90px] font-black uppercase tracking-wider"
          style={{
            color: "#FF8C00",
            textShadow: `3px 3px 0px #000, 5px 5px 0px #FFA500, 7px 7px 0px #FFD700`,
            WebkitTextStroke: "2px rgba(0,0,0,0.8)",
            transformStyle: "preserve-3d",
            perspective: 800,
          }}
        >
          Events
        </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100, damping: 15 }}
            className="text-base md:text-lg text-yellow-300 max-w-3xl mx-auto mt-1 font-semibold uppercase tracking-wider"
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
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(250, 204, 21, 0.3)'
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-8 border-b-2 border-orange-500/30 grid md:grid-cols-3 gap-6 text-center"
          >
            <motion.div
              variants={statVariants}
              whileHover="hover"
              className="p-4 rounded-xl bg-slate-800/50 border border-yellow-400/20 hover:border-yellow-400/60 transition"
            >
              <h3 className="text-xs text-yellow-300/80 uppercase font-semibold tracking-wide">Total Events</h3>
              <p className="text-4xl md:text-5xl font-black text-yellow-400 mt-2">
                {totalEventCount}
              </p>
            </motion.div>
            <motion.div
              variants={statVariants}
              whileHover="hover"
              className="p-3 rounded-xl bg-slate-800/50 border border-orange-500/20 hover:border-orange-500/60 transition"
            >
              <h3 className="text-xs text-orange-300/80 uppercase font-semibold tracking-wide">Registration</h3>
              <p className="text-4xl md:text-5xl font-black text-orange-400 mt-2">OPEN</p>
            </motion.div>
            <motion.div
                variants={buttonVariants}
                whileTap="tap"
                className="inline-block"
                >
                <Link
                    to="/events"
                    className="hover:scale-110 transition-all duration-500 inline-block bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 px-4 md:px-8 py-4 font-black uppercase tracking-wider text-black rounded-xl border-2 border-black text-base md:text-lg mt-5"
                >
                    Explore Events →
                </Link>
                </motion.div>

          </motion.div>
        </motion.div>


        {/* Carousel Controls */}
        {events.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100, damping: 15 }}
            className="flex justify-center gap-4 mt-10 flex-wrap"
          >
            {events.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => changeEvent(index)}
                whileHover={{
                  scale: 1.4,
                  boxShadow: '0 0 25px rgba(250, 204, 21, 0.8)'
                }}
                whileTap={{ scale: 0.85 }}
                animate={
                  index === currentEventIndex
                    ? {
                        backgroundColor: '#FCD34D',
                        boxShadow: '0 0 30px rgba(250, 204, 21, 0.9)',
                        scale: 1.2
                      }
                    : {
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        boxShadow: '0 0 0px transparent',
                        scale: 1
                      }
                }
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-4 h-4 border-2 border-yellow-400 rounded-full"
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
