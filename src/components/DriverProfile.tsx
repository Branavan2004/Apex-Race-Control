import { motion } from "framer-motion";
import { Camera, Flag, Trophy, Timer, Gauge } from "lucide-react";

const certifications = [
  "AWS Certified Cloud Practitioner — Amazon Web Services",
  "Meta Front-End Developer Professional Certificate — Coursera",
  "Google UX Design Professional Certificate — Coursera",
  "Stanford Machine Learning Specialization — Andrew Ng (Coursera)",
  "IBM Data Science Professional Certificate — Coursera",
  "CS50: Introduction to Computer Science — Harvard (edX)",
  "Algorithms Specialization — Stanford (Coursera)",
];

const raceStats = [
  { label: "Races", value: "15+", detail: "Academic & independent projects completed" },
  { label: "Wins", value: "5", detail: "First-place finishes / top-scoring projects" },
  { label: "Podiums", value: "12", detail: "Projects scoring above 80% distinction" },
  { label: "Poles", value: "4", detail: "Projects with best-in-class marks" },
  { label: "Fastest Laps", value: "8", detail: "Tasks completed ahead of schedule" },
  { label: "DNFs", value: "0", detail: "No abandoned projects — 100% completion" },
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
          <span className="font-mono text-[10px] tracking-[0.4em] text-secondary/70 uppercase">Driver Briefing</span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mt-2 tracking-tight">
            The Driver
          </h2>
          <div className="w-16 h-1 bg-primary mt-4" />
        </motion.div>

        {/* ═══════ DRIVER CARD — Photo Placeholder ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="grid md:grid-cols-[280px,1fr] gap-0 bg-card border border-border overflow-hidden">
            {/* Photo area */}
            <div className="relative group">
              <div className="aspect-[3/4] bg-gradient-to-br from-muted/60 via-card to-muted/30 flex flex-col items-center justify-center gap-4 relative overflow-hidden">
                {/* Race number watermark */}
                <span className="absolute -right-4 -top-4 font-display text-[180px] font-black text-foreground/[0.03] leading-none select-none">
                  01
                </span>
                
                {/* Team livery stripe */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary via-secondary to-primary" />
                
                {/* Camera icon placeholder */}
                <div className="w-24 h-24 rounded-full bg-muted/50 border-2 border-dashed border-border flex items-center justify-center group-hover:border-primary/40 transition-colors">
                  <Camera className="w-8 h-8 text-muted-foreground/30 group-hover:text-primary/50 transition-colors" />
                </div>
                <div className="text-center">
                  <p className="font-mono text-[10px] text-muted-foreground/40 tracking-wider uppercase">Driver Photo</p>
                  <p className="font-mono text-[8px] text-muted-foreground/25 mt-1">Upload your photo to replace</p>
                </div>

                {/* Bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="font-display text-xs font-bold text-primary tracking-wider">BRA</p>
                    <p className="font-mono text-[7px] text-muted-foreground/50">DRIVER CODE</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl font-black text-foreground/80 leading-none">01</p>
                    <p className="font-mono text-[7px] text-muted-foreground/50">NUMBER</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Driver info panel (F1 broadcast style) */}
            <div className="p-6 flex flex-col justify-between">
              {/* Top: Name + team */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-3 bg-gradient-to-r from-primary to-secondary rounded-sm" />
                  <span className="font-mono text-[8px] text-muted-foreground/50 tracking-[0.3em] uppercase">Team Independent</span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-black text-foreground tracking-tight leading-tight">
                  BRANA<span className="text-primary">VAN</span>
                </h3>
                <p className="font-body text-sm text-muted-foreground/60 mt-1">
                  BSc (Hons) Software Engineering · Final Year
                </p>
                <p className="font-mono text-[9px] text-muted-foreground/40 mt-0.5">
                  Informatics Institute of Technology · University of Westminster, UK
                </p>
              </div>

              {/* Season stats grid (F1 style) */}
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="w-3 h-3 text-f1-gold" />
                  <span className="font-mono text-[8px] tracking-[0.2em] text-muted-foreground/40 uppercase">2024–2026 Season Statistics</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {raceStats.map((stat) => (
                    <div key={stat.label} className="bg-muted/20 border border-border/30 p-2.5 hover:border-primary/20 transition-colors group/stat">
                      <span className="font-display text-lg font-black text-foreground group-hover/stat:text-primary transition-colors tabular-nums">{stat.value}</span>
                      <p className="font-mono text-[7px] text-muted-foreground/50 tracking-wider uppercase mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Championship standing */}
              <div className="mt-4 bg-f1-green/5 border border-f1-green/20 p-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-f1-green/15 rounded flex items-center justify-center">
                  <Flag className="w-4 h-4 text-f1-green" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-f1-green">Championship Contender</p>
                  <p className="font-mono text-[8px] text-muted-foreground/50">
                    GPA 3.8+ · Dean's List · Top 5% of Cohort · Expected Graduation: June 2027
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left column — About text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {/* Pre-race briefing header */}
            <div className="flex items-center gap-2 mb-4">
              <Timer className="w-3.5 h-3.5 text-primary/60" />
              <span className="font-mono text-[9px] tracking-[0.2em] text-primary/60 uppercase">Pre-Race Briefing</span>
            </div>

            <p className="font-body text-base text-muted-foreground leading-relaxed mb-5">
              I am a final-year Software Engineering undergraduate at the Informatics Institute of Technology 
              (affiliated with the University of Westminster, UK), pursuing a BSc (Hons) with a cumulative GPA 
              above 3.8/4.0. My academic coursework spans core computer science disciplines including Data Structures 
              & Algorithms, Database Management Systems, Operating Systems, Computer Networks, Software Architecture, 
              and Machine Learning — providing a rigorous theoretical foundation analogous to the engineering 
              precision that defines Formula 1.
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-5">
              My research and technical interests encompass distributed systems design, cloud-native microservices 
              architecture, applied machine learning, and human-computer interaction. I have completed over 15 
              academic and independent projects — each representing a "Grand Prix" in my development calendar —
              including a final-year dissertation focused on scalable event-driven architectures. I actively 
              contribute to open-source repositories and participate in competitive programming contests 
              (LeetCode, Codeforces) to sharpen algorithmic thinking under time pressure.
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-5">
              I am proficient in multiple programming paradigms — object-oriented (Java, C++, TypeScript), 
              functional (Python, Haskell), and declarative (SQL, Prolog). My development workflow emphasises 
              test-driven development (TDD), continuous integration/continuous deployment (CI/CD), version control 
              best practices (Git flow, conventional commits), and thorough documentation following IEEE and ACM 
              standards — mirroring the telemetry-driven precision of an F1 pit wall.
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              Beyond technical skills, I possess strong analytical reasoning, scientific writing proficiency, 
              and the ability to communicate complex technical concepts to both technical and non-technical 
              stakeholders. Like a race engineer interpreting data under pressure, I actively seek environments 
              that value intellectual curiosity, rigorous engineering methodology, and collaborative problem-solving.
            </p>

            {/* Lap comparison box */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-6 bg-card/50 border border-border/50 p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <Gauge className="w-3 h-3 text-f1-purple" />
                <span className="font-mono text-[8px] tracking-[0.2em] text-muted-foreground/50 uppercase">Performance Delta</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { sector: "S1", label: "Theory", time: "-0.142", color: "text-f1-green" },
                  { sector: "S2", label: "Practice", time: "-0.087", color: "text-f1-green" },
                  { sector: "S3", label: "Research", time: "-0.203", color: "text-f1-purple" },
                ].map((s) => (
                  <div key={s.sector} className="text-center">
                    <span className={`font-mono text-sm font-bold tabular-nums ${s.color}`}>{s.time}</span>
                    <p className="font-mono text-[7px] text-muted-foreground/40 mt-0.5">{s.sector} · {s.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-2 border-t border-border/30 text-center">
                <span className="font-mono text-[8px] text-f1-purple">PERSONAL BEST — Consistently ahead of benchmark</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column — Quick facts + certs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Pit board style facts */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-primary/15 rounded flex items-center justify-center">
                <span className="font-mono text-[7px] text-primary font-bold">P1</span>
              </div>
              <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground/50 uppercase">Pit Board — Quick Reference</span>
            </div>

            {[
              { label: "Home Circuit", value: "Colombo, Sri Lanka", icon: "🏠", f1: "Base of operations" },
              { label: "Constructor", value: "BSc (Hons) Software Engineering — Final Year", icon: "🏗️", f1: "Current chassis" },
              { label: "Factory", value: "IIT Sri Lanka · University of Westminster, UK", icon: "🏭", f1: "Development facility" },
              { label: "Power Unit", value: "GPA 3.8+ / 4.0 — Dean's List (Multiple Semesters)", icon: "⚡", f1: "Performance output" },
              { label: "Aero Package", value: "Distributed Systems · ML · Cloud · HCI", icon: "💨", f1: "Research downforce" },
              { label: "Engine Modes", value: "Java, Python, TypeScript, C++, SQL, Rust, Haskell", icon: "🔧", f1: "Available configurations" },
              { label: "Grid Position", value: "Seeking Internships, Research & Graduate Roles", icon: "🏁", f1: "Qualifying status" },
              { label: "Contract End", value: "Expected Graduation — June 2027", icon: "📋", f1: "Contract duration" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.06 }}
                className="flex items-start gap-4 p-4 bg-card/50 border border-border/50 hover:border-primary/30 transition-colors group"
              >
                <span className="text-lg">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{item.value}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="font-mono text-[9px] text-muted-foreground tracking-wider uppercase">{item.label}</p>
                    <span className="font-mono text-[7px] text-primary/30">// {item.f1}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Certifications — styled as "Technical Regulations" */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="p-4 bg-card/50 border border-border/50"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-f1-gold/20 rounded flex items-center justify-center">
                  <span className="font-mono text-[6px] text-f1-gold font-bold">FIA</span>
                </div>
                <p className="font-mono text-[9px] text-muted-foreground tracking-wider uppercase">Technical Regulations — Certifications & Courses</p>
              </div>
              <div className="space-y-2.5">
                {certifications.map((cert, i) => (
                  <div key={cert} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded bg-f1-green/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="font-mono text-[7px] text-f1-green font-bold">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <span className="font-body text-sm text-foreground/80">{cert}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tyre allocation for the weekend */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              className="p-4 bg-card/50 border border-border/50"
            >
              <p className="font-mono text-[9px] text-muted-foreground tracking-wider uppercase mb-3">
                Tyre Allocation — Skill Compounds
              </p>
              <div className="flex items-center gap-3">
                {[
                  { compound: "S", color: "bg-primary", label: "Soft — Frontend", count: 5 },
                  { compound: "M", color: "bg-f1-yellow", label: "Medium — Backend", count: 4 },
                  { compound: "H", color: "bg-foreground", label: "Hard — Systems", count: 3 },
                  { compound: "I", color: "bg-f1-green", label: "Inter — DevOps", count: 2 },
                  { compound: "W", color: "bg-f1-blue", label: "Wet — Research", count: 1 },
                ].map((tyre) => (
                  <div key={tyre.compound} className="flex flex-col items-center gap-1 group/tyre">
                    <div className={`w-8 h-8 rounded-full ${tyre.color} flex items-center justify-center border-2 border-background shadow-md`}>
                      <span className="font-display text-[9px] font-black text-background">{tyre.compound}</span>
                    </div>
                    <span className="font-mono text-[7px] text-muted-foreground/40">×{tyre.count}</span>
                  </div>
                ))}
              </div>
              <p className="font-mono text-[7px] text-muted-foreground/30 mt-2">
                S=Frontend · M=Backend · H=Systems · I=DevOps · W=Research
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

export default DriverProfile;
