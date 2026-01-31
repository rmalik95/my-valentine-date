import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { couplePhotos } from "./couplePhotos";

interface FloatingPhoto {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
  photoIndex: number;
}

const FloatingPhotos = () => {
  const [photos, setPhotos] = useState<FloatingPhoto[]>([]);

  useEffect(() => {
    // Create 8 floating photos at random positions
    const initialPhotos: FloatingPhoto[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 5 + Math.random() * 85, // Keep within 5-90% of screen width
      y: 5 + Math.random() * 85, // Keep within 5-90% of screen height
      delay: Math.random() * 3,
      duration: 6 + Math.random() * 4,
      size: 40 + Math.random() * 30, // 40-70px
      photoIndex: i % couplePhotos.length,
    }));
    setPhotos(initialPhotos);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {photos.map((photo) => (
        <motion.div
          key={photo.id}
          className="absolute rounded-full overflow-hidden border-2 border-primary/20 shadow-lg"
          style={{
            left: `${photo.x}%`,
            top: `${photo.y}%`,
            width: photo.size,
            height: photo.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.05, 1],
            y: [-10, 10, -10],
          }}
          transition={{
            duration: photo.duration,
            delay: photo.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src={couplePhotos[photo.photoIndex]}
            alt="Memory"
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingPhotos;
