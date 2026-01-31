import { motion } from "framer-motion";
import { Heart, PartyPopper } from "lucide-react";
import FloatingPhotos from "./FloatingPhotos";

interface YesConfirmationProps {
  onContinue: () => void;
}

const YesConfirmation = ({ onContinue }: YesConfirmationProps) => {
  return (
    <>
      <FloatingPhotos />
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex gap-4 mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <motion.div
            animate={{ rotate: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
          >
            <PartyPopper className="w-12 h-12 text-accent" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <Heart className="w-12 h-12 text-primary" fill="currentColor" />
          </motion.div>
          <motion.div
            animate={{ rotate: [10, -10, 10] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
          >
            <PartyPopper className="w-12 h-12 text-accent" />
          </motion.div>
        </motion.div>

        <motion.h2
          className="font-display text-3xl md:text-5xl text-center text-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Good choice has been made!
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground text-center mb-8 font-body"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          You have a date with your jowa 💕
        </motion.p>

        <motion.button
          className="btn-valentine"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
        >
          Let's make it official 💌
        </motion.button>
      </motion.div>
    </>
  );
};

export default YesConfirmation;
