import { MdAutoAwesome, MdCode, MdStorage } from "react-icons/md";
import "./styles/WhatIDo.css";

const pillars = [
  {
    icon: <MdAutoAwesome />,
    tag: "PILLAR 01",
    title: "Applied AI & Agentic Systems",
    summary:
      "Engineering production-grade LLM applications, centralized semantic layers, and autonomous text-to-SQL harnesses that deliver reliable intelligence at scale.",
    deliverables: [
      "Text-to-SQL data harnesses with agentic routing & custom MCP servers",
      "Centralized Semantic Layer for consistent metric calculation across tools",
      "Cost-optimized LLM pipelines (<$100 per 15k user sessions on amber Ocean)",
      "Communication transcript NLP & QA auditing (amber Prism)",
      "Multimodal prompt engineering & RLHF evaluations (MMMU benchmark at Turing)",
    ],
    tech: ["Ollama", "Claude API", "Gemini", "Python", "Custom MCP", "n8n", "RAG & Evals"],
  },
  {
    icon: <MdCode />,
    tag: "PILLAR 02",
    title: "Production Software & Full-Stack",
    summary:
      "End-to-end product engineering from database schemas and streaming APIs to polished web interfaces and high-performance native desktop software.",
    deliverables: [
      "Modern full-stack web applications (Next.js 15/16, React, TypeScript)",
      "In-browser ML inference & audio tools (TensorFlow.js, ONNX Runtime Web)",
      "Native desktop C++17 & JUCE 8 audio DSP software (PluckMaster, PluckBoard)",
      "In-house automated billing management & enterprise IAM (5X Data)",
      "Performance optimization & sub-second load times",
    ],
    tech: ["Next.js", "React", "TypeScript", "C++17 / JUCE 8", "Node.js", "REST APIs", "Web Audio"],
  },
  {
    icon: <MdStorage />,
    tag: "PILLAR 03",
    title: "Data Systems & MLOps Infrastructure",
    summary:
      "High-throughput ELT pipelines, warehouse cluster optimization, and robust telemetry that guarantee data reliability and sub-second querying.",
    deliverables: [
      "Warehouse downsizing: cut 2 Redshift nodes, saving $600/month at amber",
      "BI migration: moved Tableau to self-hosted Superset, saving $10,000+/year",
      "Reduced average query runtimes by 30 mins via DMS & Metabase caching",
      "Daily automated ELT pipelines (APIs, scrapers, S3, ECR, EC2, Jenkins)",
      "Self-healing telemetry & alerting for zero-downtime operation",
    ],
    tech: ["AWS Redshift", "Snowflake", "PostgreSQL", "Apache Superset", "AWS S3 / ECR / EC2", "Docker", "Jenkins"],
  },
];

const WhatIDo = () => {
  return (
    <section className="pillars-section" id="pillars">
      <div className="section-container">
        <div className="section-header-tag">02 / CORE CAPABILITIES</div>

        <div className="pillars-header">
          <h2 className="pillars-title">
            Systems Architecture &amp; <span className="text-accent">Applied Engineering</span>
          </h2>
          <p className="pillars-subtitle">
            I don't just write scripts or train toys—I architect, ship, and operate production-grade software that generates measurable business leverage.
          </p>
        </div>

        <div className="pillars-grid">
          {pillars.map((pillar, idx) => (
            <div className="pillar-card" key={idx}>
              <div className="pillar-top">
                <div className="pillar-icon">{pillar.icon}</div>
                <span className="pillar-tag">{pillar.tag}</span>
              </div>

              <h3 className="pillar-card-title">{pillar.title}</h3>
              <p className="pillar-summary">{pillar.summary}</p>

              <div className="pillar-deliverables-wrap">
                <span className="deliverables-heading">Core Systems Shipped</span>
                <ul className="pillar-deliverables">
                  {pillar.deliverables.map((item, itemIdx) => (
                    <li key={itemIdx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="pillar-tech-wrap">
                {pillar.tech.map((tool, toolIdx) => (
                  <span className="tech-chip" key={toolIdx}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
