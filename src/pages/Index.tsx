import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingHearts from "@/components/FloatingHearts";
import ValentineLanding from "@/components/ValentineLanding";
import ThinkAgainDialog from "@/components/ThinkAgainDialog";
import YesConfirmation from "@/components/YesConfirmation";
import ReservationConfirmation from "@/components/ReservationConfirmation";

type Step = "landing" | "yes-confirmation" | "confirmed";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>("landing");
  const [showThinkAgainDialog, setShowThinkAgainDialog] = useState(false);

  const handleYesClick = () => {
    setCurrentStep("yes-confirmation");
  };

  const handleNoClick = () => {
    setShowThinkAgainDialog(true);
  };

  const handleCloseDialog = () => {
    setShowThinkAgainDialog(false);
  };

  const handleMakeItOfficial = () => {
    setCurrentStep("confirmed");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingHearts />
      
      <AnimatePresence mode="wait">
        {currentStep === "landing" && (
          <motion.div
            key="landing"
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <ValentineLanding
              onYesClick={handleYesClick}
              onNoClick={handleNoClick}
            />
          </motion.div>
        )}

        {currentStep === "yes-confirmation" && (
          <motion.div
            key="yes-confirmation"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <YesConfirmation onContinue={handleMakeItOfficial} />
          </motion.div>
        )}

        {currentStep === "confirmed" && (
          <motion.div
            key="confirmed"
            className="min-h-screen flex items-center justify-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <ReservationConfirmation />
          </motion.div>
        )}
      </AnimatePresence>

      <ThinkAgainDialog
        isOpen={showThinkAgainDialog}
        onClose={handleCloseDialog}
      />
    </div>
  );
};

export default Index;
