import gsap from "gsap";

export function initialFX() {
  if (typeof window === "undefined") return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  // Smooth entrance without abrupt opacity dip
  const heroNameEl = document.querySelector(".landing-name");
  if (heroNameEl) {
    gsap.fromTo(
      heroNameEl,
      { y: 15, opacity: 0.85 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    );
  }

  gsap.fromTo(
    [".landing-badge-wrap", ".landing-eyebrow", ".landing-tagline", ".landing-cta-group", ".landing-photo-card", ".proof-bar"],
    { y: 12, opacity: 0.85 },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.05,
    }
  );
}
