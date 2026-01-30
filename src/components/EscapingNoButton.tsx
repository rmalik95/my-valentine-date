import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface EscapingNoButtonProps {
  onNoClick: () => void;
}

const EscapingNoButton = ({ onNoClick }: EscapingNoButtonProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isEscaping, setIsEscaping] = useState(false);

  const getRandomPosition = useCallback(() => {
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 60;
    const minX = 20;
    const minY = 100;
    
    return {
      x: minX + Math.random() * (maxX - minX - 100),
      y: minY + Math.random() * (maxY - minY - 100),
    };
  }, []);

  const handleMouseEnter = () => {
    setIsEscaping(true);
    setPosition(getRandomPosition());
  };

  const handleClick = () => {
    onNoClick();
  };

  useEffect(() => {
    if (isEscaping) {
      const interval = setInterval(() => {
        setPosition(getRandomPosition());
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isEscaping, getRandomPosition]);

  return (
    <motion.button
      className="btn-no absolute z-20"
      initial={{ x: 0, y: 0 }}
      animate={isEscaping ? { x: position.x, y: position.y } : {}}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleMouseEnter}
      onClick={handleClick}
      style={isEscaping ? { position: "fixed", top: 0, left: 0 } : {}}
    >
      No 😢
    </motion.button>
  );
};

export default EscapingNoButton;
