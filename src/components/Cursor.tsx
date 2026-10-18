import { useEffect, useRef } from "react";
import "./styles/Cursor.css";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable custom cursor on touch/mobile devices
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 900) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    let hover = false;
    const mousePos = { x: -100, y: -100 };
    const cursorPos = { x: -100, y: -100 };
    let rafId: number | null = null;
    let isRunning = false;

    const setPosition = (x: number, y: number) => {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    function tick() {
      if (hover) {
        isRunning = false;
        rafId = null;
        return;
      }

      const delay = 5;
      const dx = mousePos.x - cursorPos.x;
      const dy = mousePos.y - cursorPos.y;

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        cursorPos.x += dx / delay;
        cursorPos.y += dy / delay;
        setPosition(cursorPos.x, cursorPos.y);
        rafId = requestAnimationFrame(tick);
      } else {
        // Idle: mouse has stopped, stop RAF loop to conserve 100% CPU
        cursorPos.x = mousePos.x;
        cursorPos.y = mousePos.y;
        setPosition(cursorPos.x, cursorPos.y);
        isRunning = false;
        rafId = null;
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;

      if (!isRunning && !hover) {
        isRunning = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const iconsEl = target.closest('[data-cursor="icons"]') as HTMLElement | null;
      if (iconsEl) {
        const rect = iconsEl.getBoundingClientRect();
        cursor.classList.add("cursor-icons");
        cursor.style.setProperty("--cursorW", `${rect.width}px`);
        cursor.style.setProperty("--cursorH", `${rect.height}px`);
        cursorPos.x = rect.left;
        cursorPos.y = rect.top;
        setPosition(rect.left, rect.top);
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        isRunning = false;
        hover = true;
        return;
      }

      if (hover) {
        cursor.classList.remove("cursor-icons");
        cursor.style.removeProperty("--cursorW");
        cursor.style.removeProperty("--cursorH");
        hover = false;
        if (!isRunning) {
          isRunning = true;
          rafId = requestAnimationFrame(tick);
        }
      }

      const disableEl = target.closest('[data-cursor="disable"]');
      if (disableEl) {
        cursor.classList.add("cursor-disable");
      } else {
        cursor.classList.remove("cursor-disable");
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef} aria-hidden="true" />;
};

export default Cursor;
