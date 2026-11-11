import { useState } from "react";
import { MdCheckCircle, MdLocationOn } from "react-icons/md";
import "./styles/Career.css";

interface CareerItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  statusBadge?: string;
  summary: string;
  achievements: string[];
  takeaway: string;
  skills: string[];
}

const careerHistory: CareerItem[] = [
  {
    id: "amber",
    role: "Lead, Data & Analytics (+ AI Data Products)",
    company: "amber",
    location: "Pune, India",
    period: "May 2025 to Present",
    statusBadge: "Current Leadership",
    summary:
      "Leading data intelligence and architecting production AI data products across ed-tech housing operations and commercial research.",
    achievements: [
      "Directed the productization of amber's AI suite (Ocean, Radar, Prism), converting analyst bottlenecks into self-serve tooling.",
      "Trimmed AWS Redshift spend by $600/month (-2 nodes) and saved $40,000+/year migrating 120 seats to self-hosted Apache Superset.",
      "Orchestrated automated daily ELT scraper pipelines and S3 staging with Docker and Jenkins for zero-downtime market research.",
    ],
    takeaway:
      "ELT > ETL. Building pipelines that quietly do their job every day without drama is the highest compliment a pipeline can get.",
    skills: ["AI Data Products", "Semantic Layer", "Custom MCP", "AWS Redshift", "Superset", "Next.js", "Docker", "Jenkins"],
  },
  {
    id: "turing",
    role: "Lead Business Analyst & Business Analyst",
    company: "Turing",
    location: "Palo Alto, Remote",
    period: "Nov 2024 to May 2025",
    summary:
      "Led analytics and QA team driving process efficiency and frontier enterprise LLM alignment programs.",
    achievements: [
      "Conducted 100+ prompt engineering and RLHF annotations across multimodal projects for the public MMMU benchmark.",
      "Engineered detection models for AI-generated vs human-generated content to protect dataset integrity against model collapse.",
      "Automated feedback categorization using spaCy and NLTK, accelerating contributor QA loops by 3x across multimodal prompt evaluations.",
    ],
    takeaway:
      "Rigorous evaluation harnesses and high-quality alignment data are what separate fragile demos from production systems.",
    skills: ["RLHF", "MMMU Benchmark", "Prompt Engineering", "NLP (spaCy, NLTK)", "Looker Studio", "QA Systems"],
  },
  {
    id: "5x",
    role: "Associate Product Manager",
    company: "5X Data",
    location: "Singapore, Remote",
    period: "Oct 2023 to Sep 2024",
    summary:
      "Spearheaded agile product engineering across data apps, usage billing, and enterprise access governance.",
    achievements: [
      "Engineered in-house usage metering and billing microservices in PostgreSQL/Redis, removing vendor lock-in and saving $2,000/month.",
      "Implemented enterprise identity and access management (IAM / SSO) solutions, unlocking $10,000/month in contract expansions.",
      "Built API-first data engineering SaaS that generated $20,000/month in recurring enterprise revenue.",
    ],
    takeaway:
      "Treating internal developers with the same product empathy as external customers is the secret to building high-leverage data platforms.",
    skills: ["Product Strategy", "Usage-Based Billing", "Enterprise IAM", "Streamlit", "PostgreSQL", "REST APIs"],
  },
  {
    id: "crimson",
    role: "Associate Product Manager",
    company: "Crimson AI",
    location: "Mumbai, India",
    period: "Jan 2023 to Apr 2023",
    summary:
      "Drove product discovery, roadmap, and performance engineering for AI-assisted writing tools.",
    achievements: [
      "Optimized LiteDB index structures and grammar card grouping, cutting Trinka AI Word Add-in document load latency by 40%.",
      "Created Amplitude analytics funnels and dashboards driving +20% engagement MoM and +15% user retention.",
    ],
    takeaway:
      "In client-facing AI applications, local query latency is the difference between daily habitual usage and immediate churn.",
    skills: ["LiteDB", "Word Add-in", "Amplitude Analytics", "User Research", "Browser Plugins", "Query Tuning"],
  },
  {
    id: "junglee",
    role: "Product Analyst",
    company: "Junglee Games",
    location: "Gurugram, India",
    period: "Jun 2021 to Nov 2022",
    summary:
      "Delivered real-time gaming analytics, GTM funnels, and marketing automation microservices.",
    achievements: [
      "Executed GTM funnels for Poker launch, achieving ₹1.2 lakh daily revenue in 18 days (~5%/day growth).",
      "Architected real-time anomaly detection pipelines over transaction logs, reducing double-spend discovery latency from 24h to <60s.",
    ],
    takeaway:
      "A good reward system and a bad reward system look identical until you check the retention numbers three weeks later.",
    skills: ["Tableau BI", "Microservices", "A/B Testing", "GTM Execution", "Anomaly Detection", "SQL Automation"],
  },
  {
    id: "bits",
    role: "Dual Degree Scholar",
    company: "BITS Pilani (Goa Campus)",
    location: "Goa, India",
    period: "Aug 2015 to May 2021",
    summary:
      "5-Year Integrated Dual Degree: B.E. Chemical Engineering + M.Sc. Chemistry with a Minor in Accounting & Finance.",
    achievements: [
      "Process optimization, thermodynamics, and mass transfer dynamics mapped directly into distributed data architectures: tracking state, bottlenecks, and transformations.",
      "Finance Minor Capstone: Python correlation models evaluating capital investments across 15 financial institutions.",
    ],
    takeaway:
      "Physical chemical engineering principles teach respect for immutable constraints, mass conservation, and system efficiency.",
    skills: ["Chemical Engineering", "Chemistry", "Financial Modeling", "Python Analytics", "Process Dynamics"],
  },
];

