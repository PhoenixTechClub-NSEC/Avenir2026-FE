import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { motion, AnimatePresence } from "framer-motion";

const bg = "https://res.cloudinary.com/drvbkxnvu/image/upload/v1775193580/ChatGPT_Image_Jan_9_2026_09_51_19_PM_jzyc55.png";

export default function EventRegistrationPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [promoCode, setPromoCode] = useState("");
  const [promoStatus, setPromoStatus] = useState(null); // null, 'loading', 'valid', 'invalid'
  const [promoDetails, setPromoDetails] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastSubmissionData, setLastSubmissionData] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/events/${eventId}`);
        const result = await response.json();
        if (result.success) {
          setEvent(result.data);
        } else {
          alert("Event not found");
          navigate("/events");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        alert("Error loading event");
        navigate("/events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId, navigate]);

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
      timeoutId = setTimeout(() => func.apply(null, args), delay);
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
    addImageQuietly('/avenir%20logo.jpeg', 'JPEG', 10, 5, 30, 30);
    addImageQuietly('https://res.cloudinary.com/drvbkxnvu/image/upload/f_auto,q_auto,c_limit/v1771424036/phoenix_r7onnu.webp', 'JPEG', pageWidth - 40, 5, 30, 30);

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
    doc.text(`Event Name: ${event.name}`, 15, 75);
    doc.text(`Event ID: ${event.eventId}`, 15, 82);
    doc.text(`College: ${data.collegeName}`, 15, 89);
    doc.text(`Promo Code Used: ${promoCode}`, 15, 96);

    // Submission Details Table
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("PARTICIPANT DETAILS", 10, 110);
    doc.line(10, 112, 70, 112);

    const tableRows = [];
    event.fields.forEach(field => {
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

    // Promo code is now mandatory
    if (!promoCode.trim() || promoStatus !== 'valid') {
      alert("Please enter a valid Promo Code.");
      return;
    }

    setIsSubmitting(true);
    const data = new FormData();
    data.append('promoCode', promoCode.trim());
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/submissions/${event.eventId}`, {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full mb-4"
        />
        <p className="text-orange-400 font-bold animate-pulse tracking-widest uppercase">Loading...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Event not found</p>
      </div>
    );
  }

  const isInactive = event.status !== "active";
  const isFull = event.currentRegistrations >= event.maxRegistrations;

  if (isInactive) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
        <h2 className="text-3xl font-bold mb-4">Event Unavailable</h2>
        <p className="text-gray-200 mb-6">This event is currently inactive and cannot be registered.</p>
        <button
          onClick={() => navigate('/events')}
          className="px-8 py-3 bg-orange-500 text-black font-bold rounded-full hover:bg-orange-400 transition"
        >
          Check Other Events
        </button>
      </div>
    );
  }

  if (isFull) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
        <h2 className="text-3xl font-bold mb-4">Registration Full</h2>
        <p className="text-gray-200 mb-6">This event has reached maximum registration capacity.</p>
        <button
          onClick={() => navigate('/events')}
          className="px-8 py-3 bg-orange-500 text-black font-bold rounded-full hover:bg-orange-400 transition"
        >
          Check Other Events
        </button>
      </div>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 z-0 bg-cover bg-center blur-sm scale-110"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="fixed inset-0 z-0 bg-black/60" />

      <section className="relative z-10 min-h-screen px-6 py-16 text-white overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Back to events button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(255, 165, 0, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
            className="fixed top-6 left-6 z-[100] bg-black/60 text-orange-400 px-4 py-2 sm:px-6 sm:py-3 font-bold text-sm sm:text-lg text-center rounded-full cursor-pointer border-2 border-orange-500 hover:bg-orange-500/20 transition-all backdrop-blur-md shadow-lg"
            onClick={() => navigate('/events')}
          >
            ← BACK TO EVENTS
          </motion.button>

          {/* Event Poster */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              rotate: -2,
              scale: 1.02,
              boxShadow: "0 0 30px rgba(255, 200, 0, 0.4)"
            }}
            transition={{ duration: 0.3 }}
            className="mb-8 w-full max-w-md mx-auto rounded-2xl"
          >
            <img
              src={event.posterUrl || "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=600&h=900&auto=format&fit=crop"}
              alt={event.name}
              className="w-full rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            />
          </motion.div>

          {/* Event Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-wider text-center mb-8 px-4"
            style={{
              color: "#FF8C00",
              textShadow: `2px 2px 0px #000, 4px 4px 0px #FFA500, 6px 6px 0px #FFD700`,
              WebkitTextStroke: "1px rgba(0,0,0,0.8)",
            }}
          >
            {event.name}
          </motion.h1>

          {/* Event Details */}
          <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl rounded-2xl p-8 mb-8 border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_32px_rgba(0,0,0,0.5)] hover:border-yellow-500/60 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_0_25px_rgba(255,200,0,0.4)] transition-all duration-500 group">
            <div className="space-y-4 text-gray-100">
              {event.description && (
                <p className="leading-relaxed bg-black/30 p-4 rounded-lg border border-gray-800">
                  {event.description}
                </p>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                  <label className="text-xs text-gray-300 uppercase tracking-widest block mb-1">Date</label>
                  <span className="text-orange-100 font-bold">{event.date || "TBA"}</span>
                </div>
                <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                  <label className="text-xs text-gray-300 uppercase tracking-widest block mb-1">Fee</label>
                  <span className="text-orange-400 font-bold">₹{event.registrationFee || "0"}</span>
                </div>
              </div>

              {/* Payment Details Section */}
              {event.registrationFee !== 0 && event.registrationFee !== "0" && (event.paymentQRUrl || event.upiId) && (
                <div className="bg-black/30 p-6 rounded-lg border border-orange-600/40 mt-6">
                  <h4 className="text-sm font-bold text-orange-400 uppercase tracking-widest mb-4">Payment Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* QR Code */}
                    {event.paymentQRUrl && (
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-xs text-gray-300 uppercase tracking-widest mb-3">Scan to Pay</p>
                        <img
                          src={event.paymentQRUrl}
                          alt="Payment QR Code"
                          className="max-w-[200px] w-full h-auto border-2 border-orange-500/50 rounded-lg p-2 bg-white"
                        />
                      </div>
                    )}
                    {/* UPI ID */}
                    {event.upiId && (
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-xs text-gray-300 uppercase tracking-widest mb-3">UPI ID</p>
                        <div className="bg-black/50 p-4 rounded-lg border border-gray-700 w-full flex items-center justify-center gap-3">
                          <p className="text-orange-400 font-mono font-bold text-lg break-all">{event.upiId}</p>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(event.upiId);
                              setCopied(true);
                              setTimeout(() => setCopied(false), 2000);
                            }}
                            className="text-gray-400 hover:text-orange-400 transition-colors p-2 rounded-md hover:bg-orange-500/10 ring-1 ring-white/10"
                            title="Copy UPI ID"
                          >
                            <i className={`fas ${copied ? 'fa-check text-green-500' : 'fa-copy'}`}></i>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {event.instructionLink && (
                <a
                  href={event.instructionLink}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full text-center py-3 border border-yellow-500/50 text-yellow-500 rounded-lg hover:bg-yellow-500/10 transition-colors"
                >
                  Rule Book ↗
                </a>
              )}
            </div>
          </div>

          {/* Registration Form */}
          <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_32px_rgba(0,0,0,0.5)] hover:border-yellow-500/60 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_0_25px_rgba(255,200,0,0.4)] transition-all duration-500 group">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-orange-500 rounded-full"></span>
              Registration form
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Promo Code - Required */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  PROMO CODE <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-300 mb-3">
                  Get your promo code from {" "}
                  <a
                    href="/campus_rep"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:text-orange-300 underline"
                  >
                    Campus Ambassadors
                  </a>{" "}
                  <span>Or use NSEC's code "NSESW6920"</span>


                </p>
                <div className="relative">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={handlePromoChange}
                    placeholder="Enter Campus Ambassador Code"
                    required
                    className={`w-full bg-gray-800 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors uppercase
                             ${promoStatus === 'valid' ? 'border-yellow-500 focus:border-yellow-500' :
                        promoStatus === 'invalid' ? 'border-red-500 focus:border-red-500' :
                           'border-gray-700 focus:border-orange-500'}
                           `}
                  />
                  <div className="absolute right-3 top-3">
                    {promoStatus === 'loading' && <div className="animate-spin h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full"></div>}
                    {promoStatus === 'valid' && <span className="text-yellow-500">✔</span>}
                    {promoStatus === 'invalid' && <span className="text-red-500">✖</span>}
                  </div>
                </div>
                {promoDetails && (
                  <div className="mt-2 text-sm text-yellow-400 bg-yellow-900/20 p-2 rounded border border-yellow-900/50">
                    Verified: {promoDetails.caName} ({promoDetails.collegeName})
                  </div>
                )}
                {promoStatus === 'invalid' && (
                  <p className="mt-2 text-sm text-red-400">Invalid Promo Code. Please contact a Campus Ambassador.</p>
                )}
              </div>

              {/* Dynamic Fields */}
              {event.fields && event.fields.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
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
                disabled={isSubmitting || promoStatus !== 'valid'}
                className={`w-full py-4 text-black font-black uppercase tracking-widest rounded-lg transition-all duration-300
                       ${isSubmitting || promoStatus !== 'valid'
                    ? 'bg-gray-700 cursor-not-allowed text-gray-300'
                    : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:shadow-[0_0_30px_rgba(255,165,0,0.6)] transform hover:-translate-y-1'}
                    `}
              >
                {isSubmitting ? 'Processing...' : 'Complete Registration'}
              </button>
            </form>
          </div>
        </div>

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
                className="bg-gray-900 border-2 border-orange-500/50 rounded-3xl p-8 max-w-md w-full text-center shadow-[0_0_100px_rgba(255,140,0,0.3)]"
              >
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(255,140,0,0.5)]">
                  <span className="text-4xl text-black font-bold">✔</span>
                </div>

                <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
                  Success!
                </h2>
                <p className="text-gray-200 mb-8">
                  Your registration for <span className="text-orange-400 font-bold">{event.name}</span> has been confirmed.
                </p>

                <div className="bg-black/50 rounded-2xl p-4 mb-8 border border-gray-800 text-left space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">SUBMISSION ID</span>
                    <span className="text-orange-400 font-mono">{lastSubmissionData?.submissionId}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">COLLEGE</span>
                    <span className="text-white uppercase font-bold">{lastSubmissionData?.collegeName}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <button
                    onClick={() => generateReceipt(lastSubmissionData)}
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-black uppercase tracking-widest rounded-xl hover:shadow-[0_0_30px_rgba(255,140,0,0.4)] transition-all transform hover:-translate-y-1"
                  >
                    <i className="fas fa-download mr-2"></i>
                    Download Receipt
                  </button>
                  <button
                    onClick={() => {
                      setShowSuccess(false);
                      navigate('/events');
                    }}
                    className="w-full py-3 text-gray-300 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest"
                  >
                    Back to Events
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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
              <p className="text-gray-200 text-xs truncate max-w-[250px] italic">{file.name}</p>
              <span className="text-[10px] text-gray-300 underline mt-2 hover:text-orange-400">Click to replace file</span>
            </>
          ) : (
            <>
              <span className="text-3xl mb-2 opacity-50 block group-hover:scale-110 transition-transform">📷</span>
              <p className="text-gray-200 font-bold text-xs uppercase tracking-widest">Select {field.label}</p>
              <p className="text-[10px] text-gray-300 uppercase mt-1">Image format required (JPG, PNG)</p>
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