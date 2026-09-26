import "./styles/About.css";

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="section-container">
        <div className="section-header-tag">01 / BACKGROUND &amp; PHILOSOPHY</div>

        <div className="about-grid">
          <div className="about-story">
            <h2 className="about-title">
              From Process Dynamics to <span className="text-accent">Production AI Systems</span>
            </h2>

            <p className="about-p">
              I build the data infrastructure and AI products that let companies see what's actually happening in their business, and then act on it before the insight goes stale.
            </p>

            <p className="about-p">
              My engineering foundation started at <strong>BITS Pilani</strong> with a dual degree in Chemical Engineering and Chemistry, complemented by a Minor in Finance. Process optimization, thermodynamics, and mass transfer dynamics mapped directly into distributed data architectures: tracking state, optimizing bottlenecks, and transforming raw streams into high-value yields.
            </p>

            <p className="about-p">
              Over the last 5+ years, I abandoned the test tubes to solve product engineering, data pipelines, and applied AI problems. At <strong>amber</strong>, that has meant architecting <strong>amber Ocean</strong> (a cost-efficient text-to-SQL harness with our central semantic layer and custom MCP server), <strong>amber Radar</strong> (B2B forecasting platform), and <strong>amber Prism</strong> (transcript QA engine).
            </p>

            <div className="quote-callout">
              <span className="quote-mark">“</span>
              <p>
                Cooking tasty intel out of spicy models on hot data pipelines. ELT &gt;&gt;&gt; ETL. Building pipelines that quietly do their job every day without anyone noticing, which is the highest compliment a pipeline can get.
              </p>
            </div>
          </div>

          <div className="about-dual-view">
            <div className="value-card">
              <div className="value-badge">FOR AI &amp; PRODUCT RECRUITERS</div>
              <h3>Production AI &amp; Systems Rigor</h3>
              <ul className="value-list">
                <li>
                  <strong>Production LLM Deployment:</strong> Token optimization, semantic caching, text-to-SQL routing with custom MCP servers (&lt;$100 per 15k sessions).
                </li>
                <li>
                  <strong>Model Evaluation &amp; RLHF:</strong> 100+ multimodal annotations for the MMMU benchmark, AI-vs-human detection models at Turing.
                </li>
                <li>
                  <strong>Cost &amp; Warehouse Scaling:</strong> Cut Redshift cluster costs by $600/month (-2 nodes), cut query times by 30 mins, and saved $10,000+/yr migrating to self-hosted Superset.
                </li>
                <li>
                  <strong>Engineering Scope:</strong> Python, TypeScript, SQL, Next.js, and native C++17 audio DSP.
                </li>
              </ul>
            </div>

            <div className="value-card">
              <div className="value-badge">FOR STARTUP FOUNDERS</div>
              <h3>0-to-1 Agency &amp; Speed</h3>
              <ul className="value-list">
                <li>
                  <strong>End-to-End Ownership:</strong> No waiting on cross-functional handoffs. I design schemas, write scrapers, build LLM harnesses, and code the frontend UI.
                </li>
                <li>
                  <strong>Unit Economics Mindset:</strong> Products designed from day zero to be commercially viable without blowing compute budgets.
                </li>
                <li>
                  <strong>Commercial Track Record:</strong> Launched Poker GTM reaching ₹1.2L daily revenue in 18 days at Junglee, and built $20k/mo enterprise SaaS at 5X Data.
                </li>
                <li>
                  <strong>Selective Advisory:</strong> Available for early-stage technical consulting and rapid AI product prototyping.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
