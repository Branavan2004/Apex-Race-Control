import { motion } from 'framer-motion';

import { PROFILE } from '../../data/profile';
import GlassCard from '../shared/GlassCard';

const finalRows = [
  ['1', 'BRANAVAN KUGANESAN', 'IIT / WESTMINSTER', '∞'],
  ['2', 'FULL-STACK DEV', 'React · Node · TS', '88'],
  ['3', 'DATA ENGINEERING', 'Snowflake · SQL · Pipe', '85'],
  ['4', 'MACHINE LEARNING', 'Python · sklearn', '82'],
  ['5', 'DEVOPS & TOOLS', 'Docker · GitHub', '80'],
];

export default function FinishLine() {
  return (
    <section className="content-section section-shell finish-section">
      <motion.div
        className="finish-flags"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.9 }}
      >
        <span className="finish-flags__sheet" />
        <span className="finish-flags__sheet finish-flags__sheet--right" />
      </motion.div>

      <div className="section-heading-wrap section-heading-wrap--center">
        <p className="eyebrow">SECTOR 9</p>
        <h2 className="section-title">Final Classification</h2>
      </div>

      <div className="podium-wrap">
        <div className="podium">
          <div className="podium__step podium__step--p2">
            <span>P2</span>
            <strong>FULL-STACK</strong>
          </div>
          <div className="podium__step podium__step--p1">
            <span>P1</span>
            <strong>{PROFILE.name.toUpperCase()}</strong>
            <small>{`IIT · ${PROFILE.flag}`}</small>
          </div>
          <div className="podium__step podium__step--p3">
            <span>P3</span>
            <strong>DATA ENGINEERING</strong>
          </div>
        </div>
        <div className="confetti-burst" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>
      </div>

      <GlassCard className="classification-card">
        <div className="classification-table">
          <div className="classification-table__head">
            <span>POS</span>
            <span>DRIVER</span>
            <span>TEAM</span>
            <span>PTS</span>
          </div>
          {finalRows.map((row, index) => (
            <div key={row[1]} className={`classification-table__row classification-table__row--${index + 1}`}>
              {row.map((cell) => (
                <span key={cell}>{cell}</span>
              ))}
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="finish-section__footer">
        END OF RACE — BRANAVAN KUGANESAN · P1 · COLOMBO · 2026
      </div>
    </section>
  );
}
