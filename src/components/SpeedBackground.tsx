import { memo, useEffect, useRef } from "react";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";

type Streak = { x: number; y: number; length: number; speed: number; alpha: number };

const SpeedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streaksRef = useRef<Streak[]>([]);
  const blurOffsetRef = useRef(0);
  const velocityRef = useRef(0);
  const directionRef = useRef(1);
  const { velocity, direction } = useScrollVelocity();

  useEffect(() => {
    velocityRef.current = velocity;
    directionRef.current = direction;
  }, [velocity, direction]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    streaksRef.current = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: 30 + Math.random() * 120,
      speed: 1 + Math.random() * 4,
      alpha: 0.05 + Math.random() * 0.2,
    }));

    let frame = 0;
    const draw = () => {
      blurOffsetRef.current += 0.0025;
      context.clearRect(0, 0, canvas.width, canvas.height);

      const intensity = Math.min(1, velocityRef.current / 1600);
      const scrollDirection = directionRef.current;

      const bokeh = [
        { x: canvas.width * 0.2, y: canvas.height * 0.15, radius: 180, color: "rgba(30,144,255,0.12)" },
        { x: canvas.width * 0.8, y: canvas.height * 0.24, radius: 150, color: "rgba(232,0,45,0.1)" },
        { x: canvas.width * 0.6, y: canvas.height * 0.82, radius: 190, color: "rgba(139,92,246,0.08)" },
      ];

      bokeh.forEach((circle, index) => {
        const pulse = 1 + Math.sin(blurOffsetRef.current * 4 + index) * 0.08;
        const gradient = context.createRadialGradient(circle.x, circle.y, 0, circle.x, circle.y, circle.radius * pulse);
        gradient.addColorStop(0, circle.color);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(circle.x, circle.y, circle.radius * pulse, 0, Math.PI * 2);
        context.fill();
      });

      streaksRef.current.forEach((streak, index) => {
        streak.x += (-streak.speed - intensity * 18) * scrollDirection;
        if (streak.x < -streak.length) streak.x = canvas.width + streak.length;
        if (streak.x > canvas.width + streak.length) streak.x = -streak.length;

        context.strokeStyle = `rgba(255,255,255,${Math.min(0.36, streak.alpha + intensity * 0.4)})`;
        context.lineWidth = 1 + intensity * 0.8;
        context.beginPath();
        context.moveTo(streak.x, streak.y);
        context.lineTo(streak.x + streak.length, streak.y);
        context.stroke();

        if (intensity > 0.6 && index % 4 === 0) {
          context.strokeStyle = `rgba(0,210,255,${0.1 + intensity * 0.2})`;
          context.beginPath();
          context.moveTo(streak.x + 6, streak.y + 2);
          context.lineTo(streak.x + streak.length * 0.65, streak.y + 2);
          context.stroke();
        }
      });

      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 opacity-80" />;
};

export default memo(SpeedBackground);
