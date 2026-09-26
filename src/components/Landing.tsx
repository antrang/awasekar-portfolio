import { MdArrowOutward, MdDownload } from "react-icons/md";
import "./styles/Landing.css";

const Landing = () => {
  return (
    <section className="landing-section" id="landingDiv">
      <div className="landing-container section-container">
        <div className="landing-badge-wrap">
          <div className="landing-status-badge">
            <span className="status-ping"></span>
            <span className="status-text">
              Leading Data Intelligence @ amber · Building AI Data Products
            </span>
          </div>
        </div>

        <div className="landing-hero-grid">
          <div className="landing-content">
            <div className="landing-eyebrow">
              Applied AI Engineer · Product &amp; Systems Builder
            </div>

            <h1 className="landing-name">
              Sourabh <span className="landing-name-accent">Awasekar</span>
            </h1>

            <p className="landing-tagline">
              Building and deploying production-ready AI products end-to-end. Turning raw data lakes and warehouse architectures into high-performance semantic layers, autonomous text-to-SQL harnesses, and scalable web &amp; audio applications.
            </p>

            <div className="landing-cta-group">
              <a
                href="/Awasekar_Sourabh_Resume_2026.pdf"
                className="btn-primary"
                target="_blank"
                rel="noreferrer"
                download="Awasekar_Sourabh_Resume_2026.pdf"
                data-cursor="disable"
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
              <div className="photo-ring"></div>
              <img
                src="/Sourabh_Awasekar_Picture.webp"
                alt="Sourabh Awasekar — Applied AI Engineer"
                width={300}
                height={300}
                className="landing-photo"
                loading="eager"
                decoding="async"
              />
              <div className="photo-caption">
                <span className="photo-tag">Pune, India</span>
                <span className="photo-availability">Open to Applied AI / FDE Roles &amp; Advisory</span>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Proof Bar */}
        <div className="proof-bar">
          <div className="proof-item">
            <div className="proof-metric">5+ YOE</div>
            <div className="proof-label">Applied AI, Data &amp; Product</div>
          </div>
          <div className="proof-item">
            <div className="proof-metric">&lt;$100 / 15k</div>
            <div className="proof-label">User sessions on amber Ocean AI</div>
          </div>
          <div className="proof-item">
            <div className="proof-metric">$10k+/yr</div>
            <div className="proof-label">Saved via Superset migration</div>
          </div>
          <div className="proof-item">
            <div className="proof-metric">BITS Pilani</div>
            <div className="proof-label">BE Chem + MSc Chem + Finance</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
