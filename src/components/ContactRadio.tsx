import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import SectorHeader from "./SectorHeader";

const channels = [
  { label: "Radio Driver", desc: "Email", icon: Mail, href: "mailto:branavan@example.com" },
  { label: "Team Network", desc: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { label: "Code Garage", desc: "GitHub", icon: Github, href: "https://github.com" },
];

const ContactRadio = () => (
  <section className="relative py-24 px-4 md:px-8 max-w-5xl mx-auto">
    <SectorHeader sector="Pit Lane" title="RADIO COMMUNICATION" subtitle="Open a channel" />

    <div className="grid md:grid-cols-3 gap-6">
      {channels.map((ch, i) => (
        <motion.a
          key={ch.label}
          href={ch.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
          whileHover={{ scale: 1.03, borderColor: "hsl(var(--primary))" }}
          className="border border-border bg-card/60 backdrop-blur-md p-6 flex flex-col items-center gap-4 text-center group cursor-pointer transition-colors"
        >
          <div className="w-14 h-14 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            <ch.icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="font-display text-sm font-bold text-foreground">{ch.label}</p>
            <p className="font-body text-xs text-f1-cyan">{ch.desc}</p>
          </div>
          {/* Radio waves */}
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, j) => (
              <motion.div
                key={j}
                className="w-0.5 bg-f1-cyan/50 rounded-full"
                animate={{ height: [3, 8 + Math.random() * 8, 3] }}
                transition={{ repeat: Infinity, duration: 0.6, delay: j * 0.1 }}
              />
            ))}
          </div>
        </motion.a>
      ))}
    </div>
  </section>
);

export default ContactRadio;
