import React, { useEffect, useState } from "react";
import "./ProjectShowcaseZENFLOW.css";
// Assets
import codeImage from "../assets/image.png";
import homeScreen1 from "../assets/home/home-1.png";
import homeScreen2 from "../assets/home/home-2.png";
import homeScreen3 from "../assets/home/home-3.png";
import transactionScreen1 from "../assets/transaction/transaction-1.png";
import transactionScreen2 from "../assets/transaction/transaction-2.png";
import transactionScreen3 from "../assets/transaction/transaction-3.png";
import transactionScreen4 from "../assets/transaction/transaction-4.png";
import transactionScreen5 from "../assets/transaction/transaction-5.png";
import savingsScreen1 from "../assets/savings/savings-1.png";
import savingsScreen2 from "../assets/savings/savings-2.png";
import savingsScreen3 from "../assets/savings/savings-3.png";
import savingsScreen4 from "../assets/savings/savings-4.png";
import analyticsScreen1 from "../assets/analytics/analytics01.png";
import analyticsScreen2 from "../assets/analytics/analytics02.png";
import analyticsScreen3 from "../assets/analytics/analytics03.png";
import analyticsScreen4 from "../assets/analytics/analytics04.png";
import walletScreen from "../assets/wallet/wallet.png";

// Constants
const TAGS = ["UI/UX", "ANDROID", "IOS", "REACT NATIVE", "PASSION PROJECT"];

const PROJECT_INFO = [
  { icon: "👤", title: "Role", description: "UI/UX Designer & Developer" },
  { icon: "⏱️", title: "Duration", description: "4 Months" },
  { icon: "📅", title: "Year", description: "2024" },
  { icon: "📱", title: "Platform", description: "iOS & Android" }
];

const KEY_FEATURES = [
  {
    icon: "🧘",
    title: "Guided Meditation",
    description: "AI-powered meditation sessions that adapt to your mood and stress levels, providing personalized mindfulness experiences.",
    size: "large"
  },
  {
    icon: "😴",
    title: "Sleep Tracking",
    description: "Monitor your sleep patterns and receive insights to improve sleep quality with personalized recommendations.",
    size: "medium"
  },
  {
    icon: "📊",
    title: "Mood Analytics",
    description: "Track your emotional well-being over time with beautiful visualizations and actionable insights.",
    size: "wide"
  },
  {
    icon: "🎯",
    title: "Wellness Goals",
    description: "Set and achieve personal wellness milestones with progress tracking and motivational reminders.",
    size: "tall"
  },
  {
    icon: "🎵",
    title: "Ambient Soundscapes",
    description: "Curated collection of calming sounds and music to enhance your meditation and relaxation sessions.",
    size: "medium"
  },
  {
    icon: "⚡",
    title: "Real-Time Sync",
    description: "All your wellness data syncs instantly across devices using Supabase for seamless tracking.",
    size: "wide"
  }
];

const DESIGN_PROCESS_STEPS = [
  {
    number: "01",
    title: "Research & Discovery",
    description: "Mental wellness apps often feel <span class='highlight-text'>clinical and overwhelming</span>. Users struggle with complex interfaces that add stress instead of reducing it. The challenge was to design a <span class='highlight-text'>calming, intuitive experience</span> that feels like a peaceful sanctuary."
  },
  {
    number: "02",
    title: "Information Architecture",
    description: "ZENFLOW bridges that gap — a <span class='highlight-text'>holistic wellness companion</span> that simplifies mindfulness and mental health tracking.<br /><br />Built with <span class='highlight-text'>React Native</span> and a <span class='highlight-text'>Node.js + Supabase</span> backend, ZENFLOW combines <span class='highlight-text'>meditation, sleep tracking, and mood analytics</span> in one cohesive platform."
  },
  {
    number: "03",
    title: "Visual Design",
    description: "The design process followed a calming, iterative flow:<br /><br />• <span class='highlight-text'>Research & Discovery:</span> Studied apps like Calm, Headspace, and Insight Timer to identify pain points.<br />• <span class='highlight-text'>Wireframing:</span> Focused on minimal-tap flows for meditation sessions and mood tracking.<br />• <span class='highlight-text'>Visual Design:</span> Built a soothing pastel palette for mental peace and clarity.<br />• <span class='highlight-text'>Prototyping:</span> Tested interactive Figma prototypes to refine the meditation experience."
  },
  {
    number: "04",
    title: "Development & Testing",
    description: "ZENFLOW successfully turned wellness tracking into an experience that feels <span class='highlight-text'>natural and peaceful</span>.<br /><br />Every screen encourages calm and mindfulness — transforming mental health management into <span class='highlight-text'>a journey of self-discovery and growth.</span>"
  }
];

