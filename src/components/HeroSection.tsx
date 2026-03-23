import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import F1StartLights from "./F1StartLights";
import { PROFILE } from "@/data/profile";

const formatRaceTime = (elapsedMs: number) => {
  const minutes = Math.floor(elapsedMs / 60000);
  const seconds = Math.floor((elapsedMs % 60000) / 1000);
  const milliseconds = Math.floor(elapsedMs % 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
};

const HeroSection = () => {
  const [lightsOut, setLightsOut] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    if (!lightsOut) return;
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      setElapsedMs(performance.now() - start);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [lightsOut]);

  const currentSpeed = lightsOut ? Math.min(312, Math.round(110 + elapsedMs / 28)) : 0;
  const needleRotation = -110 + (currentSpeed / 320) * 220;

  const contactStrip = useMemo(
    () => [PROFILE.phone, PROFILE.email, "github.com/Branavan2004", "linkedin.com/in/branavan-kuganesan"],
    [],
  );

  return (
    <section id="hero" className="relative px-6 pb-20 pt-24 md:px-12 md:pb-24 md:pt-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-10 xl:grid-cols-[1.08fr,0.92fr]">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-2"
            >
              <span className="h-2 w-2 rounded-full bg-[var(--f1-red)] shadow-[0_0_10px_rgba(232,0,45,0.8)]" />
              <span className="font-data text-[11px] uppercase tracking-[0.34em] text-[var(--f1-red)]">
                Driver #{PROFILE.driverNumber}
              </span>
            </motion.div>

            <div className="space-y-5">
              <motion.h1
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.05 }}
                className="font-display text-[11vw] font-black leading-[0.9] tracking-[-0.06em] text-[var(--f1-white)] md:text-[7.5rem]"
              >
                {PROFILE.nameDisplay.first}
                <span className="block text-[#d7d9dc]">{PROFILE.nameDisplay.last}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18 }}
                className="font-data text-[11px] uppercase tracking-[0.22em] text-[var(--f1-muted)]"
              >
                {PROFILE.heroSubtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.28 }}
                className="max-w-2xl text-[15px] leading-8 text-[var(--f1-white)]"
              >
                {PROFILE.heroIntro}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="grid gap-3 rounded-[26px] border border-white/10 bg-[rgba(7,9,14,0.72)] p-4 sm:grid-cols-2 xl:grid-cols-4"
            >
              {contactStrip.map((item) => (
                <div key={item} className="rounded-[18px] border border-white/8 bg-white/4 px-4 py-3">
                  <p className="font-data text-[10px] uppercase tracking-[0.2em] text-[var(--f1-muted)]">Contact Feed</p>
                  <p className="mt-2 break-all text-sm text-[var(--f1-white)]">{item}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="grid gap-4 md:grid-cols-3"
            >
              <div className="glass rounded-[24px] p-5">
                <p className="font-data text-[10px] uppercase tracking-[0.24em] text-[var(--f1-muted)]">Primary Role</p>
                <p className="mt-3 font-display text-2xl font-black text-[var(--f1-white)]">Software Engineer</p>
                <p className="mt-2 text-sm leading-6 text-[var(--f1-white)]">Production-grade systems with clean architecture and reliable delivery.</p>
              </div>
              <div className="glass rounded-[24px] p-5">
                <p className="font-data text-[10px] uppercase tracking-[0.24em] text-[var(--f1-muted)]">Specialisations</p>
                <p className="mt-3 font-display text-2xl font-black text-[var(--f1-white)]">Data + ML</p>
                <p className="mt-2 text-sm leading-6 text-[var(--f1-white)]">Data engineering and machine learning layered into product-focused builds.</p>
              </div>
              <div className="glass rounded-[24px] p-5">
                <p className="font-data text-[10px] uppercase tracking-[0.24em] text-[var(--f1-muted)]">Base</p>
                <p className="mt-3 font-display text-2xl font-black text-[var(--f1-white)]">Colombo</p>
                <p className="mt-2 text-sm leading-6 text-[var(--f1-white)]">Available immediately for internship opportunities and high-impact teams.</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="xl:pt-4"
          >
            <div className="glass rounded-[32px] p-6 md:p-7">
              <div className="grid gap-6 lg:grid-cols-[1fr,0.92fr]">
                <div className="rounded-[26px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5">
                  <p className="font-data text-[10px] uppercase tracking-[0.24em] text-[var(--f1-muted)]">Launch Sequence</p>
                  <div className="mt-4 scale-[0.6] origin-left sm:scale-[0.72] md:scale-100">
                    <F1StartLights onComplete={() => setLightsOut(true)} />
                  </div>

                  <div className="mt-6 rounded-[20px] border border-white/8 bg-black/20 p-4">
                    <p className="font-data text-[10px] uppercase tracking-[0.22em] text-[var(--f1-muted)]">Session Timer</p>
                    <p className={`mt-3 font-data text-2xl ${lightsOut ? "text-[var(--f1-green)]" : "text-[var(--f1-white)]"}`}>
                      {lightsOut ? formatRaceTime(elapsedMs) : "0:00.000"}
                    </p>
                    <p className="mt-2 text-sm text-[var(--f1-white)]">
                      {lightsOut ? "Lights out and away we go." : "Awaiting lights out."}
                    </p>
                  </div>
                </div>

                <div className="rounded-[26px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-data text-[10px] uppercase tracking-[0.24em] text-[var(--f1-muted)]">Race Pace</p>
                      <p className="mt-2 font-display text-2xl font-black text-[var(--f1-white)]">Internship-Ready</p>
                    </div>
                    <span className="rounded-full border border-[var(--f1-cyan)]/25 px-3 py-1 font-data text-[10px] uppercase tracking-[0.16em] text-[var(--f1-cyan)]">
                      LIVE
                    </span>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <svg viewBox="0 0 260 220" className="h-[240px] w-full max-w-[320px]" role="img" aria-label={`Speedometer showing ${currentSpeed} kilometres per hour`}>
                      <path
                        d="M40 170 A90 90 0 0 1 220 170"
                        fill="none"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="16"
                        strokeLinecap="round"
                      />
                      <path
                        d="M40 170 A90 90 0 0 1 220 170"
                        fill="none"
                        stroke="url(#hero-speed)"
                        strokeWidth="16"
                        strokeLinecap="round"
                        style={{ filter: "drop-shadow(0 0 16px rgba(232,0,45,0.28))" }}
                      />
                      <defs>
                        <linearGradient id="hero-speed" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="var(--f1-red)" />
                          <stop offset="100%" stopColor="var(--f1-cyan)" />
                        </linearGradient>
                      </defs>
                      <g transform={`rotate(${needleRotation} 130 170)`} style={{ transition: "transform 0.4s ease-out" }}>
                        <line x1="130" y1="170" x2="130" y2="76" stroke="var(--f1-white)" strokeWidth="4" strokeLinecap="round" />
                      </g>
                      <circle cx="130" cy="170" r="10" fill="var(--f1-red)" />
                      <text x="130" y="128" textAnchor="middle" className="fill-[var(--f1-white)] font-display text-[38px] font-black">
                        {currentSpeed}
                      </text>
                      <text x="130" y="148" textAnchor="middle" className="fill-[#c0c0c0] font-data text-[11px] uppercase tracking-[0.24em]">
                        km/h
                      </text>
                    </svg>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[18px] border border-white/8 bg-black/20 p-4">
                      <p className="font-data text-[10px] uppercase tracking-[0.2em] text-[var(--f1-muted)]">Target</p>
                      <p className="mt-2 text-sm text-[var(--f1-white)]">{PROFILE.role}</p>
                    </div>
                    <div className="rounded-[18px] border border-white/8 bg-black/20 p-4">
                      <p className="font-data text-[10px] uppercase tracking-[0.2em] text-[var(--f1-muted)]">Current Base</p>
                      <p className="mt-2 text-sm text-[var(--f1-white)]">{PROFILE.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
