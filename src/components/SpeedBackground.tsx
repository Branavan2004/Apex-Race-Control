import { useEffect, useRef } from "react";

const SpeedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollSpeedRef = useRef(0);
  const lastScrollRef = useRef(0);
  const particlesRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number; size: number; alpha: number; type: "dot" | "line";
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
    for (let i = 0; i < 40; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 1.2 + 0.3,
        alpha: Math.random() * 0.12 + 0.02,
        type: Math.random() > 0.7 ? "line" : "dot",
      });
    }

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

      // Subtle grid — more refined
      ctx.strokeStyle = `rgba(200, 180, 130, ${0.006 + speed * 0.002})`;
      ctx.lineWidth = 0.3;
      const grid = 100;
      for (let x = 0; x < canvas.width; x += grid) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += grid) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Diagonal speed lines when scrolling fast
      if (speed > 1) {
        ctx.strokeStyle = `rgba(220, 50, 50, ${Math.min(speed * 0.015, 0.08)})`;
        ctx.lineWidth = 0.5;
        for (let i = 0; i < Math.min(speed * 3, 15); i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const len = 20 + speed * 15;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + len, y - len * 0.3);
          ctx.stroke();
        }
      }

      // Particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx + speed * 0.15;
        p.y += p.vy;
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;

        const alpha = p.alpha + speed * 0.015;

        if (p.type === "line") {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + 6 + speed * 3, p.y);
          ctx.strokeStyle = `rgba(200, 180, 130, ${alpha})`;
          ctx.lineWidth = 0.4;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 180, 130, ${alpha})`;
          ctx.fill();
        }
      });

      scrollSpeedRef.current *= 0.93;
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
