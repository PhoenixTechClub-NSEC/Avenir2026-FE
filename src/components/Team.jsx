import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import teamBg from '../assets/team_bg.jpg';

const TEAM_DATA = {
    core: [
        { id: 1, name: 'Core Member 1', role: 'President', image: '', instagram: '#', linkedin: '#' },
        { id: 2, name: 'Core Member 2', role: 'Vice President', image: '', instagram: '#', linkedin: '#' },
        { id: 3, name: 'Core Member 3', role: 'Secretary', image: '', instagram: '#', linkedin: '#' },
    ],
    wings: [
        { id: 1, name: 'Wing Lead 1', role: 'Tech Lead', image: '', instagram: '#', linkedin: '#' },
        { id: 2, name: 'Wing Lead 2', role: 'Design Lead', image: '', instagram: '#', linkedin: '#' },
        { id: 3, name: 'Wing Lead 3', role: 'Marketing Lead', image: '', instagram: '#', linkedin: '#' },
    ],
    dev: [
        { id: 1, name: 'Dev Member 1', role: 'Developer', image: '', instagram: '#', linkedin: '#' },
        { id: 2, name: 'Dev Member 2', role: 'Developer', image: '', instagram: '#', linkedin: '#' },
        { id: 3, name: 'Dev Member 3', role: 'Developer', image: '', instagram: '#', linkedin: '#' },
    ],
};

const TeamCard = ({ member }) => (
    <div
        className="group relative backdrop-blur-xl p-6 rounded-2xl border flex flex-col items-center hover:scale-105 hover:-skew-x-1 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden shadow-lg"
        style={{
            backgroundColor: 'rgba(11, 11, 11, 0.4)',
            borderColor: 'rgba(212, 175, 55, 0.2)'
        }}
    >
        {/* Glitch Overlay on Hover (Palette Tint) */}
        <div
            className="absolute inset-0 opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity duration-300"
            style={{ background: 'linear-gradient(to top right, #D4AF37, #FF8C42)' }}
        ></div>

        <div
            className="w-28 h-28 rounded-full mb-5 p-1 group-hover:animate-spin-slow"
            style={{ background: 'linear-gradient(to top right, #D4AF37, #FF8C42, #2B0F3F)' }}
        >
            <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden border-2" style={{ backgroundColor: '#0B0B0B', borderColor: 'rgba(212, 175, 55, 0.2)' }}>
                {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                    <span className="text-3xl font-bold" style={{ color: '#D4AF37' }}>?</span>
                )}
            </div>
        </div>

        <h3 className="text-xl font-black text-white tracking-wider mb-1 group-hover:text-[#D4AF37] transition-colors uppercase font-sans drop-shadow-sm shadow-black">
            {member.name}
        </h3>

        <p className="text-sm font-bold tracking-widest uppercase mb-6 group-hover:text-white transition-colors drop-shadow-sm" style={{ color: '#FF8C42' }}>
            {member.role}
        </p>

        <div className="flex gap-5 z-10 relative">
            <a href={member.instagram} className="text-gray-400 hover:text-[#FF8C42] transition-colors transform hover:scale-110 font-semibold text-xs uppercase tracking-widest">
                Instagram
            </a>
            <a href={member.linkedin} className="text-gray-400 hover:text-[#D4AF37] transition-colors transform hover:scale-110 font-semibold text-xs uppercase tracking-widest">
                LinkedIn
            </a>
        </div>

        <style>{`
            .group:hover {
                border-color: rgba(255, 140, 66, 0.6) !important;
                box-shadow: 5px 5px 0px rgba(212, 175, 55, 0.4), -5px -5px 0px rgba(255, 140, 66, 0.4);
            }
        `}</style>
    </div>
);

const TabButton = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-8 py-3 rounded-full font-bold uppercase tracking-wider text-xs transition-all duration-300 border-2 transform hover:skew-x-6 hover:scale-110 ${active
            ? 'text-white border-transparent'
            : 'bg-black/50 border-[#2B0F3F] text-gray-400 hover:border-[#D4AF37] hover:text-[#D4AF37]'
            }`}
        style={active ? {
            background: 'linear-gradient(to right, #2B0F3F, #FF8C42)',
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
            transform: 'scale(1.05) skewX(0deg)'
        } : {}}
    >
        {children}
    </button>
);

const Team = () => {
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
            <Link
                to="/"
                className="absolute top-6 left-6 px-6 py-2 backdrop-blur-md border font-bold rounded-full transition-all duration-300 z-10 flex items-center gap-2 group hover:-skew-x-6 text-sm uppercase tracking-widest hover:text-white"
                style={{
                    backgroundColor: 'rgba(11, 11, 11, 0.4)',
                    borderColor: '#D4AF37',
                    color: '#D4AF37'
                }}
            >
                <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span> Back to Home
            </Link>

            <div className="container mx-auto">
                {/* Main Heading: Impact font preserved, Palette Gradient */}
                <h1
                    className="text-6xl md:text-7xl font-extrabold mb-16 text-center text-transparent bg-clip-text drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] tracking-tighter uppercase font-[Impact,sans-serif] hover:scale-105 transition-transform duration-500 cursor-default"
                    style={{ backgroundImage: 'linear-gradient(to bottom, #D4AF37, #FF8C42)' }}
                >
                    Meet Our Team
                </h1>

                {/* Tab Navigation */}
                <div className="flex flex-wrap justify-center gap-6 mb-20">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {TEAM_DATA[activeTab].map((member) => (
                        <TeamCard key={member.id} member={member} />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Team;
