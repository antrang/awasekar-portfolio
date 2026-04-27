import "./styles/Landing.css";

const Landing = () => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-photo">
            <img
              src="/Sourabh_Awasekar_Picture.webp"
              alt="Sourabh Awasekar"
              width="320"
              height="320"
              fetchpriority="high"
            />
          </div>
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              SOURABH
              <br />
              <span>AWASEKAR</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>Data Analytics & Engineering</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Product</div>
              <div className="landing-h2-2">Tech & AI</div>
              <div className="landing-h2-3">Music</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Product</div>
              <div className="landing-h2-info-1">Tech & AI</div>
              <div className="landing-h2-info-2">Music</div>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
