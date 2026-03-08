import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";

const channels = [
  { label: "Email", note: "The direct line", icon: Mail, href: "mailto:branavan@example.com" },
  { label: "LinkedIn", note: "The professional pit lane", icon: Linkedin, href: "https://linkedin.com" },
  { label: "GitHub", note: "Where the code lives", icon: Github, href: "https://github.com" },
];

const ContactRadio = () => (
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
        Get in Touch
      </h2>
      <p className="font-body text-base text-muted-foreground/60 max-w-lg">
        Open to opportunities, collaborations, or just a good conversation about 
        software — or why medium tires are underrated.
      </p>
    </motion.div>

    <div className="space-y-4">
      {channels.map((ch, i) => (
        <motion.a
          key={ch.label}
          href={ch.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="flex items-center gap-5 py-4 border-b border-border/30 group hover:border-primary/30 transition-colors duration-300 cursor-pointer"
        >
          <ch.icon className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors duration-300" />
          <div className="flex-1">
            <span className="font-display text-sm font-semibold text-foreground group-hover:text-f1-cyan transition-colors duration-300">
              {ch.label}
            </span>
            <span className="font-body text-xs text-muted-foreground/40 ml-3">{ch.note}</span>
          </div>
          <span className="font-body text-xs text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors">
            →
          </span>
        </motion.a>
      ))}
    </div>
  </section>
);

export default ContactRadio;
