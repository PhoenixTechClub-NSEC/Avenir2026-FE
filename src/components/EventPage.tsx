import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EventPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen pt-20 pb-12 px-4 text-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-purple-400">Events</h1>
          <Link to="/" className="text-gray-400 hover:text-white">&larr; Back to Home</Link>
        </div>

        <p className="text-gray-400 mb-12">Explore our upcoming technical and cultural events.</p>

        {/* Placeholder Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="group relative p-[2px] overflow-hidden rounded-lg transition-all duration-300 hover:scale-105">
              {/* Snake Animation Layer */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0%,rgba(255,215,0,0.15)_5%,transparent_10%,rgba(255,215,0,0.15)_50%,transparent_55%,rgba(255,215,0,0.15)_90%,transparent_100%)] opacity-15 group-hover:opacity-40 transition-opacity duration-700"
              />

              <div className="relative z-10 bg-gray-800 p-6 rounded-lg border border-gray-700/50 group-hover:border-purple-500/30 transition-colors h-full flex flex-col">
                <div className="h-40 bg-gray-700/50 rounded mb-4 flex items-center justify-center text-gray-500 border border-white/5">
                  Event Image
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">Event Title {i}</h3>
                <p className="text-gray-400 text-sm mb-4 flex-grow">
                  Description of the event goes here. This is a placeholder for future content.
                </p>
                <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded text-white font-medium transition-all transform active:scale-95">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
