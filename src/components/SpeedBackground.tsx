import { useEffect, useRef, useState } from "react";

const SpeedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollSpeedRef = useRef(0);
  const lastScrollRef = useRef(0);
  const particlesRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string;
  }>>([]);
  const streaksRef = useRef<Array<{
    x: number; y: number; length: number; speed: number; alpha: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize particles
    for (let i = 0; i < 60; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.3 + 0.05,
        color: Math.random() > 0.7 ? "0, 200, 255" : "255, 255, 255",
      });
    }

    // Scroll speed tracking
    const handleScroll = () => {
      const speed = Math.abs(window.scrollY - lastScrollRef.current);
      scrollSpeedRef.current = Math.min(speed / 10, 5);
      lastScrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let animFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const speed = scrollSpeedRef.current;

      // Draw scan lines
      ctx.strokeStyle = `rgba(0, 200, 255, ${0.015 + speed * 0.005})`;
      ctx.lineWidth = 0.5;
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw grid
      ctx.strokeStyle = `rgba(0, 200, 255, ${0.02 + speed * 0.003})`;
      ctx.lineWidth = 0.3;
      const gridSize = 80;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Speed streaks
      if (speed > 1) {
        if (Math.random() > 0.5) {
          streaksRef.current.push({
            x: Math.random() * canvas.width,
            y: -10,
            length: 30 + speed * 40,
            speed: 5 + speed * 8,
            alpha: 0.3 + speed * 0.1,
          });
        }
      }

      streaksRef.current.forEach((s, i) => {
        s.y += s.speed;
        s.alpha *= 0.98;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 200, 255, ${s.alpha})`;
        ctx.lineWidth = 1;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x, s.y - s.length);
        ctx.stroke();
      });
      streaksRef.current = streaksRef.current.filter((s) => s.y < canvas.height + 100 && s.alpha > 0.01);

      // Particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx + speed * 0.3;
        p.y += p.vy;
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha + speed * 0.05})`;
        ctx.fill();
      });

      // Draw connections between nearby particles
      particlesRef.current.forEach((a, i) => {
        particlesRef.current.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 200, 255, ${(1 - dist / 120) * 0.06})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });

      scrollSpeedRef.current *= 0.95;
      animFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

export default SpeedBackground;
