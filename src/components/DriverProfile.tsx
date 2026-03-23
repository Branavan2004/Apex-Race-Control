import { motion } from "framer-motion";
import { PROFILE } from "@/data/profile";

const DriverProfile = () => (
  <section id="driver-profile" className="mx-auto max-w-7xl px-6 py-24 md:px-12">
    <div className="mb-12 max-w-3xl">
      <p className="font-data text-[11px] uppercase tracking-[0.32em] text-[var(--f1-red)]">Sector 2</p>
      <h2 className="mt-3 font-display text-4xl font-black tracking-[-0.03em] text-[var(--f1-white)] md:text-6xl">
        DRIVER PROFILE
      </h2>
      <p className="mt-4 text-[15px] leading-8 text-[var(--f1-white)]">
        Profile and racecraft summary tuned for software engineering applications, with sharper scan lines, stronger contrast, and a more disciplined content hierarchy.
      </p>
    </div>

    <div className="grid gap-6 xl:grid-cols-[0.4fr,0.6fr]">
      <motion.aside
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        className="overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(11,13,18,0.92)]"
      >
        <div className="h-2 w-full bg-[linear-gradient(90deg,#1e90ff,rgba(30,144,255,0.4))]" />
        <div className="p-7">
          <div className="flex flex-col items-center text-center">
            <div className="relative flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,#1a1a2e,#0a0a1a)]">
              <div className="absolute inset-[-6px] rounded-full bg-[conic-gradient(from_90deg,var(--f1-red),var(--f1-cyan),var(--f1-red))] animate-rotating-ring" />
              <div className="absolute inset-[3px] rounded-full bg-[radial-gradient(circle_at_top,#1a1a2e,#0a0a1a)]" />
              <span className="relative z-10 font-display text-[36px] font-extrabold text-white">BK</span>
            </div>
            <p className="mt-4 font-data text-[10px] uppercase tracking-[0.28em] text-[var(--f1-red)]">Driver #01</p>
          </div>

          <div className="mt-8 space-y-4 rounded-[24px] border border-white/8 bg-[rgba(255,255,255,0.03)] p-5">
            <div>
              <p className="font-data text-[10px] uppercase tracking-[0.22em] text-[var(--f1-muted)]">Driver Name</p>
              <p className="mt-2 font-display text-[30px] font-black leading-none text-[var(--f1-white)]">{PROFILE.name.toUpperCase()}</p>
            </div>
            <div className="grid gap-4">
              <div>
                <p className="font-data text-[10px] uppercase tracking-[0.22em] text-[var(--f1-muted)]">Nationality</p>
                <p className="mt-2 text-[15px] text-[var(--f1-white)]">{PROFILE.flag} Sri Lanka</p>
              </div>
              <div>
                <p className="font-data text-[10px] uppercase tracking-[0.22em] text-[var(--f1-muted)]">Team</p>
                <p className="mt-2 text-[15px] text-[var(--f1-white)]">IIT · University of Westminster</p>
              </div>
              <div>
                <p className="font-data text-[10px] uppercase tracking-[0.22em] text-[var(--f1-muted)]">School</p>
                <p className="mt-2 text-[15px] text-[var(--f1-white)]">{PROFILE.school}</p>
              </div>
              <div>
                <p className="font-data text-[10px] uppercase tracking-[0.22em] text-[var(--f1-muted)]">Languages</p>
                <p className="mt-2 text-[15px] leading-7 text-[var(--f1-white)]">Tamil · English · Sinhala</p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="glass rounded-[30px] p-7"
        >
          <div className="grid gap-6 xl:grid-cols-[minmax(0,520px),1fr]">
            <div>
              <p className="font-data text-[10px] uppercase tracking-[0.28em] text-[var(--f1-muted)]">Professional Summary</p>
              <p className="mt-5 max-w-[520px] text-[15px] leading-[1.8] text-[#e0e0e0]">
                {PROFILE.summary}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {PROFILE.statBars.map((stat, index) => {
                const filledBars = Math.round(stat.value / 8);
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="rounded-[22px] border border-white/8 bg-[rgba(0,0,0,0.18)] p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-[var(--f1-white)]">{stat.label}</span>
                      <span className="font-data text-[12px] text-[var(--f1-gold)]">{stat.value}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5">
                      {Array.from({ length: 12 }, (_, barIndex) => (
                        <span
                          key={`${stat.label}-${barIndex}`}
                          className={`h-3 flex-1 rounded-sm ${barIndex < filledBars ? "bg-[linear-gradient(180deg,var(--f1-red),#ff5a7c)]" : "bg-white/10"}`}
                        />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="glass rounded-[30px] p-7"
        >
          <p className="font-data text-[10px] uppercase tracking-[0.28em] text-[var(--f1-muted)]">Module Chips</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {PROFILE.moduleChips.map((module) => (
              <span key={module} className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-2 text-sm text-[var(--f1-white)]">
                {module}
              </span>
            ))}
          </div>

          <p className="mt-8 font-data text-[10px] uppercase tracking-[0.28em] text-[var(--f1-muted)]">Role Badges</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {PROFILE.roleBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-[var(--f1-red)]/28 px-4 py-2 font-data text-[10px] uppercase tracking-[0.18em] text-[var(--f1-white)]"
              >
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default DriverProfile;
