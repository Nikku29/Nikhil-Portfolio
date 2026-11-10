import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:nikhilsharma.gdscgenai@gmail.com" data-cursor="disable">
                nikhilsharma.gdscgenai@gmail.com
              </a>
            </p>
            <h4>Education</h4>
            <p>
              B.Tech in Computer Science & Engineering
              <br />
              Satyug Darshan Institute of Engineering & Technology
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/Nikku29"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/nikhil-sharma-21a184265?"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href="https://discord.gg/5kYwywpmDT"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Discord <MdArrowOutward />
            </a>
            <a
              href="https://www.instagram.com/nothing__09___?igsh=Z21lZnJkbDZiOG9k"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Nikhil Sharma</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
            {/* Required by the model's CC BY 4.0 licence. */}
            <p className="model-credit">
              3D model "Kratos" by{" "}
              <a
                href="https://sketchfab.com/3d-models/kratos-aa6f51d38b154373a207d20801d1b3bc"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
              >
                codyc2228
              </a>
              , licensed under{" "}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
              >
                CC BY 4.0
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
