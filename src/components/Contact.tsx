import { MdArrowOutward, MdDownload, MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <footer className="contact-section" id="contact">
      <div className="section-container">
        <h2 className="sr-only">Contact Channels, Founder Advisory &amp; Recruiting Inquiries</h2>

        <div className="contact-grid">
          {/* Founder Advisory Callout */}
          <div className="advisory-card">
            <span className="advisory-tag">Founder Advisory</span>
            <h3 className="advisory-title">
              Data &amp; AI <span className="text-accent">Advisory</span>
            </h3>
            <p className="advisory-desc">
              Selective technical consulting for startups and engineering teams looking to accelerate their data architecture and applied AI capabilities.
            </p>
            <div className="advisory-points">
              <div className="adv-point">◈ 0-to-1 AI product prototyping &amp; architecture</div>
              <div className="adv-point">◈ Semantic layer &amp; text-to-SQL system design</div>
              <div className="adv-point">◈ Data warehouse cost optimization &amp; ELT pipelines</div>
            </div>
            <a
              href="mailto:work@awasekar.com?subject=Founder%20Advisory%20/%20Consulting%20Inquiry"
              className="btn-primary adv-btn"
              data-cursor="disable"
            >
              <MdEmail />
              <span>Reach Out for Advisory</span>
            </a>
          </div>

          {/* Recruiter & Career Channels */}
          <div className="recruiter-card">
            <span className="advisory-tag">Engineering Roles</span>
            <h3 className="advisory-title">
              Let’s Build <span className="text-accent">Together</span>
            </h3>
            <p className="advisory-desc">
              Open to high-impact opportunities in <strong>Applied AI Engineering</strong>, <strong>AI Product Engineering</strong>, and <strong>Forward-Deployed Engineering</strong>.
            </p>

            <div className="contact-links-grid">
              <a
                href="mailto:work@awasekar.com"
                className="contact-channel"
                data-cursor="disable"
                data-umami-event="Email Click"
                data-umami-event-location="Contact Section"
              >
                <div className="channel-icon">
                  <MdEmail />
                </div>
                <div className="channel-meta">
                  <span className="channel-label">Email</span>
                  <span className="channel-val">work@awasekar.com</span>
                </div>
                <MdArrowOutward className="channel-arrow" />
              </a>

              <a
                href="https://www.linkedin.com/in/awasekar/"
                target="_blank"
                rel="noreferrer"
                className="contact-channel"
                data-cursor="disable"
                data-umami-event="Social Link Click"
                data-umami-event-platform="LinkedIn"
                data-umami-event-location="Contact Section"
              >
                <div className="channel-icon">
                  <FaLinkedin />
                </div>
                <div className="channel-meta">
                  <span className="channel-label">LinkedIn</span>
                  <span className="channel-val">in/awasekar</span>
                </div>
                <MdArrowOutward className="channel-arrow" />
              </a>

              <a
                href="https://github.com/antrang"
                target="_blank"
                rel="noreferrer"
                className="contact-channel"
                data-cursor="disable"
                data-umami-event="Social Link Click"
                data-umami-event-platform="GitHub"
                data-umami-event-location="Contact Section"
              >
                <div className="channel-icon">
                  <FaGithub />
                </div>
                <div className="channel-meta">
                  <span className="channel-label">GitHub</span>
                  <span className="channel-val">github.com/antrang</span>
                </div>
                <MdArrowOutward className="channel-arrow" />
              </a>

              <a
                href="/Awasekar_Sourabh_Resume_2026.pdf"
                className="contact-channel resume-channel"
                target="_blank"
                rel="noreferrer"
                download="Awasekar_Sourabh_Resume_2026.pdf"
                data-cursor="disable"
                data-umami-event="Resume Download"
                data-umami-event-location="Contact Section"
              >
                <div className="channel-icon">
                  <MdDownload />
                </div>
                <div className="channel-meta">
                  <span className="channel-label">Canonical Resume</span>
                  <span className="channel-val">Download PDF</span>
                </div>
                <MdArrowOutward className="channel-arrow" />
              </a>
            </div>
          </div>
        </div>

        {/* Colophon & Copyright without dot strings */}
        <div className="contact-colophon">
          <div className="colophon-left">
            <span>© {new Date().getFullYear()} Sourabh Awasekar</span>
            <span className="colophon-hairline">|</span>
            <span>Pune, India</span>
            <span className="colophon-hairline">|</span>
            <span>React 18 &amp; TypeScript</span>
          </div>

          <div className="colophon-right">
            <span>ELT &gt;&gt;&gt; ETL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
