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
    tag: "AI DATA PRODUCT · TEXT-TO-SQL",
    category: "ai",
    role: "Architect & Lead Builder · amber",
    tagline: "In-House Text-to-SQL Harness with Semantic Layer & Custom MCP",
    problem:
      "Business stakeholders across product, marketing, and operations were bottlenecked waiting for data analysts to write ad-hoc SQL queries and build custom charts.",
    solution:
      "Devised and built a natural-language AI data harness powered by our centralized Semantic Layer, intelligent agentic routing, and custom MCP server over AWS Redshift.",
    metrics: [
      "< $100 per 15k sessions",
      "3,000+ queries (<$30 compute)",
      "80%+ ad-hoc backlog cut",
    ],
    tech: ["Ollama", "Python", "Semantic Layer", "Custom MCP", "AWS Redshift", "n8n"],
    images: [
      {
        label: "amber Ocean Dashboard",
        src: "/images/ocean.webp",
        host: "ocean.amberstudent.com",
      },
    ],
    link: "https://amberstudent.com",
    tradeoff:
      "Built a centralized Semantic Layer rather than raw LLM prompt-to-SQL. Standardized business metrics, eliminated hallucinated column references, and cut token consumption by 65%.",
  },
  {
    id: "amber-prism",
    title: "amber Prism",
    tag: "NLP & OPERATIONS INTELLIGENCE",
    category: "ai",
    role: "Architect & Builder · amber",
    tagline: "Operations Quality Audit & Multi-Channel Transcript NLP Engine",
    problem:
      "Auditing thousands of customer call transcripts and chat logs manually was impossible, creating major quality blindspots and unmonitored drop-offs in the sales funnel.",
    solution:
      "Engineered an automated communication transcript pipeline that ingests raw streams across voice calls, WhatsApp, email, and SMS, extracts intent vectors, and triggers real-time operational workflows.",
    metrics: [
      "100% automated transcript QA",
      "Real-time n8n risk alerts",
      "$1,500/mo saved via Ollama",
    ],
    tech: ["Python", "NLP", "Ollama LLM", "Vector Analysis", "n8n Automations", "Webhooks"],
    link: "https://amberstudent.com",
    tradeoff:
      "Employed local Ollama inference on dedicated instances for high-throughput batch classification, saving $1,500/month in cloud API costs while enforcing strict customer data privacy.",
  },
  {
    id: "amber-radar",
    title: "amber Radar",
    tag: "COMMERCIAL B2B SAAS · ML FORECASTING",
    category: "ai",
    role: "Product & ML Lead · amber",
    tagline: "Revenue-Generating Market Research & Predictive Pricing Platform",
    problem:
      "Global student housing operators and university partners required accurate forecasts of international student demand, room availability, and dynamic pricing across key markets.",
    solution:
      "Architected an end-to-end commercial intelligence SaaS combining automated daily ELT scrapers, machine learning predictive models, and an interactive Next.js application.",
    metrics: [
      "Commercial revenue B2B SaaS",
      "Research cycles: weeks → mins",
      "Automated global inventory ingestion",
    ],
    tech: ["Next.js", "Scikit-Learn", "Python", "Automated ELT", "AWS S3 / Redshift"],
    images: [
      {
        label: "amber Radar Intelligence",
        src: "/images/radar.webp",
        host: "radar.amberstudent.com",
      },
    ],
    link: "https://amberstudent.com",
    tradeoff:
      "Decoupled daily scraper ingestion pipelines from customer-facing serving through S3 staging and automated ELT, guaranteeing high dashboard responsiveness with 0 downtime.",
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
      {/* Background Creative Animation: Ambient Data Tide for amber Ocean */}
      {project.id === "amber-ocean" && (
        <div className="ocean-data-wave" aria-hidden="true">
          <div className="wave-track wave-track-1">
            <span>010101 SELECT id, SUM(rev) FROM telemetry WHERE latency &lt; 50ms · &lt;$100/15k · REDSHIFT_QUERY_OK · </span>
            <span>010101 SELECT id, SUM(rev) FROM telemetry WHERE latency &lt; 50ms · &lt;$100/15k · REDSHIFT_QUERY_OK · </span>
          </div>
          <div className="wave-track wave-track-2">
            <span>101010 AST_VALIDATED · SEMANTIC_LAYER_RESOLVED · CACHE_HIT · TOKENS_OPTIMIZED_65% · </span>
            <span>101010 AST_VALIDATED · SEMANTIC_LAYER_RESOLVED · CACHE_HIT · TOKENS_OPTIMIZED_65% · </span>
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
                <span className="flow-badge">TEXT-TO-SQL PIPELINE HARNESS</span>
              </div>
              <span className="flow-latency">&lt;$100 / 15k sessions</span>
            </div>
            <div className="flow-steps">
              <div className="flow-step">
                <span className="step-num">01</span>
                <span className="step-label">Natural Prompt</span>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <span className="step-num">02</span>
                <span className="step-label">Semantic Layer</span>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <span className="step-num">03</span>
                <span className="step-label">Custom MCP</span>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">
                <span className="step-num">04</span>
                <span className="step-label">AWS Redshift</span>
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
                <span className="prism-core-label">Ollama NLP</span>
              </div>

              {/* Refracted Outgoing Multi-Channel Rays */}
              <div className="prism-refracted-rays">
                <div className="channel-ray ray-calls">
                  <div className="ray-line"></div>
                  <div className="ray-pill">
                    <span className="ray-dot"></span>
                    <span className="ray-label">VOICE CALLS (100% QA)</span>
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
