import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      speed: 1.5,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);

    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        const section = element.getAttribute("data-href");
        if (section && window.innerWidth > 1024) {
          e.preventDefault();
          smoother.scrollTo(section, true, "top top");
        }
      });
    });

    const handleResize = () => {
      ScrollSmoother.refresh(true);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header className="header" role="banner">
        <div className="navbar-container">
          <div className="navbar-left">
            <a href="/#" className="navbar-brand" data-cursor="disable">
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
                <a data-href="#about" href="#about">
                  <HoverLinks text="ABOUT" />
                </a>
              </li>
              <li>
                <a data-href="#pillars" href="#pillars">
                  <HoverLinks text="PILLARS" />
                </a>
              </li>
              <li>
                <a data-href="#work" href="#work">
                  <HoverLinks text="SYSTEMS" />
                </a>
              </li>
              <li>
                <a data-href="#career" href="#career">
                  <HoverLinks text="CAREER" />
                </a>
              </li>
              <li>
                <a data-href="#contact" href="#contact">
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
