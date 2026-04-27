# awasekar-portfolio

My corner of the internet. Built from scratch with some inspiration and loads of vibe coding — no drag-and-drop.

Live: [awasekar.com](https://awasekar.com) (GitHub Pages)

---

## Who's this

Sourabh Awasekar - Data Chef cooking tasty intel out of spicy models flaming on hot data pipelines.

Day job: Data Engineering & Analytics @ [amberstudent.com](https://amberstudent.com).

After hours: music, side projects, breaking things to learn how they work.

---

## What's inside

- **Landing** — name, vibe, three pillars: Product / Tech & AI / Music
- **About** — short bio, no fluff
- **What I Do** — the actual craft
- **Career** — where I've been
- **Tech Stack** — tools I reach for
- **Work** — projects carousel (amber Radar, amber Ocean, plectrum.live, DoseCal, 5X, Junglee)
- **Contact** — say hi

---

## Stack

- React 18 + TypeScript
- Vite 8
- GSAP for motion
- react-fast-marquee, react-icons
- CSS — hand-rolled, no UI lib

---

## Run local

```bash
pnpm install
pnpm dev      # http://localhost:5173
```

Build:

```bash
pnpm build
pnpm preview
```

Lint:

```bash
pnpm lint
```

---

## Deploy

Hosted on **GitHub Pages**. Build output (`dist/`) goes live on push to `main` via GitHub Actions (or `gh-pages` branch — whichever workflow's wired up).

Quick deploy:

```bash
pnpm build
# push dist/ to gh-pages branch (or let Actions handle it)
```

Make sure `vite.config.ts` `base` matches the repo path if not on a custom domain.

---

## Layout

```
src/
├── components/        # Landing, Work, Career, About, ...
│   └── styles/        # per-component CSS
├── assets/            # videos, misc
├── App.tsx
└── main.tsx
public/
└── images/            # project thumbs (5x.png, junglee.png, plectrum.png, ...)
```

---

## Why open-source it

Because copy-paste is fine. If something here helps you ship your own portfolio, take it. Just don't pretend you're me.

---

## Find me

- 🌐 [awasekar.com](https://awasekar.com)
- 🎵 antrang — music drops, separate from this
- 📩 [contact](https://awasekar.com/contact) on the site

— Sourabh Awasekar
