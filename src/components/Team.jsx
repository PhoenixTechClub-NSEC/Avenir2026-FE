import React, { useState } from 'react';
import teamBg from '../assets/Hero.jpeg';
import { useNavigate } from 'react-router';
import { TEAM_DATA} from '../constants/Team_data';
import { motion } from 'framer-motion';


const TeamCard = ({ member }) => (
  <div
    className="group relative backdrop-blur-xl p-4 rounded-2xl border flex flex-col items-center hover:scale-105 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden shadow-lg"
    style={{ borderColor: 'rgba(212, 175, 55, 0.2)' }}
  >
    {/* Glitch Overlay */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity duration-300" />

    {/* Avatar */}
    <div
      className="w-28 h-28 rounded-full mb-5 p-1"
      style={{ background: 'linear-gradient(to top right, #D4AF37, #FF8C42, #2B0F3F)' }}
    >
      <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-black">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-3xl font-bold text-[#D4AF37]">?</span>
        )}
      </div>
    </div>

    <h3 className="text-xl font-black text-white tracking-wider mb-1 group-hover:text-[#D4AF37] transition-colors uppercase">
      {member.name}
    </h3>

    <p
      className="text-sm font-bold tracking-widest uppercase mb-6 transition-colors"
      style={{ color: '#FF8C42' }}
    >
      {member.role}
    </p>

    <div className="flex gap-5 z-10 relative">
      <a
        target='_blank'
        href={member.instagram}
        className="text-2xl text-gray-400 hover:text-[#FF8C42] transition-transform hover:scale-110 font-semibold uppercase tracking-widest"
      >
        <i class="fa-brands fa-instagram"></i>
      </a>
      <a
        target='_blank'
        href={member.linkedin}
        className="text-2xl text-gray-400 hover:text-[#D4AF37] transition-transform hover:scale-110 font-semibold uppercase tracking-widest"
      >
        <i class="fa-brands fa-linkedin"></i>
      </a>
    </div>

    <style>{`
      .group:hover {
        border-color: rgba(255, 140, 66, 0.6) !important;
        box-shadow:
          5px 5px 0px rgba(212, 175, 55, 0.4),
         -5px -5px 0px rgba(255, 140, 66, 0.4);
      }
    `}</style>
  </div>
);


const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`
      cursor-pointer px-7 py-3 rounded-full font-bold uppercase 
      tracking-wider text-xs transition-all duration-300 
      border-2 transform hover:skew-x-5 hover:scale-110
      ${active 
        ? 'text-white border-transparent scale-105 hover:scale-105 hover:skew-x-5 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]'
        : 'bg-black/50 border-[#2B0F3F] text-gray-400 hover:border-[#D4AF37] hover:text-[#D4AF37]'
      }
    `}
    style={active ? {
      background: 'linear-gradient(to right, #2B0F3F, #FF8C42)',
      WebkitBackgroundClip: 'text, padding-box',
      backgroundClip: 'padding-box',
    } : {}}
  >
    {children}
  </button>
);

const Team = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('core');

    return (
        <div
            className="min-h-screen pt-24 pb-12 px-4 bg-cover bg-center bg-no-repeat bg-fixed relative overflow-x-hidden"
            style={{
                backgroundImage: `linear-gradient(rgba(11, 11, 11, 0.7), rgba(43, 15, 63, 0.85)), url(${teamBg})`
            }}
        >
            <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .group:hover .group-hover\\:animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>

            {/* Back to Home Button */}
            <div
                onClick={()=>{navigate('/')}}
                className="cursor-pointer absolute top-6 left-6 px-6 py-2 backdrop-blur-md border font-bold rounded-full transition-all duration-300 z-10 flex items-center gap-2 group hover:-skew-x-6 text-sm uppercase tracking-widest hover:text-white"
                style={{
                    backgroundColor: 'rgba(11, 11, 11, 0.4)',
                    borderColor: '#D4AF37',
                    color: '#D4AF37'
                }}
            >
                <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span> Back to Home
            </div>

            <div className="container mx-auto">
                {/* Main Heading: Impact font preserved, Palette Gradient */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ rotateY: 10 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="hover:scale-105 cursor-pointer tracking-wider text-6xl md:text-7xl font-extrabold mb-16 text-center bg-clip-text drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] uppercase font-[Impact,sans-serif]  transition-transform duration-500 text-orange-500"
                        style={{
                            textShadow: `2.5px 2.5px 0px #000,4px 4px 0px rgba(250, 204, 21, 1.8)`,
                            transformStyle: "preserve-3d",
                            perspective: 800,
                            backgroundImage: 'linear-gradient(to bottom, #D4AF37, #FF8C42)'
                        }}
                        >
                        Meet Our Team
                        </motion.h2>

                {/* Tab Navigation */}
                <div className="cursor-pointer flex flex-wrap justify-center gap-6 mb-20">
                    <TabButton
                        active={activeTab === 'core'}
                        onClick={() => setActiveTab('core')}
                    >
                        Core Team
                    </TabButton>
                    <TabButton
                        active={activeTab === 'wings'}
                        onClick={() => setActiveTab('wings')}
                    >
                        Wing Leads
                    </TabButton>
                    <TabButton
                        active={activeTab === 'dev'}
                        onClick={() => setActiveTab('dev')}
                    >
                        Dev Team
                    </TabButton>
                </div>

                {/* Active Section Content */}
                <div className="cursor-pointer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {TEAM_DATA[activeTab].map((member) => (
                        <TeamCard key={member.id} member={member} />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Team;