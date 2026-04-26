import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My Career <span>&</span>
          <br /> Experience
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
              Building data pipelines, optimising data warehouses and automating AI-powered data insights via in-house semantic layer
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Lead Business Analyst</h4>
                <h5>Turing</h5>
              </div>
              <h3>Nov 2024 - May 2025</h3>
            </div>
            <p>
              Led the Business Analytics team and managed
              RLHF & AI fine-tuning programs across multiple LLM clients.
              Created multiple Looker dashboards across projects to track contributor performance.
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
              Devised and launched end-to-end on-boarding, auth, access control and custom Streamlit dashboards features.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Associate Product Manager</h4>
                <h5>Crimson AI</h5>
              </div>
              <h3>Jan 2023 - Apr 2023</h3>
            </div>
            <p>
              Drove product discovery and roadmap for AI-assisted research workflows.
              Partnered with engineering and data teams to ship LLM-driven features.
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
