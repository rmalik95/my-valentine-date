import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import EscapingNoButton from "./EscapingNoButton";
import { couplePhotos } from "./couplePhotos";

interface ValentineLandingProps {
  onYesClick: () => void;
  onNoClick: () => void;
}

const ValentineLanding = ({ onYesClick, onNoClick }: ValentineLandingProps) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  // Auto-rotate main photo every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % couplePhotos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Define scattered positions for photos around the page
  const scatteredPositions = [
    { top: "5%", left: "5%", size: "w-16 h-16 md:w-20 md:h-20" },
    { top: "8%", right: "8%", size: "w-14 h-14 md:w-18 md:h-18" },
    { top: "20%", left: "3%", size: "w-12 h-12 md:w-16 md:h-16" },
    { top: "25%", right: "5%", size: "w-14 h-14 md:w-18 md:h-18" },
    { bottom: "30%", left: "5%", size: "w-16 h-16 md:w-20 md:h-20" },
    { bottom: "25%", right: "3%", size: "w-12 h-12 md:w-16 md:h-16" },
    { bottom: "15%", left: "8%", size: "w-14 h-14 md:w-18 md:h-18" },
    { bottom: "12%", right: "6%", size: "w-16 h-16 md:w-20 md:h-20" },
    { top: "45%", left: "2%", size: "w-12 h-12 md:w-14 md:h-14" },
    { top: "50%", right: "2%", size: "w-12 h-12 md:w-14 md:h-14" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Scattered photos around the page */}
      {scatteredPositions.map((pos, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full overflow-hidden border-2 border-primary/30 shadow-lg ${pos.size} hidden sm:block`}
          style={{
            top: pos.top,
            left: pos.left,
            right: pos.right,
            bottom: pos.bottom,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
          whileHover={{ scale: 1.1, opacity: 1 }}
        >
          <img
            src={couplePhotos[(index + 2) % couplePhotos.length]}
            alt={`Memory ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}

      {/* Main photo carousel (center) */}
      <motion.div
        className="relative mb-8 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentPhoto}
              src={couplePhotos[currentPhoto]}
              alt="Our memories together"
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </div>
        <motion.div
          className="absolute -bottom-2 -right-2 bg-primary rounded-full p-3"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Heart className="w-6 h-6 text-primary-foreground" fill="currentColor" />
        </motion.div>
        
        {/* Photo indicators */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 flex-wrap justify-center max-w-48">
          {couplePhotos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPhoto(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentPhoto ? "bg-primary w-4" : "bg-primary/30"
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Main question */}
      <motion.h1
        className="font-display text-4xl md:text-6xl lg:text-7xl text-center text-foreground mb-4 mt-8 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Will you be my
      </motion.h1>
      <motion.h1
        className="font-display text-5xl md:text-7xl lg:text-8xl text-center gradient-text mb-12 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Valentine?
      </motion.h1>

      {/* Buttons container */}
      <motion.div
        className="flex flex-col sm:flex-row items-center gap-6 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <motion.button
          className="btn-valentine text-2xl px-16 py-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onYesClick}
        >
          Yes! 💖
        </motion.button>

        <div className="relative">
          <EscapingNoButton onNoClick={onNoClick} />
        </div>
      </motion.div>

      {/* Decorative elements */}
      <motion.p
        className="absolute bottom-8 text-muted-foreground text-sm font-body z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Made with 💕 by Rishabh
      </motion.p>
    </div>
  );
};

export default ValentineLanding;
