import { motion } from "framer-motion";
import SectorHeader from "./SectorHeader";

const experiences = [
  {
    role: "Industry Outreach Volunteer",
    team: "IEEE Robotics & Automation Society",
    details: "Coordinated industry partnerships and organized technical workshops connecting students with professionals.",
    status: "ACTIVE",
  },
  {
    role: "Event Organizer",
    team: "Technology Events",
    details: "Led planning and execution of tech conferences, hackathons, and networking events for 200+ participants.",
    status: "COMPLETED",
  },
  {
    role: "Leadership Role",
    team: "Student Activities",
    details: "Managed cross-functional teams, drove project initiatives, and mentored incoming students.",
    status: "ONGOING",
  },
];

const PitWall = () => (
  <section className="relative py-24 px-4 md:px-8 max-w-5xl mx-auto">
    <SectorHeader sector="Sector 4" title="PIT WALL" subtitle="Team strategy and operations" />

    <div className="space-y-6">
      {experiences.map((exp, i) => (
        <motion.div
          key={exp.role}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          className="border border-border bg-card/60 backdrop-blur-md p-6 relative"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Pit timer style */}
            <div className="w-16 h-16 border border-border bg-background flex items-center justify-center shrink-0">
              <span className="font-display text-xl font-bold text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-display text-lg font-bold text-foreground">{exp.role}</h3>
                <span className={`font-display text-[10px] px-2 py-0.5 rounded-sm ${
                  exp.status === "ACTIVE" ? "text-f1-green bg-f1-green/10" :
                  exp.status === "ONGOING" ? "text-f1-cyan bg-f1-cyan/10" :
                  "text-muted-foreground bg-muted"
                }`}>
                  {exp.status}
                </span>
              </div>
              <p className="font-mono text-xs text-f1-cyan mb-2">{exp.team}</p>
              <p className="font-body text-sm text-muted-foreground">{exp.details}</p>
            </div>

            {/* Radio indicator */}
            <div className="flex items-center gap-1 shrink-0">
              {[...Array(4)].map((_, j) => (
                <motion.div
                  key={j}
                  className="w-1 bg-f1-cyan rounded-full"
                  animate={{ height: [4, 12 + Math.random() * 8, 4] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: j * 0.15 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default PitWall;
