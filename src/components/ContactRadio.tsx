import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Radio, Signal } from "lucide-react";
import { useState } from "react";

const channels = [
  { label: "Radio Driver", note: "Email", icon: Mail, href: "mailto:branavan@example.com", freq: "145.8 MHz" },
  { label: "Team Network", note: "LinkedIn", icon: Linkedin, href: "https://linkedin.com", freq: "162.4 MHz" },
  { label: "Code Garage", note: "GitHub", icon: Github, href: "https://github.com", freq: "178.2 MHz" },
];

const ContactRadio = () => {
  const [activeChannel, setActiveChannel] = useState<number | null>(null);

  return (
    <section className="py-32 px-6 md:px-8 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <span className="font-display text-[10px] tracking-[0.4em] text-primary/50 uppercase block mb-3">
          Pit Lane
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-2">
          Radio Communication
        </h2>
        <p className="font-body text-base text-muted-foreground/60 max-w-lg">
          Open to opportunities, collaborations, or just a good conversation about
          software — or why medium tires are underrated.
        </p>
      </motion.div>

      {/* Radio panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="border border-border/50 bg-card/30"
      >
        {/* Radio header */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-border/30 bg-card/50">
          <Radio className="w-3.5 h-3.5 text-f1-cyan" />
          <span className="font-display text-[9px] tracking-[0.3em] text-muted-foreground/40 uppercase">
            Communication Panel
          </span>
          <div className="ml-auto flex items-center gap-1">
            <Signal className="w-3 h-3 text-f1-green" />
            <span className="font-body text-[9px] text-f1-green">Connected</span>
          </div>
        </div>

        <div className="p-5">
          {/* Audio visualizer bar */}
          <div className="flex items-end gap-px h-6 mb-6">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scaleY: activeChannel !== null ? [0.2, Math.random() * 0.8 + 0.2, 0.2] : 0.15,
                }}
                transition={{
                  repeat: activeChannel !== null ? Infinity : 0,
                  duration: 0.3 + Math.random() * 0.3,
                  delay: i * 0.01,
                }}
                className="flex-1 bg-f1-cyan/30 rounded-t-sm"
                style={{ height: "100%", transformOrigin: "bottom" }}
              />
            ))}
          </div>

          {/* Channel buttons */}
          <div className="space-y-2">
            {channels.map((ch, i) => (
              <motion.a
                key={ch.label}
                href={ch.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                onMouseEnter={() => setActiveChannel(i)}
                onMouseLeave={() => setActiveChannel(null)}
                className={`flex items-center gap-4 py-3 px-4 group transition-all duration-300 border border-transparent cursor-pointer ${
                  activeChannel === i
                    ? "bg-f1-cyan/5 border-f1-cyan/20"
                    : "hover:bg-muted/20"
                }`}
              >
                <div className={`w-8 h-8 flex items-center justify-center border transition-colors duration-300 ${
                  activeChannel === i ? "border-f1-cyan/50 bg-f1-cyan/10" : "border-border/30"
                }`}>
                  <ch.icon className={`w-3.5 h-3.5 transition-colors duration-300 ${
                    activeChannel === i ? "text-f1-cyan" : "text-muted-foreground/40"
                  }`} />
                </div>
                <div className="flex-1">
                  <span className={`font-display text-sm font-semibold transition-colors duration-300 ${
                    activeChannel === i ? "text-f1-cyan" : "text-foreground"
                  }`}>
                    {ch.label}
                  </span>
                  <span className="font-body text-xs text-muted-foreground/40 ml-3">{ch.note}</span>
                </div>
                <span className="font-mono text-[9px] text-muted-foreground/20 tabular-nums">{ch.freq}</span>
                <motion.div
                  animate={activeChannel === i ? { scale: [1, 1.5, 1] } : { scale: 1 }}
                  transition={{ repeat: activeChannel === i ? Infinity : 0, duration: 1 }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    activeChannel === i ? "bg-f1-green" : "bg-border/30"
                  }`}
                />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactRadio;
