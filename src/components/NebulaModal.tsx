import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface NebulaModalProps {
  open: boolean;
  onClose: () => void;
}

const NebulaModal = ({ open, onClose }: NebulaModalProps) => {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !org.trim()) {
      toast.error("ERROR: Required fields missing.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("NEBULA SPEC REQUEST TRANSMITTED.");
      setName("");
      setOrg("");
      setMessage("");
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="glass-panel border border-nebula-purple/30 w-full max-w-lg pointer-events-auto overflow-hidden"
              style={{
                boxShadow: "0 0 40px hsl(270 80% 79% / 0.1)",
              }}
            >
              {/* Header bar */}
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 border-b border-border">
                <div className="w-2.5 h-2.5 rounded-full bg-nebula-purple/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-nebula-green/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/40" />
                <span className="ml-3 text-[10px] text-muted-foreground font-mono">
                  nebula_terminal — deployment_specs.exe
                </span>
                <button
                  onClick={onClose}
                  className="ml-auto text-muted-foreground hover:text-foreground text-xs font-mono"
                >
                  [×]
                </button>
              </div>

              <div className="p-6">
                <h3 className="font-mono text-lg text-nebula-purple mb-1">
                  <span className="text-muted-foreground">$ </span>
                  request.deployment_specs()
                  <span className="text-nebula-purple animate-cursor-blink">_</span>
                </h3>
                <p className="text-[10px] text-muted-foreground font-mono mb-6">
                  {">"} INTEREST_TAG: PROJECT_NEBULA // PRIORITY: HIGH
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Field label="partner_name" value={name} onChange={setName} placeholder="Your name..." />
                  <Field label="organization" value={org} onChange={setOrg} placeholder="Company / Institution..." />
                  <Field
                    label="deployment_context"
                    value={message}
                    onChange={setMessage}
                    placeholder="Describe your fab/pharma environment..."
                    multiline
                  />

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full px-6 py-3 border border-nebula-purple text-nebula-purple font-mono text-sm tracking-wider hover:bg-nebula-purple hover:text-primary-foreground transition-all duration-300 disabled:opacity-50"
                  >
                    {sending ? (
                      <span className="metric-pulse">TRANSMITTING...</span>
                    ) : (
                      <>execute_[REQUEST_SPECS]</>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Field = ({
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
      <span className="text-nebula-purple">→</span> {label}_[
    </label>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full bg-background/80 border border-border px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:border-nebula-purple focus:outline-none transition-colors resize-none"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-background/80 border border-border px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:border-nebula-purple focus:outline-none transition-colors"
      />
    )}
    <span className="text-xs text-muted-foreground font-mono">]</span>
  </div>
);

export default NebulaModal;
