import { motion } from "framer-motion";
import { Users, Code, Lightbulb, Award } from "lucide-react";
import { useState, useEffect } from "react";

const experiences = [
  {
    role: "Industry Outreach Volunteer",
    org: "IEEE Robotics & Automation Society",
    description: "Spearheaded industry-academia collaboration initiatives, connecting over 150 students with senior professionals from leading technology companies. Organized 8 technical workshops covering robotics, AI, and automation, with an average attendance of 40+ participants per session. Developed networking frameworks that resulted in 12 student internship placements.",
    icon: Users,
    year: "2024",
    status: "COMPLETED",
    achievements: ["150+ students connected", "8 workshops organized", "12 internship placements"],
  },
  {
    role: "Lead Event Organizer",
    org: "University Tech Conference & Hackathons",
    description: "Led the planning and execution of the annual university technology conference with 200+ attendees, managing a team of 15 volunteers across logistics, sponsorship, and technical operations. Secured sponsorships from 5 technology companies, coordinated 12 speaker sessions, and organized a 24-hour hackathon with 30 participating teams.",
    icon: Code,
    year: "2025",
    status: "COMPLETED",
    achievements: ["200+ attendees", "5 corporate sponsors", "30 hackathon teams"],
  },
  {
    role: "Technical Mentor & Student Leader",
    org: "Campus Innovation Hub",
    description: "Currently mentoring 10 junior developers through structured code review sessions, pair programming, and project guidance. Led the establishment of a campus-wide coding club with weekly sessions on algorithms, system design, and modern web technologies. Initiated and manage an internal knowledge-sharing platform used by 80+ students.",
    icon: Lightbulb,
    year: "2026",
    status: "ACTIVE",
    achievements: ["10 mentees", "80+ platform users", "Weekly sessions"],
  },
  {
    role: "Academic Excellence Award Recipient",
    org: "Informatics Institute of Technology",
    description: "Recognized for maintaining a consistently high academic performance while actively contributing to extracurricular activities and community development. Placed in the Dean's List for multiple consecutive semesters. Received commendation for outstanding final-year project presentation.",
    icon: Award,
    year: "2025",
    status: "AWARDED",
    achievements: ["Dean's List", "Top 5% of cohort", "Outstanding FYP"],
  },
];

const PitWall = () => {
  const [pitTime, setPitTime] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    const el = document.getElementById("pit-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const interval = setInterval(() => {
      setPitTime((t) => { if (t >= 2.4) return 2.4; return +(t + 0.1).toFixed(1); });
    }, 100);
    return () => clearInterval(interval);
  }, [started]);

  return (
    <section id="pit-section" className="py-32 px-6 md:px-12 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-secondary" />
          <span className="font-mono text-[10px] tracking-[0.4em] text-secondary/70 uppercase">Sector 04</span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-black text-foreground tracking-tight">
          Experience & Leadership
        </h2>
        <p className="font-body text-muted-foreground mt-3 max-w-2xl">
          Beyond technical work, I actively contribute to community building, mentorship, 
          and organizational leadership. These experiences have shaped my collaborative approach 
          to engineering and problem-solving.
        </p>
      </motion.div>

      {/* Pit stop timer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-card border border-border p-6 mb-10 flex flex-col md:flex-row items-center gap-6"
      >
        <div className="flex-1">
          <span className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground/60 uppercase block mb-2">Quick Overview</span>
          <div className="flex items-baseline gap-3">
            <span className="font-display text-5xl font-black text-f1-cyan tabular-nums">{pitTime.toFixed(1)}</span>
            <span className="font-mono text-sm text-muted-foreground">years of leadership experience</span>
          </div>
        </div>
        <div className="flex gap-3">
          {[
            { label: "Events", count: "10+" },
            { label: "Mentees", count: "15+" },
            { label: "Sponsors", count: "5" },
            { label: "Awards", count: "3" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              animate={{
                borderColor: pitTime > (i + 1) * 0.5 ? "hsl(155 80% 45%)" : "hsl(220 12% 16%)",
                backgroundColor: pitTime > (i + 1) * 0.5 ? "hsl(155 80% 45% / 0.15)" : "transparent",
              }}
              className="w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center transition-all"
            >
              <span className={`font-display text-sm font-bold ${pitTime > (i + 1) * 0.5 ? "text-f1-green" : "text-muted-foreground/30"}`}>
                {stat.count}
              </span>
              <span className="font-mono text-[7px] text-muted-foreground/50 mt-0.5">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Experience timeline */}
      <div className="relative pl-8 border-l-2 border-border space-y-8">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.role}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative group"
          >
            <div className={`absolute -left-[calc(2rem+5px)] w-2.5 h-2.5 rounded-full border-2 ${
              exp.status === "ACTIVE" ? "bg-f1-green border-f1-green" : "bg-card border-border group-hover:border-primary"
            } transition-colors`} />

            <div className="bg-card/50 border border-border/50 hover:border-primary/30 p-6 transition-all group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <exp.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {exp.role}
                    </h3>
                    <p className="font-body text-sm text-primary/70 mt-0.5">{exp.org}</p>
                    <p className="font-body text-sm text-muted-foreground/60 leading-relaxed mt-3">{exp.description}</p>
                    
                    {/* Achievement tags */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {exp.achievements.map((a) => (
                        <span key={a} className="font-mono text-[9px] text-f1-cyan/70 bg-f1-cyan/10 px-2 py-1 rounded">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <span className="font-mono text-xs text-muted-foreground/50">{exp.year}</span>
                  <div className={`font-mono text-[8px] tracking-wider mt-1 px-2 py-0.5 rounded ${
                    exp.status === "ACTIVE" ? "bg-f1-green/15 text-f1-green"
                    : exp.status === "AWARDED" ? "bg-f1-gold/15 text-f1-gold"
                    : "bg-muted/50 text-muted-foreground/40"
                  }`}>
                    {exp.status}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PitWall;
