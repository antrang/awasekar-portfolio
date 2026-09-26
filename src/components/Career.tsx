import { useState } from "react";
import { MdCheckCircle, MdLocationOn } from "react-icons/md";
import "./styles/Career.css";

interface CareerItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
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
    role: "Lead — Data & Analytics (+ AI Data Products)",
    company: "amber",
    companyUrl: "https://amberstudent.com",
    location: "Pune, India",
    period: "May 2025 – Present",
    statusBadge: "CURRENT LEADERSHIP",
    summary:
      "Leading data intelligence and architecting production AI Data Products across ed-tech student housing operations and commercial research.",
    achievements: [
      "Devised and built amber Ocean: Text-to-SQL harness with Semantic Layer & custom MCP (<$100 / 15k sessions)",
      "Developed amber Radar: revenue-generating predictive market intelligence platform using ML forecasting & Next.js",
      "Built amber Prism: communication transcript NLP engine automating 100% of sales QA audits",
      "Trimmed Redshift cluster costs by $600/month (freed 2 nodes) & reduced avg query time by 30 minutes",
      "Migrated Tableau dashboards to self-hosted Apache Superset, saving $10,000+/year with 25% faster rendering",
      "Automated multi-channel reporting using Python, Ollama LLM insights, and n8n workflow triggers",
    ],
    takeaway:
      "Building pipelines that quietly do their job every day without anyone noticing is the highest compliment a pipeline can get. ELT >>> ETL.",
    skills: ["AI Data Products", "Semantic Layer", "Custom MCP", "AWS Redshift", "Superset", "Next.js", "Ollama", "n8n"],
  },
  {
    id: "turing",
    role: "Lead Business Analyst & Business Analyst",
    company: "Turing",
    location: "Palo Alto, Remote",
    period: "Nov 2024 – May 2025",
    summary:
      "Led analytics & QA team driving business quality, process efficiency, and enterprise LLM alignment programs.",
    achievements: [
      "Conducted 100+ prompt engineering and RLHF annotations across multimodal projects for the MMMU benchmark",
      "Engineered detection model for AI-generated vs human-generated content to reduce AI plagiarism",
      "Automated feedback categorization using NLP (NLTK, spaCy) for business process optimization",
      "Built cross-functional Looker Studio dashboards tracking contributor and model performance",
    ],
    takeaway:
      "Rigorous evaluation harnesses and high-quality alignment data are what separate fragile LLM demos from production systems.",
    skills: ["RLHF", "MMMU Benchmark", "Prompt Engineering", "NLP (spaCy, NLTK)", "Looker Studio"],
  },
  {
    id: "5x",
    role: "Associate Product Manager",
    company: "5X Data",
    companyUrl: "https://5x.co",
    location: "Singapore, Remote",
    period: "Oct 2023 – Sep 2024",
    summary:
      "Spearheaded end-to-end agile product engineering across data apps, usage billing, and enterprise access governance.",
    achievements: [
      "Launched 15+ new features, 5 revamps, and 2 full products end-to-end",
      "Developed in-house usage-based billing system, eliminating third-party dependencies and saving $2,000/month",
      "Implemented enterprise user identity & access management (IAM) solutions, boosting revenue by $10,000/month",
      "Built API-first data engineering SaaS that generated $20,000/month from enterprise clients",
      "Revamped Utilization page and prediction models, improving forecast accuracy by >50%",
    ],
    takeaway:
      "Treating internal developers with the same product empathy as external customers is the secret to building high-leverage data platforms.",
    skills: ["Product Strategy", "Usage-Based Billing", "Enterprise IAM", "Streamlit", "REST APIs"],
  },
  {
    id: "crimson",
    role: "Associate Product Manager",
    company: "Crimson AI",
    location: "Mumbai, India",
    period: "Jan 2023 – Apr 2023",
    summary:
      "Drove product discovery, roadmap, and performance engineering for AI-assisted writing and research tools.",
    achievements: [
      "Optimized LiteDB queries and implemented grammar card grouping, cutting Trinka AI Word Add-in load time by 40%",
      "Accelerated ideation, documentation, and stakeholder alignment for Enago Reports web app and browser plugin in <1 month",
      "Created Amplitude analytics dashboards driving +20% engagement MoM, +8% conversion, and +15% retention",
    ],
    takeaway:
      "In client-facing AI applications, local query latency is the difference between daily habitual usage and immediate churn.",
    skills: ["LiteDB", "Word Add-in", "Amplitude Analytics", "User Research", "Browser Plugins"],
  },
  {
    id: "junglee",
    role: "Product Analyst",
    company: "Junglee Games",
    companyUrl: "https://jungleegames.com",
    location: "Gurugram, India",
    period: "Jun 2021 – Nov 2022",
    summary:
      "Delivered real-time gaming analytics, GTM funnels, marketing automation, and retention microservices.",
    achievements: [
      "Executed GTM funnels for Poker launch, achieving ₹1.2 lakh daily revenue in 18 days (~5%/day growth)",
      "Ideated and built goal-based reward microservice: improved player reactivation by 20% weekly and retention by 10%",
      "Automated alerts for double-spends and system failure, significantly slashing incident response time",
      "Shipped 5 features in marketing automation tool (A/B testing outlier filter, in-app notifications, scratch cards)",
    ],
    takeaway:
      "A good reward system and a bad reward system look identical until you check the retention numbers three weeks later.",
    skills: ["Tableau BI", "Microservices", "A/B Testing", "GTM Execution", "SQL Automation"],
  },
  {
    id: "aditya-birla",
    role: "Research & Development Intern",
    company: "Aditya Birla Chemicals",
    location: "Harihara, India",
    period: "Jan 2021 – Jun 2021",
    summary:
      "6-month industrial Practice School rotation from BITS Pilani focused on analytical chemistry and process optimization.",
    achievements: [
      "Conducted chemical instrumentation, mass balances, and yield optimization protocols in production facilities",
      "Completed rigorous industrial internship before dual-degree conferment",
    ],
    takeaway:
      "Physical chemical engineering teaches you respect for immutable constraints, mass conservation, and system efficiency.",
    skills: ["Process Dynamics", "Industrial R&D", "Data Analysis"],
  },
  {
    id: "hisp",
    role: "Software Developer",
    company: "HISP India",
    location: "Noida, India",
    period: "Sep 2020 – Dec 2020",
    summary:
      "Built geo-spatial health data infrastructure during the initial nationwide COVID-19 response.",
    achievements: [
      "Conceived and implemented geo-tagging of healthcare facilities and resources for national COVID-19 surveillance",
      "Wrangled public health data streams to eliminate redundancy, increasing application efficiency by 25%",
      "Optimized backend queries and front-end markup, resulting in 40% faster application load times",
    ],
    takeaway:
      "Shipping software under high-stakes public pressure demands ruthless simplification and immediate operational reliability.",
    skills: ["Python", "SQL", "Geo-Tagging", "Performance Optimization"],
  },
  {
    id: "bits",
    role: "Dual Degree Scholar",
    company: "BITS Pilani (Goa Campus)",
    location: "Goa, India",
    period: "Aug 2015 – May 2021",
    summary:
      "5-Year Integrated Dual Degree: B.E. Chemical Engineering + M.Sc. Chemistry with a Minor in Accounting & Finance.",
    achievements: [
      "Completed rigorous concurrent degrees across engineering, chemistry, and financial analysis",
      "Finance Minor Capstone: Python correlation models evaluating capital investments across 15 financial institutions (10 NBFCs + 5 Banks)",
    ],
    takeaway:
      "Apparently one degree wasn't a strong enough plot twist. Abandoned the chemicals to find peace in data & AI systems.",
    skills: ["Chemical Engineering", "Chemistry", "Financial Modeling", "Python Analytics"],
  },
];

