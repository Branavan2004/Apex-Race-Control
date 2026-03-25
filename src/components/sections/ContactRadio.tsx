import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

import { PROFILE } from '../../data/profile';
import GlassCard from '../shared/GlassCard';

const channels = [
  {
    id: 'CH 01',
    label: 'PHONE',
    icon: Phone,
    primary: '+94 724',
    secondary: '200 700',
    href: `tel:${PROFILE.phone.replace(/\s+/g, '')}`,
  },
  {
    id: 'CH 02',
    label: 'EMAIL',
    icon: Mail,
    primary: 'branavan09',
    secondary: '@gmail.com',
    href: `mailto:${PROFILE.email}`,
  },
  {
    id: 'CH 03',
    label: 'LINKEDIN',
    icon: Linkedin,
    primary: 'branavan-',
    secondary: 'kuganesan',
    href: PROFILE.linkedin,
  },
  {
    id: 'CH 04',
    label: 'GITHUB',
    icon: Github,
    primary: 'Branavan',
    secondary: '2004',
    href: PROFILE.github,
  },
];

export default function ContactRadio() {
  return (
    <section className="content-section section-shell contact-section">
      <motion.div
        className="contact-wave"
        initial={{ opacity: 0, scaleX: 0.94 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.1 }}
      >
        <svg viewBox="0 0 1000 120" aria-hidden="true">
          <path d="M0 60 C60 20 120 100 180 60 S300 20 360 60 480 100 540 60 660 20 720 60 840 100 900 60 960 20 1000 60" />
        </svg>
      </motion.div>

      <div className="contact-heading">
        <p className="eyebrow">SECTOR 8</p>
        <h2 className="section-title section-title--hero">ESTABLISH CONTACT</h2>
        <p className="section-subtitle section-subtitle--accent">OPEN CHANNEL — TEAM BRANAVAN RACING</p>
      </div>

      <div className="channel-grid">
        {channels.map(({ id, label, icon: Icon, primary, secondary, href }) => (
          <GlassCard key={id} className="channel-card">
            <span className="channel-card__id">{id}</span>
            <div className="channel-card__label">
              <Icon size={18} />
              <span>{label}</span>
            </div>
            <strong>{primary}</strong>
            <strong>{secondary}</strong>
            <a href={href} target="_blank" rel="noreferrer" data-interactive="true">
              CONNECT
            </a>
          </GlassCard>
        ))}
      </div>

      <div className="contact-strip glass">
        📍 COLOMBO, SRI LANKA · {PROFILE.timezone} · AVAILABLE IMMEDIATELY
      </div>

      <div className="references-grid">
        <div className="references-title">TECHNICAL STEWARDS</div>
        {PROFILE.references.map((reference, index) => (
          <GlassCard key={reference.name} className="reference-card">
            <span className="reference-card__index">{`STEWARD 0${index + 1}`}</span>
            <h3>{reference.name.toUpperCase()}</h3>
            <p>{`${reference.role} · ${reference.org}`}</p>
            <div className="reference-card__contact">
              <span>{`📧 ${reference.email}`}</span>
              <span>{`📞 ${reference.phone}`}</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
