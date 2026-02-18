import { useState, useEffect } from "react";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
// import { EVENT_DATA } from "../constants/Event_Data";
import { useNavigate } from "react-router";
import bg from '../assets/Hero.jpeg';
import { motion, AnimatePresence } from "framer-motion";
// import { Fireworks } from 'fireworks-js';

// event id added to wings anindita
const EVENT_WING_MAP = {
  Robonix: ["EVT00008", "EVT00002", "EVT00003", "EVT00004"],
  Eloquense: ["EVT00005", "EVT00006", "EVT00007", "EVT00008"],
  Cybernix: ["EVT00009", "EVT00010", "EVT00011", "EVT00012"],
  Virtuix: ["EVT00013", "EVT00014", "EVT00015", "EVT00016"],
  Illustro: ["EVT00017", "EVT00018", "EVT00019", "EVT00020"],
  Fun:[]
};

const WINGS = ["All", ...Object.keys(EVENT_WING_MAP)];

export default function EventPage() {
  const navigate = useNavigate();
  const [activeWing, setActiveWing] = useState("All");
  const [expandedCards, setExpandedCards] = useState({});
  const [apiEvents, setApiEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({});
  const [promoCode, setPromoCode] = useState("");
  const [promoStatus, setPromoStatus] = useState(null); // null, 'loading', 'valid', 'invalid'
  const [promoDetails, setPromoDetails] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastSubmissionData, setLastSubmissionData] = useState(null);

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
    setSelectedEvent(event);
    setFormData({});
    setPromoCode("");
    setPromoStatus(null);
    setPromoDetails(null);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const handleInputChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleFileChange = (fieldId, file) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: file
    }));
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  const validatePromoCode = async (code) => {
    if (!code || code.length < 3) {
      setPromoStatus(null);
      return;
    }
    setPromoStatus('loading');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/campus-ambassadors/validate/${code}`);
      const result = await response.json();
      if (result.valid) {
        setPromoStatus('valid');
        setPromoDetails(result.data);
      } else {
        setPromoStatus('invalid');
        setPromoDetails(null);
      }
    } catch (error) {
      console.error("Promo validation error", error);
      setPromoStatus('invalid');
    }
  };

  // Create a debounced version of the validator
  const debouncedValidate = debounce(validatePromoCode, 500);

  const handlePromoChange = (e) => {
    const code = e.target.value.toUpperCase();
    setPromoCode(code);
    debouncedValidate(code);
  };

  const generateReceipt = (data) => {
    const doc = new jsPDF({
      compress: true
    });
    const pageWidth = doc.internal.pageSize.getWidth();

    // Helper to add images safely
    const addImageQuietly = (url, format, x, y, w, h) => {
      try {
        doc.addImage(url, format, x, y, w, h, undefined, 'FAST');
      } catch (e) {
        console.error("Failed to add image to PDF", e);
      }
    };

    // Header Color
    doc.setFillColor(255, 140, 0); // Orange
    doc.rect(0, 0, pageWidth, 40, 'F');

    // Logos
    // Assuming relative paths work or we use base64/absolute if served.
    // In dev, relative to public works if served.
    addImageQuietly('/logo.png', 'PNG', 10, 5, 30, 30);
    addImageQuietly('/phoenix.jpeg', 'JPEG', pageWidth - 40, 5, 30, 30);

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("AVENIR 2026", pageWidth / 2, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text("OFFICIAL REGISTRATION RECEIPT", pageWidth / 2, 30, { align: "center" });

    // Reset Text Color
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 10, 50);
    doc.text(`Submission ID: ${data.submissionId}`, pageWidth - 10, 50, { align: "right" });

    // Event Info
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("EVENT INFORMATION", 10, 65);
    doc.setLineWidth(0.5);
    doc.line(10, 67, 70, 67);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Event Name: ${selectedEvent.name}`, 15, 75);
    doc.text(`Event ID: ${selectedEvent.eventId}`, 15, 82);
    doc.text(`College: ${data.collegeName}`, 15, 89);
    doc.text(`Promo Code Used: ${promoCode}`, 15, 96);

    // Submission Details Table
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("PARTICIPANT DETAILS", 10, 110);
    doc.line(10, 112, 70, 112);

    const tableRows = [];
    selectedEvent.fields.forEach(field => {
      let val = formData[field.id];
      if (field.type === 'image' && val) {
        val = `[Image File: ${val.name}]`;
      }
      tableRows.push([field.label, val || 'N/A']);
    });

    autoTable(doc, {
      startY: 118,
      head: [['Field', 'Value']],
      body: tableRows,
      theme: 'grid',
      headStyles: { fillColor: [255, 140, 0] },
      styles: { fontSize: 10, cellPadding: 5 }
    });

    // Footer
    const finalY = (doc).lastAutoTable.finalY || 150;
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 100, 100);
    doc.text("This is an automatically generated receipt. Valid for event entry.", pageWidth / 2, finalY + 20, { align: "center" });
    doc.text("For help, contact your Campus Ambassador.", pageWidth / 2, finalY + 26, { align: "center" });

    // Save
    doc.save(`Avenir_Receipt_${data.submissionId}.pdf`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Use default promo code if none provided
    const finalPromoCode = promoCode.trim() || 'NSESW6920';
    
    // Only check validation if user provided a custom code
    if (promoCode.trim() && promoStatus !== 'valid') {
      alert("Please enter a valid Promo Code.");
      return;
    }

    setIsSubmitting(true);
    const data = new FormData();
    data.append('promoCode', finalPromoCode);

    // Append other fields
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/submissions/${selectedEvent.eventId}`, {
        method: 'POST',
        body: data
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setLastSubmissionData(result);
        setShowSuccess(true);
        // Automatically download receipt
        generateReceipt(result);
      } else {
        alert(`Registration Failed: ${result.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWingForEvent = (eventId) => {
    return Object.keys(EVENT_WING_MAP).find(wing => EVENT_WING_MAP[wing].includes(eventId)) || "General";
  };

  const filteredEvents = (activeWing === "All"
    ? apiEvents.map(event => ({ ...event, wing: getWingForEvent(event.eventId) }))
    : apiEvents
      .filter(event => EVENT_WING_MAP[activeWing]?.includes(event.eventId))
      .map(event => ({ ...event, wing: activeWing }))
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
                <p className="text-orange-400 font-bold animate-pulse tracking-widest uppercase">Initializing Neural Link...</p>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-500 text-xl font-medium tracking-wide">No events found in this neural sector.</p>
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
                      <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{event.name}</h3>

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
                            Registration Fee: ₹{event.registrationFee !== undefined ? event.registrationFee : "0"}
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
                                onClick={() => toggleDescription(event.eventId)}
                                className="text-orange-400 text-xs font-semibold hover:text-orange-300 transition-colors uppercase tracking-wide cursor-pointer whitespace-nowrap"
                              >
                                {isExpanded ? '← Read Less' : 'Read More →'}
                              </motion.span>
                            )}
                          </motion.p>
                        </AnimatePresence>
                      </div>

                      <motion.button
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 0 30px rgba(255, 165, 0, 0.8)",
                          y: -3
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRegister(event)}
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
              })
            )}
          </div>

          {/* Registration Modal */}
          <AnimatePresence>
            {selectedEvent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={closeModal}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-gray-900 border border-orange-500/50 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(255,165,0,0.3)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div className="relative p-6 border-b border-gray-800 bg-gray-900/50 sticky top-0 z-10 backdrop-blur-md">
                    <button
                      onClick={closeModal}
                      className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                    <h2 className="text-3xl font-black text-white uppercase tracking-wider mb-2">
                      {selectedEvent.name}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full border border-orange-500/30">
                        {selectedEvent.wing}
                      </span>
                      <span>{selectedEvent.eventId}</span>
                    </div>
                  </div>

                  {/* Modal Body */}
                  <div className="p-8 space-y-8">
                    {/* Event Details */}
                    <div className="space-y-4 text-gray-300">
                      {selectedEvent.description && (
                        <p className="leading-relaxed bg-black/30 p-4 rounded-lg border border-gray-800">
                          {selectedEvent.description}
                        </p>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                          <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Date</label>
                          <span className="text-orange-100 font-bold">{selectedEvent.date || "TBA"}</span>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                          <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Fee</label>
                          <span className="text-orange-400 font-bold">₹{selectedEvent.registrationFee || "0"}</span>
                        </div>
                      </div>

                      {selectedEvent.instructionLink && (
                        <a
                          href={selectedEvent.instructionLink}
                          target="_blank"
                          rel="noreferrer"
                          className="block w-full text-center py-3 border border-blue-500/50 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-colors"
                        >
                          Example / Instructions Guidelines ↗
                        </a>
                      )}
                    </div>

                    <div className="border-t border-gray-800 pt-6">
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="w-2 h-8 bg-orange-500 rounded-full"></span>
                        Registration Protocol
                      </h3>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Promo Code - Optional */}
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            PROMO CODE
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={promoCode}
                              onChange={handlePromoChange}
                              placeholder="Enter Campus Ambassador Code (Optional)"
                              className={`w-full bg-gray-800 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors uppercase
                                       ${promoStatus === 'valid' ? 'border-green-500 focus:border-green-500' :
                                  promoStatus === 'invalid' ? 'border-red-500 focus:border-red-500' :
                                    'border-gray-700 focus:border-orange-500'}
                                    `}
                            />
                            <div className="absolute right-3 top-3">
                              {promoStatus === 'loading' && <div className="animate-spin h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full"></div>}
                              {promoStatus === 'valid' && <span className="text-green-500">✔</span>}
                              {promoStatus === 'invalid' && <span className="text-red-500">✖</span>}
                            </div>
                          </div>
                          {promoDetails && (
                            <div className="mt-2 text-sm text-green-400 bg-green-900/20 p-2 rounded border border-green-900/50">
                              Verified: {promoDetails.caName} ({promoDetails.collegeName})
                            </div>
                          )}
                          {promoStatus === 'invalid' && (
                            <p className="mt-2 text-sm text-red-400">Invalid Promo Code. Please contact a Campus Ambassador.</p>
                          )}
                        </div>

                        {/* Dynamic Fields */}
                        {selectedEvent.fields && selectedEvent.fields.map((field) => (
                          <div key={field.id}>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              {field.label} {field.mandatory && <span className="text-red-500">*</span>}
                            </label>
                            <FieldInput
                              field={field}
                              value={formData[field.id]}
                              onChange={handleInputChange}
                              onFileChange={handleFileChange}
                            />
                          </div>
                        ))}

                        <button
                          type="submit"
                          disabled={isSubmitting || (promoCode.trim() && promoStatus !== 'valid')}
                          className={`w-full py-4 text-black font-black uppercase tracking-widest rounded-lg transition-all duration-300
                                 ${isSubmitting || (promoCode.trim() && promoStatus !== 'valid')
                              ? 'bg-gray-700 cursor-not-allowed text-gray-500'
                              : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:shadow-[0_0_30px_rgba(255,165,0,0.6)] transform hover:-translate-y-1'}
                              `}
                        >
                          {isSubmitting ? 'Processing...' : 'Complete Registration'}
                        </button>
                      </form>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Overlay */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
              >
                <motion.div
                  initial={{ scale: 0.8, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  className="bg-gray-900 border-2 border-green-500/50 rounded-3xl p-8 max-w-md w-full text-center shadow-[0_0_100px_rgba(34,197,94,0.3)]"
                >
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                    <span className="text-4xl text-black font-bold">✔</span>
                  </div>

                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
                    Success!
                  </h2>
                  <p className="text-gray-400 mb-8">
                    Your registration for <span className="text-orange-400 font-bold">{selectedEvent.name}</span> has been confirmed.
                  </p>

                  <div className="bg-black/50 rounded-2xl p-4 mb-8 border border-gray-800 text-left space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">SUBMISSION ID</span>
                      <span className="text-green-400 font-mono">{lastSubmissionData?.submissionId}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">COLLEGE</span>
                      <span className="text-white uppercase font-bold">{lastSubmissionData?.collegeName}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <button
                      onClick={() => generateReceipt(lastSubmissionData)}
                      className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-black font-black uppercase tracking-widest rounded-xl hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all transform hover:-translate-y-1"
                    >
                      <i className="fas fa-download mr-2"></i>
                      Download Receipt
                    </button>
                    <button
                      onClick={() => {
                        setShowSuccess(false);
                        closeModal();
                      }}
                      className="w-full py-3 text-gray-500 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest"
                    >
                      Back to Events
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
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

function FieldInput({ field, value, onChange, onFileChange }) {
  const commonClasses = "w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors";

  if (field.type === 'textarea') {
    return (
      <textarea
        required={field.mandatory}
        value={value || ''}
        className={commonClasses}
        rows={3}
        onChange={(e) => onChange(field.id, e.target.value)}
        placeholder={`Enter ${field.label}`}
      />
    );
  }

  if (field.type === 'select') {
    return (
      <select
        required={field.mandatory}
        value={value || ''}
        className={commonClasses}
        onChange={(e) => onChange(field.id, e.target.value)}
      >
        <option value="">Select Option</option>
        {field.options && field.options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
    );
  }

  if (field.type === 'image') {
    const file = value;
    return (
      <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer relative
        ${file ? 'border-green-500 bg-green-500/5' : 'border-gray-700 hover:border-orange-500 bg-black/20'}`}>
        <input
          type="file"
          required={field.mandatory}
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              onFileChange(field.id, e.target.files[0]);
            }
          }}
        />
        <div className="flex flex-col items-center justify-center space-y-2">
          {file ? (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black mb-1"
              >
                ✔
              </motion.div>
              <p className="text-green-400 font-bold text-sm uppercase tracking-tighter">File Ready</p>
              <p className="text-gray-400 text-xs truncate max-w-[250px] italic">{file.name}</p>
              <span className="text-[10px] text-gray-500 underline mt-2 hover:text-orange-400">Click to replace file</span>
            </>
          ) : (
            <>
              <span className="text-3xl mb-2 opacity-50 block group-hover:scale-110 transition-transform">📷</span>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Select {field.label}</p>
              <p className="text-[10px] text-gray-500 uppercase mt-1">Image format required (JPG, PNG)</p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <input
      type={field.type}
      required={field.mandatory}
      value={value || ''}
      className={commonClasses}
      onChange={(e) => onChange(field.id, e.target.value)}
      placeholder={`Enter ${field.label}`}
    />
  );
}