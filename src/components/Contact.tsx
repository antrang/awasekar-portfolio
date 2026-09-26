import { MdArrowOutward, MdDownload, MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <footer className="contact-section" id="contact">
      <div className="section-container">
        <div className="section-header-tag">06 / GET IN TOUCH</div>
        <h2 className="sr-only">Contact Channels, Founder Advisory &amp; Recruiting Inquiries</h2>

        <div className="contact-grid">
          {/* Founder Advisory Callout */}
          <div className="advisory-card">
            <div className="advisory-tag">FOR STARTUP FOUNDERS</div>
            <h3 className="advisory-title">Data &amp; AI Advisory</h3>
            <p className="advisory-desc">
              Outside of amber, I take on a small number of data and AI consulting projects. If you&apos;re trying to figure out your data stack, want an AI feature shipped fast, or just want a second opinion on whether your pipeline is held together with duct tape (it usually is), feel free to reach out.
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
            <div className="advisory-tag">FOR RECRUITERS &amp; ENGINEERING LEADERS</div>
            <h3 className="advisory-title">Let&apos;s Build the Future</h3>
            <p className="advisory-desc">
              Open to high-impact roles in <strong>Applied AI Engineering</strong>, <strong>AI/ML Product Engineering</strong>, and <strong>Forward-Deployed Engineering</strong>.
            </p>

            <div className="contact-links-grid">
              <a
                href="mailto:work@awasekar.com"
                className="contact-channel"
                data-cursor="disable"
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

        {/* Colophon & Copyright */}
        <div className="contact-colophon">
          <div className="colophon-left">
            <span>© {new Date().getFullYear()} Sourabh Awasekar</span>
            <span className="colophon-divider">·</span>
            <span>Pune, India</span>
            <span className="colophon-divider">·</span>
            <span>Built with React 18, TypeScript, Vite &amp; GSAP</span>
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
