import { type CSSProperties, type HTMLAttributes, forwardRef } from 'react';

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  accent?: string;
};

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ accent, className = '', style, ...props }, ref) => (
    <div
      ref={ref}
      className={`glass ${className}`.trim()}
      style={{
        ...style,
        ...(accent ? ({ '--card-accent': accent } as CSSProperties) : {}),
      }}
      {...props}
    />
  ),
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;
