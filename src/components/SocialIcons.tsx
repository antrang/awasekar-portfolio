import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";

const SocialIcons = () => {
  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a
            href="https://github.com/antrang"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            data-cursor="disable"
          >
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/awasekar/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            data-cursor="disable"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a
            href="https://www.instagram.com/antrang_music/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram Profile"
            data-cursor="disable"
          >
            <FaInstagram />
          </a>
        </span>
      </div>
    </div>
  );
};

export default SocialIcons;
