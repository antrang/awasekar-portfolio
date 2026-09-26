import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let hover = false;
    const cursor = cursorRef.current!;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    document.addEventListener("mousemove", onMouseMove);

    let rafId: number;
    function loop() {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        gsap.to(cursor, { x: cursorPos.x, y: cursorPos.y, duration: 0.1, overwrite: "auto" });
      } else {
        cursorPos.x = mousePos.x;
        cursorPos.y = mousePos.y;
      }
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);

    const socialEl = document.querySelector('[data-cursor="icons"]') as HTMLElement | null;
    const onSocialEnter = () => {
      if (!socialEl) return;
      const rect = socialEl.getBoundingClientRect();
      cursor.classList.add("cursor-icons");
      cursor.style.setProperty("--cursorW", `${rect.width}px`);
      cursor.style.setProperty("--cursorH", `${rect.height}px`);
      gsap.to(cursor, {
        x: rect.left,
        y: rect.top,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
      hover = true;
    };

    const onSocialLeave = () => {
      cursor.classList.remove("cursor-icons");
      cursor.style.removeProperty("--cursorW");
      cursor.style.removeProperty("--cursorH");
      hover = false;
    };

    if (socialEl) {
      socialEl.addEventListener("mouseenter", onSocialEnter);
      socialEl.addEventListener("mouseleave", onSocialLeave);
    }

    const disableEls = document.querySelectorAll('[data-cursor="disable"]');
    const onDisableEnter = () => cursor.classList.add("cursor-disable");
    const onDisableLeave = () => cursor.classList.remove("cursor-disable");

    disableEls.forEach((el) => {
      el.addEventListener("mouseenter", onDisableEnter);
      el.addEventListener("mouseleave", onDisableLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      if (socialEl) {
        socialEl.removeEventListener("mouseenter", onSocialEnter);
        socialEl.removeEventListener("mouseleave", onSocialLeave);
      }
      disableEls.forEach((el) => {
        el.removeEventListener("mouseenter", onDisableEnter);
        el.removeEventListener("mouseleave", onDisableLeave);
      });
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
