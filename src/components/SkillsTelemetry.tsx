import { motion } from "framer-motion";
import { CONCEPTS, LANGUAGE_METRICS, SKILL_GAUGES } from "@/data/siteData";

const Gauge = ({
  title,
  subtitle,
  value,
  color,
  skills,
}: {
  title: string;
  subtitle: string;
  value: number;
  color: string;
  skills: readonly string[];
}) => {
  const rotation = -110 + (value / 100) * 220;

  return (
    <div className="glass h-full rounded-[26px] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-data text-[10px] uppercase tracking-[0.3em] text-[var(--f1-muted)]">{title}</p>
          <h3 className="mt-2 font-display text-lg font-bold text-[var(--f1-white)]">{subtitle}</h3>
        </div>
        <span className="font-data text-sm" style={{ color }}>
          {value}/100
        </span>
      </div>

      <div className="mt-5 flex justify-center">
        <svg
          viewBox="0 0 240 210"
          className="h-[280px] w-full max-w-[280px]"
          role="img"
          aria-label={`${subtitle} telemetry gauge showing ${value} out of 100`}
        >
          <path d="M30 170 A90 90 0 0 1 210 170" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" strokeLinecap="round" />
          <path
            d="M30 170 A90 90 0 0 1 210 170"
            fill="none"
            stroke={color}
            strokeWidth="14"
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 16px ${color}55)` }}
          />
          <motion.g
            initial={{ rotate: -110 }}
            whileInView={{ rotate: rotation }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: "120px", originY: "170px" }}
          >
            <line x1="120" y1="170" x2="120" y2="84" stroke="var(--f1-white)" strokeWidth="4" strokeLinecap="round" />
          </motion.g>
          <circle cx="120" cy="170" r="10" fill={color} />
          <text x="120" y="130" textAnchor="middle" className="fill-[var(--f1-white)] font-display text-[36px] font-black">
            {value}
          </text>
          <text x="120" y="151" textAnchor="middle" className="fill-[#c0c0c0] font-data text-[10px] uppercase tracking-[0.25em]">
            telemetry
          </text>
        </svg>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-white/8 bg-white/4 px-3 py-1.5 font-data text-[10px] uppercase tracking-[0.15em] text-[var(--f1-white)]"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

const SkillsTelemetry = () => (
  <section id="skills-telemetry" className="mx-auto max-w-7xl px-6 py-24 md:px-12">
    <div className="mb-12">
      <p className="font-data text-[11px] uppercase tracking-[0.32em] text-[var(--f1-red)]">Sector 3</p>
      <h2 className="mt-3 font-display text-4xl font-black tracking-[-0.03em] text-[var(--f1-white)] md:text-6xl">
        SKILLS TELEMETRY
      </h2>
    </div>

    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
      {SKILL_GAUGES.map((gauge, index) => (
        <motion.div
          key={gauge.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: index * 0.05 }}
          className="h-full"
        >
          <Gauge {...gauge} />
        </motion.div>
      ))}
    </div>

    <div className="glass mt-8 rounded-[24px] p-5">
      <p className="font-data text-[10px] uppercase tracking-[0.32em] text-[var(--f1-muted)]">Concepts</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {CONCEPTS.map((concept) => (
          <span key={concept} className="rounded-full border border-white/8 px-3 py-1.5 font-data text-[10px] uppercase tracking-[0.18em] text-[var(--f1-white)]">
            {concept}
          </span>
        ))}
      </div>
    </div>

    <div className="glass mt-8 rounded-[24px] p-5">
      <p className="font-data text-[10px] uppercase tracking-[0.32em] text-[var(--f1-muted)]">Languages</p>
      <div className="mt-5 grid gap-4 lg:grid-cols-5">
        {LANGUAGE_METRICS.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-[var(--f1-white)]">{item.label}</span>
              <span className="font-data text-xs text-[var(--f1-cyan)]">{item.value}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/8">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${item.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className="h-full rounded-full bg-[linear-gradient(90deg,var(--f1-cyan),var(--f1-blue))]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsTelemetry;