const Career = () => {
  const [activeId, setActiveId] = useState<string>("amber");

  const activeMilestone =
    careerHistory.find((item) => item.id === activeId) || careerHistory[0];

  return (
    <section className="career-section" id="career">
      <div className="section-container">
        <div className="career-header">
          <h2 className="career-title">
            Career Flightpath: <span className="text-accent">Process to Production AI</span>
          </h2>
          <p className="career-subtitle">
            From BITS Pilani dual degrees to leading Data &amp; AI Products at amber. Select a milestone to inspect deliverables and architecture impact.
          </p>
        </div>

        <div className="career-layout">
          {/* Timeline Milestones Navigation */}
          <div className="career-timeline-nav" role="tablist" aria-label="Career Milestones">
            {careerHistory.map((item) => {
              const isActive = item.id === activeId;
              return (
                <button
                  key={item.id}
                  className={`timeline-milestone-btn ${isActive ? "active-milestone" : ""}`}
                  onClick={() => setActiveId(item.id)}
                  data-cursor="disable"
                  role="tab"
                  aria-selected={isActive}
                >
                  <div className="milestone-indicator">
                    <span className="milestone-dot"></span>
                    <span className="milestone-line"></span>
                  </div>

                  <div className="milestone-meta">
                    <div className="milestone-company-wrap">
                      <span className="milestone-company">{item.company}</span>
                      {item.statusBadge && (
                        <span className="milestone-badge">{item.statusBadge}</span>
                      )}
                    </div>
                    <span className="milestone-role-short">{item.role}</span>
                    <span className="milestone-period num">{item.period}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Inspector View */}
          <div className="career-detail-panel">
            <div className="panel-inner">
              <div className="panel-header">
                <div className="panel-role-group">
                  <h3 className="panel-role">{activeMilestone.role}</h3>
                  <div className="panel-company-row">
                    <span className="panel-company">{activeMilestone.company}</span>
                    <span className="panel-location">
                      <MdLocationOn />
                      {activeMilestone.location}
                    </span>
                    <span className="panel-period-tag num">{activeMilestone.period}</span>
                  </div>
                </div>
              </div>

              <p className="panel-summary">{activeMilestone.summary}</p>

              <div className="panel-achievements">
                <span className="panel-subhead">Core Deliverables &amp; Impact</span>
                <ul className="achievements-list">
                  {activeMilestone.achievements.map((ach, idx) => (
                    <li key={idx}>
                      <MdCheckCircle className="ach-check" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="panel-takeaway">
                <span className="takeaway-label">Signature Takeaway</span>
                <p className="takeaway-text">“{activeMilestone.takeaway}”</p>
              </div>

              <div className="panel-skills">
                <span className="skills-label">Domains &amp; Systems</span>
                <div className="skills-chip-row">
                  {activeMilestone.skills.map((skill, idx) => (
                    <span className="career-skill-chip" key={idx}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Career;
