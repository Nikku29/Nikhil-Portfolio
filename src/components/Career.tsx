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
                <h4>CTO & Co-founder</h4>
                <h5>
                  <a
                    href="https://stoodant.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="career-link"
                    data-cursor="disable"
                  >
                    Stoodant ↗
                  </a>
                </h5>
              </div>
              <h3>Sep 2026 - Present</h3>
            </div>
            <div className="career-desc">
              <p>
                Co-founded Stoodant, a live online tuition platform for Class 4 to 10 students (CBSE & ICSE), and single-handedly built its entire technology stack:
              </p>
              <ul>
                <li>Designed and built the whole platform solo, from the public website at stoodant.com to every internal tool.</li>
                <li>Built the parent dashboard and the teacher tools that run day-to-day live classes and demo bookings.</li>
                <li>Built the online exam system that powers the Class 9 and 10 scholarship test, from registration to results.</li>
                <li>Supports live small-batch classes (1:1 to 1:20) over Zoom and Google Meet for CBSE and ICSE students.</li>
              </ul>
            </div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Founding AI Engineer & System Architect</h4>
                <h5>VoxentraAI</h5>
              </div>
              <h3>2025 - Mar 2026</h3>
            </div>
            <div className="career-desc">
              <p>
                Architected stateful multi-agent infrastructure and prompt alignment metrics for domain-specialized enterprise clients:
              </p>
              <ul>
                <li>Designed multi-turn agent execution flows using stateful graph frameworks, enforcing structured output validation schemas.</li>
                <li>Engineered high-reliability verification layers and safety guardrails to evaluate and filter outputs for deployment.</li>
                <li>Developed custom evaluation pipelines to benchmark LLM latency, factual accuracy, and syntactic correctness.</li>
                <li>Curated balanced synthetic datasets mimicking natural, contextual multi-turn conversations to align model tone.</li>
              </ul>
            </div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full-Stack Developer</h4>
                <h5>CodeAther</h5>
              </div>
              <h3>2025 - Present</h3>
            </div>
            <div className="career-desc">
              <p>
                Commenced as an intern and fast-tracked to a full-time role leading system migrations and performance optimizations:
              </p>
              <ul>
                <li>Refactored legacy modular codebases into type-safe TypeScript, reducing production exceptions by 18%.</li>
                <li>Engineered code quality standards by writing custom ESLint rules and establishing automated Husky pre-commit hooks.</li>
                <li>Integrated telemetry tracking via Sentry to monitor dynamic client-server states, cutting edge-case resolution times by 25%.</li>
                <li>Built optimized transactional synchronization pipelines utilizing Supabase and Firebase.</li>
              </ul>
            </div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Technical Educator & Core Member</h4>
                <h5>GDSC - SDIET</h5>
              </div>
              <h3>2023 - 2024</h3>
            </div>
            <div className="career-desc">
              <p>
                Served as a key technical mentor, establishing grading baselines and reviewing peer-submitted software:
              </p>
              <ul>
                <li>Evaluated, debugged, and graded code submissions for community hackathons for over 200 student developers.</li>
                <li>Developed production repository templates and custom CI/CD workflows to streamline open-source contributions.</li>
                <li>Directed live workshops demystifying advanced architectures, state management patterns, and full-stack software development pipelines.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
