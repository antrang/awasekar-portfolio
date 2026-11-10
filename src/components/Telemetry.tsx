import { useState, lazy, Suspense } from "react";
import "./styles/Telemetry.css";

const CommitChart = lazy(() => import("./CommitChart"));
const TechStack = lazy(() => import("./TechStack"));

const Telemetry = () => {
  const [activeTab, setActiveTab] = useState<"all" | "commits" | "stack">("all");

  return (
    <section className="telemetry-section" id="telemetry">
      <div className="section-container">
        <div className="telemetry-header">
          <div className="telemetry-title-wrap">
            <h2 className="telemetry-title">
              Engineering Telemetry &amp; <span className="text-accent">Systems Matrix</span>
            </h2>
            <p className="telemetry-subtitle">
              Verified git telemetry and code activity paired with production infrastructure, languages, and verified honors.
            </p>
          </div>

          <div className="telemetry-tabs" role="tablist" aria-label="Telemetry View Modes">
            <button
              type="button"
              className={`telemetry-tab ${activeTab === "all" ? "telemetry-tab-active" : ""}`}
              onClick={() => setActiveTab("all")}
              role="tab"
              aria-selected={activeTab === "all"}
              data-cursor="disable"
            >
              Unified Console
            </button>
            <button
              type="button"
              className={`telemetry-tab ${activeTab === "commits" ? "telemetry-tab-active" : ""}`}
              onClick={() => setActiveTab("commits")}
              role="tab"
              aria-selected={activeTab === "commits"}
              data-cursor="disable"
            >
              Code Telemetry
            </button>
            <button
              type="button"
              className={`telemetry-tab ${activeTab === "stack" ? "telemetry-tab-active" : ""}`}
              onClick={() => setActiveTab("stack")}
              role="tab"
              aria-selected={activeTab === "stack"}
              data-cursor="disable"
            >
              Tooling Spectrum
            </button>
          </div>
        </div>

        <div className="telemetry-body">
          {(activeTab === "all" || activeTab === "commits") && (
            <Suspense fallback={<div className="telemetry-loading">Loading Code Telemetry...</div>}>
              <CommitChart embedded />
            </Suspense>
          )}

          {(activeTab === "all" || activeTab === "stack") && (
            <Suspense fallback={<div className="telemetry-loading">Loading Systems Matrix...</div>}>
              <TechStack embedded />
            </Suspense>
          )}
        </div>
      </div>
    </section>
  );
};

export default Telemetry;
