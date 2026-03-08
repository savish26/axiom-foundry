import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import manifoldImg from "@/assets/uhp-manifold.jpg";
import NebulaModal from "./NebulaModal";

/* ─── Helpers ─── */
const genWave = (
  base: number,
  amp: number,
  freq: number,
  t: number,
  noise = 3
) => base + Math.sin(t * freq) * amp + (Math.random() - 0.5) * noise;

/* ─── Main Section ─── */
const NebulaTrailer = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [phase, setPhase] = useState(0); // 0→idle, 1→detected, 2→trace, 3→predict, 4→title
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 2400),
      setTimeout(() => setPhase(3), 5000),
      setTimeout(() => setPhase(4), 7600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative py-24 px-4 border-t border-nebula-purple/20 overflow-hidden"
        id="nebula"
      >
        {/* Section header */}
        <div className="max-w-6xl mx-auto mb-6">
          <p className="text-xs text-muted-foreground tracking-[0.3em] uppercase mb-4 font-mono">
            // project.nebula :: <span className="text-nebula-purple">coming_soon</span>
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            Critical Environment{" "}
            <span className="text-nebula-purple nebula-glow-purple">Monitor</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl">
            A forensic-grade multi-modal monitoring stack for UHP gas delivery
            networks. Watch the detection sequence below.
          </p>
        </div>

        {/* ── Step 1: Inciting Incident ── */}
        <IncitingIncident phase={phase} />

        {/* ── Step 2: Multi-Modal Trace ── */}
        <MultiModalTrace phase={phase} />

        {/* ── Step 3: Prediction ── */}
        <PredictionPhase phase={phase} />

        {/* ── Step 4: Title Card ── */}
        <TitleCard phase={phase} onCTA={() => setModalOpen(true)} />
      </section>

      <NebulaModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

/* ═══════════════════════════════════════════════
   STEP 1 — The Inciting Incident
   ═══════════════════════════════════════════════ */
const IncitingIncident = ({ phase }: { phase: number }) => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    if (phase < 1) return;
    // brief glitch burst
    setGlitch(true);
    const t = setTimeout(() => setGlitch(false), 400);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div className="max-w-6xl mx-auto mb-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-sm overflow-hidden border border-border"
      >
        {/* Manifold image */}
        <div
          className="relative aspect-[21/9] bg-cover bg-center"
          style={{
            backgroundImage: `url(${manifoldImg})`,
            filter: glitch ? "hue-rotate(40deg) contrast(1.4)" : "brightness(0.6) contrast(1.1)",
            transition: glitch ? "none" : "filter 0.5s ease",
          }}
        >
          {/* Scanline */}
          <div className="absolute inset-0 scanline pointer-events-none" />

          {/* Glitch bars */}
          {glitch && (
            <>
              <div className="absolute top-[30%] left-0 right-0 h-2 bg-nebula-alert/40" style={{ animation: "glitch-flash 0.15s linear" }} />
              <div className="absolute top-[55%] left-0 right-0 h-1 bg-nebula-alert/30" style={{ animation: "glitch-flash 0.1s linear 0.05s" }} />
            </>
          )}

          {/* Red bounding box around regulator area */}
          <AnimatePresence>
            {phase >= 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="absolute border-2 border-nebula-alert"
                style={{ top: "25%", left: "55%", width: "18%", height: "40%" }}
              >
                {/* Corner markers */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-nebula-alert" />
                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-nebula-alert" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-nebula-alert" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-nebula-alert" />
                {/* Label */}
                <span className="absolute -top-6 left-0 text-[10px] font-mono text-nebula-alert bg-nebula-alert/10 px-2 py-0.5 whitespace-nowrap">
                  ANOMALY_ID::WJ-4072
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom overlay */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-background/80 backdrop-blur-sm border-t border-nebula-alert/30 flex justify-between items-center"
            >
              <span className="text-xs font-mono text-nebula-alert glitch-text">
                EVENT::DETECTED_[12ms ago]
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">
                SENSOR_ARRAY: 128ch | CONFIDENCE: 0.97
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   STEP 2 — Multi-Modal Trace
   ═══════════════════════════════════════════════ */
const MultiModalTrace = ({ phase }: { phase: number }) => {
  const [pressureData, setPressureData] = useState<{ v: number }[]>([]);
  const [purityData, setPurityData] = useState<{ v: number }[]>([]);
  const [acousticData, setAcousticData] = useState<{ v: number }[]>([]);
  const tickRef = useRef(0);

  useEffect(() => {
    if (phase < 2) return;
    const interval = setInterval(() => {
      tickRef.current++;
      const t = tickRef.current;
      setPressureData((p) =>
        [...p, { v: genWave(50, 5, 0.2, t, 2) }].slice(-50)
      );
      setPurityData((p) =>
        [...p, { v: genWave(20, 2, 0.15, t, 1) + (t > 20 ? t * 0.15 : 0) }].slice(-50)
      );
      setAcousticData((p) =>
        [...p, { v: genWave(40, 10, 0.4, t, 4) + (t > 25 ? Math.sin(t * 1.2) * 8 : 0) }].slice(-50)
      );
    }, 150);
    return () => clearInterval(interval);
  }, [phase]);

  const graphs = [
    { label: "PRESSURE", unit: "PSI", data: pressureData, tag: "baseline_nominal" },
    { label: "O₂/MOISTURE_PURITY", unit: "PPB", data: purityData, tag: "nebula_moat ↑ drift" },
    { label: "ACOUSTIC_SENSOR", unit: "kHz", data: acousticData, tag: "axiom_moat ↑ shift" },
  ];

  return (
    <AnimatePresence>
      {phase >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto mb-8"
        >
          {/* Connection line from image */}
          <div className="flex justify-center mb-2">
            <div className="w-px h-8 bg-gradient-to-b from-nebula-purple/50 to-transparent" />
          </div>

          <div className="text-center mb-4">
            <span className="text-xs font-mono text-nebula-purple nebula-glow-purple">
              multi-modal.data_fusion();
            </span>
          </div>

          <div className="space-y-3">
            {graphs.map((g, i) => (
              <motion.div
                key={g.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="glass-panel border border-nebula-purple/15 p-3 flex items-center gap-4"
              >
                <div className="w-40 shrink-0">
                  <div className="text-[10px] font-mono text-nebula-purple">{g.label}</div>
                  <div className="text-[9px] font-mono text-muted-foreground">{g.tag}</div>
                </div>
                <div className="flex-1 h-16">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={g.data}>
                      <YAxis hide />
                      <Line
                        type="monotone"
                        dataKey="v"
                        stroke={phase >= 3 ? "hsl(153 100% 50%)" : "hsl(270 80% 79%)"}
                        strokeWidth={1.5}
                        dot={false}
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-[10px] font-mono text-muted-foreground w-12 text-right">
                  {g.unit}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ═══════════════════════════════════════════════
   STEP 3 — The Prediction
   ═══════════════════════════════════════════════ */
const PredictionPhase = ({ phase }: { phase: number }) => {
  const [countdown, setCountdown] = useState(72 * 60 * 60); // 72 hours in seconds

  useEffect(() => {
    if (phase < 3) return;
    const interval = setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 137)); // fast decrement for drama
    }, 100);
    return () => clearInterval(interval);
  }, [phase]);

  const formatTime = useCallback((s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }, []);

  return (
    <AnimatePresence>
      {phase >= 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto mb-8"
        >
          <div className="glass-panel border border-nebula-green/30 p-6 text-center relative overflow-hidden">
            {/* Pulsing green border glow */}
            <div
              className="absolute inset-0 rounded-sm pointer-events-none"
              style={{
                boxShadow: "inset 0 0 30px hsl(153 100% 50% / 0.08), 0 0 30px hsl(153 100% 50% / 0.05)",
              }}
            />

            <p className="text-xs font-mono text-nebula-green mb-3 nebula-glow-green">
              predictive.maintenance_alert();
            </p>

            <div className="text-4xl md:text-5xl font-mono font-bold text-nebula-green nebula-glow-green mb-2">
              T- {formatTime(countdown)}
            </div>

            <p className="text-xs font-mono text-muted-foreground mb-4">
              PREDICTED VALVE FAILURE // CONFIDENCE: 99.2%
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-nebula-green/10 border border-nebula-green/30 text-nebula-green text-xs font-mono"
            >
              <div className="w-2 h-2 rounded-full bg-nebula-green metric-pulse" />
              → failure_mitigated // maintenance_dispatched
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ═══════════════════════════════════════════════
   STEP 4 — Title Card & CTA
   ═══════════════════════════════════════════════ */
const TitleCard = ({ phase, onCTA }: { phase: number; onCTA: () => void }) => {
  return (
    <AnimatePresence>
      {phase >= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-panel border border-nebula-purple/30 p-10 text-center relative overflow-hidden">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-nebula-purple/40" />
            <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-nebula-purple/40" />
            <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-nebula-purple/40" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-nebula-purple/40" />

            {/* Nebula icon */}
            <div className="mb-6 flex justify-center">
              <NebulaIcon />
            </div>

            <p className="text-xs font-mono text-muted-foreground tracking-[0.3em] uppercase mb-3">
              // coming_soon
            </p>

            <h3 className="font-heading text-4xl md:text-5xl font-black mb-3">
              <span className="text-nebula-purple nebula-glow-purple">Project</span>{" "}
              <span className="text-foreground">Nebula</span>
            </h3>

            <p className="text-sm font-mono text-muted-foreground mb-8">
              deploying_critical_intelligence
              <span className="text-nebula-purple">.for_fabs_and_pharma</span>
            </p>

            <button
              onClick={onCTA}
              className="inline-flex items-center gap-2 px-8 py-3 border border-nebula-purple text-nebula-purple font-mono text-sm tracking-wider hover:bg-nebula-purple hover:text-primary-foreground transition-all duration-300"
              style={{
                boxShadow: "0 0 20px hsl(270 80% 79% / 0.15)",
              }}
            >
              <span className="w-2 h-2 bg-nebula-purple rounded-full metric-pulse" />
              Request_Deployment_Specs
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* Stylized swirling nebula icon */
const NebulaIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="28" stroke="hsl(270 80% 79%)" strokeWidth="0.5" opacity="0.3" />
    <circle cx="32" cy="32" r="20" stroke="hsl(270 80% 79%)" strokeWidth="0.5" opacity="0.4" />
    <circle cx="32" cy="32" r="12" stroke="hsl(270 80% 79%)" strokeWidth="0.5" opacity="0.5" />
    <ellipse cx="32" cy="32" rx="28" ry="10" stroke="hsl(270 80% 79%)" strokeWidth="0.8" opacity="0.6" transform="rotate(30 32 32)" />
    <ellipse cx="32" cy="32" rx="28" ry="10" stroke="hsl(153 100% 50%)" strokeWidth="0.8" opacity="0.4" transform="rotate(-30 32 32)" />
    <ellipse cx="32" cy="32" rx="28" ry="10" stroke="hsl(270 80% 79%)" strokeWidth="0.8" opacity="0.5" transform="rotate(90 32 32)" />
    <circle cx="32" cy="32" r="3" fill="hsl(270 80% 79%)" opacity="0.8" />
    <circle cx="32" cy="32" r="6" fill="hsl(270 80% 79%)" opacity="0.15" />
  </svg>
);

export default NebulaTrailer;
