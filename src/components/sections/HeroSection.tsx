import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

import { PROFILE } from '../../data/profile';

const LIGHT_COUNT = 5;

function formatLapTime(milliseconds: number) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const ms = milliseconds % 1000;

  return `${minutes}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
}

export default function HeroSection() {
  const [phase, setPhase] = useState<'idle' | 'lights' | 'go' | 'timer'>('idle');
  const [activeLights, setActiveLights] = useState(0);
  const [lapTime, setLapTime] = useState(0);
  const [speed, setSpeed] = useState(0);
  const timerStart = useRef(0);

  useEffect(() => {
    const timeouts: number[] = [];

    timeouts.push(window.setTimeout(() => setPhase('lights'), 800));

    for (let index = 0; index < LIGHT_COUNT; index += 1) {
      timeouts.push(
        window.setTimeout(() => setActiveLights(index + 1), 800 + index * 300),
      );
    }

    timeouts.push(
      window.setTimeout(() => {
        setActiveLights(0);
        setPhase('go');
      }, 800 + LIGHT_COUNT * 300 + 2500),
    );

    timeouts.push(
      window.setTimeout(() => {
        timerStart.current = performance.now();
        setPhase('timer');
      }, 800 + LIGHT_COUNT * 300 + 3000),
    );

    return () => timeouts.forEach((timeout) => window.clearTimeout(timeout));
  }, []);

  useEffect(() => {
    let frame = 0;
    let start = 0;

    const tick = (time: number) => {
      if (!start) {
        start = time;
      }

      const progress = Math.min((time - start) / 3000, 1);
      const eased = 1 - Math.pow(1 - progress, 2);
      setSpeed(Math.round(280 * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (phase !== 'timer') {
      return undefined;
    }

    let frame = 0;

    const tick = () => {
      setLapTime(Math.floor(performance.now() - timerStart.current));
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  const contactItems = useMemo(
    () => [
      { icon: Phone, label: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/\s+/g, '')}` },
      { icon: Mail, label: PROFILE.email, href: `mailto:${PROFILE.email}` },
      { icon: Github, label: 'github.com/Branavan2004', href: PROFILE.github },
      { icon: Linkedin, label: 'linkedin.com/in/branavan-kuganesan', href: PROFILE.linkedin },
      { icon: MapPin, label: PROFILE.location, href: 'https://maps.google.com/?q=Colombo,Sri Lanka' },
    ],
    [],
  );

  const gaugeAngle = -120 + (240 * speed) / 280;

  return (
    <section className="content-section hero-section">
      <div className="hero-section__center">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          DRIVER #{PROFILE.driverNumber}
        </motion.p>

        <motion.div
          className="hero-section__name"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.18, delayChildren: 1.3 } },
          }}
        >
          {[PROFILE.nameDisplay.first, PROFILE.nameDisplay.last].map((part, index) => (
            <motion.h1
              key={part}
              className={`hero-section__headline ${index === 1 ? 'hero-section__headline--muted' : ''}`}
              variants={{
                hidden: { opacity: 0, y: 60 },
                show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              {part}
            </motion.h1>
          ))}
        </motion.div>

        <motion.p
          className="hero-section__subline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.8 }}
        >
          {PROFILE.flag} SRI LANKA · IIT / UNIVERSITY OF WESTMINSTER · COMPUTER SCIENCE
        </motion.p>

        <div className="start-lights glass">
          <div className="start-lights__row">
            {Array.from({ length: LIGHT_COUNT }).map((_, index) => (
              <span
                key={index}
                className={`start-lights__lamp ${activeLights > index ? 'is-active' : ''}`}
              />
            ))}
          </div>
          <div className="start-lights__state">
            {phase === 'go' ? <span className="start-lights__go">GO GO GO</span> : null}
            {phase === 'timer' ? <span>{formatLapTime(lapTime)}</span> : null}
            {phase === 'idle' || phase === 'lights' ? <span>FORMATION SEQUENCE</span> : null}
          </div>
        </div>

        <div className="hero-section__speedometer glass">
          <div className="hero-section__speedometer-label">SPEED / KMH</div>
          <svg viewBox="0 0 220 140" className="hero-section__speedometer-svg">
            <path d="M 26 114 A 84 84 0 0 1 194 114" className="hero-section__speedometer-track" />
            <path
              d="M 26 114 A 84 84 0 0 1 194 114"
              className="hero-section__speedometer-progress"
              pathLength="1"
              style={{ strokeDasharray: 1, strokeDashoffset: 1 - speed / 280 }}
            />
            <line
              x1="110"
              y1="114"
              x2={110 + 70 * Math.cos(((gaugeAngle - 90) * Math.PI) / 180)}
              y2={114 + 70 * Math.sin(((gaugeAngle - 90) * Math.PI) / 180)}
              className="hero-section__speedometer-needle"
            />
            <circle cx="110" cy="114" r="5" fill="var(--f1-red)" />
          </svg>
          <div className="hero-section__speedometer-value">{speed}</div>
        </div>

        <div className="hero-section__contact glass">
          {contactItems.map(({ icon: Icon, label, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" data-interactive="true">
              <Icon size={14} />
              <span>{label}</span>
            </a>
          ))}
        </div>

        <div className="hero-section__scroll">
          <span>SCROLL TO START</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </section>
  );
}
