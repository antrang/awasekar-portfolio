import React from "react";
import HoverLinks from "./HoverLinks";
import "./styles/Navbar.css";

const Navbar = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", href);
    }
  };

  return (
    <>
      <header className="header" role="banner">
        <div className="navbar-container">
          <div className="navbar-left">
            <a href="/#" className="navbar-brand" data-cursor="disable" aria-label="Sourabh Awasekar Home">
              <span className="brand-monogram">AW</span>
              <span className="brand-dot"></span>
            </a>
            <a
              href="/Awasekar_Sourabh_Resume_2026.pdf"
              className="navbar-resume"
              data-cursor="disable"
              target="_blank"
              rel="noreferrer"
              download="Awasekar_Sourabh_Resume_2026.pdf"
            >
              RESUME PDF
            </a>
          </div>

          <a
            href="https://www.linkedin.com/in/awasekar/"
            className="navbar-connect"
            data-cursor="disable"
            target="_blank"
            rel="noreferrer"
          >
            <span className="connect-indicator"></span>
            linkedin.com/in/awasekar
          </a>

          <nav className="navbar-nav" aria-label="Main Navigation">
            <ul>
              <li>
                <a href="#about" onClick={(e) => handleNavClick(e, "#about")}>
                  <HoverLinks text="ABOUT" />
                </a>
              </li>
              <li>
                <a href="#pillars" onClick={(e) => handleNavClick(e, "#pillars")}>
                  <HoverLinks text="PILLARS" />
                </a>
              </li>
              <li>
                <a href="#work" onClick={(e) => handleNavClick(e, "#work")}>
                  <HoverLinks text="SYSTEMS" />
                </a>
              </li>
              <li>
                <a href="#career" onClick={(e) => handleNavClick(e, "#career")}>
                  <HoverLinks text="CAREER" />
                </a>
              </li>
              <li>
                <a href="#commits" onClick={(e) => handleNavClick(e, "#commits")}>
                  <HoverLinks text="COMMITS" />
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>
                  <HoverLinks text="CONTACT" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
