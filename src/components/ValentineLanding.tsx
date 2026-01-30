import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import EscapingNoButton from "./EscapingNoButton";

interface ValentineLandingProps {
  onYesClick: () => void;
  onNoClick: () => void;
}

const ValentineLanding = ({ onYesClick, onNoClick }: ValentineLandingProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative">
      {/* Photo placeholder */}
      <motion.div
        className="relative mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/30 shadow-lg">
          <div className="w-full h-full bg-gradient-to-br from-secondary to-blush flex items-center justify-center">
            <Heart className="w-20 h-20 md:w-28 md:h-28 text-primary/50" fill="currentColor" />
          </div>
        </div>
        <motion.div
          className="absolute -bottom-2 -right-2 bg-primary rounded-full p-3"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Heart className="w-6 h-6 text-primary-foreground" fill="currentColor" />
        </motion.div>
      </motion.div>

      {/* Main question */}
      <motion.h1
        className="font-display text-4xl md:text-6xl lg:text-7xl text-center text-foreground mb-4"
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
