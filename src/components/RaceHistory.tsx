import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { PROJECTS } from "@/data/siteData";

const RaceHistory = () => (
  <section id="race-history" className="mx-auto max-w-6xl px-6 py-24 md:px-12">
    <div className="mb-12">
      <p className="font-data text-[11px] uppercase tracking-[0.32em] text-[var(--f1-red)]">Race Results — 2024/26 Season</p>
      <h2 className="mt-3 font-display text-4xl font-black tracking-[-0.03em] text-[var(--f1-white)] md:text-6xl">
        PROJECT CLASSIFICATION
      </h2>
    </div>

    <div className="grid gap-5 lg:grid-cols-2">
      {PROJECTS.map((project, index) => {
        const isFeatured = "featured" in project && project.featured;
        const isPlaceholder = "placeholder" in project && project.placeholder;

        return (
          <motion.article
            key={`${project.position}-${project.title}`}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.05 }}
            className={isFeatured ? "lg:col-span-2" : ""}
          >
            <div
              className={`${isPlaceholder ? "border-dashed opacity-50" : "transition-transform duration-500 hover:-translate-y-2"} glass h-full rounded-[28px] p-6`}
              style={{
                borderColor: isPlaceholder ? "rgba(232,0,45,0.3)" : isFeatured ? "rgba(255,215,0,0.35)" : undefined,
                boxShadow: isFeatured ? "0 10px 40px rgba(255,215,0,0.08)" : undefined,
              }}
            >
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className={`font-data text-sm uppercase tracking-[0.3em] ${isFeatured ? "text-[var(--f1-gold)]" : "text-[var(--f1-red)]"}`}>
                  {project.position}
                </span>
                {"badge" in project && project.badge ? (
                  <span className="rounded-full border border-[var(--f1-gold)]/40 bg-[var(--f1-gold)]/10 px-3 py-1 font-data text-[10px] uppercase tracking-[0.2em] text-[var(--f1-gold)]">
                    {project.badge}
                  </span>
                ) : null}
                {"subtitle" in project && project.subtitle ? (
                  <span className="font-data text-[10px] uppercase tracking-[0.22em] text-[var(--f1-muted)]">{project.subtitle}</span>
                ) : null}
              </div>

              {isPlaceholder ? (
                <div className="rounded-[22px] border border-dashed border-[rgba(232,0,45,0.3)] p-6">
                  <h3 className="font-display text-2xl font-black tracking-[-0.03em] text-[var(--f1-white)]">{project.position}</h3>
                  <p className="mt-4 font-data text-[11px] uppercase tracking-[0.24em] text-[var(--f1-muted)]">◌ NEXT ON CALENDAR</p>
                  <p className="mt-6 text-[15px] leading-7 text-[var(--f1-white)]">{project.summary}</p>
                  {"eta" in project && project.eta ? (
                    <p className="mt-4 font-data text-[11px] uppercase tracking-[0.2em] text-[var(--f1-muted)]">{project.eta}</p>
                  ) : null}
                </div>
              ) : (
                <>
                  <h3 className="font-display text-3xl font-black tracking-[-0.03em] text-[var(--f1-white)]">{project.title}</h3>
                  {"stack" in project ? (
                    <p className="mt-4 font-data text-[11px] uppercase tracking-[0.16em] text-[var(--f1-muted)]">
                      Constructor: {project.stack.join(" · ")}
                    </p>
                  ) : null}
                  <p className="mt-5 max-w-3xl text-[15px] leading-7 text-[var(--f1-white)]">{project.summary}</p>
                  {"bullets" in project && project.bullets ? (
                    <ul className="mt-5 space-y-2">
                      {project.bullets.map((bullet) => (
                        <li key={bullet} className="text-sm leading-7 text-[var(--f1-white)]">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stats.map((stat) => (
                      <span key={stat} className="rounded-full bg-white/6 px-3 py-2 font-data text-[10px] uppercase tracking-[0.16em] text-[var(--f1-white)]">
                        {stat}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-[var(--f1-white)] transition-colors hover:border-[var(--f1-red)]/40 hover:text-[var(--f1-red)]"
                    >
                      <Github className="h-4 w-4" />
                      GITHUB
                    </a>
                    {"demo" in project && project.demo ? (
                      <a
                        href={project.demo}
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--f1-gold)]/25 px-4 py-2 text-sm text-[var(--f1-gold)] transition-colors hover:border-[var(--f1-gold)]/55"
                      >
                        <ExternalLink className="h-4 w-4" />
                        LIVE DEMO
                      </a>
                    ) : null}
                  </div>
                </>
              )}
            </div>
          </motion.article>
        );
      })}
    </div>
  </section>
);

export default RaceHistory;
