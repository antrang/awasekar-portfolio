import { useState, useRef, useEffect } from "react";
import { MdArrowOutward, MdDownload, MdContentCopy, MdCheck, MdClose, MdFlashOn } from "react-icons/md";
import "./styles/Landing.css";

const recruiterBlurbText = `SOURABH AWASEKAR
Applied AI & Product Systems Engineer
Current: Lead, Data & Analytics (+ AI Data Products) at amber
Location: Pune, India (Open to Remote / Select Relocation)
Education: BITS Pilani (5+ YOE)

Target Roles:
• Applied AI Engineer
• Forward Deployed Engineer (FDE)
• AI Product Systems Engineer
• Lead, Data & Analytics

Key Verified Impact:
• amber Ocean: Agentic text-to-SQL harness with custom MCP & semantic layer over Redshift (<$100 / 15k sessions, 3,000+ queries).
• amber Prism: Multi-channel LLM transcript platform (100+ DAU, 30% to 90% audit coverage, real-time deal-risk alerts).
• Warehouse & BI Scaling: Saved $40k+/yr migrating 120 seats to self-hosted Apache Superset; trimmed 2 Redshift nodes (-$600/mo).
• Frontier AI Alignment: 100+ multimodal prompt evaluations & RLHF annotations for MMMU benchmark at Turing.

Core Tech Stack:
• Applied AI & Agents: Custom MCP Servers, Semantic Layers, Production RAG, Claude & OpenAI APIs, Ollama, RLHF & Evals (MMMU)
• Languages & Systems: Python (Certified), TypeScript, SQL (Certified), Next.js, React, Node.js, C++17 (JUCE DSP)
• Data Platforms & BI: AWS Redshift, Apache Superset (Self-Hosted), PostgreSQL, Snowflake, BigQuery, Metabase, Tableau
• Cloud & MLOps: AWS (S3, EC2, Lambda, DMS), Docker, Jenkins Pipelines, n8n Automation, PostHog

Contact & Links:
• Email: work@awasekar.com
• Portfolio: https://awasekar.com
• LinkedIn: https://www.linkedin.com/in/awasekar/
• GitHub: https://github.com/antrang
• Canonical Resume: https://awasekar.com/Awasekar_Sourabh_Resume_2026.pdf`;

