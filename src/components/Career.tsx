import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Founder</h4>
                <h5>VoxentraAI</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Leading the vision, strategy, and development of an AI-focused startup aimed at Closing the Empathy and Latency Gap in conversational AI. Responsible for the end-to-end project lifecycle and architectural design.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Web Developer Intern</h4>
                <h5>CodeAther</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Contributed to the development of FitFuel, an AI-driven project. Collaborated on both front-end and back-end tasks, applying modern web technologies to deliver features in a professional environment.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Core Member</h4>
                <h5>GDSC - SDIET</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Organized technical workshops, coding events, and seminars. Fostered a collaborative environment to help students learn and grow technical skills while contributing to the campus tech community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
