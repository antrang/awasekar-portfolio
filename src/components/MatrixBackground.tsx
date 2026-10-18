import { useEffect, useRef } from "react";
import "./styles/MatrixBackground.css";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Generate gentle particle constellation
    const particleCount = Math.floor(Math.min(w, 1400) / 24);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.3,
        vy: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.15,
      });
    }

    let mouseX = -9999;
    let mouseY = -9999;
    let pendingMouseX = -9999;
    let pendingMouseY = -9999;
    let mouseUpdateScheduled = false;

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      pendingMouseX = e.clientX;
      pendingMouseY = e.clientY;

      if (!mouseUpdateScheduled) {
        mouseUpdateScheduled = true;
        requestAnimationFrame(() => {
          mouseX = pendingMouseX;
          mouseY = pendingMouseY;
          container.style.setProperty("--mx", `${pendingMouseX}px`);
          container.style.setProperty("--my", `${pendingMouseY}px`);
          mouseUpdateScheduled = false;
        });
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animationFrameId: number;
    let isPaused = false;

    const render = () => {
      if (isPaused) return;

      ctx.clearRect(0, 0, w, h);

      // Draw and connect particles (static grid is handled natively by CSS background)
      const count = particles.length;
      for (let i = 0; i < count; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;
        }

        // Distance to cursor
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const distSq = dx * dx + dy * dy;
        const isNearCursor = distSq < 19600; // 140^2

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = isNearCursor
          ? `rgba(45, 212, 191, ${Math.min(1, p.alpha + 0.4)})`
          : `rgba(148, 163, 184, ${p.alpha})`;
        ctx.fill();

        // Connect nearby particles (using distSq to avoid expensive Math.hypot/Math.sqrt when out of range)
        for (let j = i + 1; j < count; j++) {
          const p2 = particles[j];
          const pdx = p.x - p2.x;
          const pdy = p.y - p2.y;
          const pdistSq = pdx * pdx + pdy * pdy;

          if (pdistSq < 10000) { // 100^2
            const dist = Math.sqrt(pdistSq);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 100) * 0.12;
            ctx.strokeStyle = `rgba(45, 212, 191, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPaused = true;
        cancelAnimationFrame(animationFrameId);
      } else {
        isPaused = false;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="matrix-bg" ref={containerRef}>
      <canvas ref={canvasRef} className="matrix-canvas" />
    </div>
  );
};

export default MatrixBackground;
