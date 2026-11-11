import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import "./styles/Work.css";

interface ProjectImage {
  label: string;
  src: string;
  host: string;
}

interface Project {
  id: string;
  title: string;
  tag: string;
  category: "ai" | "audio";
  role: string;
  tagline: string;
  problem: string;
  solution: string;
  metrics: string[];
  tech: string[];
  images?: ProjectImage[];
  link?: string;
  tradeoff?: string;
}

const allProjects: Project[] = [
  {
    id: "amber-ocean",
    title: "amber Ocean",
    tag: "Agentic AI Analytics",
    category: "ai",
    role: "Architect & Lead Builder, amber",
    tagline: "Agentic analytics harness with semantic layer and custom MCP server over Redshift",
    problem:
      "Analysts faced backlog bottlenecks fielding ad-hoc SQL inquiries, repetitive dashboard updates, and manual metric anomaly diagnosis.",
    solution:
      "Architected an autonomous analytics harness pairing amber's centralized semantic layer and schema-constrained MCP server with multi-model routing.",
    metrics: [
      "<$100 per 15k sessions",
      "80% cut in SQL backlog",
      "3,000+ queries (<$30 compute)",
    ],
    tech: ["Claude / Gemini APIs", "Python", "Semantic Layer", "Custom MCP", "AWS Redshift", "PostgreSQL"],
    images: [
      {
        label: "amber Ocean Dashboard",
        src: "/images/ocean.webp",
        host: "ocean.amberstudent.com",
      },
    ],
    link: "https://amberstudent.com",
    tradeoff:
      "Constrained agent execution through a centralized semantic layer rather than open prompt-to-SQL, eliminating join hallucinations and slashing token cost by 65%.",
  },
  {
    id: "amber-prism",
    title: "amber Prism",
    tag: "Transcript Intelligence & NLP",
    category: "ai",
    role: "Architect & Builder, amber",
    tagline: "Multi-channel transcript intelligence platform and real-time deal risk tracking",
    problem:
      "Manual QA covered only 30% of customer interactions, creating critical quality and objection blindspots across global sales pipelines.",
    solution:
      "Ingests omni-channel customer conversations (calls, WhatsApp, email) to extract objections, audit sales quality, and surface at-risk deals.",
    metrics: [
      "100+ daily active users",
      "30% to 90% audit coverage",
      "Real-time pipeline risk alerts",
    ],
    tech: ["Claude API", "Python", "NLP Intent Vectors", "n8n Webhooks", "PostgreSQL"],
    images: [
      {
        label: "amber Prism Architecture",
        src: "/images/prism.webp",
        host: "prism.amberstudent.com",
      },
    ],
    link: "https://amberstudent.com",
    tradeoff:
      "Multi-stage structured prompt extraction and vector intent clustering rather than monolithic context passing, ensuring precision on deal-risk indicators.",
  },
  {
    id: "amber-radar",
    title: "amber Radar",
    tag: "Commercial B2B Market SaaS",
    category: "ai",
    role: "Product & ML Lead, amber",
    tagline: "Client-facing predictive market intelligence for demand, supply, and dynamic pricing",
    problem:
      "UK property operators and institutional investors lacked dynamic market visibility into student housing demand, supply shifts, and competitor pricing.",
    solution:
      "Engineered a commercial SaaS product combining daily automated ELT scrapers, Scikit-Learn predictive modeling, and an interactive Next.js application.",
    metrics: [
      "$30k ARR generated",
      "50+ UK property groups",
      "Research: weeks to sub-minute",
    ],
    tech: ["Next.js", "TypeScript", "Scikit-Learn", "Python", "Automated ELT", "AWS Redshift"],
    images: [
      {
        label: "amber Radar Intelligence",
        src: "/images/radar.webp",
        host: "radar.amberstudent.com",
      },
    ],
    link: "https://radar.amberstudent.com",
    tradeoff:
      "Decoupled scrapers and ML scoring from client queries via S3 staging and pre-aggregated warehouse views, ensuring sub-second dashboard rendering.",
  },
  {
    id: "plectrum",
    title: "plectrum.live & PlectrumLabs",
    tag: "Audio Systems & Desktop DSP",
    category: "audio",
    role: "Founder & Systems Engineer",
    tagline: "Client-side ML audio tools and 5 native C++17/JUCE 8 desktop DSP plugins",
    problem:
      "Musicians face expensive commercial licensing and cloud latency for essential audio DSP tasks like pitch tracking, mastering, and stem separation.",
    solution:
      "Built plectrum.live with client-side ML in Web Audio plus a suite of 5 native desktop plugins (PluckMaster 7-stage DSP, PluckBoard, PluckNote, PluckStem).",
    metrics: [
      "18+ browser audio tools",
      "5 native desktop products (AU/VST3)",
      "Sub-millisecond local DSP",
    ],
    tech: ["Next.js", "C++17 / JUCE 8", "ONNX Runtime Web", "TensorFlow.js", "Web Audio API"],
    images: [
      {
        label: "plectrum.live (Web Suite)",
        src: "/images/plectrumlive.webp",
        host: "plectrum.live",
      },
      {
        label: "PlectrumLabs (Desktop DSP)",
        src: "/images/plectrumlabs.webp",
        host: "plectrumlabs.com",
      },
    ],
    link: "https://plectrum.live",
    tradeoff:
      "Executed ML inference client-side via ONNX Runtime Web rather than server endpoints, achieving $0 compute cost with sub-millisecond local response.",
  },
];

