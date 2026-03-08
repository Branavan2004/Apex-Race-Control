import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ArrowUpRight, FileText } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const channels = [
  { label: "Email", icon: Mail, href: "mailto:branavan@example.com", desc: "Academic & professional inquiries", freq: "107.3", detail: "Response within 24 hours · Preferred for formal communication" },
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com", desc: "Professional network & academic connections", freq: "142.8", detail: "500+ connections · Endorsements & recommendations available" },
  { label: "GitHub", icon: Github, href: "https://github.com", desc: "Source code, research implementations & OSS contributions", freq: "98.7", detail: "50+ repositories · Contribution graph & project documentation" },
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

  return (
    <section className="py-32 px-6 md:px-12 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-secondary" />
          <span className="font-mono text-[10px] tracking-[0.4em] text-secondary/70 uppercase">Pit Lane</span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-black text-foreground tracking-tight">Get in Touch</h2>
        <p className="font-body text-muted-foreground mt-3 max-w-2xl">
          I am actively seeking internship opportunities, research assistantships, and graduate-level positions 
          in software engineering, distributed systems, and applied machine learning. I welcome inquiries from 
          academic supervisors, industry recruiters, and fellow developers. Whether you wish to discuss a 
          research collaboration, a technical project, or career opportunities — I would be pleased to connect.
        </p>
      </motion.div>

      {/* Availability status */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="bg-f1-green/5 border border-f1-green/20 rounded-lg p-4 mb-8 flex items-center gap-4">
        <div className="w-3 h-3 rounded-full bg-f1-green animate-pulse" />
        <div>
          <p className="font-display text-sm font-semibold text-f1-green">Available for Opportunities</p>
          <p className="font-mono text-[9px] text-muted-foreground mt-0.5">Open to: Full-time · Contract · Freelance · Open Source Collaboration</p>
        </div>
      </motion.div>

      {/* Radio wave visualization */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="bg-card/50 border border-border/30 rounded-lg p-4 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-[8px] tracking-[0.2em] text-muted-foreground/40 uppercase">Communication Channel</span>
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
              <p className="font-body text-sm text-muted-foreground mt-1">{ch.desc}</p>
              <p className="font-mono text-[9px] text-muted-foreground/40 mt-2">{ch.detail}</p>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Resume download hint */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 text-center"
      >
        <div className="inline-flex items-center gap-2 bg-card border border-border px-5 py-3 rounded-lg hover:border-primary/30 transition-colors cursor-pointer">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <span className="font-display text-sm font-semibold text-foreground">Download Resume</span>
          <span className="font-mono text-[8px] text-muted-foreground/40">PDF · Updated March 2026</span>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactRadio;
