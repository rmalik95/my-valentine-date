import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import EscapingNoButton from "./EscapingNoButton";
import couplePhoto1 from "@/assets/couple-photo-1.jpeg";
import couplePhoto2 from "@/assets/couple-photo-2.jpeg";

interface ValentineLandingProps {
  onYesClick: () => void;
  onNoClick: () => void;
}

const photos = [couplePhoto1, couplePhoto2];

const ValentineLanding = ({ onYesClick, onNoClick }: ValentineLandingProps) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  // Auto-rotate photos every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative">
      {/* Photo carousel */}
      <motion.div
        className="relative mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/30 shadow-lg relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentPhoto}
              src={photos[currentPhoto]}
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
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {photos.map((_, index) => (
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
        className="font-display text-4xl md:text-6xl lg:text-7xl text-center text-foreground mb-4 mt-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Will you be my
      </motion.h1>
      <motion.h1
        className="font-display text-5xl md:text-7xl lg:text-8xl text-center gradient-text mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Valentine?
      </motion.h1>

      {/* Buttons container */}
      <motion.div
        className="flex flex-col sm:flex-row items-center gap-6 relative"
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
        className="absolute bottom-8 text-muted-foreground text-sm font-body"
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
