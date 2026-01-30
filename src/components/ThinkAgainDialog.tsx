import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface ThinkAgainDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThinkAgainDialog = ({ isOpen, onClose }: ThinkAgainDialogProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-romantic-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-md"
            initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
          >
            <div className="card-romantic text-center">
              <motion.div
                className="flex justify-center mb-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Heart className="w-16 h-16 text-primary" fill="currentColor" />
              </motion.div>
              <h3 className="font-display text-2xl text-foreground mb-4">
                Think again...
              </h3>
              <p className="text-lg text-muted-foreground mb-6 font-body">
                Think clearly lub lub. 💕
              </p>
              <button
                onClick={onClose}
                className="btn-valentine"
              >
                Okay, let me reconsider 💝
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ThinkAgainDialog;
