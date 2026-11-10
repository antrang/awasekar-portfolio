import { useEffect, useRef, useState } from "react";
import { MdCheck, MdContentCopy, MdDownload, MdEmail, MdFlashOn } from "react-icons/md";
import "./styles/RecruiterBrief.css";

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

const RecruiterBrief = () => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(recruiterBlurbText);
      } else {
        throw new Error("Clipboard API unavailable");
      }
      setCopied(true);
      timeoutRef.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API is unavailable
      const textArea = document.createElement("textarea");
      textArea.value = recruiterBlurbText;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      timeoutRef.current = setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section className="recruiter-brief-section" id="recruiter-brief" aria-label="Recruiter Fast-Track Executive Brief">
      <div className="section-container">
        <div className="recruiter-brief-card">
          <div className="brief-header">
            <div className="brief-badge">
              <MdFlashOn className="brief-badge-icon" />
              <span>RECRUITER &amp; HIRING FAST-TRACK</span>
            </div>
            <span className="brief-subtag">High-Signal Summary · 60-Second Scan</span>
          </div>

          <div className="brief-grid">
            {/* Column 1: Positioning & Roles */}
            <div className="brief-col">
              <h3 className="brief-col-title">Target Roles &amp; Focus</h3>
              <ul className="brief-pill-list">
                <li className="brief-pill role-pill">Applied AI Engineer</li>
                <li className="brief-pill role-pill">Forward Deployed Engineer (FDE)</li>
                <li className="brief-pill role-pill">AI Product Systems Engineer</li>
                <li className="brief-pill role-pill">Lead — Data &amp; Analytics</li>
              </ul>

              <div className="brief-meta-rows">
                <div className="brief-meta-row">
                  <span className="meta-label">Location</span>
                  <span className="meta-value">Pune, India (Open to Remote &amp; Select Relocation)</span>
                </div>
                <div className="brief-meta-row">
                  <span className="meta-label">Current Role</span>
                  <span className="meta-value">Lead — Data &amp; Analytics (+ AI Data Products), amber</span>
                </div>
                <div className="brief-meta-row">
                  <span className="meta-label">Education</span>
                  <span className="meta-value">BITS Pilani (BE Chem + MSc Chem + Minor in Finance)</span>
                </div>
              </div>
            </div>

            {/* Column 2: Verified Accomplishments */}
            <div className="brief-col">
              <h3 className="brief-col-title">Verified Production Proof</h3>
              <ul className="brief-checklist">
                <li>
                  <strong>amber Ocean:</strong> Agentic AI analytics harness with centralized Semantic Layer &amp; custom MCP over AWS Redshift at <em>&lt;$100 per 15k sessions</em> (3,000+ queries).
                </li>
                <li>
                  <strong>amber Prism:</strong> LLM-powered transcript analysis platform for ops quality audits &amp; sales pipeline insights (100+ DAU across Sales, Ops &amp; Leadership, 30% &rarr; 90% audit coverage).
                </li>
                <li>
                  <strong>Warehouse &amp; BI Scaling:</strong> Cut 2 Redshift nodes (-$600/mo) and saved <em>$40,000+/year</em> migrating 120 seats to self-hosted Apache Superset.
                </li>
                <li>
                  <strong>Frontier AI Alignment:</strong> 100+ multimodal prompt evaluations &amp; RLHF annotations for MMMU benchmark at Turing.
                </li>
              </ul>
            </div>
          </div>

          {/* Action Row */}
          <div className="brief-actions">
            <div className="brief-cta-group">
              <a
                href="/Awasekar_Sourabh_Resume_2026.pdf"
                className="btn-primary brief-btn"
                target="_blank"
                rel="noreferrer"
                download="Awasekar_Sourabh_Resume_2026.pdf"
                data-cursor="disable"
              >
                <MdDownload />
                <span>Canonical Resume (PDF)</span>
              </a>

              <a
                href="mailto:work@awasekar.com?subject=Recruiting%20Inquiry%20%E2%80%94%20Applied%20AI%20/%20Systems%20Role"
                className="btn-secondary brief-btn"
                data-cursor="disable"
              >
                <MdEmail />
                <span>Email: work@awasekar.com</span>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="btn-secondary brief-btn copy-btn"
                data-cursor="disable"
                aria-label="Copy Recruiter Blurb to clipboard"
              >
                {copied ? <MdCheck className="copy-icon-success" /> : <MdContentCopy />}
                <span>{copied ? "Copied Recruiter Blurb!" : "Copy Recruiter Blurb"}</span>
              </button>
            </div>

            <div className="brief-direct-link">
              <span className="brief-note">
                Direct portfolio link: <a href="https://awasekar.com">awasekar.com</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruiterBrief;
