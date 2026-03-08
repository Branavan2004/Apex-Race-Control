import { motion } from "framer-motion";

const certifications = [
  "AWS Certified Cloud Practitioner",
  "Meta Front-End Developer Professional Certificate",
  "Google UX Design Professional Certificate",
  "Stanford Machine Learning (Coursera — Andrew Ng)",
  "IBM Data Science Professional Certificate",
];

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
              I am a dedicated software engineering undergraduate at the Informatics Institute of Technology 
              (affiliated with the University of Westminster, UK), with a strong focus on building robust, 
              scalable, and maintainable software systems. My engineering philosophy centers on precision — 
              writing clean code, designing thoughtful architectures, and delivering interfaces that 
              prioritize both performance and user experience.
            </p>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              My technical interests span full-stack web development, distributed systems, cloud-native 
              architectures, and machine learning. I am committed to continuous learning and actively 
              contribute to open-source projects, technical communities, and collaborative engineering efforts.
            </p>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Beyond technical proficiency, I bring strong communication skills, a collaborative mindset, 
              and the ability to translate complex requirements into elegant solutions. I thrive in 
              environments that demand both creative thinking and analytical rigor.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-5"
          >
            {[
              { label: "Location", value: "Colombo, Sri Lanka", icon: "📍" },
              { label: "Education", value: "BSc (Hons) Software Engineering", icon: "🎓" },
              { label: "Institution", value: "IIT · University of Westminster, UK", icon: "🏫" },
              { label: "Specialization", value: "Full-Stack · Cloud · System Design", icon: "⚡" },
              { label: "Status", value: "Actively Seeking Opportunities", icon: "🟢" },
              { label: "Season", value: "2026 — Final Year", icon: "🏁" },
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

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="p-4 bg-card/50 border border-border/50"
            >
              <p className="font-mono text-[9px] text-muted-foreground tracking-wider uppercase mb-3">Certifications & Courses</p>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-f1-green" />
                    <span className="font-body text-sm text-foreground/80">{cert}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

export default DriverProfile;
