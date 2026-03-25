type SkillPillProps = {
  label: string;
  tone?: 'default' | 'accent' | 'ghost' | 'gold';
};

export default function SkillPill({ label, tone = 'default' }: SkillPillProps) {
  return <span className={`skill-pill skill-pill--${tone}`}>{label}</span>;
}
