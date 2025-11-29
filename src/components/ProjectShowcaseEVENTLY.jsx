import React, { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectShowcaseEVENTLY.css";

// ============================================================================
// ASSETS - PLACEHOLDERS
// NOTE: I am using placeholders since I cannot access your local assets.
// You should ensure these paths are correct in your final code.
// ============================================================================
// import heroBg from "../assets/showcase-hero.png";
// import codeImage from "../assets/image.png";
// import homeScreen1 from "../assets/home/home-1.png";
// ... (rest of image imports)

// ============================================================================
// CONSTANTS
// ============================================================================
const HERO_BG_GRADIENT =
  "linear-gradient(135deg, rgba(44,62,92,0.75) 0%, rgba(26,37,56,0.75) 100%)";

const OBSERVER_CONFIG = {
  root: null,
  rootMargin: "0px 0px -10% 0px",
  threshold: 0.12,
};
const REVEAL_DELAY_MULTIPLIER = 80;

const TAGS = ["REACT NATIVE", "SOCKET.IO", "TEAM MANAGEMENT", "REAL-TIME"];

const PROJECT_INFO = [
  { icon: "👤", title: "Role", description: "Fullstack Developer & Designer" },
  { icon: "⏱️", title: "Duration", description: "3 Months" },
  { icon: "📅", title: "Year", description: "2025" },
  { icon: "🧠", title: "Stack", description: "React Native, Node.js, Socket.io" },
];

const DESIGN_PROCESS_STEPS = [
  {
    number: "01",
    title: "Research & Discovery",
    description:
      "Event management workflows are scattered across disconnected tools — chat apps, spreadsheets, and manual trackers — creating friction and confusion. My research identified the core gap: a lack of <span class='highlight-text'>single source of truth</span> for real-time team coordination.",
  },
  {
    number: "02",
    title: "Wireframing & Prototyping",
    description:
      "I began with low-fidelity wireframes in Figma, focusing on intuitive navigation and task flow for high-stress scenarios. Key decisions involved prioritizing the real-time 'Status' view and ensuring all critical actions are <span class='highlight-text'>one-tap accessible</span> on mobile.",
  },
  {
    number: "03",
    title: "Visual Design & Branding",
    description:
      "The 'EVENTLY' visual identity required a mature, trustworthy, yet vibrant feel. I chose a dark, deep-blue base with a bright yellow-gold accent for urgency and clarity. The color palette ensures accessibility and <span class='highlight-text'>high contrast</span> for on-the-go viewing.",
  },
  {
    number: "04",
    title: "Development & Integration",
    description:
      "Built with <span class='highlight-text'>React Native</span> and a Node.js/Socket.io backend, the development phase focused on optimizing real-time data flow. Performance profiling was critical to ensure smooth, low-latency updates across all active user devices.",
  },
];

const KEY_FEATURES = [
  {
    icon: "📡",
    title: "Real-Time Team Status",
    description:
      "Leveraging Socket.io, the app provides instant updates on task completion, resource availability, and team member location, crucial for dynamic event environments.",
    size: "medium",
  },
  {
    icon: "⚙️",
    title: "Configurable Workflows",
    description:
      "Project managers can set up custom pipelines for common events (e.g., Setup, Doors Open, Cleanup) with automated notifications and permission sets.",
    size: "tall",
  },
  {
    icon: "🗺️",
    title: "Geo-Fenced Task Assignment",
    description:
      "Tasks can be tied to specific physical locations. Team members receive priority alerts when they enter the designated area, boosting efficiency and accountability.",
    size: "medium",
  },
  {
    icon: "📋",
    title: "Intuitive Mobile Dashboard",
    description:
      "The home screen summarizes all critical metrics—tasks overdue, open issues, and team presence—via a clean, mobile-first interface.",
    size: "wide",
  },
];

const RESULTS = [
  { stat: "35%", label: "Reduction in setup time" },
  { stat: "98%", label: "Real-time data fidelity" },
  { stat: "4.8/5", label: "User Satisfaction Score" },
];

// ============================================================================
// REUSABLE COMPONENTS
// ============================================================================

const Hero = () => (
  // *** THE FIX: Using 'koa-hero' class to apply the correct styling ***
  <div className={`showcase-hero koa-hero`}>
    <div className="showcase-hero-image">{/* Optional: Image asset here */}</div>
    <div className="hero-gradient-overlay"></div>
    <div className="showcase-hero-content glass-effect reveal">
      <h1 className="showcase-title">Evently</h1>
      <div className="showcase-tags">
        {TAGS.map((tag) => (
          <span key={tag} className="showcase-tag">
            {tag}
          </span>
        ))}
      </div>
      <p className="showcase-subtitle">
        A real-time, collaborative event management platform for high-stakes,
        fast-paced operations.
      </p>
    </div>
  </div>
);

const ProjectOverview = () => (
  <div className="showcase-section reveal">
    <h2 className="showcase-section-title">Project Overview</h2>
    <div className="showcase-grid">
      <div className="showcase-inner-grid">
        {PROJECT_INFO.map((item) => (
          <div key={item.title} className="showcase-info-card">
            <div className="showcase-icon-h3-wrap">
              <span className="info-card-icon" role="img" aria-label={item.title}>
                {item.icon}
              </span>
              <h3>{item.title}</h3>
            </div>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <p className="showcase-info-card-para">
        EVENTLY was a passion project aimed at solving common organizational
        challenges in high-volume event planning. It evolved into a robust
        fullstack application demonstrating expertise in real-time data
        synchronization and mobile-first UX design.
      </p>
    </div>
  </div>
);

const Challenge = () => (
  <div className="showcase-section reveal">
    <h2 className="showcase-section-title highlight-title">The Challenge</h2>
    <div className="showcase-text">
      <p>
        The core problem in event coordination is information lag. Teams rely on
        slow, static systems (emails, radio, spreadsheets) that fail when a
        dynamic situation demands immediate action. The goal was to build a
        platform that provided a unified, real-time, and mobile-optimized
        dashboard where every team member, from logistics to security, saw the
        exact same, up-to-the-second status.
      </p>
    </div>
  </div>
);

const Solution = () => (
  <div className="showcase-section reveal">
    <h2 className="showcase-section-title highlight-title">The Solution</h2>
    <div className="showcase-text">
      <p>
        My solution was a <span className="highlight-text">React Native</span>{" "}
        mobile app backed by a Node.js/Express server using{" "}
        <span className="highlight-text">Socket.io</span>. This architecture
        enabled instant, bidirectional communication, transforming the event
        workflow from a sequential list of tasks into a fluid, adaptive system.
      </p>
      <ul>
        <li>
          **Status-First Design:** The dashboard prioritizes status updates over
          deep-dive menus.
        </li>
        <li>
          **Real-Time Map View:** Integrates team locations for resource
          management.
        </li>
        <li>
          **Offline Task Caching:** Ensures team members can work even with
          intermittent connectivity.
        </li>
      </ul>
    </div>
  </div>
);

const DesignProcess = () => (
  <div className="showcase-section reveal">
    <h2 className="showcase-section-title highlight-title">Design Process</h2>
    <div className="flowchart-body">
      {DESIGN_PROCESS_STEPS.map((step, index) => (
        <div key={step.number} className="flowchart-step reveal">
          <div className="flowchart-node">{step.number}</div>
          {index < DESIGN_PROCESS_STEPS.length - 1 && (
            <div className="flowchart-connector"></div>
          )}
          <div className="process-step">
            <h3>{step.title}</h3>
            <p
              className="process-para"
              dangerouslySetInnerHTML={{ __html: step.description }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const KeyFeatures = () => (
  <div className="showcase-section reveal">
    <h2 className="showcase-section-title">Key Features</h2>
    <div className="bento-grid">
      {KEY_FEATURES.map((feature) => (
        <div key={feature.title} className={`bento-item reveal ${feature.size}`}>
          <span className="bento-icon" role="img" aria-label={feature.title}>
            {feature.icon}
          </span>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const VisualDesign = () => (
  <div className="showcase-section reveal">
    <h2 className="showcase-section-title">Visual Design</h2>
    <div className="visual-subsection reveal">
      <h3 className="visual-subtitle">Typography</h3>
      <div className="showcase-text">
        <p>
          The interface uses **Bebas Neue** for bold, display headlines to convey
          urgency and importance, and **Inter** for all body text, ensuring high
          readability on mobile devices.
        </p>
      </div>
      <div className="typography-preview">
        <div className="font-sample bebas">Evently</div>
        <div className="font-sample inter">Seamless Experience</div>
      </div>
    </div>

    <div className="visual-subsection reveal">
      <h3 className="visual-subtitle">Color Palette</h3>
      <div className="showcase-text">
        <p>
          The palette is driven by the dark, professional **Accent Dark** (#2c3e5c)
          and a high-visibility **Accent Cream** (#ffe395) for all primary calls
          to action and alerts.
        </p>
      </div>
      <div className="color-palette">
        <div
          className="color-swatch"
          style={{ background: "#2c3e5c", color: "#ffe395" }}
        >
          Accent Dark #2c3e5c
        </div>
        <div
          className="color-swatch"
          style={{ background: "#1a2538", color: "#ffe395" }}
        >
          Accent Deep #1a2538
        </div>
        <div
          className="color-swatch"
          style={{ background: "#ffe395", color: "#2c3e5c" }}
        >
          Accent Cream #ffe395
        </div>
        <div
          className="color-swatch"
          style={{ background: "#f9f9f9", color: "#3b3b3b" }}
        >
          Card BG #f9f9f9
        </div>
      </div>
    </div>
  </div>
);

const FinalDesigns = () => (
  <div className="showcase-section reveal showcase-section-last">
    <h2 className="showcase-section-title">Final Designs</h2>

    <div className="final-design-subsection reveal">
      <h3 className="final-subtitle">Core Mobile Screens</h3>
      <div className="showcase-text">
        <p>
          The final implementation features a clean, hierarchical design, ensuring
          that critical task and team data is never more than a glance away.
        </p>
      </div>
      <div className="mockup-row">
        <div className="mockup-placeholder">
          <div className="mockup-device">Home Dashboard</div>
        </div>
        <div className="mockup-placeholder">
          <div className="mockup-device">Task List</div>
        </div>
        <div className="mockup-placeholder">
          <div className="mockup-device">Real-Time Chat</div>
        </div>
      </div>
    </div>
  </div>
);

const Development = () => (
  <div className="showcase-section reveal">
    <h2 className="showcase-section-title">Development & Code</h2>
    <div className="showcase-text">
      <p>
        As a fullstack developer, the challenge was in architecting the{" "}
        <span className="highlight-text">real-time sync</span> between the React
        Native front-end and the Node.js backend to handle hundreds of concurrent
        connections without performance degradation.
      </p>
    </div>
    <div className="code-collage-grid">
      <div className="code-card large reveal">
        {/* Placeholder for a code snippet image/component */}
        Node.js Socket Handler Snippet
      </div>
      <div className="code-card medium reveal">
        React Native Component Logic
      </div>
      <div className="code-card small reveal">
        Redux/Context Management
      </div>
    </div>

    <div className="github-link-wrap reveal">
      <a href="#" className="github-button" target="_blank" rel="noopener noreferrer">
        {/* Placeholder for GitHub Icon */}
        View Project on GitHub
      </a>
    </div>
  </div>
);

const KeyLearnings = () => (
  <div className="showcase-section reveal showcase-section-last">
    <h2 className="showcase-section-title highlight-title">Key Learnings</h2>
    <div className="showcase-text">
      <p>
        The most valuable takeaway was mastering the state management lifecycle
        in a fully real-time environment. I learned that premature optimization
        of socket data transmission can be just as detrimental as un-optimized
        data queries. Furthermore, developing complex UI with{" "}
        <span className="highlight-text">React Native animations</span> and custom
        layout hooks was an excellent exercise in performance-minded component
        design.
      </p>
      <div className="showcase-results">
        {RESULTS.map((item) => (
          <div key={item.stat} className="result-stat reveal">
            <h3>{item.stat}</h3>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function ProjectShowcaseEVENTLY() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Hook for closing modal
  const handleClose = useCallback(
    (e) => {
      e?.stopPropagation();
      navigate(-1);
    },
    [navigate]
  );

  // Hook for keyboard close (Escape key)
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") handleClose();
    },
    [handleClose]
  );

  // Hook for side-effect setup
  useEffect(() => {
    // 1. Manage body overflow for modal effect
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden auto";
    
    // 2. Add keyboard listener
    window.addEventListener("keydown", handleKeyDown);
    
    // 3. Setup Intersection Observer for reveal animations
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      OBSERVER_CONFIG
    );

    const targets = containerRef.current?.querySelectorAll(".reveal");
    targets?.forEach((t, i) => {
      t.style.setProperty("--reveal-delay", `${i * REVEAL_DELAY_MULTIPLIER}ms`);
      observer.observe(t);
    });

    // Cleanup function
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      observer.disconnect();
    };
  }, [handleKeyDown]);

  return (
    <div className="showcase-overlay" onClick={handleClose} aria-modal="true" role="dialog">
      <div
        className="showcase-container"
        onClick={(e) => e.stopPropagation()}
        ref={containerRef}
        aria-label="EVENTLY showcase"
      >
        <button
          className="showcase-close"
          onClick={handleClose}
          aria-label="Close showcase"
        >
          <span>&times;</span>
        </button>

        {/* HERO SECTION */}
        <Hero />

        {/* MAIN CONTENT */}
        <div className="showcase-body">
          <ProjectOverview />
          <Challenge />
          <Solution />
          <DesignProcess />
          <KeyFeatures />
          <VisualDesign />
          <FinalDesigns />
          <Development />
          <KeyLearnings />
        </div>
      </div>
    </div>
  );
}