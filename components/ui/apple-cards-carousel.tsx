"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Image, { ImageProps } from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { TextAnimate } from "@/components/ui/text-animate";
import { GridPattern } from "@/components/ui/grid-pattern";

interface CarouselProps {
  items: React.ReactElement[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
  imageClassName?: string;
  overlayClassName?: string;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      const isMobile = window && window.innerWidth < 768;
      const scrollAmount = isMobile ? window.innerWidth - 16 : 350;
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const isMobile = window && window.innerWidth < 768;
      const scrollAmount = isMobile ? window.innerWidth - 16 : 350;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const isMobile = window && window.innerWidth < 768;
      const cardWidth = isMobile ? window.innerWidth - 32 : 380;
      const gap = isMobile ? 16 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 md:py-20 [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "flex flex-row justify-start gap-4 pl-4 md:gap-4 md:pl-4",
              "mx-auto max-w-7xl", // remove max-w-4xl if you want the carousel to span the full width of its container
            )}
            style={{
              gap: '16px'
            }}
          >
            {items.map((item, index) => {
              const cardRef = useRef<HTMLDivElement>(null);
              const { scrollYProgress } = useScroll({
                target: cardRef,
                offset: ["start end", "start center"]
              });
              
              // Stagger each card's animation based on its index
              const startProgress = Math.min(index * 0.1, 0.5);
              const endProgress = Math.min(startProgress + 0.5, 1);
              
              return (
                <motion.div
                  ref={cardRef}
                  key={"card" + index}
                  className="rounded-3xl last:pr-[2rem] md:last:pr-[33%]"
                  style={{
                    opacity: useTransform(scrollYProgress, [startProgress, endProgress], [0, 1]),
                    rotateX: useTransform(scrollYProgress, [startProgress, endProgress], [180, 0]),
                    scaleY: useTransform(scrollYProgress, [startProgress, endProgress], [0.2, 1]),
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                    transformOrigin: "bottom center"
                  }}
                >
                  {item}
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* Left navigation button - center far left */}
        <button
          type="button"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-40 flex h-24 w-24 items-center justify-center rounded-full bg-black border-2 border-orange-500 disabled:opacity-0 disabled:border-gray-600 transition-all hover:scale-110"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
        >
          <motion.div
            animate={{ x: [-3, 3, -3] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <ChevronLeft 
              className="h-16 w-16 text-orange-400" 
              style={{ 
                filter: 'drop-shadow(0 0 30px rgba(251,146,60,1)) drop-shadow(0 0 15px rgba(251,146,60,1)) drop-shadow(0 0 5px rgba(251,146,60,1))',
                strokeWidth: 2
              }}
            />
          </motion.div>
        </button>
        
        {/* Right navigation button - center far right */}
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-40 flex h-24 w-24 items-center justify-center rounded-full bg-black border-2 border-orange-500 disabled:opacity-30 disabled:border-gray-600 transition-all hover:scale-110"
          onClick={scrollRight}
          disabled={!canScrollRight}
          aria-label="Scroll right"
        >
          <motion.div
            animate={{ x: [-3, 3, -3] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <ChevronRight 
              className="h-16 w-16 text-orange-400" 
              style={{ 
                filter: 'drop-shadow(0 0 30px rgba(251,146,60,1)) drop-shadow(0 0 15px rgba(251,146,60,1)) drop-shadow(0 0 5px rgba(251,146,60,1))',
                strokeWidth: 2
              }}
            />
          </motion.div>
        </button>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef as React.RefObject<HTMLDivElement>, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-screen overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="relative z-[60] mx-auto my-10 h-fit max-w-5xl rounded-3xl bg-white p-6 md:p-10 font-sans dark:bg-neutral-900"
            >
              <button
                type="button"
                className="sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white"
                onClick={handleClose}
                aria-label="Close"
              >
                <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>
              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className="text-base font-medium text-black dark:text-white"
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="mt-4 text-3xl md:text-5xl font-semibold text-neutral-700 dark:text-white"
              >
                {card.title}
              </motion.p>
              <div className="py-10">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Non-clickable card (disabled modal). */}
      <motion.div
        layoutId={layout ? `card-${card.title}` : undefined}
        className="relative z-10 flex h-[35rem] w-[calc(100vw-2rem)] md:h-[42rem] md:w-[380px] flex-col items-start justify-start overflow-hidden rounded-3xl border border-orange-500/30"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image src={card.src} alt="" fill className="object-cover" />
        </div>
        
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-stone-100/70 via-transparent to-stone-100/70" />
        <div className={cn("pointer-events-none absolute inset-0 z-20", card.overlayClassName ?? "bg-black/50")} />
        <div className="relative z-40 p-6 md:p-8">
          <TextAnimate
            animation="blurInUp"
            by="word"
            duration={0.5}
            delay={0.1}
            className="text-left abeezee-regular text-sm md:text-base font-medium text-orange-600"
          >
            {card.category}
          </TextAnimate>
          <TextAnimate
            animation="blurInUp"
            by="word"
            duration={0.6}
            delay={0.3}
            className="mt-2 max-w-xs text-left abeezee-regular text-2xl md:text-3xl font-semibold [text-wrap:balance] text-black"
          >
            {card.title}
          </TextAnimate>
        </div>
        {/* Inline content preview with wavy animation */}
        <div className="relative z-40 px-6 md:px-8 pb-6 md:pb-8 pt-2">
          {typeof card.content === 'string' ? (
            <TextAnimate
              variants={{
                hidden: {
                  opacity: 0,
                  y: 30,
                  rotate: 45,
                  scale: 0.5,
                },
                show: (i) => ({
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                  transition: {
                    delay: i * 0.1,
                    duration: 0.4,
                    y: {
                      type: "spring",
                      damping: 12,
                      stiffness: 200,
                      mass: 0.8,
                    },
                    rotate: {
                      type: "spring",
                      damping: 8,
                      stiffness: 150,
                    },
                    scale: {
                      type: "spring",
                      damping: 10,
                      stiffness: 300,
                    },
                  },
                }),
                exit: (i) => ({
                  opacity: 0,
                  y: 30,
                  rotate: 45,
                  scale: 0.5,
                  transition: {
                    delay: i * 0.1,
                    duration: 0.4,
                  },
                }),
              }}
              by="character"
              className="text-black/80 abeezee-regular"
            >
              {card.content}
            </TextAnimate>
          ) : (
            <div className="text-black/80 abeezee-regular">{card.content}</div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <img
      className={cn(
        "h-full w-full transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className,
      )}
      onLoad={() => setLoading(false)}
      src={src as string}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
