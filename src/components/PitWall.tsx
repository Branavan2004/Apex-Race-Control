import { motion } from "framer-motion";
import { EXPERIENCE } from "@/data/siteData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const PitWall = () => (
  <section id="pit-wall" className="mx-auto max-w-6xl px-6 py-24 md:px-12">
    <div className="mb-12">
      <p className="font-data text-[11px] uppercase tracking-[0.32em] text-[var(--f1-red)]">Pit Wall — Race Strategy</p>
      <h2 className="mt-3 font-display text-4xl font-black tracking-[-0.03em] text-[var(--f1-white)] md:text-6xl">
        EXPERIENCE & LEADERSHIP
      </h2>
    </div>

    <div className="grid gap-6 xl:grid-cols-[1.05fr,1.2fr]">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        className="glass rounded-[28px] p-6"
      >
        <p className="font-data text-[10px] uppercase tracking-[0.32em] text-[var(--f1-muted)]">Subsection A — Experience</p>
        <h3 className="mt-4 font-display text-3xl font-black text-[var(--f1-white)]">{EXPERIENCE.teaching.role}</h3>
        <p className="mt-2 text-sm text-[var(--f1-red)]">{EXPERIENCE.teaching.org} · {EXPERIENCE.teaching.years}</p>
        <ul className="mt-5 space-y-3">
          {EXPERIENCE.teaching.bullets.map((bullet) => (
            <li key={bullet} className="text-sm leading-7 text-[var(--f1-white)]">{bullet}</li>
          ))}
        </ul>
        <div className="mt-6 inline-flex rounded-full border border-[var(--f1-yellow)]/35 bg-[var(--f1-yellow)]/10 px-4 py-2 font-data text-[10px] uppercase tracking-[0.18em] text-[var(--f1-yellow)]">
          {EXPERIENCE.teaching.tag}
        </div>
      </motion.div>

      <div className="glass rounded-[28px] p-6">
        <p className="font-data text-[10px] uppercase tracking-[0.32em] text-[var(--f1-muted)]">Subsection B — IEEE Leadership Timeline</p>

        <div className="relative mt-6 hidden space-y-5 border-l border-white/10 pl-6 md:block">
          {EXPERIENCE.leadership.map((item, index) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, x: 22 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.05 }}
              className="relative rounded-2xl border border-white/8 bg-white/4 p-4"
            >
              <span className="absolute -left-[31px] top-5 h-3 w-3 rounded-full border border-black" style={{ background: item.color }} />
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-data text-[10px] uppercase tracking-[0.26em]" style={{ color: item.color }}>{item.lap}</span>
                {item.tag ? (
                  <span className="rounded-full border border-[var(--f1-red)]/30 bg-[var(--f1-red)]/10 px-2.5 py-1 font-data text-[9px] uppercase tracking-[0.18em] text-[var(--f1-red)]">
                    {item.tag}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-3 font-display text-xl font-bold text-[var(--f1-white)]">{item.role}</h3>
              <p className="mt-1 text-sm text-[var(--f1-cyan)]">{item.org} · {item.dates}</p>
              <ul className="mt-4 space-y-2">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="text-sm leading-7 text-[var(--f1-white)]">{bullet}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 md:hidden">
          <Accordion type="single" collapsible className="space-y-3">
            {EXPERIENCE.leadership.map((item) => (
              <AccordionItem key={item.role} value={item.role} className="rounded-2xl border border-white/8 bg-white/4 px-4">
                <AccordionTrigger className="py-4 text-left hover:no-underline">
                  <div className="flex flex-1 items-start gap-3">
                    <span className="mt-1 h-3 w-3 rounded-full" style={{ background: item.color }} />
                    <div>
                      <p className="font-data text-[10px] uppercase tracking-[0.2em]" style={{ color: item.color }}>{item.lap}</p>
                      <p className="mt-2 font-display text-lg font-bold text-[var(--f1-white)]">{item.role}</p>
                      <p className="mt-1 text-sm text-[var(--f1-cyan)]">{item.org}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <p className="text-sm text-[var(--f1-muted)]">{item.dates}</p>
                  <ul className="mt-3 space-y-2">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="text-sm leading-7 text-[var(--f1-white)]">{bullet}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>

    <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr,0.95fr]">
      <div className="glass rounded-[28px] p-6">
        <p className="font-data text-[10px] uppercase tracking-[0.32em] text-[var(--f1-muted)]">Volunteer Pit Stops</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {EXPERIENCE.volunteerStops.map((stop) => (
            <span key={stop} className="rounded-full border border-white/8 bg-white/4 px-4 py-2 font-data text-[10px] uppercase tracking-[0.15em] text-[var(--f1-white)]">
              {stop}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
        {EXPERIENCE.awards.map((award) => (
          <div key={award.title} className="glass rounded-[24px] p-5">
            <p className="font-data text-[10px] uppercase tracking-[0.22em] text-[var(--f1-red)]">{award.icon}</p>
            <h3 className="mt-3 font-display text-xl font-black text-[var(--f1-white)]">{award.title}</h3>
            <p className="mt-1 text-sm text-[var(--f1-red)]">{award.org} {award.year ? `· ${award.year}` : ""}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--f1-white)]">{award.note}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PitWall;
