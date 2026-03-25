import { motion } from 'framer-motion';

import { PROFILE } from '../../data/profile';
import GlassCard from '../shared/GlassCard';
import SkillPill from '../shared/SkillPill';
import StatBar from '../shared/StatBar';

export default function DriverProfile() {
  return (
    <section className="content-section section-shell">
      <motion.div
        className="section-heading-wrap"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
      >
        <p className="eyebrow">SECTOR 2</p>
        <h2 className="section-title">Driver Profile</h2>
      </motion.div>

      <div className="profile-grid">
        <GlassCard className="driver-card" accent="#1a3a6e">
          <div className="driver-card__stripe" />
          <span className="driver-card__number">#{PROFILE.driverNumber}</span>
          <div className="driver-card__body">
            <p className="eyebrow">DRIVER CARD</p>
            <h3>{PROFILE.name.toUpperCase()}</h3>
            <p>{PROFILE.flag} SRI LANKA</p>
            <dl className="driver-card__meta">
              <div>
                <dt>Team</dt>
                <dd>INFORMATICS INSTITUTE OF TECHNOLOGY</dd>
              </div>
              <div>
                <dt>Affiliated</dt>
                <dd>UNIVERSITY OF WESTMINSTER</dd>
              </div>
              <div>
                <dt>School</dt>
                <dd>{`${PROFILE.school.toUpperCase()} · ${PROFILE.schoolYears}`}</dd>
              </div>
            </dl>
            <div className="driver-card__languages">
              {PROFILE.languages.map((language) => (
                <span key={language}>{language}</span>
              ))}
            </div>
          </div>
        </GlassCard>

        <div className="profile-copy">
          <motion.p
            className="profile-copy__bio"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            {PROFILE.bio}
          </motion.p>

          <div className="profile-copy__stats">
            {PROFILE.stats.map((stat) => (
              <StatBar key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>

          <div className="pill-row">
            {PROFILE.moduleChips.map((chip) => (
              <SkillPill key={chip} label={chip} />
            ))}
          </div>

          <div className="pill-row">
            {PROFILE.roleBadges.map((badge) => (
              <SkillPill key={badge} label={badge} tone="accent" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
