import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Lead - Data & Analytics</h4>
                <h5>amberstudent.com</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              building data pipelines, optimising data warehouses and automating AI-powered data insights via in-house semantic layer
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Lead Business Analyst</h4>
                <h5>Turing</h5>
              </div>
              <h3>Dec 2024 - May 2025</h3>
            </div>
            <p>
              Business Analyst (Dec 2024 – Feb 2025).
              Lead Business Analyst (Feb 2025 – May 2025)
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Associate Product Manager</h4>
                <h5>5X Data</h5>
              </div>
              <h3>Oct 2023 - Sep 2024</h3>
            </div>
            <p>
              Built in-house custom automated billing management software.
              Devised and launched end-to-end on-boarding, auth and access control features.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Product Analyst</h4>
                <h5>Junglee Games</h5>
              </div>
              <h3>Jun 2021 - Nov 2022</h3>
            </div>
            <p>
              Building multiple Tableau dashboards, automating database health checks using SQL.
              Running multiple A/B Tests and RCAs for product and marketing teams.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
