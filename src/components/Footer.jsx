import React from 'react';
import { Instagram, Linkedin, Facebook, MapPin, Mail, Phone } from 'lucide-react';
import nsecLogo from '../assets/nsec_logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#0B0B0B] text-white pt-16 pb-8 border-t border-[#D4AF37]/10 relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF8C42]/20 to-transparent"></div>

      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
        {/* Brand Section */}
        <div className="col-span-1">
          <h3
            className="text-3xl md:text-4xl mb-3 avenir-refined-heading tracking-tighter uppercase font-extrabold"
          >
            AVENIR '26
          </h3>
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <img src={nsecLogo} alt="NSEC Logo" className="w-8 h-auto opacity-80" />
            <p className="text-[#FF8C42] text-[10px] font-black uppercase tracking-widest leading-tight text-left">
              Presented by Phoenix,<br />
              <span className="text-gray-400 font-bold">The Official Tech Club of NSEC</span>
            </p>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium max-w-xs mx-auto md:mx-0">
            Building the future, one byte at a time. The ultimate technical festival of NSEC Kolkata.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="https://www.instagram.com/phoenix_nsec/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-[#D4AF37]/20 text-gray-500 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all transform hover:scale-105">
              <Instagram size={14} />
            </a>
            <a href="https://www.linkedin.com/company/phoenix-the-official-tech-club-of-netaji-subhash-engineering-college/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-[#D4AF37]/20 text-gray-500 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all transform hover:scale-105">
              <Linkedin size={14} />
            </a>
            <a href="https://www.facebook.com/share/1BvM7Ws3vS/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-[#D4AF37]/20 text-gray-500 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all transform hover:scale-105">
              <Facebook size={14} />
            </a>
          </div>
        </div>

        {/* Contact Us Section */}
        <div>
          <h4 className="text-[#FF8C42] font-bold uppercase tracking-[0.2em] text-[10px] mb-5 opacity-90">Contact Us</h4>
          <div className="space-y-4 text-left">
            <div>
              <p className="text-[#D4AF37] text-[11px] font-black uppercase tracking-widest mb-1">President</p>
              <p className="text-gray-200 text-sm font-bold">Junaid Tarafdar</p>
              <p className="text-gray-500 text-[12px]">+91 XXXXX XXXXX</p>
            </div>
            <div>
              <p className="text-[#D4AF37] text-[11px] font-black uppercase tracking-widest mb-1">General Secretary</p>
              <p className="text-gray-200 text-sm font-bold">Sayan khan</p>
              <p className="text-gray-500 text-[12px]">+91 XXXXX XXXXX</p>
            </div>
            <div>
              <p className="text-[#D4AF37] text-[11px] font-black uppercase tracking-widest mb-1">Tech Lead</p>
              <p className="text-gray-200 text-sm font-bold">Krishnava Ghosh</p>
              <p className="text-gray-500 text-[12px]">+91 XXXXX XXXXX</p>
            </div>
          </div>
        </div>

        {/* Headquarters Info */}
        <div className="md:col-span-2">
          <h4 className="text-[#FF8C42] font-bold uppercase tracking-[0.2em] text-[10px] mb-5 opacity-90">Headquarters</h4>
          <div className="space-y-4">
            <div className="flex items-start justify-center md:justify-start gap-3">
              <MapPin className="text-[#D4AF37]/50 shrink-0 mt-0.5" size={14} />
              <p className="text-gray-400 text-sm font-medium leading-relaxed">
                Netaji Subhash Engineering College<br />
                Techno City, Garia, Kolkata - 700152
              </p>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Mail className="text-[#D4AF37]/50" size={14} />
              <a href="mailto:contact@avenir.nsec.ac.in" className="text-gray-400 text-sm hover:text-[#D4AF37] transition-colors font-medium">contact@avenir.nsec.ac.in</a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.3em]">
          &copy; 2026 Phoenix NSEC. Neonized for Avenir.
        </p>
        <p className="text-gray-700 text-[10px] uppercase tracking-[0.4em] font-medium hidden md:block">
          Crafted with precision by Phoenix Dev
        </p>
      </div>
    </footer>
  );
};

export default Footer;
