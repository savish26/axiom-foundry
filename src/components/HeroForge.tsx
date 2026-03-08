import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const HeroForge = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline pointer-events-none" />

      {/* Wireframe Hand SVG */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px) rotateY(${mousePos.x * 8}deg) rotateX(${-mousePos.y * 8}deg)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <svg
          viewBox="0 0 400 500"
          className="w-64 md:w-96 opacity-20"
          fill="none"
          stroke="hsl(185 100% 50%)"
          strokeWidth="0.8"
        >
          {/* Palm */}
          <polygon points="150,250 250,250 270,350 200,400 130,350" />
          {/* Fingers */}
          <line x1="150" y1="250" x2="120" y2="140" />
          <line x1="120" y1="140" x2="115" y2="90" />
          <line x1="180" y1="250" x2="165" y2="110" />
          <line x1="165" y1="110" x2="160" y2="60" />
          <line x1="210" y1="250" x2="210" y2="100" />
          <line x1="210" y1="100" x2="210" y2="50" />
          <line x1="240" y1="250" x2="255" y2="120" />
          <line x1="255" y1="120" x2="260" y2="80" />
          {/* Thumb */}
          <line x1="140" y1="290" x2="100" y2="270" />
          <line x1="100" y1="270" x2="80" y2="240" />
          {/* Joints */}
          {[
            [150, 250], [250, 250], [270, 350], [200, 400], [130, 350],
            [120, 140], [115, 90], [165, 110], [160, 60],
            [210, 100], [210, 50], [255, 120], [260, 80],
            [100, 270], [80, 240], [140, 290],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3" fill="hsl(185 100% 50% / 0.4)" stroke="hsl(185 100% 50%)" />
          ))}
          {/* Wrist */}
          <line x1="130" y1="350" x2="120" y2="430" />
          <line x1="270" y1="350" x2="280" y2="430" />
          <line x1="120" y1="430" x2="280" y2="430" />
          {/* Internal structure lines */}
          <line x1="200" y1="400" x2="200" y2="250" strokeDasharray="4 4" opacity="0.4" />
          <line x1="150" y1="300" x2="250" y2="300" strokeDasharray="4 4" opacity="0.4" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-6">
            // system.initialize
          </p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
            <span className="text-foreground">Project Axiom: </span>
            <span className="text-primary text-glow">physical_AI</span>
            <span className="text-muted-foreground">.data_foundry</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed font-mono">
            Engineering high-fidelity, comprehensive multi-modal datasets for humanoid robotics.
            The foundation of next-generation physical intelligence.
          </p>
          <a
            href="#pipeline"
            className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-mono text-sm tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-300 animate-pulse-glow"
          >
            <span className="w-2 h-2 bg-primary rounded-full" />
            View_Data_Streams
          </a>
        </motion.div>
      </div>

      {/* Bottom data ticker */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border px-4 py-2 flex justify-between text-xs text-muted-foreground font-mono">
        <span>SYS_STATUS: <span className="text-primary">ONLINE</span></span>
        <span>FORGE_TEMP: 2847°K</span>
        <span>UPLINK: <span className="text-primary">ACTIVE</span></span>
      </div>
    </section>
  );
};

export default HeroForge;
