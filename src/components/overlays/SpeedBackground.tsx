import { memo, useEffect, useRef } from 'react';

type SpeedBackgroundProps = {
  intensity: number;
};

type Streak = {
  x: number;
  y: number;
  length: number;
  speed: number;
  alpha: number;
  color: string;
};

const SpeedBackground = memo(function SpeedBackground({ intensity }: SpeedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intensityRef = useRef(intensity);

  useEffect(() => {
    intensityRef.current = intensity;
  }, [intensity]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext('2d');

    if (!context) {
      return undefined;
    }

    const streaks: Streak[] = [];
    let frame = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const createStreak = (): Streak => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: 30 + Math.random() * 90,
      speed: 1 + Math.random() * 5,
      alpha: 0.05 + Math.random() * 0.18,
      color: Math.random() > 0.7 ? '0,210,255' : '255,255,255',
    });

    resize();
    for (let index = 0; index < 42; index += 1) {
      streaks.push(createStreak());
    }

    const render = () => {
      const velocityBoost = Math.min(Math.abs(intensityRef.current) / 1500, 1.6);

      context.clearRect(0, 0, width, height);
      context.fillStyle = '#0a0a0f';
      context.fillRect(0, 0, width, height);

      const gradients = [
        { x: width * 0.18, y: height * 0.2, radius: 220, color: 'rgba(232,0,45,0.08)' },
        { x: width * 0.82, y: height * 0.28, radius: 260, color: 'rgba(0,210,255,0.06)' },
        { x: width * 0.52, y: height * 0.78, radius: 300, color: 'rgba(30,144,255,0.05)' },
      ];

      gradients.forEach((gradient, index) => {
        const pulse = 1 + Math.sin(performance.now() * 0.0006 + index) * 0.06;
        const radial = context.createRadialGradient(
          gradient.x,
          gradient.y,
          0,
          gradient.x,
          gradient.y,
          gradient.radius * pulse,
        );
        radial.addColorStop(0, gradient.color);
        radial.addColorStop(1, 'rgba(0,0,0,0)');
        context.fillStyle = radial;
        context.fillRect(0, 0, width, height);
      });

      const targetCount = 42 + Math.round(velocityBoost * 24);
      while (streaks.length < targetCount) {
        streaks.push(createStreak());
      }
      while (streaks.length > targetCount) {
        streaks.pop();
      }

      streaks.forEach((streak) => {
        context.beginPath();
        context.lineWidth = 1 + velocityBoost * 0.8;
        context.strokeStyle = `rgba(${streak.color}, ${Math.min(streak.alpha + velocityBoost * 0.12, 0.4)})`;
        context.moveTo(streak.x, streak.y);
        context.lineTo(streak.x - streak.length, streak.y);
        context.stroke();

        streak.x -= streak.speed + velocityBoost * 16;

        if (streak.x < -streak.length) {
          streak.x = width + streak.length;
          streak.y = Math.random() * height;
        }
      });

      frame = requestAnimationFrame(render);
    };

    render();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="overlay-speed-bg" aria-hidden="true" />;
});

export default SpeedBackground;
