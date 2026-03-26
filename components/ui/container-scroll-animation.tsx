"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, MotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export const ContainerScroll = ({
  titleComponent,
  children,
  className,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDimensions = () => isMobile ? [0.8, 1] : [1.1, 1];
  
  // Smoother animations using springs
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const rotate = useTransform(smoothProgress, [0, 0.5], [25, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5], scaleDimensions());
  const translate = useTransform(smoothProgress, [0, 0.5], [0, -80]);
  const opacity = useTransform(smoothProgress, [0, 0.1, 0.45, 0.5], [0, 1, 1, 0.8]);

  return (
    <div
      className={cn("min-h-[80vh] md:min-h-[120vh] flex items-center justify-center relative p-4 md:p-20 py-20", className)}
      ref={containerRef}
    >
      <div
        className="w-full relative py-10 md:py-20"
        style={{ perspective: "1500px" }}
      >
        <Header translate={translate} titleComponent={titleComponent} opacity={opacity} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent, opacity }: { translate: MotionValue<number>, titleComponent: any, opacity: MotionValue<number> }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
        opacity: opacity,
      }}
      className="max-w-7xl mx-auto px-4 text-center mb-12 md:mb-24"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
      }}
      className="max-w-6xl -mt-10 mx-auto w-full group relative"
    >
      {/* Premium Glass Frame */}
      <div className="relative p-1 md:p-3 rounded-[32px] bg-gradient-to-b from-white/10 to-transparent backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
        
        <div className="relative h-[25rem] md:h-[45rem] w-full overflow-hidden rounded-[24px] bg-black/40 border border-white/5 shadow-inner transition-colors group-hover:bg-black/20">
          {children}
        </div>

        {/* Home indicator/bezel detail */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-white/10" />
      </div>

      {/* Decorative glow behind the card */}
      <div className="absolute -inset-4 bg-primary/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />
    </motion.div>
  );
};
