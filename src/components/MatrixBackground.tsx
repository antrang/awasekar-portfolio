import { useEffect, useRef } from "react";
import "./styles/MatrixBackground.css";

const CHARS = "01アイウエオカキクケコABCDEF<>{}[]!@#$%^&01100101";
const FS = 13;

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const container = containerRef.current!;
    const ctx = canvas.getContext("2d")!;

    let w = window.innerWidth;
    let h = window.innerHeight;

    const init = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      ctx.fillStyle = "#050810";
      ctx.fillRect(0, 0, w, h);
      cols = Math.floor(w / FS);
      drops = Array.from({ length: cols }, () => Math.random() * -(h / FS) * 2);
      speeds = Array.from({ length: cols }, () => 0.35 + Math.random() * 0.55);
    };

    let cols = Math.floor(w / FS);
    let drops: number[] = [];
    let speeds: number[] = [];
    init();

    let mouseX = -9999;
    let mouseY = -9999;

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.07)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${FS}px 'Courier New', monospace`;

      for (let i = 0; i < cols; i++) {
        const x = i * FS;
        const y = drops[i] * FS;
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];

        const dx = x - mouseX;
        const dy = y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const glow = Math.max(0, 1 - dist / 180);

        if (glow > 0.1) {
          ctx.shadowColor = "#5eead4";
          ctx.shadowBlur = 14 * glow;
          const alpha = 0.5 + glow * 0.5;
          ctx.fillStyle =
            glow > 0.6
              ? `rgba(255, 255, 255, ${alpha})`
              : `rgba(180, 255, 240, ${alpha})`;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = `rgba(94, 234, 212, ${0.35 + Math.random() * 0.25})`;
        }

        ctx.fillText(char, x, y);

        if (y > h && Math.random() > 0.975) {
          drops[i] = 0;
          speeds[i] = 0.35 + Math.random() * 0.55;
        }
        drops[i] += speeds[i];
      }
      ctx.shadowBlur = 0;
    };

    let rafId: number;
    let lastTime = 0;
    const loop = (t: number) => {
      if (t - lastTime > 40) {
        draw();
        lastTime = t;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const onResize = () => init();

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      container.style.setProperty("--mx", `${e.clientX}px`);
      container.style.setProperty("--my", `${e.clientY}px`);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="matrix-bg" ref={containerRef}>
      <canvas ref={canvasRef} className="matrix-canvas" />
    </div>
  );
};

export default MatrixBackground;
