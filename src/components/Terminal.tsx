import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Terminal = () => {
  const [name, setName] = useState("");
  const [mission, setMission] = useState("");
  const [comms, setComms] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !mission.trim()) {
      toast.error("ERROR: Required fields missing.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("TRANSMISSION SENT. Awaiting response...");
      setName("");
      setMission("");
      setComms("");
    }, 1500);
  };

  return (
    <section className="relative py-24 px-4 border-t border-border">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs text-muted-foreground tracking-[0.3em] uppercase mb-4 font-mono">
            // comms.terminal
          </p>

          <div className="glass-panel border border-primary/20 overflow-hidden">
            {/* Terminal header bar */}
            <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 border-b border-border">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary/60" />
              <span className="ml-3 text-[10px] text-muted-foreground font-mono">
                axiom_terminal — liaison.exe
              </span>
            </div>

            <div className="p-6">
              <h3 className="font-mono text-xl text-primary mb-6">
                <span className="text-muted-foreground">$ </span>
                initiate.liaison()
                <span className="text-primary animate-cursor-blink">_</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <TerminalField
                  label="partner_name"
                  value={name}
                  onChange={setName}
                  placeholder="Enter designation..."
                />
                <TerminalField
                  label="mission_parameters"
                  value={mission}
                  onChange={setMission}
                  placeholder="Describe your mission scope..."
                  multiline
                />
                <TerminalField
                  label="comms_channel"
                  value={comms}
                  onChange={setComms}
                  placeholder="Email or secure channel..."
                />

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full mt-4 px-6 py-3 border border-primary text-primary font-mono text-sm tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <span className="metric-pulse">TRANSMITTING...</span>
                  ) : (
                    <>execute_[SEND]</>
                  )}
                </button>
              </form>

              <p className="text-[10px] text-muted-foreground font-mono mt-4">
                {">"} All transmissions are encrypted. Response ETA: 24-48h.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TerminalField = ({
  label,
  value,
  onChange,
  placeholder,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  multiline?: boolean;
}) => (
  <div>
    <label className="text-xs text-muted-foreground font-mono mb-1 block">
      <span className="text-primary">→</span> {label}_[
    </label>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full bg-background/80 border border-border px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors resize-none"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-background/80 border border-border px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
      />
    )}
    <span className="text-xs text-muted-foreground font-mono">]</span>
  </div>
);

export default Terminal;
