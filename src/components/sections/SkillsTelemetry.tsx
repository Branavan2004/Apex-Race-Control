import { motion } from 'framer-motion';

import { PROFILE } from '../../data/profile';
import ArcGauge from '../shared/ArcGauge';
import SkillPill from '../shared/SkillPill';

export default function SkillsTelemetry() {
  return (
    <section className="content-section section-shell">
      <motion.div
        className="section-heading-wrap"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <p className="eyebrow">SECTOR 3</p>
        <h2 className="section-title">Skills Telemetry</h2>
      </motion.div>

      <div className="gauge-grid">
        {PROFILE.telemetryGauges.map((gauge) => (
          <div key={gauge.label} className="gauge-grid__item">
            <ArcGauge
              label={gauge.label}
              subtitle={gauge.subtitle}
              value={gauge.value}
              color={gauge.color}
            />
            <div className="pill-row pill-row--tight">
              {gauge.skills.map((skill) => (
                <SkillPill key={skill} label={skill} tone="ghost" />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pill-row pill-row--wide">
        {PROFILE.conceptChips.map((chip) => (
          <SkillPill key={chip} label={chip} />
        ))}
      </div>

      <div className="language-strip glass">
        {PROFILE.languagesTelemetry.map((language) => (
          <div key={language.label} className="language-strip__item">
            <span>{language.label}</span>
            <div className="language-strip__meter">
              <div style={{ width: `${language.value}%` }} />
            </div>
            <strong>{`${language.value}%`}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
