import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

type Project = {
  title: string;
  category: string;
  tools: string;
  image: string;
  description: string;
  link?: string;
};

const projects: Project[] = [
  {
    title: "Stoodant",
    category: "Live Online Tuition Platform (Co-founder & CTO)",
    tools: "Built solo: Website, Parent Dashboard, Teacher Tools, Online Exams",
    image: "/images/Stoodant.webp",
    link: "https://stoodant.com",
    description: "Co-founded Stoodant, a live online tuition service for Class 4 to 10 students in CBSE and ICSE schools, taught in small batches from 1:1 to 1:20. Single-handedly built the entire platform: the public website, the parent dashboard, the teacher tools and the online exam system behind the scholarship test."
  },
  {
    title: "FitFuel",
    category: "Multi-Model Expert System",
    tools: "React, TypeScript, Next.js, OpenRouter, Ollama",
    image: "/images/FitFuel.webp",
    description: "Built a Mixture of Experts (MoE) routing architecture that parses user prompt semantic intent to dynamically delegate queries to specialized underlying LLMs. Implemented spatial computer vision models to identify dish geometries, mapping outputs into structured, deterministic nutritional datasets. Designed a local sandbox using Ollama for safety guardrails."
  },
  {
    title: "LAMBDA",
    category: "Live Attendance Monitoring System",
    tools: "Python, OpenCV, Firebase, Node.js",
    image: "/images/LambdaAttendance.webp",
    description: "Designed a high-security hardware-software authentication architecture, binding multi-threaded facial recognition tracking modules with physical RFID reader events. Structured low-latency websocket listeners to sync event telemetry with live Firestore nodes, ensuring instantaneous UI rendering."
  },
  {
    title: "Autonomous Multi-Stage Pipeline",
    category: "Lead Processing Automation",
    tools: "n8n, JavaScript, API Integrations",
    image: "/images/JobApplyerAutomation.webp",
    description: "Constructed background data-scraping workflows evaluating incoming listings against developer skill profiles with zero-latency overhead. Devised prompt engineering structures specifically configured to optimize factual context retrieval, preventing generative hallucination in targeted proposals."
  },
  {
    title: "Real-Time Driver Distraction Tracker",
    category: "Computer Vision Safety System",
    tools: "Python, OpenCV, TensorFlow, Streamlit",
    image: "/images/DriverDistractionDetection.webp",
    description: "Built an offline convolutional neural network (CNN) model parsing video stream points to identify and trigger metrics signaling distraction. Optimized inference pipeline bottlenecks to stabilize latency metrics below 30ms per frame."
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                        {project.link && (
                          <a
                            className="carousel-visit"
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="disable"
                          >
                            Visit {project.link.replace(/^https?:\/\//, "")} ↗
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage
                        image={project.image}
                        alt={project.title}
                        link={project.link}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
