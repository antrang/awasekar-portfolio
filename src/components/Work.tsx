import { useState } from "react";
import { MdArrowOutward, MdCheckCircle } from "react-icons/md";
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
  category: "ai" | "fullstack" | "audio";
  role: string;
  tagline: string;
  problem: string;
  solution: string;
  metrics: string[];
  tech: string[];
  images?: ProjectImage[];
  link?: string;
  isFlagship?: boolean;
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
      "Devised and built a natural-language AI data harness powered by our centralized Semantic Layer, intelligent agentic routing, and a custom MCP server over the analytics warehouse.",
    metrics: [
      "< $100 per 15,000 user sessions via strict token and model routing optimizations",
      "3,000+ production queries processed with near-zero compute overhead (~$30)",
      "Eliminated 80%+ of ad-hoc SQL backlog across company departments",
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
    isFlagship: true,
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
      "Architected an end-to-end market intelligence platform combining automated daily ELT scrapers, machine learning predictive models, and an interactive Next.js application.",
    metrics: [
      "Revenue-generating B2B SaaS licensed by international accommodation providers",
      "Compressed research and reporting cycles from several weeks to minutes",
      "Automated daily ingestion of inventory, competitor prices, and market shifts",
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
    isFlagship: true,
  },
  {
    id: "amber-prism",
    title: "amber Prism",
    tag: "NLP & OPERATIONS INTELLIGENCE",
    category: "ai",
    role: "Architect & Builder · amber",
    tagline: "Operations Quality Audit & Sales Pipeline Transcript NLP Engine",
    problem:
      "Auditing thousands of customer call transcripts and chat logs manually was impossible, creating major quality blindspots and unmonitored drop-offs in the sales funnel.",
    solution:
      "Engineered an automated communication transcript analysis pipeline that extracts multi-dimensional intent, flags high-risk deals, and triggers real-time operational workflows.",
    metrics: [
      "100% automated transcript QA coverage across the global sales pipeline",
      "Automated deal-risk notifications routed via n8n multi-channel webhooks",
      "Continuous feedback loops integrated into sales enablement and QA",
    ],
    tech: ["Python", "NLP", "Ollama LLM", "Vector Analysis", "n8n Automations"],
    link: "https://amberstudent.com",
    isFlagship: true,
  },
  {
    id: "plectrum",
    title: "plectrum.live & PlectrumLabs",
    tag: "AUDIO SYSTEMS & WEB PLATFORM",
    category: "audio",
    role: "Founder & Systems Engineer",
    tagline: "Browser Audio Platform + 5 Native C++17/JUCE 8 Desktop DSP Plugins",
    problem:
      "Music producers face expensive commercial licensing and high cloud latency for essential audio tools like mastering, pitch-to-MIDI, stem separation, and scale training.",
    solution:
      "Built plectrum.live with client-side ML (TensorFlow.js, ONNX Runtime Web, Tone.js) plus a family of 5 native C++17/JUCE 8 desktop products (PluckMaster 7-stage DSP, PluckBoard, PluckNote pitch-to-MIDI, PluckStem, Splectrum 3D panner).",
    metrics: [
      "18+ browser audio tools running client-side with $0 server-side ML compute",
      "5 native desktop audio products shipped with signed .dmg and AU/VST3 plugins",
      "Sub-millisecond latency local DSP running on macOS and Windows",
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
    isFlagship: true,
  },
  {
    id: "5x-data",
    title: "5X Data Platform",
    tag: "ENTERPRISE SAAS & DATA APPS",
    category: "fullstack",
    role: "Associate Product Manager · 5X Data",
    tagline: "Customizable Streamlit Data Apps, Billing & Enterprise IAM",
    problem:
      "Enterprise data teams struggled with rigid third-party billing integrations, complex identity access governance, and slow custom dashboard development.",
    solution:
      "Spearheaded 15+ features, 5 revamps, and 2 full products; launched an in-house usage billing system, enterprise IAM solutions, and an API-first data engineering SaaS.",
    metrics: [
      "$20,000/month in new enterprise revenue from API-first data SaaS",
      "$10,000/month added revenue from enterprise IAM rollout",
      "$2,000/month saved by eliminating third-party billing dependencies",
      "+50% forecast accuracy improvement on revamped Utilization page",
    ],
    tech: ["Streamlit", "REST APIs", "Usage Billing", "Enterprise IAM", "PostgreSQL"],
    images: [
      {
        label: "5X Data Apps",
        src: "/images/5x.webp",
        host: "app.5x.co",
      },
    ],
    link: "https://5x.co",
    isFlagship: false,
  },
  {
    id: "junglee-games",
    title: "Junglee Games Analytics Suite",
    tag: "REAL-MONEY GAMING & GTM",
    category: "fullstack",
    role: "Product Analyst · Junglee Games",
    tagline: "GTM Revenue Launch, Retention Microservices & Tableau BI",
    problem:
      "Real-money gaming requires immediate fraud mitigation, sub-second conversion monitoring, and habit-forming retention systems to prevent churn.",
    solution:
      "Designed and executed GTM on-boarding funnels for Poker launch, built a goal-based reward microservice, and orchestrated real-time alerts for double-spends and system failures.",
    metrics: [
      "₹1.2 lakh daily revenue achieved within 18 days of Poker launch (~5% daily growth)",
      "+20% weekly average user reactivation via goal-based reward microservice",
      "+10% lift in 30-day player retention",
    ],
    tech: ["Tableau BI", "Microservices", "SQL Automation", "A/B Testing", "Python"],
    images: [
      {
        label: "Junglee Analytics",
        src: "/images/junglee.webp",
        host: "analytics.jungleegames.internal",
      },
    ],
    link: "https://jungleegames.com",
    isFlagship: false,
  },
  {
    id: "turing-ai",
    title: "Turing Enterprise AI / RLHF",
    tag: "MODEL EVALUATION & RLHF",
    category: "ai",
    role: "Lead Business Analyst · Turing",
    tagline: "RLHF Multimodal Evaluation & AI Content Detection",
    problem:
      "Frontier AI models required rigorous human-in-the-loop alignment, multimodal benchmarking, and automated detection of machine-generated plagiarism.",
    solution:
      "Conducted 100+ prompt engineering and RLHF annotations for the MMMU benchmark, built AI-vs-human content classifiers, and automated feedback categorization using NLP.",
    metrics: [
      "100+ verified RLHF evaluations contributing to the public MMMU benchmark",
      "Automated NLP feedback categorization using NLTK and spaCy",
      "Cross-functional Looker Studio dashboards for QA and process efficiency",
    ],
    tech: ["Python", "NLP (spaCy, NLTK)", "RLHF", "MMMU Benchmark", "Looker Studio"],
    isFlagship: false,
  },
  {
    id: "crimson-ai",
    title: "Crimson AI (Trinka AI / Enago)",
    tag: "AI PRODUCTIVITY & EXTENSIONS",
    category: "fullstack",
    role: "Associate Product Manager · Crimson AI",
    tagline: "AI Writing Assistant & Research Workflow Optimization",
    problem:
      "Trinka AI Word Add-in suffered from slow document load times when analyzing large academic manuscripts with thousands of grammar cards.",
    solution:
      "Implemented grammar card grouping and optimized LiteDB queries; accelerated Enago Reports web app and browser plugin from ideation to dev handoff within 1 month.",
    metrics: [
      "+40% faster document load time on Trinka AI Word Add-in",
      "+20% MoM feature engagement & +15% MoM user retention via Amplitude",
      "Ideation to developer handoff completed in <1 month",
    ],
    tech: ["LiteDB", "Word Add-in", "Amplitude Analytics", "Web & Plugins"],
    isFlagship: false,
  },
  {
    id: "hisp-india",
    title: "HISP India (COVID-19 Surveillance)",
    tag: "PUBLIC HEALTH DATA INFRASTRUCTURE",
    category: "fullstack",
    role: "Software Developer · HISP India",
    tagline: "National COVID-19 Surveillance & Healthcare Resource Geo-Tagging",
    problem:
      "During early COVID-19 outbreaks, public health officials lacked unified, real-time spatial visibility into hospital beds, ventilators, and medical inventory.",
    solution:
      "Conceived and developed geo-tagging modules for healthcare resources, wrangled heterogeneous datasets, and conducted end-to-end debugging to accelerate page load speeds.",
    metrics: [
      "+25% increase in application efficiency via data deduplication and wrangling",
      "-40% faster application load time via query and HTML optimization",
      "Real-time geo-mapping deployed for active health crisis surveillance",
    ],
    tech: ["Python", "SQL", "GIS / Geo-Tagging", "Query Optimization"],
    isFlagship: false,
  },
];

const FlagshipCard = ({ project }: { project: Project }) => {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const images = project.images || [];
  const currentImg = images[activeImgIdx];

  return (
    <article className={`flagship-card ${!images.length ? "flagship-card-textonly" : ""}`}>
      <div className="flagship-content">
        <div className="flagship-top">
          <span className="project-tag">{project.tag}</span>
          <span className="project-role">{project.role}</span>
        </div>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-tagline">{project.tagline}</p>

        <div className="flagship-narrative">
          <div className="narrative-block">
            <span className="narrative-label">PROBLEM</span>
            <p>{project.problem}</p>
          </div>
          <div className="narrative-block">
            <span className="narrative-label">ARCHITECTURE</span>
            <p>{project.solution}</p>
          </div>
        </div>

        <div className="metrics-box">
          <span className="metrics-heading">VERIFIED PRODUCTION IMPACT</span>
          <ul className="metrics-list">
            {project.metrics.map((metric, i) => (
              <li key={i}>
                <MdCheckCircle className="metric-check" />
                <span>{metric}</span>
              </li>
            ))}
          </ul>
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
              <span>Live Site</span>
              <MdArrowOutward />
            </a>
          )}
        </div>
      </div>

      {currentImg && (
        <div className="flagship-media">
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
                loading="lazy"
                className="media-img"
              />
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

const Work = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredProjects =
    selectedFilter === "all"
      ? allProjects
      : allProjects.filter((p) => p.category === selectedFilter);

  const flagships = filteredProjects.filter((p) => p.isFlagship);
  const secondary = filteredProjects.filter((p) => !p.isFlagship);

  return (
    <section className="work-section" id="work">
      <div className="section-container">
        <div className="section-header-tag">03 / PRODUCTION SYSTEMS</div>

        <div className="work-header">
          <div className="work-title-wrap">
            <h2 className="work-title">
              Shipped Systems &amp; <span className="text-accent">Production AI</span>
            </h2>
            <p className="work-subtitle">
              A comprehensive showcase of deployed AI products, enterprise platforms, and native DSP software. No carousel clicking required—explore the problem, architecture, verified metrics, and tech stacks below.
            </p>
          </div>

          <div className="filter-tabs" role="tablist" aria-label="Project Categories">
            <button
              className={`filter-tab ${selectedFilter === "all" ? "filter-tab-active" : ""}`}
              onClick={() => setSelectedFilter("all")}
              data-cursor="disable"
            >
              All Systems ({allProjects.length})
            </button>
            <button
              className={`filter-tab ${selectedFilter === "ai" ? "filter-tab-active" : ""}`}
              onClick={() => setSelectedFilter("ai")}
              data-cursor="disable"
            >
              Applied AI &amp; LLMs
            </button>
            <button
              className={`filter-tab ${selectedFilter === "fullstack" ? "filter-tab-active" : ""}`}
              onClick={() => setSelectedFilter("fullstack")}
              data-cursor="disable"
            >
              Full-Stack &amp; Systems
            </button>
            <button
              className={`filter-tab ${selectedFilter === "audio" ? "filter-tab-active" : ""}`}
              onClick={() => setSelectedFilter("audio")}
              data-cursor="disable"
            >
              Audio &amp; DSP
            </button>
          </div>
        </div>

        {/* Flagship Deep-Dives */}
        {flagships.length > 0 && (
          <div className="flagship-group">
            <div className="group-label">FLAGSHIP PRODUCTION SHOWCASE</div>
            <div className="flagship-grid">
              {flagships.map((project) => (
                <FlagshipCard project={project} key={project.id} />
              ))}
            </div>
          </div>
        )}

        {/* Secondary & Enterprise Systems Grid */}
        {secondary.length > 0 && (
          <div className="secondary-group">
            <div className="group-label">ENTERPRISE PLATFORMS &amp; SYSTEMS</div>
            <div className="secondary-grid">
              {secondary.map((project) => (
                <article className="secondary-card" key={project.id}>
                  <div className="secondary-top">
                    <span className="project-tag">{project.tag}</span>
                    <span className="project-role">{project.role}</span>
                  </div>

                  <h3 className="secondary-title">{project.title}</h3>
                  <p className="secondary-tagline">{project.tagline}</p>
                  <p className="secondary-desc">{project.solution}</p>

                  <div className="secondary-metrics">
                    {project.metrics.map((m, i) => (
                      <div className="sec-metric-item" key={i}>
                        <MdCheckCircle className="metric-check" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>

                  <div className="secondary-footer">
                    <div className="tech-chip-list">
                      {project.tech.map((t, i) => (
                        <span className="tech-chip-sm" key={i}>
                          {t}
                        </span>
                      ))}
                    </div>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="sec-link"
                        data-cursor="disable"
                      >
                        <MdArrowOutward />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Work;
