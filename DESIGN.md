# Design System: Sourabh Awasekar Portfolio & Systems Showcase

## 1. Visual Theme & Atmosphere
A restrained, high-signal engineering interface crafted for technical recruiters, engineering leaders, and startup founders. The aesthetic balances the disciplined minimalism of Linear and Stripe with tactile, high-contrast engineering density. Deep dark void backgrounds allow glowing teal data points, semantic badges, and crisp monospace telemetry to command focus without visual fatigue.

- **Atmosphere Spectrum**:
  - **Density: 5** (Balanced: scannable executive metrics for recruiters, rich architectural deep dives for founders)
  - **Variance: 7** (Asymmetric visual rhythm, custom project showcases, high intentionality, no generic equal-grid slop)
  - **Motion: 6** (Fluid spring physics, scroll-triggered reveals, interactive timeline scrubbing, honoring `prefers-reduced-motion`)

## 2. Color Palette & Roles
- **Canvas Void** (`#070a11`) — Primary background canvas, true deep dark without pitch-black harshness.
- **Slate Secondary** (`#0d121d`) — Card backing, navigation header, and container fill.
- **Card Surface** (`rgba(16, 22, 34, 0.75)`) — Elevated interactive card surface with 12px backdrop blur.
- **Precision Teal** (`#2dd4bf`) — Primary accent for active tabs, metric highlights, key CTAs, and focus rings (Saturation < 80%).
- **Teal Muted** (`rgba(45, 212, 191, 0.12)`) — Subtle badge backgrounds, tag borders, and glow backdrops.
- **Signal Emerald** (`#10b981`) — Status indicators (Current role / live deployment badge).
- **Ink Primary** (`#f8fafc`) — Primary headlines and high-contrast body text.
- **Muted Steel** (`#94a3b8`) — Secondary descriptions, captions, and architecture explanations.
- **Whisper Border** (`rgba(255, 255, 255, 0.08)`) — 1px structural container lines, dividers, and card borders.

## 3. Typography Rules
- **Display & Headings**: `Geist`, sans-serif — Track-tight (`letter-spacing: -0.025em`), controlled scale, weight-driven hierarchy (`font-medium` to `font-semibold`).
- **Body & Paragraphs**: `Geist`, sans-serif — Relaxed leading (`line-height: 1.65`), max-width 65ch per text container.
- **Telemetry & Metadata**: `Geist Mono`, monospace — Tabular numerals for numbers, metrics, code snippets, timestamps, and architectural tags.
- **Banned**: Inter, generic serif fonts in software contexts, AI purple/pink neon gradient text.

## 4. Component Stylings
- **Buttons**: Flat or subtle glassy backdrop. Tactile `-1px` translate or `scale(0.98)` on active state. Primary: Precision Teal background with dark ink text. Secondary: Ghost card with 1px border. No outer neon glows.
- **Project Cards**: Generously rounded (14px–16px radius), 1px subtle border (`rgba(255, 255, 255, 0.08)`). Elevated with diffused ambient shadow. Full visibility upfront—no hidden carousel slides.
- **Filter Tabs**: Pill container (`border-radius: 9999px`) with instant tab indicator switch and hover micro-interaction.
- **Timeline Nodes**: Sleek vertical track with glowing teal nodes and active pulses for current leadership milestones.

## 5. Layout Principles
- **Grid-First & Bento Rhythm**: Varied asymmetric layout across flagship project showcases, enterprise grid, and timeline. No monotonous 3-column equal card rows.
- **Zero-Friction Visibility**: All project cards, architecture stacks, and verified impact metrics are immediately accessible directly on the page without carousel clicking.
- **Responsive Collapse**: Strict single-column collapse under 768px. Touch targets strictly >= 44px. No horizontal viewport overflow.

## 6. Motion Philosophy
- **Spring Physics**: Weighted, natural motion (`stiffness: 100, damping: 20`).
- **Micro-Interactions**: Gentle hover elevations (`translateY(-3px)`), spotlight cursor tracking on background, and smooth tab filtering.
- **A11y Guardrails**: Strictly honor `@media (prefers-reduced-motion: reduce)` by disabling translational animations.

## 7. Anti-Patterns (Banned)
- No emojis in professional interface labels.
- No AI copywriting clichés ("unleash", "seamlessly elevate", "next-gen synergy").
- No 1-slide forced arrow carousels that hide core project accomplishments.
- No pure black (`#000000`) or harsh purple-to-blue neon glow slop.
- No generic placeholder data—all metrics come from real production accomplishments.
