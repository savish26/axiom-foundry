import { motion } from "framer-motion";

const Bottleneck = () => {
  return (
    <section className="relative py-24 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs text-muted-foreground tracking-[0.3em] uppercase mb-4 font-mono">
            // diagnostics.bottleneck
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            The <span className="text-accent">Bottleneck</span> in Physical AI
          </h2>
          <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
            The robotics industry is starving for data. Current datasets are sparse, single-modal,
            and lack the physical context needed for dexterous manipulation and real-world reasoning.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Standard Datasets */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel p-6 border border-border relative overflow-hidden"
          >
            <div className="absolute top-3 right-3 text-xs text-accent font-mono px-2 py-0.5 border border-accent/30 bg-accent/5">
              LEGACY
            </div>
            <h3 className="font-heading text-lg font-semibold mb-3 text-muted-foreground">
              Standard Datasets
            </h3>
            {/* Simulated blurred image */}
            <div className="aspect-video bg-muted rounded-sm mb-4 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-secondary opacity-80" />
              <div className="w-24 h-16 border-2 border-muted-foreground/30 rounded-sm blur-sm" />
              <div className="absolute bottom-2 right-2 text-[10px] text-muted-foreground font-mono">
                RGB_ONLY / 640x480
              </div>
            </div>
            <ul className="space-y-2 text-xs text-muted-foreground font-mono">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                Single-modal (vision only)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                Limited environmental diversity
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                No force/haptic context
              </li>
            </ul>
            <p className="mt-4 text-xs font-mono text-accent">
              → "Limited Context"
            </p>
          </motion.div>

          {/* Axiom Advantage */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-panel p-6 border border-primary/30 border-glow relative overflow-hidden"
          >
            <div className="absolute top-3 right-3 text-xs text-primary font-mono px-2 py-0.5 border border-primary/30 bg-primary/5">
              AXIOM
            </div>
            <h3 className="font-heading text-lg font-semibold mb-3 text-primary">
              The Axiom Advantage
            </h3>
            {/* Simulated 3D point cloud */}
            <div className="aspect-video bg-muted rounded-sm mb-4 relative overflow-hidden">
              <PointCloudSimulation />
              <div className="absolute bottom-2 right-2 text-[10px] text-primary font-mono">
                MULTI-MODAL / 6-DOF / 4K
              </div>
            </div>
            <ul className="space-y-2 text-xs text-foreground font-mono">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Vision + Haptic + Spatial fusion
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                1000+ environment variations
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Real-time force telemetry overlay
              </li>
            </ul>
            <p className="mt-4 text-xs font-mono text-primary text-glow">
              → "Rich Multi-Modal Fidelity"
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PointCloudSimulation = () => {
  const dots = Array.from({ length: 80 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    size: Math.random() * 2 + 1,
  }));

  return (
    <div className="absolute inset-0">
      {dots.map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
            opacity: 0.3 + Math.random() * 0.7,
            animation: `metric-pulse ${1.5 + dot.delay}s ease-in-out infinite`,
          }}
        />
      ))}
      {/* Vector arrows */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {[
          { x1: 30, y1: 40, x2: 38, y2: 35 },
          { x1: 55, y1: 60, x2: 60, y2: 52 },
          { x1: 70, y1: 30, x2: 78, y2: 28 },
          { x1: 45, y1: 75, x2: 52, y2: 70 },
        ].map((arrow, i) => (
          <line
            key={i}
            x1={arrow.x1}
            y1={arrow.y1}
            x2={arrow.x2}
            y2={arrow.y2}
            stroke="hsl(185 100% 50%)"
            strokeWidth="0.5"
            markerEnd="url(#arrowhead)"
            opacity="0.6"
          />
        ))}
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="hsl(185 100% 50%)" />
          </marker>
        </defs>
      </svg>
    </div>
  );
};

export default Bottleneck;
