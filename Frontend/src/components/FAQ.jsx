import React, { useState } from "react"
import { faqData } from "../constants/FAQ_data"
import { motion } from "framer-motion"


const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="relative z-30 px-4 py-12 max-w-4xl mx-auto">
      {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="ml-3 transition-all duration-500 hover:scale-105 cursor-pointer text-5xl font-black uppercase tracking-wider mb-10 "
                style={{
                  color: "#FF8C00",
                  textShadow: `3px 3px 0px #000, 5px 5px 0px #FFA500, 7px 7px 0px #FFD700`,
                  WebkitTextStroke: "2px rgba(0,0,0,0.8)",
                  perspective: 800,
                }}
              >
                Frequently Asked Questions
              </motion.h2>

      {/* FAQ Container */}
      <div className="h-auto space-y-4 bg-black/70 border border-yellow-500/70 rounded-lg p-6 backdrop-blur-sm">
        {faqData.map((faq, index) => {
          const isOpen = openIndex === index

          return (
            <div
              key={index}
              className="shadow-[7px_4px_9px_1px] shadow-yellow-500/50  bg-gradient-to-r from-black to-zinc-900  rounded-md overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-5 py-4 text-left text-lg font-semibold text-white
                
                hover:text-yellow-400 transition-all duration-300"
              >
                {faq.question}
                <span
                  className={`text-orange-400 text-2xl transition-transform duration-300 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <i className="fa-solid fa-angle-down"></i>
                </span>
              </button>

              <div
                className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "max-h-40 opacity-100 py-4"
                    : "max-h-0 opacity-0 py-0"
                }`}
              >
                <p className="text-white/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          )
        })}
      </div>


    </div>
  )
}

export default FAQ

