import { motion } from "framer-motion";
import SectorHeader from "./SectorHeader";

const experiences = [
  {
    role: "Industry Outreach Volunteer",
    org: "IEEE Robotics & Automation Society",
    description:
      "Connected students with industry professionals. Organized workshops that bridged the gap between academic theory and real-world engineering.",
  },
  {
    role: "Event Organizer",
    org: "University Tech Events",
    description:
      "Planned and ran tech conferences and hackathons for 200+ attendees. Learned that logistics is its own kind of engineering.",
  },
  {
    role: "Student Leadership",
    org: "Campus Activities",
    description:
      "Led cross-functional student teams, mentored juniors, and drove initiatives that actually shipped — not just made slide decks.",
  },
];

const PitWall = () => (
  <section className="py-32 px-6 md:px-8 max-w-3xl mx-auto">
    <SectorHeader
      sector="Sector 4"
      title="Pit Wall"
      subtitle="Experience beyond code. The strategy side of the operation."
    />

    <div className="space-y-10">
      {experiences.map((exp, i) => (
        <motion.div
          key={exp.role}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="flex gap-6"
        >
          {/* Number */}
          <span className="font-display text-xs text-muted-foreground/30 tabular-nums pt-1 shrink-0">
            {String(i + 1).padStart(2, "0")}
          </span>

          <div>
            <h3 className="font-display text-base font-semibold text-foreground mb-0.5">{exp.role}</h3>
            <p className="font-body text-xs text-primary/60 mb-3">{exp.org}</p>
            <p className="font-body text-sm text-muted-foreground/70 leading-relaxed">{exp.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default PitWall;
