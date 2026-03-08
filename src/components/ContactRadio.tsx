import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const channels = [
  { label: "Email", icon: Mail, href: "mailto:branavan@example.com", desc: "Direct radio link", freq: "107.3" },
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com", desc: "Team network", freq: "142.8" },
  { label: "GitHub", icon: Github, href: "https://github.com", desc: "Code garage", freq: "98.7" },
];

const RadioWave = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 400; canvas.height = 40;
    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, 400, 40);
      ctx.beginPath();
      ctx.strokeStyle = "hsla(0, 85%, 52%, 0.3)";
      ctx.lineWidth = 1;
      for (let x = 0; x < 400; x++) {
        const y = 20 + Math.sin((x + frame * 2) * 0.05) * 8 * Math.sin(x * 0.01 + frame * 0.02) + Math.random() * 2;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      frame++;
      requestAnimationFrame(draw);
    };
    const id = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(id);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-10 opacity-50" />;
};

const ContactRadio = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [tuning, setTuning] = useState(false);

  return (
    <section className="py-32 px-6 md:px-12 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-secondary" />
          <span className="font-mono text-[10px] tracking-[0.4em] text-secondary/70 uppercase">Pit Lane</span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-black text-foreground tracking-tight">Radio Comms</h2>
        <p className="font-body text-muted-foreground mt-3 max-w-lg">
          Open to opportunities, collaborations, or a good chat about engineering and race strategy.
        </p>
      </motion.div>

      {/* Radio wave visualization */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="bg-card/50 border border-border/30 rounded-lg p-4 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-[8px] tracking-[0.2em] text-muted-foreground/40 uppercase">Radio Frequency</span>
          <span className="font-mono text-[10px] text-primary/60 ml-auto tabular-nums">
            {hovered !== null ? channels[hovered].freq : "---.-"} MHz
          </span>
        </div>
        <RadioWave />
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        {channels.map((ch, i) => (
          <motion.a
            key={ch.label}
            href={ch.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className={`relative group p-8 border transition-all duration-300 overflow-hidden ${
              hovered === i ? "bg-primary/5 border-primary/40 scale-[1.02]" : "bg-card border-border hover:border-border"
            }`}
          >
            {hovered === i && (
              <motion.div layoutId="contact-glow"
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            )}
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                  hovered === i ? "bg-primary/15" : "bg-muted/50"
                }`}>
                  <ch.icon className={`w-5 h-5 transition-colors ${hovered === i ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <ArrowUpRight className={`w-4 h-4 transition-all ${
                    hovered === i ? "text-primary translate-x-0.5 -translate-y-0.5" : "text-muted-foreground/30"
                  }`} />
                  <span className="font-mono text-[8px] text-muted-foreground/30 tabular-nums">{ch.freq} MHz</span>
                </div>
              </div>
              <h3 className={`font-display text-xl font-bold transition-colors ${hovered === i ? "text-primary" : "text-foreground"}`}>
                {ch.label}
              </h3>
              <p className="font-mono text-xs text-muted-foreground mt-1">{ch.desc}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default ContactRadio;
