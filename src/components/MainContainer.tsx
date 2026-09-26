import { lazy, Suspense, useEffect } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import MatrixBackground from "./MatrixBackground";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = () => {
  useEffect(() => {
    import("./utils/initialFX").then((m) => m.initialFX());
  }, []);

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="container-main">
      <MatrixBackground />
      <Cursor />
      <Navbar />
      <SocialIcons />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="container-main">
            <Landing />
            <About />
            <WhatIDo />
            <Work />
            <Career />
            <Suspense fallback={<div className="section-container" style={{ textAlign: "center", color: "var(--textMuted)" }}>Loading Systems Matrix...</div>}>
              <TechStack />
            </Suspense>
            <Contact />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
