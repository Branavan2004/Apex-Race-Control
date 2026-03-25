import { Fragment, Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';

import BroadcastTicker from './components/overlays/BroadcastTicker';
import CursorTrail from './components/overlays/CursorTrail';
import DRSOverlay from './components/overlays/DRSOverlay';
import ERSBar from './components/overlays/ERSBar';
import FlagSystem from './components/overlays/FlagSystem';
import RaceDirectorBar from './components/overlays/RaceDirectorBar';
import RaceHUD from './components/overlays/RaceHUD';
import RadioPopup from './components/overlays/RadioPopup';
import SpeedBackground from './components/overlays/SpeedBackground';
import SteeringInput from './components/overlays/SteeringInput';
import TimingTower from './components/overlays/TimingTower';
import TrackMap from './components/overlays/TrackMap';
import TyreDegradation from './components/overlays/TyreDegradation';
import WeatherPanel from './components/overlays/WeatherPanel';
import ContactRadio from './components/sections/ContactRadio';
import DriverProfile from './components/sections/DriverProfile';
import FinishLine from './components/sections/FinishLine';
import HeroSection from './components/sections/HeroSection';
import LiveTelemetry from './components/sections/LiveTelemetry';
import PitWall from './components/sections/PitWall';
import RaceHistory from './components/sections/RaceHistory';
import SkillsTelemetry from './components/sections/SkillsTelemetry';
import SectorDivider from './components/shared/SectorDivider';
import { useScrollVelocity } from './hooks/useScrollVelocity';

const CertificationsGarage = lazy(() => import('./components/sections/CertificationsGarage'));

const sectionMeta = [
  { id: 'hero', hud: 'Race Start Grid', divider: 'FORMATION LAP', component: HeroSection },
  { id: 'profile', hud: 'Driver Profile', divider: 'DRIVER BRIEFING', component: DriverProfile },
  { id: 'skills', hud: 'Skills Telemetry', divider: 'PERFORMANCE DATA', component: SkillsTelemetry },
  { id: 'history', hud: 'Race History', divider: 'RACE RESULTS', component: RaceHistory },
  { id: 'pitwall', hud: 'Pit Wall', divider: 'PIT STRATEGY', component: PitWall },
  { id: 'certifications', hud: 'Certifications Garage', divider: 'CREDENTIALS GARAGE', component: CertificationsGarage },
  { id: 'telemetry', hud: 'Live Telemetry', divider: 'LIVE TELEMETRY', component: LiveTelemetry },
  { id: 'contact', hud: 'Contact Radio', divider: 'TEAM RADIO', component: ContactRadio },
  { id: 'finish', hud: 'Finish Line', divider: 'PODIUM', component: FinishLine },
];

export default function App() {
  const { progress, velocity } = useScrollVelocity();
  const [activeSection, setActiveSection] = useState(0);
  const [drsVisible, setDrsVisible] = useState(false);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-race-section]'));

    if (sections.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length === 0) {
          return;
        }

        const topEntry = visibleEntries.sort(
          (a, b) => b.intersectionRatio - a.intersectionRatio,
        )[0];

        const nextIndex = Number(topEntry.target.dataset.sectionIndex ?? 0);
        setActiveSection(nextIndex);
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.7],
        rootMargin: '-10% 0px -20% 0px',
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setDrsVisible(true);
    const timeout = window.setTimeout(() => setDrsVisible(false), 2500);
    return () => window.clearTimeout(timeout);
  }, [activeSection]);

  const handleJump = useCallback((index: number) => {
    document.getElementById(sectionMeta[index].id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, []);

  const intensity = useMemo(() => Math.min(Math.abs(velocity), 2200), [velocity]);
  const activeMeta = sectionMeta[activeSection];

  return (
    <div className="app-shell">
      <SpeedBackground intensity={intensity} />
      <CursorTrail />
      <RaceDirectorBar />
      <FlagSystem progress={progress} />
      <WeatherPanel />
      <TimingTower />
      <TyreDegradation progress={progress} />
      <TrackMap progress={progress} />
      <ERSBar progress={progress} />
      <SteeringInput />
      <RaceHUD
        sections={sectionMeta.map(({ id, hud }) => ({ id, label: hud }))}
        activeSection={activeSection}
        progress={progress}
        onJump={handleJump}
      />
      <DRSOverlay
        visible={drsVisible}
        sectionName={activeMeta?.hud ?? ''}
        sectionIndex={activeSection}
      />
      <RadioPopup />

      <main className="portfolio-shell">
        {sectionMeta.map(({ id, divider, component: Section }, index) => (
          <Fragment key={id}>
            {index > 0 ? <SectorDivider number={index + 1} name={divider} /> : null}
            <div id={id} data-race-section data-section-index={index}>
              <Suspense
                fallback={
                  <section className="content-section section-shell">
                    <div className="glass section-loading">Loading credentials garage...</div>
                  </section>
                }
              >
                <Section />
              </Suspense>
            </div>
          </Fragment>
        ))}
      </main>

      <BroadcastTicker />
    </div>
  );
}
