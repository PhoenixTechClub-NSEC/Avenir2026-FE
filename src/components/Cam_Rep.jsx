import { useRef, useState, useEffect } from 'react';
import Hero from '../assets/Hero.jpeg';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';


export default function Cam_Rep() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [ambassadors, setAmbassadors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = async (code, id) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  useEffect(() => {
    const fetchAmbassadors = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/campus-ambassadors`);
        const result = await response.json();
        if (result.success) {
          setAmbassadors(result.data);
        } else {
          setError(result.message || 'Failed to load ambassadors');
        }
      } catch (err) {
        console.error('Error fetching ambassadors:', err);
        setError('Network error. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAmbassadors();
  }, []);

  const filteredAmbassadors = ambassadors.filter(ca => {
    const term = searchTerm.toLowerCase();
    return (
      ca.caName?.toLowerCase().includes(term) ||
      ca.collegeName?.toLowerCase().includes(term) ||
      ca.promoCode?.toLowerCase().includes(term) ||
      ca.phone?.toLowerCase().includes(term) ||
      ca.email?.toLowerCase().includes(term)
    );
  });

  // Group filtered ambassadors by college
  const groupedAmbassadors = filteredAmbassadors.reduce((acc, ca) => {
    const college = ca.collegeName || 'Other';
    if (!acc[college]) {
      acc[college] = [];
    }
    acc[college].push(ca);
    return acc;
  }, {});

  const collegeNames = Object.keys(groupedAmbassadors).sort();

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
              placeholder="Search by Name, College, or Promo Code..."
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
              Found {filteredAmbassadors.length} {filteredAmbassadors.length === 1 ? 'ambassador' : 'ambassadors'}
            </motion.p>
          )}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full mb-4"
            />
            <p className="text-orange-400 font-bold animate-pulse tracking-widest uppercase">Fetching Ambassador Data...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <div className="text-red-500 text-4xl mb-4">⚠</div>
            <h3 className="text-2xl font-bold text-white mb-2">{error}</h3>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-orange-500 text-black font-bold rounded-lg"
            >
              Retry
            </button>
          </div>
        )}

        {/* Colleges Grid */}
        <div className="space-y-16">
          {!loading && !error && collegeNames.length > 0 ? (
            collegeNames.map((collegeName, index) => (
              <motion.section
                key={collegeName}
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
                      <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider">
                        {collegeName}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Representatives Cards */}
                <div className='w-full'>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {groupedAmbassadors[collegeName].map((rep, i) => (
                      <motion.div
                        key={rep.caId}
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
                      >
                        {/* Profile Badge */}
                        <div className="absolute top-4 right-4 text-orange-500 opacity-20 group-hover:opacity-100 transition-opacity">
                          <i className="fas fa-id-badge text-2xl"></i>
                        </div>

                        {/* Profile Icon / Image Placeholder */}
                        <div className="relative mx-auto w-24 h-24 mb-6">
                          <div
                            className="w-full h-full rounded-full flex items-center justify-center border-2 border-orange-500/50 bg-orange-500/10 text-orange-500 text-3xl font-black overflow-hidden"
                          >
                            {rep.profilePicUrl ? (
                              <img
                                src={rep.profilePicUrl}
                                alt={rep.caName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              rep.caName?.charAt(0)
                            )}
                          </div>
                        </div>

                        {/* Name */}
                        <h3 className="mb-2 text-center text-xl font-black text-white uppercase tracking-tight">
                          {rep.caName}
                        </h3>

                        <p className="text-orange-400 text-xs text-center font-bold uppercase tracking-widest mb-4 opacity-60">
                          Campus Representative
                        </p>

                        <div className="space-y-3 mb-6">
                          <a href={`tel:${rep.phone}`} className="flex items-center justify-center gap-2 text-gray-400 hover:text-orange-500 transition-colors group/link">
                            <i className="fas fa-phone-alt text-[10px] opacity-50 group-hover/link:opacity-100"></i>
                            <span className="text-xs font-semibold tracking-wider font-mono">{rep.phone}</span>
                          </a>
                          <a href={`mailto:${rep.email}`} className="flex items-center justify-center gap-2 text-gray-400 hover:text-orange-500 transition-colors group/link">
                            <i className="fas fa-envelope text-[10px] opacity-50 group-hover/link:opacity-100"></i>
                            <span className="text-[10px] font-semibold tracking-tight truncate max-w-[180px] font-mono">{rep.email}</span>
                          </a>
                        </div>

                        {/* Promo Code Label */}
                        <div className="text-[10px] text-gray-500 uppercase tracking-[0.2em] text-center mb-2">
                          Assigned Promo Code
                        </div>

                        {/* Referral Code */}
                        <div
                          className="px-4 py-3 rounded-xl text-center font-bold relative group/code cursor-pointer transition-all duration-300 hover:border-orange-500 overflow-hidden"
                          style={{
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid rgba(255,165,0,0.1)',
                          }}
                          onClick={() => handleCopy(rep.promoCode, rep.caId)}
                        >
                          <div className="relative z-10 flex items-center justify-center gap-3">
                            <span className="text-white tracking-[0.15em] font-mono text-lg">
                              {rep.promoCode}
                            </span>
                            <motion.span
                              whileHover={{ scale: 1.2 }}
                              className="text-orange-500 text-sm"
                            >
                              <i className="fa-regular fa-clipboard"></i>
                            </motion.span>
                          </div>

                          {/* Copy feedback overlay */}
                          <AnimatePresence>
                            {copiedId === rep.caId && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-orange-500 flex items-center justify-center text-black text-xs font-black uppercase tracking-tighter"
                              >
                                Copied to Clipboard!
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>
            ))
          ) : !loading && !error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No matching representatives found</h3>
              <p className="text-gray-400">Try adjusting your search to find your Campus Ambassador.</p>
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  );
}