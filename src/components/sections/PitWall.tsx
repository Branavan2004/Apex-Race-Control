import { motion } from 'framer-motion';

import { PROFILE } from '../../data/profile';
import { EXPERIENCE, LEADERSHIP_TIMELINE, VOLUNTEER_PIT_STOPS } from '../../data/leadership';
import GlassCard from '../shared/GlassCard';

export default function PitWall() {
  return (
    <section className="content-section section-shell">
      <motion.div
        className="section-heading-wrap"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <p className="eyebrow">SECTOR 5</p>
        <h2 className="section-title">PIT WALL — RACE STRATEGY</h2>
      </motion.div>

      <div className="pitwall-grid">
        <GlassCard className="pitwall-card">
          <p className="eyebrow">EXPERIENCE</p>
          {EXPERIENCE.map((item) => (
            <div key={item.title} className="pitwall-entry">
              <h3>{item.title}</h3>
              <p className="pitwall-entry__meta">{`${item.org} · ${item.date}`}</p>
              <ul>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              {item.tag ? <span className="pitwall-tag">🟡 {item.tag}</span> : null}
            </div>
          ))}
        </GlassCard>

        <div className="timeline">
          {LEADERSHIP_TIMELINE.map((role, index) => (
            <motion.div
              key={`${role.lap}-${role.title}`}
              className={`timeline__item timeline__item--${role.tone}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
            >
              <span className="timeline__lap">{role.lap}</span>
              <GlassCard className="timeline__card">
                <h3>{role.title}</h3>
                <p className="timeline__meta">{`${role.org} · ${role.date}`}</p>
                {role.bullets.length > 0 ? (
                  <ul>
                    {role.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
                {role.tag ? <span className="timeline__tag">{role.tag}</span> : null}
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <GlassCard className="pitwall-card">
          <p className="eyebrow">VOLUNTEER PIT STOPS</p>
          <div className="pit-stop-list">
            {VOLUNTEER_PIT_STOPS.map((stop) => (
              <span key={stop}>{stop}</span>
            ))}
          </div>
        </GlassCard>

        <div className="awards-grid">
          {PROFILE.awards.map((award, index) => (
            <GlassCard key={award.title} className={`award-card award-card--${index + 1}`}>
              <span className="award-card__icon">{index === 0 ? '🥇' : '🏅'}</span>
              <h3>{award.title}</h3>
              <p>{`${award.org} · ${award.year}`}</p>
              <strong>{award.description}</strong>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