const SCREEN_SECTIONS = [
  { title: "Auth Screens", screens: [], placeholder: true, count: 3 },
  {
    title: "Home Screens",
    screens: [
      { src: homeScreen1, alt: "ZENFLOW Home Screen - Dashboard" },
      { src: homeScreen2, alt: "ZENFLOW Home Screen - Meditation" },
      { src: homeScreen3, alt: "ZENFLOW Home Screen - Sleep" }
    ]
  },
  {
    title: "Meditation Screens",
    screens: [
      { src: transactionScreen1, alt: "ZENFLOW Meditation - Sessions" },
      { src: transactionScreen2, alt: "ZENFLOW Meditation - Active Session" },
      { src: transactionScreen3, alt: "ZENFLOW Meditation - Completed" },
      { src: transactionScreen4, alt: "ZENFLOW Meditation - Library" },
      { src: transactionScreen5, alt: "ZENFLOW Meditation - Favorites" }
    ]
  },
  {
    title: "Mood Tracking",
    screens: [
      { src: savingsScreen1, alt: "ZENFLOW Mood - Dashboard" },
      { src: savingsScreen2, alt: "ZENFLOW Mood - Log Entry" },
      { src: savingsScreen3, alt: "ZENFLOW Mood - History" },
      { src: savingsScreen4, alt: "ZENFLOW Mood - Insights" }
    ]
  },
  {
    title: "Analytics",
    screens: [
      { src: analyticsScreen1, alt: "ZENFLOW Analytics - Overview" },
      { src: analyticsScreen2, alt: "ZENFLOW Analytics - Sleep Trends" },
      { src: analyticsScreen3, alt: "ZENFLOW Analytics - Mood Patterns" },
      { src: analyticsScreen4, alt: "ZENFLOW Analytics - Progress" }
    ]
  },
  {
    title: "Sleep Tracking",
    screens: [{ src: walletScreen, alt: "ZENFLOW Sleep - Overview" }]
  },
  { title: "Settings & Profile", screens: [], placeholder: true, count: 2 }
];

const COLOR_SWATCHES = [
  { color: "#2C3E5C", textColor: "#fff" },
  { color: "#1a2538", textColor: "#fff" },
  { color: "#E8DCC4", textColor: "#2C3E5C" },
  { color: "#ffffff", textColor: "#2C3E5C" },
  { color: "#f9f9f9", textColor: "#2C3E5C" }
];

const CODE_IMAGES = [
  { src: codeImage, alt: "ZENFLOW API Integration", size: "large" },
  { src: codeImage, alt: "Authentication Logic", size: "small" },
  { src: codeImage, alt: "Meditation Service Function", size: "medium" },
];

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

// Hero Component
const Hero = () => (
  <div className="showcase-hero koa-hero animate-hero">
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
      <div className="hero-badge">Wellness Reimagined</div>
      <h1 className="showcase-title">ZENFLOW</h1>
      <div className="showcase-tags">
        <span className="showcase-tag">React Native</span>
        <span className="showcase-tag">AI UX</span>
        <span className="showcase-tag">Wellness App</span>
        <span className="showcase-tag">iOS</span>
        <span className="showcase-tag">Android</span>
        <span className="showcase-tag">Passion Project</span>
      </div>
      <p className="showcase-subtitle">
        ZENFLOW transforms how you approach mental wellness — blending meditation,
        sleep tracking, and mood analytics into one calm, intelligent mindfulness
        experience. Built with React Native, Node.js, and Supabase for
        real-time peace across all your devices.
      </p>
    </div>
  </div>
);

// Info Card Component
const InfoCard = ({ icon, title, description, index }) => (
  <div className="showcase-info-card reveal" style={{ animationDelay: `${index * 0.1}s` }}>
    <div className="showcase-icon-h3-wrap">
      <div className="info-card-icon">{icon}</div>
      <h3>{title}</h3>
    </div>
    <p>{description}</p>
  </div>
);