const Landing = () => {
  const [copied, setCopied] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!showDrawer) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowDrawer(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showDrawer]);

  const handleCopy = async () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(recruiterBlurbText);
      } else {
        throw new Error("Clipboard API unavailable");
      }
      setCopied(true);
      timeoutRef.current = setTimeout(() => setCopied(false), 2400);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = recruiterBlurbText;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      timeoutRef.current = setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <section className="landing-section" id="landingDiv">
      <div className="landing-container section-container">
        {/* Status bar & Recruiter Fast-Action */}
        <div className="landing-top-bar">
          <div className="landing-status-badge">
            <span className="status-ping"></span>
            <span className="status-text">Leading Data Intelligence @ amber</span>
          </div>

          <div className="recruiter-quick-actions">
            <button
              type="button"
              onClick={handleCopy}
              className="btn-recruiter-pill"
              aria-label="Copy 60-second recruiter summary"
              data-cursor="disable"
            >
              {copied ? <MdCheck className="icon-success" /> : <MdContentCopy />}
              <span>{copied ? "Copied Summary" : "Copy Recruiter Summary"}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowDrawer(true)}
              className="btn-recruiter-details"
              aria-label="Open recruiter executive brief"
              data-cursor="disable"
            >
              <MdFlashOn />
              <span>Executive Brief</span>
            </button>
          </div>
        </div>

        <div className="landing-hero-grid">
          <div className="landing-content">
            <h1 className="landing-headline">
              <span className="landing-name">
                Sourabh <span className="landing-name-accent">Awasekar</span>
              </span>
              <span className="landing-title">Applied AI and Systems Engineer</span>
            </h1>

            <p className="landing-tagline">
              Architecting production text-to-SQL harnesses, semantic layers, and resilient full-stack systems.
            </p>

            <div className="landing-cta-group">
              <a
                href="/Awasekar_Sourabh_Resume_2026.pdf"
                className="btn-primary"
                target="_blank"
                rel="noreferrer"
                download="Awasekar_Sourabh_Resume_2026.pdf"
                data-cursor="disable"
                data-umami-event="Resume Download"
                data-umami-event-location="Hero Section"
              >
                <MdDownload />
                <span>Resume (PDF)</span>
              </a>

              <a
                href="#work"
                className="btn-secondary"
                data-cursor="disable"
              >
                <span>Explore Systems</span>
                <MdArrowOutward />
              </a>

              <a
                href="mailto:work@awasekar.com"
                className="btn-ghost"
                data-cursor="disable"
              >
                <span>Get in Touch</span>
              </a>
            </div>
          </div>

          <div className="landing-photo-wrapper">
            <div className="landing-photo-card">
              <img
                src="/Sourabh_Awasekar_Picture.webp"
                alt="Sourabh Awasekar, Applied AI Engineer"
                width={300}
                height={300}
                className="landing-photo"
                loading="eager"
                decoding="async"
              />
              <div className="photo-caption">
                <span className="photo-tag">Pune, India</span>
                <span className="photo-availability">Open to Applied AI and FDE roles</span>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Proof Bar */}
        <div className="proof-bar">
          <div className="proof-item">
            <div className="proof-metric num">5+ YOE</div>
            <div className="proof-label">Applied AI, Data &amp; Product</div>
          </div>
          <div className="proof-item">
            <div className="proof-metric num">&lt;$100 / 15k</div>
            <div className="proof-label">User sessions on amber Ocean AI</div>
          </div>
          <div className="proof-item">
            <div className="proof-metric num">$40k+/yr</div>
            <div className="proof-label">Saved via Superset migration (120 seats)</div>
          </div>
          <div className="proof-item">
            <div className="proof-metric num">BITS Pilani</div>
            <div className="proof-label">BE Chem + MSc Chem + Finance</div>
          </div>
        </div>

        {/* Modal / Drawer for Recruiter Executive Brief */}
        {showDrawer && (
          <div className="recruiter-drawer-overlay" onClick={() => setShowDrawer(false)}>
            <div className="recruiter-drawer-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="brief-title">
              <div className="drawer-header">
                <div className="drawer-title-wrap">
                  <MdFlashOn className="drawer-icon" />
                  <h3 id="brief-title" className="drawer-title">
                    Recruiter Fast-Track <span className="text-accent">Summary</span>
                  </h3>
                </div>
                <button
                  type="button"
                  className="drawer-close-btn"
                  onClick={() => setShowDrawer(false)}
                  aria-label="Close brief"
                  data-cursor="disable"
                >
                  <MdClose />
                </button>
              </div>

              <div className="drawer-body">
                <div className="drawer-grid">
                  <div className="drawer-col-primary">
                    <div className="drawer-roles">
                      <span className="drawer-subhead">Target Roles</span>
                      <div className="drawer-pills">
                        <span className="drawer-pill">Applied AI Engineer</span>
                        <span className="drawer-pill">Forward Deployed Engineer (FDE)</span>
                        <span className="drawer-pill">AI Product Systems Engineer</span>
                        <span className="drawer-pill">Lead, Data &amp; Analytics</span>
                      </div>
                    </div>

                    <div className="drawer-meta-list">
                      <div className="drawer-meta-item">
                        <span className="meta-term">Location:</span>
                        <span className="meta-detail">Pune, India (Open to Remote &amp; Select Relocation)</span>
                      </div>
                      <div className="drawer-meta-item">
                        <span className="meta-term">Current:</span>
                        <span className="meta-detail">Lead, Data &amp; Analytics (+ AI Data Products), amber</span>
                      </div>
                      <div className="drawer-meta-item">
                        <span className="meta-term">Alma Mater:</span>
                        <span className="meta-detail">BITS Pilani (BE Chemical + MSc Chemistry + Minor in Finance)</span>
                      </div>
                    </div>

                    <div className="drawer-impact-list">
                      <span className="drawer-subhead">Verified Production Impact</span>
                      <ul className="drawer-bullets">
                        <li><strong>amber Ocean:</strong> Agentic text-to-SQL harness at &lt;$100 / 15k sessions</li>
                        <li><strong>amber Prism:</strong> Multi-channel LLM transcript platform (100+ DAU)</li>
                        <li><strong>Infra &amp; Efficiency:</strong> Saved $40k+/yr migrating 120 seats to Superset</li>
                      </ul>
                    </div>
                  </div>

                  <div className="drawer-col-secondary">
                    <div className="drawer-stack-list">
                      <span className="drawer-subhead">Core Tech Stack</span>
                      <div className="drawer-stack-grid">
                        <div className="drawer-stack-item">
                          <span className="stack-cat-title">Applied AI &amp; Agents:</span>
                          <span className="stack-cat-skills">Custom MCP, Semantic Layers, Production RAG, Claude &amp; OpenAI APIs, Ollama, RLHF</span>
                        </div>
                        <div className="drawer-stack-item">
                          <span className="stack-cat-title">Languages &amp; Systems:</span>
                          <span className="stack-cat-skills">Python (Certified), TypeScript, SQL (Certified), Next.js, React, Node.js, C++17 (JUCE)</span>
                        </div>
                        <div className="drawer-stack-item">
                          <span className="stack-cat-title">Data Platforms &amp; BI:</span>
                          <span className="stack-cat-skills">AWS Redshift, Apache Superset, PostgreSQL, Snowflake, BigQuery, Metabase, Tableau</span>
                        </div>
                        <div className="drawer-stack-item">
                          <span className="stack-cat-title">Cloud &amp; MLOps:</span>
                          <span className="stack-cat-skills">AWS (S3, EC2, Lambda, DMS), Docker, Jenkins Pipelines, n8n, PostHog</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="drawer-actions">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="btn-primary drawer-btn"
                  data-cursor="disable"
                  data-umami-event="Copy 60s Summary"
                >
                  {copied ? <MdCheck /> : <MdContentCopy />}
                  <span>{copied ? "Copied to Clipboard!" : "Copy 60s Summary"}</span>
                </button>

                <a
                  href="/Awasekar_Sourabh_Resume_2026.pdf"
                  className="btn-secondary drawer-btn"
                  target="_blank"
                  rel="noreferrer"
                  download="Awasekar_Sourabh_Resume_2026.pdf"
                  data-cursor="disable"
                  data-umami-event="Resume Download"
                  data-umami-event-location="Executive Summary Drawer"
                >
                  <MdDownload />
                  <span>Download Resume PDF</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Landing;
