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
    tag: "AGENTIC AI ANALYTICS · SQL, CHARTS & RCAS",
    category: "ai",
    role: "Architect & Lead Builder · amber",
    tagline: "Agentic AI Analytics Harness with Semantic Layer, Skills, Routing & MCP",
    problem:
      "Business stakeholders across sales, operations, and leadership faced turnaround bottlenecks waiting for data analysts to write ad-hoc SQL, build dashboards, and diagnose metric anomalies.",
    solution:
      "Designed an agentic AI analytics harness (centralized semantic layer, domain skills, intelligent model routing, custom MCP server over AWS Redshift) answering business questions with SQL, charts, and root-cause analyses (RCAs).",
    metrics: [
      "<$100 per 15k sessions (<$0.01/session)",
      "80% cut in ad-hoc data requests",
      "3,000+ queries (<$30 compute)",
    ],
    tech: ["Claude / OpenAI APIs", "Python", "Semantic Layer", "Custom MCP", "AWS Redshift", "PostgreSQL"],
    images: [
      {
        label: "amber Ocean Dashboard",
        src: "/images/ocean.webp",
        host: "ocean.amberstudent.com",
      },
    ],
    link: "https://amberstudent.com",
    tradeoff:
      "Engineered a centralized Semantic Layer and schema-constrained MCP server rather than unconstrained prompt-to-SQL, eliminating hallucinated joins, guaranteeing metric consistency, and slashing token overhead by 65%.",
  },
  {
    id: "amber-prism",
    title: "amber Prism",
    tag: "LLM TRANSCRIPT PLATFORM · OPS INTELLIGENCE",
    category: "ai",
    role: "Architect & Builder · amber",
    tagline: "LLM-Powered Multi-Channel Transcript Analysis & Sales Pipeline Insights",
    problem:
      "Manual QA sampling covered only 30% of customer interactions, leaving critical quality blindspots, undiscovered objection patterns, and unmonitored lead churn across the global sales funnel.",
    solution:
      "Built an LLM-powered transcript intelligence platform ingesting omni-channel customer conversations (calls, WhatsApp, email, SMS) to extract objection themes, evaluate sales quality, and surface at-risk deals for 100+ daily active users across Sales, Ops, and Leadership.",
    metrics: [
      "100+ Daily Active Users (Sales, Ops, Leadership)",
      "30% → 90% audit coverage lift",
      "Real-time deal-risk & objection alerts",
    ],
    tech: ["LLM APIs (Claude / OpenAI)", "Python", "NLP", "Vector Embeddings", "n8n Webhooks", "PostgreSQL"],
    link: "https://amberstudent.com",
    tradeoff:
      "Structured multi-stage prompt extraction and vector intent clustering rather than monolithic context passing, ensuring high precision on deal-risk indicators while controlling per-transcript token latency.",
  },
  {
    id: "amber-radar",
    title: "amber Radar",
    tag: "COMMERCIAL B2B SAAS · MARKET INTELLIGENCE",
    category: "ai",
    role: "Product & ML Lead · amber",
    tagline: "Client-Facing Market Intelligence Product for Demand, Supply & Pricing Analysis",
    problem:
      "UK property management groups, PBSA operators, and institutional investors lacked dynamic visibility into localized student demand, real-time supply availability, and competitive pricing across university markets.",
    solution:
      "Built a commercial market intelligence product (Next.js, ML forecasting with Scikit-Learn/Python, automated daily ELT scrapers) delivering granular supply/demand analytics, competitor price benchmarking, and predictive market forecasts.",
    metrics: [
      "$30k ARR Generated",
      "50+ UK Property Groups & Investors",
      "Research cycles: weeks → sub-minute",
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
      "Decoupled high-frequency web scrapers and ML scoring pipelines from customer-facing serving via S3 staging and pre-aggregated warehouse views, ensuring sub-second dashboard latency for enterprise clients.",
  },
  {
    id: "plectrum",
    title: "plectrum.live & PlectrumLabs",
    tag: "AUDIO SYSTEMS & WEB PLATFORM",
    category: "audio",
    role: "Founder & Systems Engineer",
    tagline: "Browser Audio Suite + 5 Native C++17/JUCE 8 Desktop DSP Plugins",
    problem:
      "Music producers face expensive commercial licensing and high cloud latency for essential audio tools like mastering, pitch-to-MIDI, stem separation, and scale training.",
    solution:
      "Built plectrum.live with client-side ML (TensorFlow.js, ONNX Runtime Web, Tone.js) plus a family of 5 native C++17/JUCE 8 desktop products (PluckMaster 7-stage DSP, PluckBoard, PluckNote, PluckStem, Splectrum).",
    metrics: [
      "18+ browser audio tools ($0 compute)",
      "5 native desktop products (AU/VST3)",
      "Sub-ms latency local DSP",
    ],
    tech: ["Next.js 16", "C++17", "JUCE 8", "ONNX Runtime Web", "TensorFlow.js", "Docker"],
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
      "Executed browser ML via ONNX Runtime Web and Web Audio API rather than server-side inference, achieving zero server compute costs with sub-millisecond local DSP.",
  },
];

