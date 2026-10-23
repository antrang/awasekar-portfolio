import { lazy, Suspense, useEffect } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import RecruiterBrief from "./RecruiterBrief";
import MatrixBackground from "./MatrixBackground";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import { initialFX } from "./utils/initialFX";
import { initScrollFX } from "./utils/scrollFX";

const TechStack = lazy(() => import("./TechStack"));
const CommitChart = lazy(() => import("./CommitChart"));

const MainContainer = () => {
  useEffect(() => {
    initialFX();
    const cleanup = initScrollFX();
    return () => cleanup();
  }, []);

  return (
    <div className="container-main">
      <MatrixBackground />
      <Cursor />
      <Navbar />
      <SocialIcons />
      <main className="container-main">
        <Landing />
        <RecruiterBrief />
        <Work />
        <Career />
        <Suspense fallback={<div className="section-container" style={{ textAlign: "center", color: "var(--textMuted)" }}>Loading Code Telemetry...</div>}>
          <CommitChart />
        </Suspense>
        <WhatIDo />
        <About />
        <Suspense fallback={<div className="section-container" style={{ textAlign: "center", color: "var(--textMuted)" }}>Loading Systems Matrix...</div>}>
          <TechStack />
        </Suspense>
        <Contact />
      </main>
    </div>
  );
};

export default MainContainer;
