import { useEffect } from "react";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import MatrixBackground from "./MatrixBackground";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import Telemetry from "./Telemetry";
import Work from "./Work";
import { initialFX } from "./utils/initialFX";
import { initScrollFX } from "./utils/scrollFX";

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
        <Work />
        <Career />
        <Telemetry />
        <Contact />
      </main>
    </div>
  );
};

export default MainContainer;
