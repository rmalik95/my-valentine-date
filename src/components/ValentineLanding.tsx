import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import EscapingNoButton from "./EscapingNoButton";
import { couplePhotos } from "./couplePhotos";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";

interface ValentineLandingProps {
  onYesClick: () => void;
  onNoClick: () => void;
}

const ValentineLanding = ({ onYesClick, onNoClick }: ValentineLandingProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentPhoto, setCurrentPhoto] = useState(0);

  // Sync carousel api with current photo state
  useEffect(() => {
    if (!api) return;
    setCurrentPhoto(api.selectedScrollSnap());
    api.on("select", () => setCurrentPhoto(api.selectedScrollSnap()));
  }, [api]);

  // Auto-rotate main photo every 3 seconds (loop handles wrap)
  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => api.scrollNext(), 3000);
    return () => clearInterval(interval);
  }, [api]);

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
          className={`absolute rounded-2xl overflow-hidden border-2 border-primary/30 shadow-lg ${pos.size} hidden sm:block`}
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

      {/* Main photo carousel (center) - Embla with peek, rounded rect, Ken Burns */}
      <motion.div
        className="relative mb-8 z-10 w-full max-w-sm md:max-w-md lg:max-w-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
            dragFree: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {couplePhotos.map((photo, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-[85%] sm:basis-[80%] md:basis-[75%] lg:basis-[70%]"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-4 border-primary/30 shadow-2xl">
                  <motion.img
                    src={photo}
                    alt={`Our memories together ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    animate={
                      index === currentPhoto
                        ? {
                            scale: [1, 1.06, 1],
                            x: [0, 8, 0],
                            y: [0, 6, 0],
                          }
                        : { scale: 1, x: 0, y: 0 }
                    }
                    transition={{
                      duration: 3,
                      repeat: index === currentPhoto ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-2 md:-left-12 top-1/2 -translate-y-1/2 h-9 w-9 md:h-10 md:w-10 border-primary/30 hover:bg-primary/10 bg-background/80" />
          <CarouselNext className="-right-2 md:-right-12 top-1/2 -translate-y-1/2 h-9 w-9 md:h-10 md:w-10 border-primary/30 hover:bg-primary/10 bg-background/80" />
        </Carousel>
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
              onClick={() => api?.scrollTo(index)}
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

      {/* Decorative elements & privacy notice */}
      <motion.footer
        className="absolute bottom-8 left-4 right-4 text-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <p className="text-muted-foreground text-sm font-body">
          Made with 💕 by Rishabh
        </p>
        <p className="text-muted-foreground/70 text-xs font-body mt-1 max-w-md mx-auto">
          This is a private website. Photos are personal and not intended for
          public distribution.
        </p>
      </motion.footer>
    </div>
  );
};

export default ValentineLanding;
