import { SplitText } from "gsap/SplitText";
import gsap from "gsap";

export function initialFX() {
  const mainEl = document.getElementsByTagName("main")[0];
  if (mainEl) {
    mainEl.classList.add("main-active");
  }

  gsap.to("body", {
    backgroundColor: "#070a11",
    duration: 0.5,
    delay: 0.2,
  });

  // Fade in header & nav elements
  gsap.fromTo(
    [".header", ".nav-fade", ".landing-badge-wrap"],
    { opacity: 0, y: -20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.1,
      delay: 0.1,
    }
  );

  // Animate hero headline & text if present
  const heroNameEl = document.querySelector(".landing-name");
  if (heroNameEl) {
    try {
      const splitTitle = new SplitText(heroNameEl, {
        type: "chars,lines",
        linesClass: "split-line",
      });
      gsap.fromTo(
        splitTitle.chars,
        { opacity: 0, y: 50, filter: "blur(4px)" },
        {
          opacity: 1,
          duration: 0.9,
          filter: "blur(0px)",
          ease: "power3.out",
          y: 0,
          stagger: 0.02,
          delay: 0.25,
        }
      );
    } catch {
      gsap.fromTo(
        heroNameEl,
        { opacity: 0, y: 30 },
        { opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.25 }
      );
    }
  }

  // Animate hero copy, CTA buttons, and proof bar
  gsap.fromTo(
    [".landing-eyebrow", ".landing-tagline", ".landing-cta-group", ".landing-photo-card", ".proof-bar"],
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.12,
      delay: 0.4,
    }
  );
}
