import { memo, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { SECTION_ORDER } from "@/data/siteData";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";
import { useIsMobile } from "@/hooks/use-mobile";

const RADIUS = 56;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const RaceHUD = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { progress } = useScrollVelocity();
  const isMobile = useIsMobile();
  const sections = useMemo(() => SECTION_ORDER.map((section) => ({ ...section })), []);

  useEffect(() => {
    const onScroll = () => {
      const target = window.scrollY + window.innerHeight * 0.45;
      let index = -1;
      for (let sectionIndex = sections.length - 1; sectionIndex >= 0; sectionIndex -= 1) {
        const section = sections[sectionIndex];
        const node = document.getElementById(section.id);
        if (node && node.offsetTop <= target) {
          index = sectionIndex;
          break;
        }
      }
      setCurrentSection(index < 0 ? 0 : index);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  const goToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  if (isMobile) {
    return (
      <>
        <div className="fixed right-4 top-10 z-[95]">
          <button
            type="button"
            aria-label={menuOpen ? "Close section navigation" : "Open section navigation"}
            onClick={() => setMenuOpen((current) => !current)}
            className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[rgba(10,10,15,0.9)] text-[var(--f1-white)] backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <>
              <motion.button
                type="button"
                aria-label="Close navigation drawer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 z-[92] bg-black/45"
              />
              <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="fixed right-0 top-0 z-[94] h-full w-[78vw] max-w-[320px] border-l border-white/10 bg-[rgba(10,10,15,0.97)] p-6 backdrop-blur-xl"
              >
                <p className="font-data text-[10px] uppercase tracking-[0.28em] text-[var(--f1-red)]">Race HUD</p>
                <div className="mt-6 space-y-2">
                  {sections.map((section, index) => (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => goToSection(section.id)}
                      className={`block w-full rounded-[18px] border px-4 py-3 text-left font-data text-[11px] uppercase tracking-[0.18em] transition-all ${
                        index === currentSection
                          ? "border-[var(--f1-red)]/35 bg-[rgba(232,0,45,0.14)] text-[var(--f1-red)]"
                          : "border-white/8 bg-white/3 text-[var(--f1-white)]"
                      }`}
                    >
                      {`SECTOR ${index + 1} — ${section.name}`}
                    </button>
                  ))}
                </div>
              </motion.aside>
            </>
          ) : null}
        </AnimatePresence>
      </>
    );
  }

  return (
    <div className="fixed right-4 top-1/2 z-[60] hidden -translate-y-1/2 md:block md:right-6">
      <div className="relative flex items-center justify-center">
        <svg className="absolute hidden h-36 w-36 lg:block" viewBox="0 0 140 140" aria-hidden="true">
          <circle cx="70" cy="70" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
          <circle
            cx="70"
            cy="70"
            r={RADIUS}
            fill="none"
            stroke="var(--f1-red)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
            transform="rotate(-90 70 70)"
            style={{ transition: "stroke-dashoffset 0.2s linear" }}
          />
        </svg>

        <div className="pointer-events-auto relative flex flex-col items-center gap-3">
          {sections.map((section, index) => (
            <button
              key={section.id}
              type="button"
              aria-label={`Go to Section ${index + 1}: ${section.name}`}
              title={section.name}
              onClick={() => goToSection(section.id)}
              className="group relative flex h-6 w-6 items-center justify-center"
            >
              <span
                className={`rounded-full transition-all duration-300 ${
                  index === currentSection
                    ? "h-2.5 w-2.5 bg-[var(--f1-red)] shadow-[0_0_12px_rgba(232,0,45,0.7)]"
                    : "h-1.5 w-1.5 bg-white/40"
                }`}
              />
              <span className="pointer-events-none absolute right-8 hidden whitespace-nowrap rounded-full border border-white/8 bg-black/80 px-3 py-1 font-data text-[10px] uppercase tracking-[0.18em] text-[var(--f1-white)] group-hover:block lg:block lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100">
                {section.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(RaceHUD);
