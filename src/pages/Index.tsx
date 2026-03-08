import HeroForge from "@/components/HeroForge";
import Bottleneck from "@/components/Bottleneck";
import Pipeline from "@/components/Pipeline";
import Nebula from "@/components/Nebula";
import Terminal from "@/components/Terminal";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroForge />
      <Bottleneck />
      <Pipeline />
      <Nebula />
      <Terminal />

      {/* Footer */}
      <footer className="border-t border-border py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center text-[10px] text-muted-foreground font-mono">
          <span>© 2026 PROJECT_AXIOM // ALL_RIGHTS_RESERVED</span>
          <span>BUILD_v0.9.1 // CLASSIFICATION: PARTNER_ACCESS</span>
        </div>
      </footer>
    </main>
  );
};

export default Index;
