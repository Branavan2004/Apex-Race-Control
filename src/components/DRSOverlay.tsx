import { memo, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SECTION_ORDER } from "@/data/siteData";

const DRSOverlay = () => {
  const sections = useMemo(() => SECTION_ORDER.map((section) => ({ ...section })), []);
  const [active, setActive] = useState<{ label: string; name: string } | null>(null);

  useEffect(() => {
    let previousId = "";
    let timeout = 0;

    const onScroll = () => {
      const triggerY = window.scrollY + window.innerHeight * 0.4;
      let current: (typeof sections)[number] | undefined;
      for (let index = sections.length - 1; index >= 0; index -= 1) {
        const section = sections[index];
        const node = document.getElementById(section.id);
        if (node && node.offsetTop <= triggerY) {
          current = section;
          break;
        }
      }

      if (current && current.id !== previousId) {
        previousId = current.id;
        setActive({ label: "DRS ENABLED", name: current.drsLabel });
        window.clearTimeout(timeout);
        timeout = window.setTimeout(() => setActive(null), 2500);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timeout);
    };
  }, [sections]);

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          className="pointer-events-none fixed left-1/2 top-16 z-[66] hidden -translate-x-1/2 md:block"
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--f1-green)]" />
            <div className="rounded-full border border-[var(--f1-green)]/20 bg-[var(--f1-green)]/10 px-6 py-3 text-center">
              <p className="font-data text-sm font-bold uppercase tracking-[0.3em] text-[var(--f1-green)]">{active.label}</p>
              <p className="mt-1 font-data text-[10px] uppercase tracking-[0.2em] text-[var(--f1-white)]/72">{active.name}</p>
            </div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--f1-green)]" />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default memo(DRSOverlay);