// Project Overview Section
const ProjectOverview = () => (
  <section className="showcase-section reveal">
    <h2 className="showcase-section-title highlight-title">Project Overview</h2>
    <div className="showcase-grid">
      <div className="showcase-inner-grid">
        {PROJECT_INFO.map((info, idx) => (
          <InfoCard key={idx} {...info} index={idx} />
        ))}
      </div>

      <div className="showcase-info-card-para reveal">
        Let's be honest —{" "}
        <span className="highlight-text">managing mental wellness isn't easy</span>.
        Between meditation apps, sleep trackers, and mood journals,
        users constantly jump between platforms just to stay
        mentally balanced. That's exactly what{" "}
        <span className="highlight-text">ZENFLOW</span> fixes.
        <br /><br />
        ZENFLOW is a{" "}
        <span className="highlight-text">full-stack React Native app</span>{" "}
        that combines{" "}
        <span className="highlight-text">
          meditation, sleep tracking, and mood analytics
        </span>{" "}
        into one clean, peaceful platform. It's built for people who
        want{" "}
        <span className="highlight-text">
          mental clarity without the complexity
        </span>
        .
      </div>
    </div>
  </section>
);

// Challenge Section
const Challenge = () => (
  <section className="showcase-section reveal">
    <h2 className="showcase-section-title highlight-title">Challenge</h2>
    <p className="showcase-text">
      Let's face it —{" "}
      <span className="highlight-text">
        managing mental wellness across different tools is overwhelming
      </span>
      . Most people juggle between multiple apps: one for meditation, one
      for sleep, and another for mood tracking. The result?{" "}
      <span className="highlight-text">
        Scattered data, unclear patterns, and added stress
      </span>
      .
    </p>
  </section>
);

// Solution Section
const Solution = () => (
  <section className="showcase-section reveal">
    <h2 className="showcase-section-title highlight-title">Solution</h2>
    <p className="showcase-text">
      ZENFLOW was designed to bridge that exact gap — a{" "}
      <span className="highlight-text">
        one-stop wellness companion
      </span>{" "}
      that simplifies mental health management.
      <br /><br />
      I designed and developed ZENFLOW using{" "}
      <span className="highlight-text">React Native</span> for seamless
      cross-platform performance, backed by a{" "}
      <span className="highlight-text">Node.js + Supabase</span> stack
      for real-time data sync and secure authentication.
    </p>
  </section>
);

