import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-orange-900/40 bg-[#0b0b0b] text-white py-10 overflow-hidden md:px-10">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-orange-900/10 to-black opacity-90 pointer-events-none" />


      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-orange-400/10 blur-2xl animate-float"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 15}s`,
              opacity: Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      {/* Decorative bars */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500" />
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/3"
          >
            <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 mb-4">
              AVENIR'26
            </h3>


            <p className="text-white/80 mb-6 text-sm md:text-base max-w-md">
              Presented by Phoenix, The Official Tech Club of NSEC
            </p>

            {/* Social Icons */}
            <div className="flex space-x-6">
              {[
                { icon: "fa-brands fa-facebook-f", link: "https://www.facebook.com/share/1BvM7Ws3vS/" },
                { icon: "fa-brands fa-instagram", link: "https://www.instagram.com/phoenix_nsec/" },
                { icon: "fa-brands fa-linkedin-in", link: "https://www.linkedin.com/company/phoenix-the-official-tech-club-of-netaji-subhash-engineering-college/" },
                { icon: "fa-solid fa-globe", link: "https://phoenixnsec.in/" },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white/70 hover:text-yellow-500 transition"
                >
                  <i className={`${item.icon} text-xl`} />
                </motion.a>
              ))}
                <a href="https://phoenixnsec.in/home" target="_blank" rel="noopener noreferrer">
                  <motion.img
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    src="/phoenix.jpeg"
                    alt="Phoenix Logo"
                    className="h-[22px] w-[25px] rounded-3xl hover:text-yellow-500 transition"
                  />
                </a>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-2/3"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Location */}
              <div>
                <h4 className="text-orange-400 text-lg mb-4 flex items-center">
                  <i className="fa-solid fa-location-dot mr-2 text-orange-300" />
                  Our Location
                </h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  Netaji Subhash Engineering College
                  <br />
                  Techno City, Garia
                  <br />
                  Kolkata - 700152
                </p>
              </div>

              {/* Email */}
              <div>
                <h4 className="text-orange-400 text-lg mb-4 flex items-center">
                  <i className="fa-solid fa-envelope mr-2 text-orange-300" />
                  Email Us
                </h4>
                {[
                  "mail.avenirphoenix@gmail.com",
                  "mail.phoenixnsec@gmail.com",
                ].map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="block text-white/80 hover:text-orange-400 text-sm"
                  >
                    {email}
                  </a>
                ))}
              </div>

              {/* Phone */}
              <div>
                <h4 className="text-orange-400 text-lg mb-4 flex items-center">
                  <i className="fa-solid fa-phone mr-2 text-orange-300" />
                  Call Us
                </h4>
                {[
                  "+91 98746 73245",
                  "+91 79089 57844",
                  "+91 62996 02959",
                ].map((num) => (
                  <a
                    key={num}
                    href={`tel:${num.replace(/\s+/g, "")}`}
                    className="block text-white/80 hover:text-orange-400 text-sm"
                  >
                    {num}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-6 pt-2 border-t border-yellow-900/30"
        >
          <p className="text-white/70 text-sm text-center">
            © {currentYear} Avenir | Phoenix | NSEC. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
