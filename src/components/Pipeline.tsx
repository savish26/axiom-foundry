import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const Pipeline = () => {
  const [metrics, setMetrics] = useState({
    datasets: 1200000,
    latency: 2.1,
    fidelity: 99.8,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        datasets: prev.datasets + Math.floor(Math.random() * 50),
        latency: Math.round((1.8 + Math.random() * 0.8) * 10) / 10,
        fidelity: Math.round((99.5 + Math.random() * 0.5) * 10) / 10,
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="pipeline" className="relative py-24 px-4 border-t border-border">
      {/* Metric overlay header */}
      <div className="max-w-6xl mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass-panel border border-primary/20 p-4 flex flex-wrap justify-between gap-4 text-xs font-mono"
        >
          <MetricItem
            label="Datasets Synthesized"
            value={`${(metrics.datasets / 1e6).toFixed(2)}M Epochs`}
            color="text-primary"
          />
          <MetricItem
            label="Latency"
            value={`${metrics.latency}ms`}
            color="text-primary"
          />
          <MetricItem
            label="Data Fidelity Score"
            value={`${metrics.fidelity}%`}
            color="text-primary"
          />
          <MetricItem
            label="Pipeline Status"
            value="STREAMING"
            color="text-primary"
            pulse
          />
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto">
        <p className="text-xs text-muted-foreground tracking-[0.3em] uppercase mb-4 font-mono">
          // pipeline.multimodal_stream
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-10">
          Real-time <span className="text-primary text-glow">Multi-Modal</span> Pipeline
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <CVStream />
          <HapticTelemetry />
          <SpatialPointCloud />
        </div>
      </div>
    </section>
  );
};

const MetricItem = ({
  label,
  value,
  color,
  pulse,
}: {
  label: string;
  value: string;
  color: string;
  pulse?: boolean;
}) => (
  <div className="flex items-center gap-3">
    <span className="text-muted-foreground">{label}:</span>
    <span className={`${color} ${pulse ? "metric-pulse" : ""} font-semibold`}>
      {value}
    </span>
  </div>
);

/* Column 1: CV Stream */
const CVStream = () => {
  const [boxes, setBoxes] = useState([
    { id: 1, x: 15, y: 20, w: 30, h: 35, label: "OBJ_001", conf: 0.94 },
    { id: 2, x: 55, y: 40, w: 25, h: 30, label: "TOOL_003", conf: 0.87 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBoxes((prev) =>
        prev.map((box) => ({
          ...box,
          x: box.x + (Math.random() - 0.5) * 3,
          y: box.y + (Math.random() - 0.5) * 3,
          conf: Math.round((0.8 + Math.random() * 0.2) * 100) / 100,
        }))
      );
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="glass-panel border border-border p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-primary">CV_STREAM</span>
        <span className="w-2 h-2 rounded-full bg-primary metric-pulse" />
      </div>
      <div className="aspect-video bg-background/80 rounded-sm relative overflow-hidden mb-3">
        {/* Simulated video feed background */}
        <div className="absolute inset-0 grid-bg opacity-30" />
        {/* Bounding boxes */}
        {boxes.map((box) => (
          <div
            key={box.id}
            className="absolute border border-primary/70 transition-all duration-500"
            style={{
              left: `${box.x}%`,
              top: `${box.y}%`,
              width: `${box.w}%`,
              height: `${box.h}%`,
            }}
          >
            <span className="absolute -top-4 left-0 text-[9px] font-mono text-primary bg-primary/10 px-1">
              {box.label} [{box.conf}]
            </span>
          </div>
        ))}
        <div className="absolute bottom-1 left-1 text-[8px] text-muted-foreground font-mono">
          YOLO_v9 | 30fps | 1920x1080
        </div>
      </div>
      <div className="text-[10px] text-muted-foreground font-mono space-y-1">
        <p>Objects detected: <span className="text-primary">2</span></p>
        <p>Classification: <span className="text-foreground">MANIPULATION_EVENT</span></p>
      </div>
    </motion.div>
  );
};

/* Column 2: Haptic Telemetry */
const HapticTelemetry = () => {
  const [data, setData] = useState<{ t: number; torque: number; force: number }[]>([]);
  const tickRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      tickRef.current++;
      const t = tickRef.current;
      setData((prev) => {
        const next = [
          ...prev,
          {
            t,
            torque: Math.sin(t * 0.3) * 40 + 50 + (Math.random() - 0.5) * 15,
            force: Math.cos(t * 0.2) * 30 + 45 + (Math.random() - 0.5) * 10,
          },
        ];
        return next.slice(-40);
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="glass-panel border border-border p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-primary">HAPTIC_TELEMETRY</span>
        <span className="w-2 h-2 rounded-full bg-primary metric-pulse" />
      </div>
      <div className="aspect-video bg-background/80 rounded-sm relative overflow-hidden mb-3 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="t" hide />
            <YAxis hide domain={[0, 100]} />
            <Line
              type="monotone"
              dataKey="torque"
              stroke="hsl(185 100% 50%)"
              strokeWidth={1.5}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="force"
              stroke="hsl(40 100% 50%)"
              strokeWidth={1}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="absolute bottom-1 left-2 text-[8px] text-muted-foreground font-mono">
          JOINT_R3 | 200Hz
        </div>
      </div>
      <div className="text-[10px] text-muted-foreground font-mono space-y-1 flex gap-4">
        <p>
          <span className="inline-block w-2 h-0.5 bg-primary mr-1 align-middle" />
          Torque (Nm)
        </p>
        <p>
          <span className="inline-block w-2 h-0.5 bg-accent mr-1 align-middle" />
          Force (N)
        </p>
      </div>
    </motion.div>
  );
};

/* Column 3: Spatial Point Cloud */
const SpatialPointCloud = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const points = Array.from({ length: 200 }, () => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: Math.random() * 2 - 1,
      vx: (Math.random() - 0.5) * 0.005,
      vy: (Math.random() - 0.5) * 0.005,
      vz: (Math.random() - 0.5) * 0.005,
    }));

    let angle = 0;
    let animId: number;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      angle += 0.005;

      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        if (Math.abs(p.x) > 1) p.vx *= -1;
        if (Math.abs(p.y) > 1) p.vy *= -1;
        if (Math.abs(p.z) > 1) p.vz *= -1;

        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        const rx = p.x * cosA - p.z * sinA;
        const rz = p.x * sinA + p.z * cosA;
        const scale = 1 / (2 + rz);
        const sx = w / 2 + rx * w * 0.3 * scale;
        const sy = h / 2 + p.y * h * 0.3 * scale;
        const size = Math.max(0.5, 2 * scale);
        const alpha = 0.3 + 0.7 * scale;

        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(185, 100%, 50%, ${alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(1, 1);
    };
    resize();
    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      className="glass-panel border border-border p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-primary">SPATIAL_CLOUD</span>
        <span className="w-2 h-2 rounded-full bg-primary metric-pulse" />
      </div>
      <div className="aspect-video bg-background/80 rounded-sm relative overflow-hidden mb-3">
        <canvas ref={canvasRef} className="w-full h-full" />
        <div className="absolute bottom-1 left-1 text-[8px] text-muted-foreground font-mono">
          LiDAR_L515 | 30fps | 200pts
        </div>
      </div>
      <div className="text-[10px] text-muted-foreground font-mono space-y-1">
        <p>Point density: <span className="text-primary">200/frame</span></p>
        <p>Depth range: <span className="text-foreground">0.3m - 4.2m</span></p>
      </div>
    </motion.div>
  );
};

export default Pipeline;
