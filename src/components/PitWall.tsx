import { motion } from "framer-motion";
import { Timer, Users, Wrench } from "lucide-react";
import SectorHeader from "./SectorHeader";
import { useState, useEffect } from "react";

const experiences = [
  {
    role: "Industry Outreach Volunteer",
    org: "IEEE Robotics & Automation Society",
    description:
      "Connected students with industry professionals. Organized workshops that bridged the gap between academic theory and real-world engineering.",
    icon: Users,
    status: "COMPLETED",
  },
  {
    role: "Event Organizer",
    org: "University Tech Events",
    description:
      "Planned and ran tech conferences and hackathons for 200+ attendees. Learned that logistics is its own kind of engineering.",
    icon: Wrench,
    status: "COMPLETED",
  },
  {
    role: "Student Leadership",
    org: "Campus Activities",
    description:
      "Led cross-functional student teams, mentored juniors, and drove initiatives that actually shipped — not just made slide decks.",
    icon: Timer,
    status: "ACTIVE",
  },
];

const PitWall = () => {
  const [pitTime, setPitTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isActive) {
          setIsActive(true);
          setPitTime(0);
        }
      },
      { threshold: 0.3 }
    );
    const el = document.getElementById("pit-wall-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setPitTime((t) => {
        if (t >= 2.4) {
          clearInterval(interval);
          return 2.4;
        }
        return t + 0.1;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <section id="pit-wall-section" className="py-32 px-6 md:px-8 max-w-3xl mx-auto">
      <SectorHeader
        sector="Sector 4"
        title="Pit Wall"
        subtitle="Experience beyond code. The strategy side of the operation."
      />

      {/* Pit stop timer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-10 p-4 border border-border/30 bg-card/30"
      >
        <Timer className="w-4 h-4 text-f1-cyan" />
        <div className="flex-1">
          <span className="font-display text-[9px] tracking-[0.3em] text-muted-foreground/40 uppercase">
            Pit Stop Time
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-display text-2xl font-bold text-f1-cyan tabular-nums">
              {pitTime.toFixed(1)}s
            </span>
            <span className={`font-display text-[9px] tracking-wider ${
              pitTime >= 2.4 ? "text-f1-green" : "text-f1-yellow"
            }`}>
              {pitTime >= 2.4 ? "COMPLETE" : "IN PROGRESS"}
            </span>
          </div>
        </div>
        {/* Tire change indicators */}
        <div className="flex gap-2">
          {["FL", "FR", "RL", "RR"].map((tire, i) => (
            <motion.div
              key={tire}
              animate={{
                backgroundColor: pitTime > (i + 1) * 0.5 ? "hsl(145 100% 45%)" : "hsl(0 0% 15%)",
              }}
              className="w-6 h-6 rounded-full flex items-center justify-center border border-border/30"
            >
              <span className="font-display text-[6px] text-background font-bold">{tire}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Strategy board */}
      <div className="space-y-4">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.role}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="border border-border/30 bg-card/20 hover:bg-card/40 transition-all duration-300 group"
          >
            <div className="flex items-start gap-4 p-5">
              {/* Icon */}
              <div className="w-10 h-10 border border-border/30 flex items-center justify-center shrink-0 group-hover:border-f1-cyan/30 transition-colors">
                <exp.icon className="w-4 h-4 text-muted-foreground/40 group-hover:text-f1-cyan transition-colors" />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-sm font-semibold text-foreground group-hover:text-f1-cyan transition-colors">
                      {exp.role}
                    </h3>
                    <p className="font-body text-xs text-primary/60 mt-0.5">{exp.org}</p>
                  </div>
                  <span className={`font-display text-[8px] tracking-wider px-2 py-0.5 shrink-0 ${
                    exp.status === "ACTIVE"
                      ? "text-f1-green bg-f1-green/10"
                      : "text-muted-foreground/40 bg-muted/20"
                  }`}>
                    {exp.status}
                  </span>
                </div>
                <p className="font-body text-sm text-muted-foreground/60 leading-relaxed mt-3">
                  {exp.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PitWall;
