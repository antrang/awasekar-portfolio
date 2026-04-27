import { MdArrowOutward } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact Me</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a
                href="https://www.linkedin.com/in/awasekar/"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                LinkedIn — Sourabh Awasekar
              </a>
            </p>
            <h4>Education</h4>
            <p>
              B.E. Chemical + M.Sc. Chemistry + Minor in Accounting & Finance
              <br />
              Birla Institute of Technology and Science, Pilani (Goa Campus) —
              2015–2021
            </p>
          </div>
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:work@awasekar.com" data-cursor="disable">
                work@awasekar.com
              </a>
            </p>
            <h4>Social</h4>
            <a
              href="https://github.com/antrang"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/awasekar/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
