import { motion } from "framer-motion";

const Nebula = () => {
  return (
    <section className="relative py-24 px-4 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs text-muted-foreground tracking-[0.3em] uppercase mb-4 font-mono">
            // application.sub_module
          </p>

          <div className="glass-panel border border-accent/20 p-8 relative overflow-hidden">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent/40" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent/40" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent/40" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent/40" />

            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-accent rounded-full metric-pulse" />
              <span className="text-xs font-mono text-accent tracking-wider">
                PROJECT_NEBULA // VIZAG_GAS_MODULE
              </span>
            </div>

            <h3 className="font-heading text-2xl md:text-3xl font-bold mb-2">
              Nebula: <span className="text-accent">Critical_Environment_Monitor</span>
            </h3>

            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-2xl">
              Deploying Axiom&apos;s multi-modal monitoring stack for UHP (Ultra-High Purity)
              gas delivery networks in Semiconductor/Pharma cleanrooms. Predicting failures
              before they affect yields.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Gas Lines Monitored", value: "128", unit: "channels" },
                { label: "Prediction Window", value: "72", unit: "hours" },
                { label: "Yield Impact", value: "+4.2", unit: "%" },
                { label: "False Positive Rate", value: "0.01", unit: "%" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 bg-background/50 border border-border">
                  <div className="text-lg font-heading font-bold text-accent">
                    {stat.value}
                    <span className="text-xs text-muted-foreground ml-1">{stat.unit}</span>
                  </div>
                  <div className="text-[10px] text-muted-foreground font-mono mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Nebula;
