import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { CERTIFICATION_BAYS, CERTIFICATION_COUNT } from '../../data/certifications';
import { useInView } from '../../hooks/useInView';
import GlassCard from '../shared/GlassCard';
import SkillPill from '../shared/SkillPill';

function Counter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.45);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      return undefined;
    }

    let frame = 0;
    let start = 0;

    const tick = (time: number) => {
      if (!start) {
        start = time;
      }

      const progress = Math.min((time - start) / 1000, 1);
      setCount(Math.round(CERTIFICATION_COUNT * (1 - Math.pow(1 - progress, 3))));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView]);

  return (
    <div ref={ref} className="certifications-counter">
      <span>CERT COUNT</span>
      <strong>{String(count).padStart(2, '0')}</strong>
    </div>
  );
}

export default function CertificationsGarage() {
  return (
    <section className="content-section section-shell">
      <motion.div
        className="section-heading-wrap section-heading-wrap--row"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <p className="eyebrow">SECTOR 6</p>
          <h2 className="section-title">CREDENTIALS GARAGE — 22 CERTIFICATIONS</h2>
          <p className="section-subtitle">ALL ISSUED: MARCH 2026</p>
        </div>
        <Counter />
      </motion.div>

      <div className="cert-grid">
        {CERTIFICATION_BAYS.map((bay) => (
          <div key={bay.id} className="cert-bay">
            <div className="cert-bay__label" style={{ color: bay.color }}>
              {bay.label}
            </div>
            {bay.items.map((item, index) => (
              <motion.div
                key={`${item.title}-${index}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.06 }}
              >
                <GlassCard className="cert-card" accent={bay.color}>
                  <div className="cert-card__inner">
                    <div className="cert-card__face cert-card__face--front">
                      <span className="cert-card__issuer" style={{ color: bay.color }}>
                        {bay.label}
                      </span>
                      <h3>{item.title}</h3>
                      <p>{`${item.issuer} · ${item.issued}${item.level ? ` · ${item.level}` : ''}`}</p>
                    </div>
                    <div className="cert-card__face cert-card__face--back">
                      <span className="cert-card__issuer">SKILLS LOADED</span>
                      <div className="pill-row pill-row--tight">
                        {item.skills.map((skill) => (
                          <SkillPill key={skill} label={skill} tone="gold" />
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
