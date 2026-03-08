import { motion } from "framer-motion";

const DriverProfile = () => (
  <section className="py-32 px-6 md:px-12 max-w-6xl mx-auto">
    <div className="grid md:grid-cols-[auto,1fr] gap-16 items-start">
      {/* Left accent */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="hidden md:flex flex-col items-center gap-4"
      >
        <div className="w-px h-20 bg-gradient-to-b from-primary to-transparent" />
        <span className="font-mono text-[10px] tracking-[0.3em] text-primary -rotate-90 whitespace-nowrap">
          SECTOR 01
        </span>
      </motion.div>

      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-mono text-[10px] tracking-[0.4em] text-secondary/70 uppercase">About</span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mt-2 tracking-tight">
            The Driver
          </h2>
          <div className="w-16 h-1 bg-primary mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              Software engineering student at the Informatics Institute of Technology, Sri Lanka. 
              I'm drawn to the kind of engineering where precision matters — where the difference 
              between good and great lives in the margins.
            </p>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              My focus is on building clean, performant software. Code that reads well, 
              systems that scale, and interfaces that feel right. When I'm not coding, 
              I'm analyzing race strategy or tinkering with something new.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {[
              { label: "Base", value: "Sri Lanka", icon: "📍" },
              { label: "Team", value: "IIT — Software Engineering", icon: "🏫" },
              { label: "Focus", value: "Full-stack · Systems · Architecture", icon: "⚡" },
              { label: "Season", value: "2026 — Active", icon: "🏁" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="flex items-start gap-4 p-4 bg-card/50 border border-border/50 hover:border-primary/30 transition-colors group"
              >
                <span className="text-lg">{item.icon}</span>
                <div>
                  <p className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{item.value}</p>
                  <p className="font-mono text-[9px] text-muted-foreground tracking-wider uppercase mt-0.5">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

export default DriverProfile;
