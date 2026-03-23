import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { FEATURED_CREDENTIALS, CERTIFICATIONS, TOTAL_CERTIFICATIONS } from "@/data/siteData";

const CertificationsGarage = () => {
  const [expanded, setExpanded] = useState(false);
  const remainingCount = useMemo(
    () => CERTIFICATIONS.reduce((sum, bay) => sum + bay.items.length, 0),
    [],
  );

  return (
    <section id="certifications-garage" className="mx-auto max-w-7xl px-6 py-24 md:px-12">
      <div className="mb-12">
        <p className="font-data text-[11px] uppercase tracking-[0.32em] text-[var(--f1-red)]">CREDENTIALS GARAGE</p>
        <h2 className="mt-3 font-display text-4xl font-black tracking-[-0.03em] text-[var(--f1-white)] md:text-6xl">
          CREDENTIALS GARAGE
        </h2>
        <p className="mt-4 font-data text-[11px] uppercase tracking-[0.18em] text-[var(--f1-muted)]">
          {TOTAL_CERTIFICATIONS} CERTIFICATIONS  ·  5 PROFESSIONAL CERTIFICATES  ·  ALL VERIFIED 2026
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {FEATURED_CREDENTIALS.map((item, index) => (
          <motion.a
            key={item.title}
            href={item.credentialUrl}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.05 }}
            className="group glass flex min-h-[180px] flex-col rounded-[26px] p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,255,255,0.08)]"
            style={{ borderLeft: `4px solid ${item.brandColor}`, boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.03)` }}
          >
            <div className="flex items-center gap-2">
              <span className="font-data text-[11px] uppercase tracking-[0.18em] text-[var(--f1-gold)]">★ Featured</span>
            </div>
            <div className="mt-4 h-px bg-white/10" />
            <h3 className="mt-4 font-display text-2xl font-black leading-tight text-[var(--f1-white)]">{item.title}</h3>
            <p className="mt-1 text-sm text-[var(--f1-white)]">{item.subtitle}</p>
            <p className="mt-5 font-data text-[11px] uppercase tracking-[0.2em]" style={{ color: item.brandColor }}>
              {item.issuer}
            </p>
            <p className="mt-1 font-data text-[10px] uppercase tracking-[0.16em] text-[var(--f1-muted)]">{item.date}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {item.skills.map((skill) => (
                <span key={skill} className="rounded-full border border-white/8 bg-white/4 px-3 py-1.5 font-data text-[10px] uppercase tracking-[0.14em] text-[var(--f1-white)]">
                  {skill}
                </span>
              ))}
            </div>
            <span className="mt-auto pt-5 font-data text-[11px] uppercase tracking-[0.16em] text-[var(--f1-white)] group-hover:text-[var(--f1-red)]">
              ⬇ Show Credential
            </span>
          </motion.a>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          aria-expanded={expanded}
          className="rounded-full border border-[var(--f1-red)] px-5 py-3 font-data text-[11px] uppercase tracking-[0.22em] text-[var(--f1-white)] transition-all duration-300 hover:bg-[rgba(232,0,45,0.12)]"
        >
          {expanded ? "▲ Collapse" : `▼ View All ${TOTAL_CERTIFICATIONS} Credentials`}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            key="expanded-credentials"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-8 space-y-6">
              {CERTIFICATIONS.map((bay) => (
                <div key={bay.bay} className="glass rounded-[28px] p-6">
                  <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="font-data text-[10px] uppercase tracking-[0.22em]" style={{ color: bay.color }}>
                        {bay.bay}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-black text-[var(--f1-white)]">{bay.label}</h3>
                    </div>
                    <p className="font-data text-[10px] uppercase tracking-[0.18em] text-[var(--f1-muted)]">
                      {bay.items.length} companion credential{bay.items.length === 1 ? "" : "s"}
                    </p>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {bay.items.map((item) => (
                      <div key={item.title} className="group [perspective:1000px]">
                        <div className="relative min-h-[180px] rounded-[22px] transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                          <div
                            className="absolute inset-0 rounded-[22px] border bg-black/15 p-5 [backface-visibility:hidden]"
                            style={{ borderColor: `${bay.color}55`, boxShadow: `inset 3px 0 0 ${bay.color}` }}
                          >
                            <div className="flex items-center gap-2">
                              <span className="h-2.5 w-2.5 rounded-full" style={{ background: bay.color }} />
                              <span className="font-data text-[10px] uppercase tracking-[0.18em] text-[var(--f1-muted)]">{item.issuer}</span>
                            </div>
                            <h4 className="mt-4 text-lg font-bold leading-6 text-[var(--f1-white)]">{item.title}</h4>
                            <p className="mt-3 font-data text-[10px] uppercase tracking-[0.16em] text-[var(--f1-muted)]">{item.date}</p>
                          </div>
                          <div className="absolute inset-0 rounded-[22px] border border-white/8 bg-black/35 p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                            <p className="font-data text-[10px] uppercase tracking-[0.22em] text-[var(--f1-cyan)]">Skills Loaded</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {item.skills.map((skill) => (
                                <span key={skill} className="rounded-full bg-white/5 px-3 py-1.5 font-data text-[10px] uppercase tracking-[0.16em] text-[var(--f1-white)]">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <p className="mt-6 text-sm text-[var(--f1-muted)]">
        {remainingCount} companion credentials remain tucked behind the featured professional certificates for a cleaner first pass.
      </p>
    </section>
  );
};

export default CertificationsGarage;