const FlagshipCard = ({ project }: { project: Project }) => {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const images = project.images || [];
  const currentImg = images[activeImgIdx];

  return (
    <article className="flagship-card" id={project.id}>
      {/* Background Creative Animation: Pure Ocean Swell & Rolling Waves */}
      {project.id === "amber-ocean" && (
        <div className="ocean-wave-container" aria-hidden="true">
          <div className="ocean-ambient-tide"></div>
          <div className="ocean-svg-wrap">
            <svg className="ocean-wave-svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <defs>
                <linearGradient id="oceanBackGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.25" />
                  <stop offset="60%" stopColor="#0d9488" stopOpacity="0.10" />
                  <stop offset="100%" stopColor="#042f2e" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="oceanFrontGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
                  <stop offset="40%" stopColor="#14b8a6" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#022c22" stopOpacity="0" />
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
              <span>{metric}</span>
            </div>
          ))}
        </div>

        {/* Streamlined Architecture & Trade-Off Box (No Nested Clutter) */}
        <div className="project-summary-box">
          <div className="summary-line">
            <span className="summary-label">ARCHITECTURE</span>
            <p className="summary-text">{project.solution}</p>
          </div>
          {project.tradeoff && (
            <div className="summary-line summary-tradeoff">
              <span className="summary-label">DECISION &amp; TRADE-OFF</span>
              <p className="summary-text">{project.tradeoff}</p>
            </div>
          )}
        </div>

        {/* Compact Pipeline Ribbon for Ocean */}
        {project.id === "amber-ocean" && (
          <div className="system-flow-box">
            <div className="system-flow-header">
              <div className="flow-badge-wrap">
                <span className="flow-pulse-dot"></span>
                <span className="flow-badge">AGENTIC ANALYTICS HARNESS</span>
              </div>
              <span className="flow-latency">&lt;$100 / 15k sessions · &lt;$0.01/query</span>
            </div>
            <div className="flow-steps">
              <div className="flow-step">
                <span className="step-num">01</span>
                <span className="step-label">Business Inquiry</span>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <span className="step-num">02</span>
                <span className="step-label">Semantic Layer</span>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <span className="step-num">03</span>
                <span className="step-label">Skills &amp; MCP</span>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <span className="step-num">04</span>
                <span className="step-label">SQL, Charts &amp; RCAs</span>
              </div>
            </div>
          </div>
        )}

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
              <span>Live Site</span>
              <MdArrowOutward />
            </a>
          )}
        </div>
      </div>

      {/* Media Column */}
      <div className="flagship-media">
        {/* Case 1: amber-prism — Custom Refractive Prism Visual */}
        {project.id === "amber-prism" ? (
          <div className="prism-refraction-mockup" aria-label="amber Prism Communication Refraction Engine">
            <div className="browser-bar">
              <div className="browser-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="browser-address">prism.amberstudent.com · QA REFRACTION ENGINE</div>
            </div>

            <div className="prism-stage">
              {/* Incoming White Raw Transcript Stream */}
              <div className="prism-incoming-stream">
                <span className="prism-stage-tag">RAW TRANSCRIPT DATA</span>
                <div className="stream-data-lines">
                  <span className="stream-line">call_audio_492.wav</span>
                  <span className="stream-line">wa_session_8812.json</span>
                  <span className="stream-line">ticket_escalation.eml</span>
                </div>
                <div className="stream-beam-guide"></div>
              </div>

              {/* Central Geometric Glass Prism */}
              <div className="prism-core-wrap">
                <svg className="prism-svg" viewBox="0 0 100 90" fill="none">
                  <polygon
                    points="50,10 8,82 92,82"
                    className="prism-poly-outer"
                  />
                  <polygon
                    points="50,20 18,76 82,76"
                    className="prism-poly-inner"
                  />
                </svg>
                <span className="prism-core-label">LLM Core</span>
              </div>

              {/* Refracted Outgoing Multi-Channel Rays */}
              <div className="prism-refracted-rays">
                <div className="channel-ray ray-calls">
                  <div className="ray-line"></div>
                  <div className="ray-pill">
                    <span className="ray-dot"></span>
                    <span className="ray-label">VOICE CALLS (90% AUDIT)</span>
                  </div>
                </div>
                <div className="channel-ray ray-whatsapp">
                  <div className="ray-line"></div>
                  <div className="ray-pill">
                    <span className="ray-dot"></span>
                    <span className="ray-label">WHATSAPP CHATS</span>
                  </div>
                </div>
                <div className="channel-ray ray-email">
                  <div className="ray-line"></div>
                  <div className="ray-pill">
                    <span className="ray-dot"></span>
                    <span className="ray-label">CUSTOMER EMAIL</span>
                  </div>
                </div>
                <div className="channel-ray ray-sms">
                  <div className="ray-line"></div>
                  <div className="ray-pill">
                    <span className="ray-dot"></span>
                    <span className="ray-label">SMS DEAL ALERTS</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="prism-hud-footer">
              <span className="hud-status-ping"></span>
              <span>REAL-TIME MULTI-DIMENSIONAL INTENT CLASSIFICATION · N8N RISK WEBHOOKS</span>
            </div>
          </div>
        ) : (
          /* Case 2: Browser Mockup for Ocean, Radar, and Plectrum */
          currentImg && (
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
                  alt={`${project.title} — ${currentImg.label}`}
                  width={800}
                  height={500}
                  loading="lazy"
                  decoding="async"
                  className="media-img"
                />

                {/* Radar Overlay: 360° Circular Sweep HUD */}
                {project.id === "amber-radar" && (
                  <div className="radar-sweep-overlay" aria-hidden="true">
                    <div className="radar-screen">
                      <div className="radar-ring radar-ring-1"></div>
                      <div className="radar-ring radar-ring-2"></div>
                      <div className="radar-ring radar-ring-3"></div>
                      <div className="radar-crosshair-h"></div>
                      <div className="radar-crosshair-v"></div>
                      <div className="radar-sweep-beam"></div>
                      <div className="radar-blip blip-1" title="Market Price Delta"></div>
                      <div className="radar-blip blip-2" title="Student Housing Demand"></div>
                      <div className="radar-blip blip-3" title="Forecast Dynamic Node"></div>
                    </div>
                    <div className="radar-hud-tag">
                      <span className="radar-live-beacon"></span>
                      <span>360° MARKET RADAR SWEEP · ML FORECAST R² 0.94</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
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
        <div className="section-header-tag">01 / PRODUCTION SYSTEMS</div>

        <div className="work-header">
          <div className="work-title-wrap">
            <h2 className="work-title">
              Shipped Systems &amp; <span className="text-accent">Production AI</span>
            </h2>
            <p className="work-subtitle">
              A curated showcase of deployed AI products, enterprise platforms, and native DSP software. No redundant filler—inspect system architecture, verified production impact, and live code below.
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
              Applied AI &amp; NLP (3)
            </button>
            <button
              className={`filter-tab ${selectedFilter === "audio" ? "filter-tab-active" : ""}`}
              onClick={() => setSelectedFilter("audio")}
              data-cursor="disable"
            >
              Audio DSP &amp; Native (1)
            </button>
          </div>
        </div>

        {/* Flagship Production Grid */}
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
