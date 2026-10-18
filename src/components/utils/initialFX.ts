export function initialFX() {
  if (typeof window === "undefined") return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  // Hero title entrance
  const heroNameEl = document.querySelector(".landing-name");
  if (heroNameEl) {
    (heroNameEl as HTMLElement).style.animationDelay = "0s";
    heroNameEl.classList.add("fx-fade-in-up");
  }

  // Staggered entrance for supporting hero elements
  const elements = document.querySelectorAll(
    ".landing-badge-wrap, .landing-eyebrow, .landing-tagline, .landing-cta-group, .landing-photo-card, .proof-bar"
  );
  elements.forEach((el, idx) => {
    (el as HTMLElement).style.animationDelay = `${0.05 * (idx + 1)}s`;
    el.classList.add("fx-fade-in-up");
  });
}
