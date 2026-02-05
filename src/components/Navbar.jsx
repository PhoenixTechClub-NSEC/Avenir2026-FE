
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import Fireworks from 'fireworks-js'
import { motion } from 'framer-motion'

const Navbar = () => {
  const audioRef = useRef(null)
  const [speakerOn, setSpeakerOn] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/home-audio_2.mp3')
      audioRef.current.loop = true
    }

    if (speakerOn) audioRef.current.pause()
    else audioRef.current.play()

    setSpeakerOn(!speakerOn)
  }

  const [showRegisterModal, setShowRegisterModal] = useState(false)

  const navigate = useNavigate()
  const [active, setActive] = useState('home')


  const linkClass = (name) =>
    name === active ? 'text-amber-400' : 'text-white hover:text-gray-300'

  const handleNavClick = (name) => {
    setActive(name)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 pointer-events-none"
      />

      <nav className="sticky top-0 z-50 w-full bg-transparent backdrop-blur-xl">
        <div className="flex max-w-7xl items-center justify-between px-4 md:px-auto">

          <img src="/logo.png" alt="logo" className="h-16 md:h-22 ml-2 md:ml-7 mt-1 mr-2 md:mr-8" />

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex cursor-pointer items-center gap-9 text-sm font-medium">
            <li><a href="#" onClick={() => setActive('home')} className={linkClass('home')}>Home</a></li>
            <li><a href="#events" onClick={() => setActive('events')} className={linkClass('events')}>Events</a></li>
            <li><a href="#timeline" onClick={() => setActive('timeline')} className={linkClass('timeline')}>Timeline</a></li>
            <li><a href="#about" onClick={() => setActive('about')} className={linkClass('about')}>About</a></li>
            <li><h3 onClick={() => navigate('/team')} className={linkClass('teams')}>Teams</h3></li>
            <li><a href="#faq" onClick={() => setActive('faq')} className={linkClass('faq')}>FAQ</a></li>
          </ul>

          {/* Desktop Buttons */}
          <div className='hidden lg:flex gap-5 relative'>
            <div
              onClick={()=>{navigate('/campus_rep')}}
              className="relative cursor-pointer rounded-xl px-4 py-2 text-black z-40
              bg-yellow-500
              border border-white/20
              bg-gradient-to-b from-white/10 to-white/5
              transition duration-1000
              hover:scale-105"
            >
              <span className="absolute inset-0 rounded-xl
                opacity-0 hover:opacity-100
                transition-opacity duration-4000"
              />
              <span className="relative z-10 font-semibold">Campus Reps</span>
            </div>

            <div
              onClick={()=>{navigate('/events')}}
              className="relative cursor-pointer rounded-xl px-4 py-2 text-black z-40
              bg-yellow-500
              border border-white/20
              bg-gradient-to-b from-white/10 to-white/5
              transition duration-1000
              hover:scale-105"
            >
              
              <span className="absolute inset-0 rounded-xl
                opacity-0 hover:opacity-100
                transition-opacity duration-4000"
              />
              <span className="relative z-10 font-semibold">Register Now</span>
            </div>

            <button
              onClick={toggleAudio}
              className={`p-2.5 rounded-full transition-all
                ${speakerOn
                  ? 'text-yellow-400 shadow-[0_0_12px_3px_rgba(250,204,21,0.9)]'
                  : 'text-gray-400 hover:text-gray-300'
                }`}
            >
              <i className="fa-solid fa-headphones text-lg" />
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-full transition-all
                ${speakerOn
                  ? 'text-yellow-400 shadow-[0_0_12px_3px_rgba(250,204,21,0.9)]'
                  : 'text-gray-400 hover:text-gray-300'
                }`}
            >
              <i className="fa-solid fa-headphones text-base" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2"
            >
              {mobileMenuOpen ? (
                <i className="fa-solid fa-times text-xl" />
              ) : (
                <i className="fa-solid fa-bars text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10">
            <ul className="flex flex-col items-center gap-4 py-6 text-sm font-medium">
              <li><a href="#" onClick={() => handleNavClick('home')} className={linkClass('home')}>Home</a></li>
              <li><a href="#events" onClick={() => handleNavClick('events')} className={linkClass('events')}>Events</a></li>
              <li><a href="#timeline" onClick={() => handleNavClick('timeline')} className={linkClass('timeline')}>Timeline</a></li>
              <li><a href="#about" onClick={() => handleNavClick('about')} className={linkClass('about')}>About</a></li>
              <li><h3 onClick={() => { navigate('/team'); setMobileMenuOpen(false); }} className={`${linkClass('teams')} cursor-pointer`}>Teams</h3></li>
              <li><a href="#faq" onClick={() => handleNavClick('faq')} className={linkClass('faq')}>FAQ</a></li>
            </ul>

            <div className='flex flex-col items-center gap-4 pb-6 px-4'>
              <div
                onClick={()=>{navigate('/campus_rep'); setMobileMenuOpen(false);}}
                className="relative cursor-pointer rounded-xl px-4 py-2 text-black z-40 w-full max-w-xs text-center
                bg-yellow-500
                border border-white/20
                bg-gradient-to-b from-white/10 to-white/5
                transition duration-1000
                hover:scale-105"
              >
                <span className="absolute inset-0 rounded-xl
                  opacity-0 hover:opacity-100
                  transition-opacity duration-4000"
                />
                <span className="relative z-10 font-semibold">Campus Reps</span>
              </div>

              <div
                onClick={()=>{navigate('/events')}}
                className="relative cursor-pointer rounded-xl px-4 py-2 text-black z-40 w-full max-w-xs text-center
                bg-yellow-500
                border 
                bg-gradient-to-b from-white/10 to-white/5
                transition duration-1000
                hover:scale-105"
              >
                
                <span className="absolute inset-0 rounded-xl
                  opacity-0 hover:opacity-100
                  transition-opacity duration-4000"
                />
                <span className="relative z-10 font-semibold">Register Now</span>
              </div>
            </div>
          </div>
        )}
        
      </nav>

      {showRegisterModal && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setShowRegisterModal(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="
              relative w-[90%] max-w-md
              rounded-2xl border-2 border-yellow-500/60
              bg-gradient-to-br from-black via-zinc-900 to-black
              p-6 text-white
              shadow-[0_0_60px_rgba(250,204,21,0.35)]
            ">

              {/* GTA style header */}
              <h2 className="text-2xl font-black tracking-widest uppercase text-yellow-400 text-center">
                Player Registration
              </h2>
              <p className="text-xs text-gray-400 text-center mt-1">
                Enter the city. Play the game.
              </p>

              {/* Form */}
              <form className="mt-6 space-y-4">
                <input
                  type="text"
                  placeholder="Player Name"
                  className="w-full rounded-lg bg-black/60 border border-yellow-500/30 px-4 py-2
                             focus:outline-none focus:border-yellow-400"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-lg bg-black/60 border border-yellow-500/30 px-4 py-2
                             focus:outline-none focus:border-yellow-400"
                />

                <input
                  type="text"
                  placeholder="College / Crew"
                  className="w-full rounded-lg bg-black/60 border border-yellow-500/30 px-4 py-2
                             focus:outline-none focus:border-yellow-400"
                />

                <button
                  type="submit"
                  className="
                    w-full mt-4 py-3 rounded-xl font-black uppercase tracking-wider
                    bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600
                    text-black
                    hover:scale-105 transition-transform
                  "
                >
                  Enter the Arena
                </button>
              </form>

              {/* Close */}
              <button
                onClick={() => setShowRegisterModal(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Navbar