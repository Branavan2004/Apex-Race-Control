import { motion } from "framer-motion";
import { Camera, Flag, Trophy } from "lucide-react";

const certifications = [
  "AWS Certified Cloud Practitioner — Amazon Web Services",
  "Meta Front-End Developer Professional Certificate",
  "Google UX Design Professional Certificate",
  "Stanford Machine Learning Specialization — Andrew Ng",
  "IBM Data Science Professional Certificate",
  "CS50: Introduction to Computer Science — Harvard",
  "Algorithms Specialization — Stanford (Coursera)",
];

const raceStats = [
  { label: "Races", value: "15+", detail: "Projects completed" },
  { label: "Wins", value: "5", detail: "Top-scoring projects" },
  { label: "Podiums", value: "12", detail: "Above 80% distinction" },
  { label: "Poles", value: "4", detail: "Best-in-class marks" },
  { label: "FL", value: "8", detail: "Ahead of schedule" },
  { label: "DNFs", value: "0", detail: "100% completion" },
];

const DriverProfile = () => (
  <section className="py-28 px-6 md:px-12 max-w-6xl mx-auto">
    <div className="grid md:grid-cols-[auto,1fr] gap-16 items-start">
      {/* Left accent */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="hidden md:flex flex-col items-center gap-4"
      >
        <div className="w-px h-20 bg-gradient-to-b from-primary/40 to-transparent" />
        <span className="font-mono text-[10px] tracking-[0.3em] text-primary/40 -rotate-90 whitespace-nowrap">
          SECTOR 01
        </span>
      </motion.div>

      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <span className="font-mono text-[10px] tracking-[0.4em] text-secondary/50 uppercase">Driver Briefing</span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mt-2 tracking-tight">
            The Driver
          </h2>
          <div className="w-12 h-0.5 bg-primary/60 mt-4 rounded-full" />
        </motion.div>

        {/* ═══ DRIVER CARD ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="grid md:grid-cols-[260px,1fr] gap-0 glass rounded-xl overflow-hidden">
            {/* Photo area */}
            <div className="relative group">
              <div className="aspect-[3/4] bg-gradient-to-br from-muted/40 via-card to-muted/20 flex flex-col items-center justify-center gap-4 relative overflow-hidden">
                <span className="absolute -right-6 -top-6 font-display text-[160px] font-black text-foreground/[0.02] leading-none select-none">
                  01
                </span>
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/60 via-secondary/40 to-primary/60" />
                
                <div className="w-20 h-20 rounded-full bg-muted/30 border border-dashed border-border/60 flex items-center justify-center group-hover:border-primary/30 transition-all duration-500">
                  <Camera className="w-7 h-7 text-muted-foreground/20 group-hover:text-primary/40 transition-colors duration-500" />
                </div>
                <div className="text-center">
                  <p className="font-mono text-[10px] text-muted-foreground/30 tracking-wider uppercase">Driver Photo</p>
                  <p className="font-mono text-[8px] text-muted-foreground/15 mt-1">Upload to replace</p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-background/70 backdrop-blur-md px-4 py-3 flex items-center justify-between border-t border-border/20">
                  <div>
                    <p className="font-display text-xs font-bold text-primary/80 tracking-wider">BRA</p>
                    <p className="font-mono text-[7px] text-muted-foreground/30">DRIVER CODE</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl font-black text-foreground/60 leading-none">01</p>
                    <p className="font-mono text-[7px] text-muted-foreground/30">NUMBER</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Info panel */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-2.5 rounded-sm bg-gradient-to-r from-primary/70 to-secondary/70" />
                  <span className="font-mono text-[8px] text-muted-foreground/35 tracking-[0.3em] uppercase">Team Independent</span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-black text-foreground tracking-tight leading-tight">
                  BRANA<span className="text-primary/80">VAN</span>
                </h3>
                <p className="font-body text-sm text-muted-foreground/50 mt-2">
                  BSc (Hons) Software Engineering · Final Year
                </p>
                <p className="font-mono text-[9px] text-muted-foreground/30 mt-1">
                  IIT Sri Lanka · University of Westminster, UK
                </p>
              </div>

              {/* Season stats */}
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="w-3 h-3 text-f1-gold/50" />
                  <span className="font-mono text-[8px] tracking-[0.2em] text-muted-foreground/30 uppercase">2024–2026 Season</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {raceStats.map((stat) => (
                    <div key={stat.label} className="bg-background/40 border border-border/30 p-2.5 rounded-lg hover:border-primary/15 transition-colors duration-300">
                      <span className="font-display text-lg font-black text-foreground/80 tabular-nums">{stat.value}</span>
                      <p className="font-mono text-[7px] text-muted-foreground/35 tracking-wider uppercase mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 bg-f1-green/5 border border-f1-green/15 p-3 rounded-lg flex items-center gap-3">
                <Flag className="w-4 h-4 text-f1-green/50" />
                <div>
                  <p className="font-display text-sm font-semibold text-f1-green/70">Championship Contender</p>
                  <p className="font-mono text-[8px] text-muted-foreground/35">
                    GPA 3.8+ · Dean's List · Top 5% · Graduation: June 2027
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-14">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-5"
          >
            <p className="font-body text-[15px] text-muted-foreground/70 leading-[1.8]">
              I am a final-year Software Engineering undergraduate at the Informatics Institute of Technology 
              (University of Westminster, UK), with a cumulative GPA above 3.8/4.0. My coursework spans 
              Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, Software Architecture, 
              and Machine Learning.
            </p>
            <p className="font-body text-[15px] text-muted-foreground/70 leading-[1.8]">
              My research interests encompass distributed systems design, cloud-native microservices, 
              applied machine learning, and human-computer interaction. I have completed over 15 academic 
              and independent projects, including a dissertation on scalable event-driven architectures.
            </p>
            <p className="font-body text-[15px] text-muted-foreground/70 leading-[1.8]">
              Proficient in object-oriented (Java, C++, TypeScript), functional (Python, Haskell), 
              and declarative (SQL) paradigms. My workflow emphasises TDD, CI/CD, and documentation 
              following IEEE/ACM standards.
            </p>
          </motion.div>

          {/* Quick facts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            {[
              { label: "Home Circuit", value: "Colombo, Sri Lanka", icon: "🏠" },
              { label: "Constructor", value: "BSc (Hons) Software Engineering", icon: "🏗️" },
              { label: "Factory", value: "IIT Sri Lanka · Westminster, UK", icon: "🏭" },
              { label: "Power Unit", value: "GPA 3.8+ — Dean's List", icon: "⚡" },
              { label: "Aero Package", value: "Distributed Systems · ML · Cloud · HCI", icon: "💨" },
              { label: "Engine Modes", value: "Java, Python, TypeScript, C++, SQL, Rust", icon: "🔧" },
              { label: "Grid Position", value: "Seeking Internships & Graduate Roles", icon: "🏁" },
              { label: "Contract End", value: "Expected Graduation — June 2027", icon: "📋" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 + i * 0.05 }}
                className="flex items-start gap-3 p-3.5 glass rounded-lg hover:border-primary/15 transition-all duration-300 group"
              >
                <span className="text-base mt-0.5">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-sm font-semibold text-foreground/80 group-hover:text-primary/80 transition-colors duration-300">{item.value}</p>
                  <p className="font-mono text-[8px] text-muted-foreground/30 tracking-wider uppercase mt-0.5">{item.label}</p>
                </div>
              </motion.div>
            ))}

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="p-4 glass rounded-lg"
            >
              <p className="font-mono text-[9px] text-muted-foreground/35 tracking-wider uppercase mb-3">Certifications</p>
              <div className="space-y-2">
                {certifications.map((cert, i) => (
                  <div key={cert} className="flex items-start gap-2">
                    <span className="font-mono text-[7px] text-f1-green/40 font-bold mt-1 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-body text-[13px] text-foreground/60 leading-snug">{cert}</span>
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
