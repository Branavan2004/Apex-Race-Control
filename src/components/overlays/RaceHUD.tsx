import { memo } from 'react';

type SectionMeta = {
  id: string;
  label: string;
};

type RaceHUDProps = {
  sections: SectionMeta[];
  activeSection: number;
  progress: number;
  onJump: (index: number) => void;
};

const RaceHUD = memo(function RaceHUD({
  sections,
  activeSection,
  progress,
  onJump,
}: RaceHUDProps) {
  const circumference = 2 * Math.PI * 34;

  return (
    <div className="overlay-hud" aria-label="Race navigation">
      <svg viewBox="0 0 100 100" className="overlay-hud__ring" aria-hidden="true">
        <circle cx="50" cy="50" r="34" />
        <circle
          cx="50"
          cy="50"
          r="34"
          className="overlay-hud__ring-progress"
          style={{ strokeDasharray: circumference, strokeDashoffset: circumference * (1 - progress) }}
        />
      </svg>
      <div className="overlay-hud__dots">
        {sections.map((section, index) => (
          <button
            key={section.id}
            type="button"
            className={index === activeSection ? 'is-active' : ''}
            aria-label={section.label}
            title={section.label}
            onClick={() => onJump(index)}
            data-interactive="true"
          />
        ))}
      </div>
    </div>
  );
});

export default RaceHUD;
