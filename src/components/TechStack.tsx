import { MdWorkspacePremium, MdArrowOutward } from "react-icons/md";
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
      { name: "Apache Superset", note: "Self-hosted, $40k+/yr saved (120 seats)" },
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

interface Certification {
  title: string;
  issuer: string;
  url: string;
}

const certifications: Certification[] = [
  {
    title: "AI Agents Fundamentals",
    issuer: "Hugging Face",
    url: "https://us.aws.cdn.hf.co/xet-bridge-us/67a47037749ea2c4b9fafd4b/be666e44b5d64024c24c871a5b5a5b2a5546d8421d9ed7f43ce1f818fdcc5cde?response-content-disposition=inline%3B+filename*%3DUTF-8%27%272025-02-14.png%3B+filename%3D%222025-02-14.png%22%3B&xip=3cQch71uSG8&user_id=6adc7fdb6bb58d3c7b23a9f6&X-Xet-Cas-Uid=6adc7fdb6bb58d3c7b23a9f6&response-content-type=image%2Fpng&Expires=1794370082&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly91cy5hd3MuY2RuLmhmLmNvL3hldC1icmlkZ2UtdXMvNjdhNDcwMzc3NDllYTJjNGI5ZmFmZDRiL2JlNjY2ZTQ0YjVkNjQwMjRjMjRjODcxYTViNWE1YjJhNTU0NmQ4NDIxZDllZDdmNDNjZTFmODE4ZmRjYzVjZGVcXD9yZXNwb25zZS1jb250ZW50LWRpc3Bvc2l0aW9uPWlubGluZSUzQitmaWxlbmFtZSUyQSUzRFVURi04JTI3JTI3MjAyNS0wMi0xNC5wbmclM0IrZmlsZW5hbWUlM0QlMjIyMDI1LTAyLTE0LnBuZyUyMiUzQiZ4aXA9M2NRY2g3MXVTRzgmdXNlcl9pZD02YWRjN2ZkYjZiYjU4ZDNjN2IyM2E5ZjYmWC1YZXQtQ2FzLVVpZD02YWRjN2ZkYjZiYjU4ZDNjN2IyM2E5ZjYmcmVzcG9uc2UtY29udGVudC10eXBlPWltYWdlJTJGcG5nIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJFcG9jaFRpbWUiOjE3OTQzNzAwODJ9fX1dfQ__&Signature=MEYCIQDp-EPS%7EBsPiHN-rM25f%7EbZ%7ES9i6kWlYZClRVaHQit7JwIhAIqsftyhpVouZkDj5awNReiaQcYxcLIe5Y9XYPzY-RXA&Key-Pair-Id=01KXEF4KZ1B6FV465MAWR4M21F&Hash-Algorithm=SHA256",
  },
  {
    title: "Machine Learning",
    issuer: "Cutshort",
    url: "https://cutshort.io/certificate/107824",
  },
  {
    title: "Applied Data Science I: Scientific Computing & Python (with honors)",
    issuer: "WorldQuant University • Credly",
    url: "https://www.credly.com/badges/2315b781-f7ee-4e2b-af6d-666ef81d9a91",
  },
  {
    title: "Applied Data Science II: Machine Learning & Statistical Analysis (with honors)",
    issuer: "WorldQuant University • Credly",
    url: "https://www.credly.com/badges/7051fb57-3b02-40e4-b142-d9cd9ab76c27",
  },
  {
    title: "Big Data Analytics",
    issuer: "Programming Hub",
    url: "https://storage.googleapis.com/programminghub/certificate%2F1621792894661.pdf",
  },
  {
    title: "SQL (SoloLearn)",
    issuer: "SoloLearn",
    url: "https://www.sololearn.com/Certificate/CT-6FPN0BCJ/pdf",
  },
  {
    title: "SQL (Programming Hub)",
    issuer: "Programming Hub",
    url: "https://storage.googleapis.com/programminghub/certificate%2F1619888362677.pdf",
  },
  {
    title: "Python 3",
    issuer: "Programming Hub",
    url: "https://storage.googleapis.com/programminghub/certificate%2F1618586556710.pdf",
  },
];

const TechStack = () => {
  const content = (
    <>
      <div className="techstack-header">
        <h2 className="techstack-title">
          Technical Stack &amp; <span className="text-accent">Tooling Spectrum</span>
        </h2>
        <p className="techstack-subtitle">
          Core languages, frameworks, data platforms, and MLOps tooling deployed across production systems.
        </p>
      </div>

      <div className="techstack-grid">
        {skillCategories.map((cat, idx) => (
          <div className="tech-category-card" key={idx}>
            <div className="cat-top">
              <span className="cat-tag">{cat.tag}</span>
              <h4 className="cat-title">{cat.title}</h4>
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
          <div className="cert-header-left">
            <MdWorkspacePremium className="cert-icon" />
            <span className="cert-title">Verified Certifications &amp; Honors</span>
          </div>
          <span className="cert-count-badge">8 Credentials</span>
        </div>

        <div className="cert-grid">
          {certifications.map((cert, idx) => (
            <a
              key={idx}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-item cert-link"
              data-cursor="disable"
              aria-label={`Verify ${cert.title} certificate on ${cert.issuer} (opens in new tab)`}
            >
              <span className="cert-bullet">◈</span>
              <div className="cert-info">
                <span className="cert-text">{cert.title}</span>
                <span className="cert-issuer">{cert.issuer}</span>
              </div>
              <MdArrowOutward className="cert-arrow" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <section className="techstack-section" id="stack">
      <div className="section-container">
        <span id="techstack" className="sr-only" aria-hidden="true" />
        <span id="skills" className="sr-only" aria-hidden="true" />
        {content}
      </div>
    </section>
  );
};

export default TechStack;
