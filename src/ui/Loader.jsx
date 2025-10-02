import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

const Loader = () => {
  const [activeOrb, setActiveOrb] = useState(0);
  const orbs = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOrb((prev) => (prev + 1) % orbs);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-purple-900/90 backdrop-blur-md z-50 flex items-center justify-center"
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2 }}
    >
      <div className="relative w-64 h-64">
        {/* Main glowing orb */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-purple-800 shadow-lg shadow-purple-500/50"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating orbs */}
        {[...Array(orbs)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-8 h-8 rounded-full ${
              i === activeOrb
                ? "bg-white shadow-lg shadow-white"
                : "bg-purple-300"
            }`}
            initial={{
              x: Math.cos((i * 2 * Math.PI) / orbs) * 80,
              y: Math.sin((i * 2 * Math.PI) / orbs) * 80,
            }}
            animate={{
              x: Math.cos((i * 2 * Math.PI) / orbs) * 80,
              y: Math.sin((i * 2 * Math.PI) / orbs) * 80,
              scale: i === activeOrb ? [1, 1.5, 1] : 1,
              opacity: i === activeOrb ? [0.7, 1, 0.7] : 0.7,
            }}
            transition={{
              x: { type: "spring", stiffness: 100 },
              y: { type: "spring", stiffness: 100 },
              scale: { duration: 0.8, repeat: Infinity },
              opacity: { duration: 0.8, repeat: Infinity },
            }}
          />
        ))}

        {/* Pulsing rings */}
        <motion.div
          className="absolute inset-0 border-2 border-purple-300 rounded-full"
          animate={{
            scale: [1, 1.5, 2],
            opacity: [0.5, 0.3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        <motion.div
          className="absolute inset-0 border-2 border-purple-400 rounded-full"
          animate={{
            scale: [1, 1.5, 2],
            opacity: [0.5, 0.3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.5,
          }}
        />

        {/* Text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <span className="text-gray-300 font-bold text-xl tracking-widest">
            JIFFYFOX
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader;