const FlagshipCard = ({ project }: { project: Project }) => {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const images = project.images || [];
  const currentImg = images[activeImgIdx];

  return (
    <article className="flagship-card" id={project.id}>
      {/* Background Creative Animation: Pure Ocean Swell */}
      {project.id === "amber-ocean" && (
        <div className="ocean-wave-container" aria-hidden="true">
          <div className="ocean-ambient-tide"></div>
          <div className="ocean-svg-wrap">
            <svg className="ocean-wave-svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <defs>
                <linearGradient id="oceanBackGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.25" />
                  <stop offset="60%" stopColor="var(--color-accent)" stopOpacity="0.10" />
                  <stop offset="100%" stopColor="var(--color-paper)" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="oceanFrontGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.35" />
                  <stop offset="40%" stopColor="var(--color-accent)" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="var(--color-paper)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                className="wave-layer wave-layer-back"
                fill="url(#oceanBackGrad)"
                d="M0,160 C320,80 480,240 800,140 C1120,40 1280,200 1440,120 L1440,320 L0,320 Z"
              />
              <path
                className="wave-layer wave-layer-front"
                fill="url(#oceanFrontGrad)"
                d="M0,192 C240,110 400,270 720,160 C1040,50 1200,230 1440,140 L1440,320 L0,320 Z"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Card Content Column */}
      <div className="flagship-content">
        <div className="flagship-top">
          <div className="project-tag-wrap">
            <span className="project-tag">{project.tag}</span>
            {project.id === "plectrum" && (
              <div className="audio-equalizer-badge" title="Real-time Audio DSP Engine" aria-label="Audio DSP Active">
                <span className="eq-bar eq-bar-1"></span>
                <span className="eq-bar eq-bar-2"></span>
                <span className="eq-bar eq-bar-3"></span>
                <span className="eq-bar eq-bar-4"></span>
                <span className="eq-bar eq-bar-5"></span>
              </div>
            )}
          </div>
          <span className="project-role">{project.role}</span>
        </div>

        <h3 className="project-title">
          <a href={`#${project.id}`} className="project-title-link">
            {project.title}
          </a>
        </h3>
        <p className="project-tagline">{project.tagline}</p>

        {/* Compact Scannable Stat Pills Row */}
        <div className="metric-pills-row" aria-label="Verified Impact Metrics">
          {project.metrics.map((metric, i) => (
            <div className="metric-pill" key={i}>
              <span className="pill-dot"></span>
              <span className="num">{metric}</span>
            </div>
          ))}
        </div>

        {/* Streamlined Architecture & Trade-Off Box */}
        <div className="project-summary-box">
          <div className="summary-line">
            <span className="summary-label">Architecture</span>
            <p className="summary-text">{project.solution}</p>
          </div>
          {project.tradeoff && (
            <div className="summary-line summary-tradeoff">
              <span className="summary-label">Trade-off</span>
              <p className="summary-text">{project.tradeoff}</p>
            </div>
          )}
        </div>

        <div className="project-footer">
          <div className="tech-chip-list">
            {project.tech.map((t, i) => (
              <span className="tech-chip" key={i}>
                {t}
              </span>
            ))}
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="project-link-btn"
              data-cursor="disable"
            >
              <span>Inspect</span>
              <MdArrowOutward />
            </a>
          )}
        </div>
      </div>

      {/* Media Column */}
      <div className="flagship-media">
        {currentImg && (
          <div className="browser-mockup">
            <div className="browser-bar">
              <div className="browser-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="browser-address">{currentImg.host}</div>

              {images.length > 1 && (
                <div className="browser-switcher">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      className={`switch-tab ${activeImgIdx === idx ? "switch-tab-active" : ""}`}
                      onClick={() => setActiveImgIdx(idx)}
                      data-cursor="disable"
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="browser-body">
              <img
                src={currentImg.src}
                alt={`${project.title}, ${currentImg.label}`}
                width={800}
                height={500}
                loading="lazy"
                decoding="async"
                className="media-img"
              />

              {project.id === "amber-radar" && (
                <div className="radar-sweep-overlay" aria-hidden="true">
                  <div className="radar-screen">
                    <div className="radar-ring radar-ring-1"></div>
                    <div className="radar-ring radar-ring-2"></div>
                    <div className="radar-crosshair-h"></div>
                    <div className="radar-crosshair-v"></div>
                    <div className="radar-sweep-beam"></div>
                    <div className="radar-blip blip-1" title="Market Price Delta"></div>
                    <div className="radar-blip blip-2" title="Student Housing Demand"></div>
                  </div>
                </div>
              )}

              {project.id === "amber-prism" && (
                <div className="prism-ambient-overlay" aria-hidden="true">
                  <div className="prism-light-sweep"></div>
                  <div className="prism-caustic-pulse"></div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

const Work = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredProjects =
    selectedFilter === "all"
      ? allProjects
      : allProjects.filter((p) => p.category === selectedFilter);

  return (
    <section className="work-section" id="work">
      <div className="section-container">
        <div className="work-header">
          <div className="work-title-wrap">
            <h2 className="work-title">
              Shipped Systems &amp; <span className="text-accent">Production AI</span>
            </h2>
            <p className="work-subtitle">
              Curated showcase of deployed AI products, enterprise platforms, and native DSP software with verified production impact.
            </p>
          </div>

          <div className="filter-tabs" role="tablist" aria-label="Project Categories">
            <button
              className={`filter-tab ${selectedFilter === "all" ? "filter-tab-active" : ""}`}
              onClick={() => setSelectedFilter("all")}
              data-cursor="disable"
            >
              All Flagships ({allProjects.length})
            </button>
            <button
              className={`filter-tab ${selectedFilter === "ai" ? "filter-tab-active" : ""}`}
              onClick={() => setSelectedFilter("ai")}
              data-cursor="disable"
            >
              Applied AI (3)
            </button>
            <button
              className={`filter-tab ${selectedFilter === "audio" ? "filter-tab-active" : ""}`}
              onClick={() => setSelectedFilter("audio")}
              data-cursor="disable"
            >
              Audio DSP (1)
            </button>
          </div>
        </div>

        <div className="flagship-grid">
          {filteredProjects.map((project) => (
            <FlagshipCard project={project} key={project.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
