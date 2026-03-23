import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import { PROFILE } from "@/data/profile";

const classification = [
  ["1", "Software Engineering", "React · Node.js", "████████░░  88"],
  ["2", "Data Engineering", "Snowflake · SQL", "████████░░  85"],
  ["3", "Machine Learning / AI", "Python · sklearn", "████████░░  82"],
  ["4", "DevOps & Tools", "Docker · GitHub", "███████░░░  80"],
  ["5", "IEEE Leadership", "5 bodies · 10+", "█████████░  92"],
] as const;

const confetti = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${Math.random() * 100}%`,
  delay: Math.random() * 1.8,
  duration: 2.4 + Math.random() * 1.6,
  color: ["var(--f1-red)", "var(--f1-gold)", "var(--f1-white)"][index % 3],
}));

const FinishLine = () => (
  <section id="finish-line" className="relative mx-auto max-w-6xl overflow-hidden px-6 py-24 md:px-12">
    <div className="absolute inset-x-0 top-12 h-16">
      {confetti.map((piece) => (
        <motion.span
          key={piece.id}
          className="absolute top-0 h-3 w-1.5 rounded-full"
          style={{ left: piece.left, background: piece.color }}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          whileInView={{ y: 220, opacity: [0, 1, 0.7, 0], rotate: 180 }}
          viewport={{ once: true }}
          transition={{ duration: piece.duration, delay: piece.delay, ease: "easeOut" }}
        />
      ))}
    </div>

    <div className="glass rounded-[36px] px-6 py-12 md:px-10">
      <div className="mb-10 flex items-center justify-center gap-6">
        <motion.div
          initial={{ x: -180, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="h-16 w-24 bg-[conic-gradient(from_45deg,#fff_0_25%,#111_25%_50%,#fff_50%_75%,#111_75%_100%)]"
        />
        <motion.div
          initial={{ x: 180, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="h-16 w-24 bg-[conic-gradient(from_45deg,#fff_0_25%,#111_25%_50%,#fff_50%_75%,#111_75%_100%)]"
        />
      </div>

      <div className="flex flex-col items-center">
        <div className="mb-12 flex scale-[0.7] items-end gap-4 sm:scale-[0.82] md:scale-100">
          <div className="flex h-28 w-28 flex-col items-center justify-center rounded-t-[18px] border border-white/10 bg-white/6 px-3 text-center">
            <span className="font-data text-[11px] uppercase tracking-[0.24em] text-[var(--f1-muted)]">P2</span>
            <span className="mt-2 font-display text-lg font-black leading-5 text-[var(--f1-white)]">SOFTWARE</span>
            <span className="font-display text-lg font-black leading-5 text-[var(--f1-white)]">ENGINEER</span>
          </div>
          <div className="flex h-44 w-40 flex-col items-center justify-center rounded-t-[20px] border border-[var(--f1-gold)]/40 bg-[var(--f1-gold)]/10 px-4 text-center shadow-[0_0_40px_rgba(255,215,0,0.12)]">
            <span className="font-data text-[11px] uppercase tracking-[0.24em] text-[var(--f1-gold)]">P1</span>
            <span className="mt-3 font-display text-2xl font-black leading-6 text-[var(--f1-white)]">BRANAVAN</span>
            <span className="font-display text-2xl font-black leading-6 text-[var(--f1-white)]">KUGANESAN</span>
            <span className="mt-3 text-sm text-[var(--f1-white)]">IIT</span>
            <span className="text-2xl">{PROFILE.flag}</span>
          </div>
          <div className="flex h-24 w-28 flex-col items-center justify-center rounded-t-[18px] border border-white/10 bg-white/6 px-3 text-center">
            <span className="font-data text-[11px] uppercase tracking-[0.24em] text-[var(--f1-muted)]">P3</span>
            <span className="mt-2 font-display text-lg font-black leading-5 text-[var(--f1-white)]">DATA</span>
            <span className="font-display text-lg font-black leading-5 text-[var(--f1-white)]">ENGINEERING</span>
          </div>
        </div>

        <h2 className="text-center font-display text-5xl font-black tracking-[-0.04em] text-[var(--f1-white)] md:text-7xl">
          FINAL CLASSIFICATION
        </h2>

        <div className="mt-10 w-full overflow-x-auto rounded-[24px] border border-white/8 bg-black/20">
          <div className="min-w-[680px]">
            <div className="border-b border-white/8 bg-white/4 px-5 py-4 font-data text-[11px] uppercase tracking-[0.24em] text-[var(--f1-muted)]">
              FINAL CLASSIFICATION — BRANAVAN KUGANESAN
            </div>
            <div className="grid grid-cols-[70px,1.6fr,1.2fr,180px] border-b border-white/8 bg-[rgba(232,0,45,0.08)] px-5 py-3 font-data text-[11px] uppercase tracking-[0.24em] text-[var(--f1-muted)]">
              <span>Pos</span>
              <span>Category</span>
              <span>Technologies</span>
              <span>Proficiency</span>
            </div>
            {classification.map((row, index) => (
              <div key={row[1]} className="grid grid-cols-[70px,1.6fr,1.2fr,180px] items-center border-b border-white/6 px-5 py-4 last:border-b-0">
                <span className={`font-display text-2xl font-black ${index === 0 ? "text-[var(--f1-gold)]" : "text-[var(--f1-white)]"}`}>{row[0]}</span>
                <span className="border-l-2 border-[rgba(232,0,45,0.45)] pl-3 text-sm text-[var(--f1-white)]">{row[1]}</span>
                <span className="text-sm text-[var(--f1-white)]">{row[2]}</span>
                <span className="font-data text-sm text-[var(--f1-white)]">{row[3]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid w-full gap-4 md:grid-cols-2">
          <a
            href={PROFILE.cvFile}
            download
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[18px] bg-[var(--f1-red)] px-5 py-3 font-data text-[11px] uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#ff1f4a]"
          >
            <Download className="h-4 w-4" />
            Download CV
          </a>
          <button
            type="button"
            onClick={() => document.getElementById("contact-radio")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[18px] border border-white/30 px-5 py-3 font-data text-[11px] uppercase tracking-[0.18em] text-[var(--f1-white)] transition-all duration-300 hover:border-[var(--f1-red)] hover:text-[var(--f1-red)]"
          >
            <Mail className="h-4 w-4" />
            Get In Touch
          </button>
        </div>

        <p className="mt-10 text-center font-data text-[11px] uppercase tracking-[0.24em] text-[var(--f1-muted)]">
          BRANAVAN KUGANESAN  ·  SOFTWARE ENGINEER  ·  IIT  ·  COLOMBO 🇱🇰  ·  2026
        </p>
      </div>
    </div>
  </section>
);

export default FinishLine;
