import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

import { PROJECTS } from '../../data/projects';
import GlassCard from '../shared/GlassCard';

export default function RaceHistory() {
  return (
    <section className="content-section section-shell">
      <motion.div
        className="section-heading-wrap"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
      >
        <p className="eyebrow">SECTOR 4</p>
        <h2 className="section-title">RACE RESULTS — 2024/25 SEASON</h2>
        <p className="section-subtitle">
          PORTFOLIO EXPERIENCE: F1 BROADCAST INSPIRED · FEATURED PROJECT: SEPARATE FULL-STACK APP
        </p>
      </motion.div>

      <div className="project-grid">
        {PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            className={project.featured ? 'project-grid__featured' : ''}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75 }}
          >
            <GlassCard
              className={`project-card ${project.featured ? 'project-card--featured' : ''} ${project.placeholder ? 'project-card--placeholder' : ''}`}
            >
              <div className="project-card__topline">
                <span>{project.position}</span>
                <span>{project.featured ? '⚡ FASTEST LAP' : '●'}</span>
                <span>{project.race}</span>
              </div>
              <h3>{project.title}</h3>
              <p className="project-card__subtitle">{project.subtitle}</p>
              <p className="project-card__constructor">{`Constructor: ${project.constructor}`}</p>

              <div className="project-card__body">
                {project.description.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              {project.stats.length > 0 ? (
                <div className="project-card__stats">
                  <span>KEY STATS</span>
                  {project.stats.map((stat) => (
                    <p key={stat}>{stat}</p>
                  ))}
                </div>
              ) : null}

              {!project.placeholder ? (
                <div className="project-card__actions">
                  {project.featured ? <span className="project-chip">FASTEST LAP</span> : null}
                  {project.github ? (
                    <a href={project.github} target="_blank" rel="noreferrer" data-interactive="true">
                      <Github size={14} />
                      <span>GITHUB</span>
                    </a>
                  ) : null}
                  {project.demo ? (
                    <a href={project.demo} data-interactive="true">
                      <ExternalLink size={14} />
                      <span>LIVE DEMO</span>
                    </a>
                  ) : null}
                </div>
              ) : null}
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