const Career = () => {
  const [activeId, setActiveId] = useState<string>("amber");

  const activeMilestone =
    careerHistory.find((item) => item.id === activeId) || careerHistory[0];

  return (
    <section className="career-section" id="career">
      <div className="section-container">
        <div className="section-header-tag">04 / CAREER FLIGHTPATH</div>

        <div className="career-header">
          <h2 className="career-title">
            The Trajectory: <span className="text-accent">Process to Production AI</span>
          </h2>
          <p className="career-subtitle">
            From BITS Pilani dual degrees to leading Data &amp; AI Products at amber. Click through each milestone to inspect deliverables, systems shipped, and verified impact.
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
                    <span className="milestone-period">{item.period}</span>
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
                    <span className="panel-period-tag">{activeMilestone.period}</span>
                  </div>
                </div>
              </div>

              <p className="panel-summary">{activeMilestone.summary}</p>

              <div className="panel-achievements">
                <span className="panel-subhead">CORE DELIVERABLES &amp; IMPACT</span>
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
                <span className="takeaway-label">SIGNATURE TAKEAWAY</span>
                <p className="takeaway-text">“{activeMilestone.takeaway}”</p>
              </div>

              <div className="panel-skills">
                <span className="skills-label">DOMAINS &amp; SYSTEMS</span>
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
