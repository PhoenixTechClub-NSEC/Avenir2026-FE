import { useRef, useState } from 'react';
import { collegesData } from '../constants/Campus_rep_Data';
import Hero from '../assets/Hero.jpeg';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';


export default function Cam_Rep() {
    const codeRefs = useRef({});

    const handleCopy = async (code, index) => {
    const range = document.createRange();
    const selection = window.getSelection();
    const element = codeRefs.current[index];

    if (!element) return;

    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);

    try {
        await navigator.clipboard.writeText(code);
    } catch (err) {
        console.error("Copy failed", err);
    }
    };

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredColleges = collegesData.colleges.filter(college =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* Enhanced background with gradient overlay */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${Hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px)',
            transform: 'scale(1.1)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.85))',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {/* Back button */}
          <button
            onClick={() => navigate('/')}
            className="hover-scale-105 group mb-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            style={{
              background: 'rgba(255,165,0,0.15)',
              border: '2px solid rgba(255,165,0,0.4)',
              color: '#FFD700',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,165,0,0.25)';
              e.currentTarget.style.borderColor = 'rgba(255,165,0,0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,165,0,0.15)';
              e.currentTarget.style.borderColor = 'rgba(255,165,0,0.4)';
            }}
          >
            <span className="text-xl">←</span>
            <span>Back to Home</span>
          </button>

          {/* Page Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-8 text-center transition-all duration-500 hover:scale-102 cursor-pointer text-5xl font-black uppercase tracking-wider"
            style={{
                color: "#FF8C00",
                textShadow: `3px 3px 0px #000, 5px 5px 0px #FFA500, 7px 7px 0px #FFD700`,
                WebkitTextStroke: "2px rgba(0,0,0,0.8)",
                perspective: 800,
            }}
            >
            Know your Campus Representatives
        </motion.h2>
        <div className="mb-20 flex justify-center items-center gap-3 mt-4">
            {/* LEFT FADE LINE */}
            <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.9, ease: "easeOut" }}
            style={{ transformOrigin: "100% 50%" }}
            className="h-1 w-32 bg-gradient-to-r from-transparent via-yellow-500 to-yellow-500"
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
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search your college..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 pl-14 text-lg rounded-2xl outline-none transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '2px solid rgba(255,165,0,0.3)',
                color: '#fff',
                backdropFilter: 'blur(10px)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,165,0,0.6)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,165,0,0.3)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              }}
            />
            <span
              className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl"
              style={{ color: '#FFA500' }}
            >
              🔍
            </span>
          </div>
          
          {/* Search Results Counter */}
          {searchTerm && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-gray-400 text-center"
            >
              Found {filteredColleges.length} {filteredColleges.length === 1 ? 'college' : 'colleges'}
            </motion.p>
          )}
        </motion.div>

        {/* Colleges Grid */}
        <div className="space-y-16">
          {filteredColleges.length > 0 ? (
            filteredColleges.map((college, index) => (
              <motion.section
                key={college.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* College Header */}
                <div
                  className="relative overflow-hidden rounded-2xl mb-8 p-6 sm:p-8"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,165,0,0.2) 0%, rgba(255,215,0,0.1) 100%)',
                    backdropFilter: 'blur(10px)',
                    borderLeft: '6px solid #FFA500',
                    boxShadow: '0 8px 32px rgba(255,165,0,0.15)',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-2 h-16 rounded-full"
                      style={{
                        background: 'linear-gradient(to bottom, #FFD700, #FFA500)',
                      }}
                    />
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white">
                        {college.name}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Representatives Cards */}
                <div className='w-full justify-center flex'>
                    <div className="flex grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-50 justify-items-center">
                    {college.representatives.map((rep, i) => (
                        <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="relative group rounded-2xl p-6 transition-all duration-300"
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,165,0,0.2)',
                            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255,165,0,0.5)';
                            e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,165,0,0.25)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255,165,0,0.2)';
                            e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
                        }}
                        >
                        {/* Instagram Link */}
                          <a
                            href={rep.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-50 text-right text-white hover:text-pink-500 transition-all duration-300"
                            title="View Instagram"
                          >
                            <i className="fab fa-instagram text-2xl" />
                          </a>

                        {/* Profile Image */}
                        <div className="relative mx-auto w-28 h-28 mb-4">
                            <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                                padding: '3px',
                            }}
                            >
                            <img
                                src={rep.image}
                                alt={rep.name}
                                className="w-full h-full rounded-full object-cover"
                                style={{ background: '#fff' }}
                            />
                            </div>
                        </div>

                          {/* Name */}
                          <h3 className="mb-5 text-center text-xl font-bold text-white">
                            {rep.name}
                          </h3>



                        {/* Contact Info */}
                        <div
                            className="flex items-center justify-center gap-2 mb-3 px-4 py-2 rounded-lg"
                            style={{
                            background: 'rgba(255,255,255,0.1)',
                            }}
                        >
                            <span className="text-lg text-yellow-300"><i class="fa-solid fa-phone-volume"></i></span>
                            <span className="text-gray-200 font-medium">{rep.contact}</span>
                        </div>

                        {/* Referral Code */}
                        <div
                            className="mb-4 px-4 py-3 rounded-xl text-center font-bold relative overflow-hidden"
                            style={{
                            background: 'linear-gradient(135deg, rgba(255,165,0,0.3), rgba(255,215,0,0.2))',
                            border: '2px solid rgba(255,165,0,0.4)',
                            }}
                        >
                            <div className="relative z-10 flex items-center justify-center gap-2">
                            <span className="text-lg">🎫</span>
                            <span
                                ref={(el) => (codeRefs.current[`${college.id}-${i}`] = el)}
                                className="text-white tracking-wider select-text"
                                >
                                {rep.referralCode}
                                </span>

                            <button
                                onClick={() =>
                                    handleCopy(rep.referralCode, `${college.id}-${i}`)
                                }
                                className="ml-1 text-black text-xl cursor-pointer hover:scale-110 transition"
                                >

                                <i className="fa-regular fa-clipboard"></i>
                            </button>

                            </div>
                        </div>
                        </motion.div>
                    ))}
                    </div>
                </div>
              </motion.section>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No colleges found</h3>
              <p className="text-gray-400">Try adjusting your search terms</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}