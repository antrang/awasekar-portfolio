import { MdWorkspacePremium } from "react-icons/md";
import "./styles/TechStack.css";

interface SkillCategory {
  title: string;
  tag: string;
  skills: { name: string; note: string }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Applied AI & Agentic Systems",
    tag: "LLMs & HARNESSES",
    skills: [
      { name: "Ollama", note: "Local & Private LLM inference" },
      { name: "Custom MCP Servers", note: "Model Context Protocol tools" },
      { name: "Semantic Layers", note: "Central metric definitions" },
      { name: "Claude & Gemini APIs", note: "Structured extraction & analysis" },
      { name: "RAG & Vector Retrieval", note: "Injection-guarded retrieval" },
      { name: "RLHF & Model Evals", note: "MMMU benchmark annotations" },
      { name: "n8n Workflow Triggers", note: "Multi-channel automated alerts" },
      { name: "Token Optimization", note: "<$100 / 15k user sessions" },
    ],
  },
  {
    title: "Languages & Core Systems",
    tag: "SOFTWARE & CODE",
    skills: [
      { name: "Python", note: "Pandas, Scikit-Learn, SQLAlchemy" },
      { name: "TypeScript", note: "Strict type-safe applications" },
      { name: "SQL (Certified)", note: "Advanced query tuning & ELT" },
      { name: "C++17", note: "JUCE 8 native desktop DSP" },
      { name: "Next.js 15/16", note: "App Router, SSR, Turbopack" },
      { name: "React 18/19", note: "Modern state & leaf rendering" },
      { name: "Node.js", note: "Streaming & RESTful APIs" },
      { name: "Web Audio & ONNX", note: "Client-side ML inference" },
    ],
  },
  {
    title: "Data Warehousing & BI",
    tag: "DATA PLATFORMS",
    skills: [
      { name: "AWS Redshift", note: "Node downsizing (-2 nodes, -$600/mo)" },
      { name: "Apache Superset", note: "Self-hosted, $10k+/yr saved" },
      { name: "Snowflake", note: "Warehouse modeling & transforms" },
      { name: "PostgreSQL", note: "Production relational data" },
      { name: "Google BigQuery", note: "Serverless analytical queries" },
      { name: "Metabase", note: "Query caching & operational dashboards" },
      { name: "Tableau", note: "Enterprise BI & conversion funnels" },
      { name: "Looker Studio", note: "Cross-functional team visibility" },
    ],
  },
  {
    title: "Cloud, MLOps & Delivery",
    tag: "INFRASTRUCTURE",
    skills: [
      { name: "AWS S3 & ECR", note: "Artifact & asset storage pipelines" },
      { name: "AWS EC2 & Lambda", note: "Compute instances & serverless triggers" },
      { name: "AWS DMS", note: "Database migration & query tuning" },
      { name: "Docker", note: "Containerized deployments" },
      { name: "Jenkins", note: "Automated daily scraper pipelines" },
      { name: "Vercel", note: "Edge hosting & deployment" },
      { name: "Supabase", note: "Auth, database & edge functions" },
      { name: "PostHog & Sentry", note: "Consent-gated telemetry & error tracking" },
    ],
  },
];

const certifications = [
  "Applied Data Science II: Machine Learning & Statistical Analysis (with honors)",
  "AI Agents Fundamentals",
  "Scientific Computing and Python for Data Science",
  "Certified SQL",
];

const TechStack = () => {
  return (
    <section className="techstack-section" id="techstack">
      <div className="section-container">
        <div className="section-header-tag">05 / SYSTEMS &amp; MLOPS MATRIX</div>

        <div className="techstack-header">
          <h2 className="techstack-title">
            Technical Stack &amp; <span className="text-accent">Tooling Spectrum</span>
          </h2>
          <p className="techstack-subtitle">
            An inventory of the languages, frameworks, data warehouses, and MLOps tooling I use to deploy production-ready systems.
          </p>
        </div>

        <div className="techstack-grid">
          {skillCategories.map((cat, idx) => (
            <div className="tech-category-card" key={idx}>
              <div className="cat-top">
                <span className="cat-tag">{cat.tag}</span>
                <h3 className="cat-title">{cat.title}</h3>
              </div>

              <div className="cat-skills-list">
                {cat.skills.map((skill, sIdx) => (
                  <div className="cat-skill-item" key={sIdx}>
                    <div className="skill-name-row">
                      <span className="skill-item-name">{skill.name}</span>
                      <span className="skill-item-note">{skill.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Strip */}
        <div className="certifications-box">
          <div className="cert-header">
            <MdWorkspacePremium className="cert-icon" />
            <span className="cert-title">VERIFIED CERTIFICATIONS &amp; HONORS</span>
          </div>

          <div className="cert-grid">
            {certifications.map((cert, idx) => (
              <div className="cert-item" key={idx}>
                <span className="cert-bullet">◈</span>
                <span className="cert-text">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