// Design Process Section
const DesignProcess = () => (
  <section className="showcase-section reveal">
    <h2 className="showcase-section-title highlight-title">Design Process</h2>
    <div className="flowchart-body">
      {DESIGN_PROCESS_STEPS.map((step, index) => (
        <div key={step.number} className="flowchart-step reveal" style={{ animationDelay: `${index * 0.15}s` }}>
          <div className="flowchart-node">{step.number}</div>
          <div className="flowchart-connector"></div>
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

// Key Features Section
const KeyFeatures = () => (
  <section className="showcase-section reveal">
    <h2 className="showcase-section-title highlight-title">Key Features</h2>
    <div className="bento-grid">
      {KEY_FEATURES.map((feature, idx) => (
        <div key={idx} className={`bento-item ${feature.size} reveal`} style={{ animationDelay: `${idx * 0.1}s` }}>
          <div className="bento-icon">{feature.icon}</div>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  </section>
);

// Visual Design Section
const VisualDesign = () => (
  <section className="showcase-section reveal">
    <h2 className="showcase-section-title highlight-title">Visual Design</h2>

    <div className="visual-subsection reveal">
      <h3 className="visual-subtitle">Wireframes</h3>
      <p className="showcase-text">
        I started with low-fidelity <span className="highlight-text">wireframes</span> to validate core flows —
        meditation sessions, sleep tracking, and mood logging.
      </p>
      <div className="visual-image-placeholder">Wireframe Mockups Here</div>
    </div>

    <div className="visual-subsection reveal">
      <h3 className="visual-subtitle">Typography</h3>
      <p className="showcase-text">
        ZENFLOW uses a dual-type system to maintain both <span className="highlight-text">serenity</span> and <span className="highlight-text">readability</span>.
        <br />
        <b>Bebas Neue</b> delivers bold, confident headings, while <b>Inter</b> ensures clarity across interfaces.
      </p>
      <div className="typography-preview">
        <div className="font-sample bebas reveal">Aa Bb Cc — Bebas Neue</div>
        <div className="font-sample inter reveal">Aa Bb Cc — Inter</div>
      </div>
    </div>

    <div className="visual-subsection reveal">
      <h3 className="visual-subtitle">Color Scheme</h3>
      <p className="showcase-text">
        ZENFLOW's palette conveys <span className="highlight-text">peace and tranquility</span>.
        Deep navy tones represent stability, while soft cream and neutral grays introduce warmth and balance.
      </p>
      <div className="color-palette">
        {COLOR_SWATCHES.map((swatch, idx) => (
          <div
            key={idx}
            className="color-swatch reveal"
            style={{
              background: swatch.color,
              color: swatch.textColor,
              animationDelay: `${idx * 0.1}s`
            }}
          >
            {swatch.color.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Screen Components
const ScreenImage = ({ src, alt }) => (
  <div className="mockup-placeholder reveal">
    <img
      src={src}
      alt={alt}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        borderRadius: '16px'
      }}
    />
  </div>
);

const ScreenPlaceholder = ({ label }) => (
  <div className="mockup-placeholder reveal">
    <div className="mockup-device">
      <p>{label}</p>
    </div>
  </div>
);

// Final Designs Section
const FinalDesigns = () => (
  <section className="showcase-section reveal">
    <h2 className="showcase-section-title highlight-title">Final Designs</h2>
    <p className="showcase-text">
      The visual identity and structure of ZENFLOW translate into an intuitive, calming interface across all touchpoints.
    </p>

    {SCREEN_SECTIONS.map((section, idx) => (
      <div key={idx} className="final-design-subsection reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
        <h3 className="final-subtitle">{section.title}</h3>
        <div
          className="mockup-row"
          style={
            section.title === "Meditation Screens"
              ? { gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }
              : undefined
          }
        >
          {section.placeholder
            ? Array.from({ length: section.count }, (_, i) => (
              <ScreenPlaceholder
                key={i}
                label={`${section.title.replace(' Screens', '').replace(' & Profile', '')} ${i + 1}`}
              />
            ))
            : section.screens.map((screen, i) => (
              <ScreenImage key={i} {...screen} />
            ))}
        </div>
      </div>
    ))}
  </section>
);

// Development Section
const Development = () => (
  <section className="showcase-section reveal">
    <h2 className="showcase-section-title highlight-title">Development</h2>

    <p className="showcase-text">
      ZENFLOW was engineered with a focus on <span className="highlight-text">performance</span> and
      <span className="highlight-text"> mindfulness</span>.
      Built using <span className="highlight-text">React Native</span> and
      <span className="highlight-text"> Node.js + Supabase</span>, the architecture ensures seamless real-time updates.
    </p>

    <div className="code-collage">
      {CODE_IMAGES.map((code, idx) => (
        <div key={idx} className={`code-card ${code.size} reveal`} style={{ animationDelay: `${idx * 0.1}s` }}>
          <img src={code.src} alt={code.alt} />
        </div>
      ))}
    </div>

    <div className="github-link-wrap reveal">
      <a
        href="https://github.com/Rehanaparbin02/PaisaWise"
        className="github-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ marginRight: "8px" }}
        >
          <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.09 3.29 9.41 7.86 10.94.58.11.79-.26.79-.58v-2.04c-3.2.7-3.88-1.37-3.88-1.37-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.73 1.26 3.4.96.11-.76.41-1.26.75-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 5.8 0c2.2-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.42.36.8 1.06.8 2.14v3.17c0 .32.21.7.8.58A10.53 10.53 0 0 0 23.5 12C23.5 5.74 18.26.5 12 .5Z" />
        </svg>
        View Project on GitHub
      </a>
    </div>
  </section>
);

// Key Learnings Section
const KeyLearnings = () => (
  <section className="showcase-section showcase-section-last reveal">
    <h2 className="showcase-section-title highlight-title">Key Learnings</h2>
    <p className="showcase-text">
      Building ZENFLOW reinforced that great wellness tools should feel
      like a peaceful sanctuary, not another source of stress. The most impactful
      features were those that reduced friction—guided sessions and
      smart insights helped users find calm effortlessly.
    </p>
  </section>
);

// Main Component
export default function ProjectShowcaseZENFLOW() {
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