import { useEffect, useRef } from "react";

const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<Array<{ x: number; y: number; age: number; vx: number; vy: number }>>([]);
  const mouse = useRef({ x: 0, y: 0, px: 0, py: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouse.current.px = mouse.current.x;
      mouse.current.py = mouse.current.y;
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      const vx = e.clientX - mouse.current.px;
      const vy = e.clientY - mouse.current.py;
      const speed = Math.sqrt(vx * vx + vy * vy);
      if (speed > 3) {
        for (let i = 0; i < Math.min(3, speed / 8); i++) {
          points.current.push({
            x: e.clientX + (Math.random() - 0.5) * 4,
            y: e.clientY + (Math.random() - 0.5) * 4,
            age: 0,
            vx: vx * 0.1 + (Math.random() - 0.5) * 2,
            vy: vy * 0.1 + (Math.random() - 0.5) * 2,
          });
        }
      }
    };
    window.addEventListener("mousemove", handleMouse);

    let frame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      points.current = points.current.filter((p) => p.age < 1);
      points.current.forEach((p) => {
        p.age += 0.025;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        const alpha = (1 - p.age) * 0.6;
        const size = (1 - p.age) * 3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(0, 85%, 52%, ${alpha})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[60] pointer-events-none" />;
};

export default CursorTrail;
