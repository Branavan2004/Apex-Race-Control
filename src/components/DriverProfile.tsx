import { motion } from "framer-motion";
import SectorHeader from "./SectorHeader";

const DriverProfile = () => (
  <section className="py-32 px-6 md:px-8 max-w-3xl mx-auto">
    <SectorHeader
      sector="Sector 1"
      title="About Me"
      subtitle="The short version — before we get into the telemetry."
    />

    <div className="grid md:grid-cols-[1fr,auto] gap-12 items-start">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
          I'm a software engineering student at the Informatics Institute of Technology, Sri Lanka. 
          I'm drawn to the kind of engineering where precision matters — where the difference between 
          good and great is in the margins, not unlike Formula 1 itself.
        </p>
        <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8">
          My focus is on building clean, performant software. I care about code that reads well, 
          systems that scale, and interfaces that feel right. When I'm not coding, I'm probably 
          reading about race strategy or tinkering with something I shouldn't be.
        </p>

        {/* Info pairs — clean, no boxes */}
        <div className="space-y-4 border-t border-border/50 pt-6">
          {[
            { label: "Based in", value: "Sri Lanka" },
            { label: "Studying", value: "Software Engineering @ IIT" },
            { label: "Interests", value: "Systems design, clean architecture, motorsport" },
          ].map((item) => (
            <div key={item.label} className="flex gap-6">
              <span className="font-display text-[10px] tracking-[0.2em] text-muted-foreground/40 uppercase w-24 shrink-0 pt-1">
                {item.label}
              </span>
              <span className="font-body text-foreground/80">{item.value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Driver number — subtle accent */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="hidden md:block"
      >
        <span className="font-display text-[120px] font-black text-border/30 leading-none select-none">
          01
        </span>
      </motion.div>
    </div>
  </section>
);

export default DriverProfile;
