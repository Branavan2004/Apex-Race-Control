import { useEffect, useRef } from "react";

const SpeedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollSpeedRef = useRef(0);
  const lastScrollRef = useRef(0);
  const particlesRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number; size: number; alpha: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    // Sparse floating particles
    for (let i = 0; i < 30; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 1.2 + 0.3,
        alpha: Math.random() * 0.15 + 0.03,
      });
    }

    const handleScroll = () => {
      const speed = Math.abs(window.scrollY - lastScrollRef.current);
      scrollSpeedRef.current = Math.min(speed / 12, 4);
      lastScrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let animFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const speed = scrollSpeedRef.current;

      // Subtle grid
      ctx.strokeStyle = `rgba(200, 180, 130, ${0.008 + speed * 0.002})`;
      ctx.lineWidth = 0.3;
      const grid = 120;
      for (let x = 0; x < canvas.width; x += grid) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += grid) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx + speed * 0.1;
        p.y += p.vy;
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 180, 130, ${p.alpha + speed * 0.02})`;
        ctx.fill();
      });

      scrollSpeedRef.current *= 0.94;
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
    <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 0.5 }} />
  );
};

export default SpeedBackground;
