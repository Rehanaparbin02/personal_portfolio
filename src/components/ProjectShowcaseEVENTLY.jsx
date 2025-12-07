import React, { useEffect, useState } from "react";
import "./ProjectShowcaseEVENTLY.css";

// ============================================================================
// CONSTANTS
// ============================================================================
const OBSERVER_CONFIG = {
  root: null,
  rootMargin: "0px 0px -10% 0px",
  threshold: 0.12,
};

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
// CUSTOM HOOKS
// ============================================================================

// Custom Hook for Scroll Animations
const useScrollAnimation = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

// ============================================================================
// REUSABLE COMPONENTS
// ============================================================================

const Hero = () => (
  <div className={`showcase-hero koa-hero animate-hero`}>
    <div className="hero-particles">
      {[...Array(20)].map((_, i) => (
        <div key={i} className="particle" style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${3 + Math.random() * 4}s`
        }}></div>
      ))}
    </div>

    <div className="showcase-hero-content glass-effect">
      <div className="hero-badge">Real-Time Collaboration</div>
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
  <section className="showcase-section reveal">
    <h2 className="showcase-section-title highlight-title">Project Overview</h2>
    <div className="showcase-grid">
      <div className="showcase-inner-grid">
        {PROJECT_INFO.map((item, idx) => (
          <div key={item.title} className="showcase-info-card reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
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
      <div className="showcase-info-card-para reveal">
        EVENTLY was a passion project aimed at solving common organizational
        challenges in high-volume event planning. It evolved into a robust
        fullstack application demonstrating expertise in real-time data
        synchronization and mobile-first UX design.
      </div>
    </div>
  </section>
);

const Challenge = () => (
  <section className="showcase-section reveal">
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
  </section>
);

const Solution = () => (
  <section className="showcase-section reveal">
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
  </section>
);

const DesignProcess = () => (
  <section className="showcase-section reveal">
    <h2 className="showcase-section-title highlight-title">Design Process</h2>
    <div className="flowchart-body">
      {DESIGN_PROCESS_STEPS.map((step, index) => (
        <div key={step.number} className="flowchart-step reveal" style={{ animationDelay: `${index * 0.15}s` }}>
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
  </section>
);

const KeyFeatures = () => (
  <section className="showcase-section reveal">
    <h2 className="showcase-section-title highlight-title">Key Features</h2>
    <div className="bento-grid">
      {KEY_FEATURES.map((feature, idx) => (
        <div key={feature.title} className={`bento-item reveal ${feature.size}`} style={{ animationDelay: `${idx * 0.1}s` }}>
          <span className="bento-icon" role="img" aria-label={feature.title}>
            {feature.icon}
          </span>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  </section>
);

const VisualDesign = () => (
  <section className="showcase-section reveal">
    <h2 className="showcase-section-title highlight-title">Visual Design</h2>
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
        <div className="font-sample bebas reveal">Evently</div>
        <div className="font-sample inter reveal">Seamless Experience</div>
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
          className="color-swatch reveal"
          style={{ background: "#2c3e5c", color: "#ffe395" }}
        >
          Accent Dark #2c3e5c
        </div>
        <div
          className="color-swatch reveal"
          style={{ background: "#1a2538", color: "#ffe395" }}
        >
          Accent Deep #1a2538
        </div>
        <div
          className="color-swatch reveal"
          style={{ background: "#ffe395", color: "#2c3e5c" }}
        >
          Accent Cream #ffe395
        </div>
        <div
          className="color-swatch reveal"
          style={{ background: "#f9f9f9", color: "#3b3b3b" }}
        >
          Card BG #f9f9f9
        </div>
      </div>
    </div>
  </section>
);

const FinalDesigns = () => (
  <section className="showcase-section reveal">
    <h2 className="showcase-section-title highlight-title">Final Designs</h2>

    <div className="final-design-subsection reveal">
      <h3 className="final-subtitle">Core Mobile Screens</h3>
      <div className="showcase-text">
        <p>
          The final implementation features a clean, hierarchical design, ensuring
          that critical task and team data is never more than a glance away.
        </p>
      </div>
      <div className="mockup-row">
        <div className="mockup-placeholder reveal">
          <div className="mockup-device">Home Dashboard</div>
        </div>
        <div className="mockup-placeholder reveal">
          <div className="mockup-device">Task List</div>
        </div>
        <div className="mockup-placeholder reveal">
          <div className="mockup-device">Real-Time Chat</div>
        </div>
      </div>
    </div>
  </section>
);

const Development = () => (
  <section className="showcase-section reveal">
    <h2 className="showcase-section-title highlight-title">Development & Code</h2>
    <div className="showcase-text">
      <p>
        As a fullstack developer, the challenge was in architecting the{" "}
        <span className="highlight-text">real-time sync</span> between the React
        Native front-end and the Node.js backend to handle hundreds of concurrent
        connections without performance degradation.
      </p>
    </div>
    <div className="code-collage">
      <div className="code-card large reveal">
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
        View Project on GitHub
      </a>
    </div>
  </section>
);

const KeyLearnings = () => (
  <section className="showcase-section showcase-section-last reveal">
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
        {RESULTS.map((item, idx) => (
          <div key={item.stat} className="result-stat reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
            <h3>{item.stat}</h3>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function ProjectShowcaseEVENTLY() {
  const [isLoaded, setIsLoaded] = useState(false);

  useScrollAnimation();

  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0); // Scroll to top on mount
  }, []);

  return (
    <div className={`showcase-full-page ${isLoaded ? 'loaded' : ''}`}>
      <Hero />
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
  );
}