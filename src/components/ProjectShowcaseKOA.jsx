import React, { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectShowcaseKOA.css";
// Assets
// import heroBg from "../assets/showcase-hero.png";
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
const HERO_BG_GRADIENT = "linear-gradient(135deg, rgba(44,62,92,0.75) 0%, rgba(26,37,56,0.75) 100%)";


const TAGS = ["UI/UX", "ANDROID", "IOS", "REACT NATIVE", "PASSION PROJECT"];

const PROJECT_INFO = [
  { icon: "👤", title: "Role", description: "UI/UX Designer & Developer" },
  { icon: "⏱️", title: "Duration", description: "4 Months" },
  { icon: "📅", title: "Year", description: "2024" },
  { icon: "📱", title: "Platform", description: "iOS & Android" }
];

const KEY_FEATURES = [
  {
    icon: "📊",
    title: "Auto-Categorization",
    description: "AI-powered expense sorting that learns your spending behavior and auto-classifies transactions intelligently.",
    size: "large"
  },
  {
    icon: "💰",
    title: "Smart Savings Goals",
    description: "Set personalized goals like Vacation or Emergency Fund with progress visualization and milestone reminders.",
    size: "medium"
  },
  {
    icon: "📈",
    title: "Visual Analytics",
    description: "Deep insights with clean, interactive charts that make budgeting data-driven yet simple to digest.",
    size: "wide"
  },
  {
    icon: "🔔",
    title: "Budget Alerts",
    description: "Get proactive alerts before overspending — empowering decisions without restriction.",
    size: "tall"
  },
  {
    icon: "🤝",
    title: "Group Expense Splitting",
    description: "Manage shared bills transparently — track, split, and settle effortlessly within friend or team groups.",
    size: "medium"
  },
  {
    icon: "⚡",
    title: "Real-Time Sync",
    description: "All updates reflect instantly across devices using Supabase and live queries for blazing-fast performance.",
    size: "wide"
  }
];

const DESIGN_PROCESS_STEPS = [
  {
    number: "01",
    title: "Research & Discovery",
    description: "Let's face it — <span class='highlight-text'>managing money across personal and group expenses is a nightmare.</span> Most users juggle multiple apps: one for budgeting, one for splitting bills, and another for tracking goals. The result? <span class='highlight-text'>Scattered data, unclear spending patterns, and zero financial direction.</span><br /><br />The challenge was to design a <span class='highlight-text'>unified experience</span> that's <span class='highlight-text'>intuitive, collaborative, and visually engaging</span>."
  },
  {
    number: "02",
    title: "Information Architecture",
    description: "KOA bridges that gap — a <span class='highlight-text'>one-stop financial companion</span> that simplifies money management for individuals and groups alike.<br /><br />Built with <span class='highlight-text'>React Native</span> and a <span class='highlight-text'>Node.js + Supabase</span> backend, KOA combines <span class='highlight-text'>budgeting, goal-based savings, and Splitwise-style expense sharing</span> in one cohesive platform.<br /><br />The design emphasizes <span class='highlight-text'>clarity, collaboration, and control</span> through minimalist visuals and real-time data sync."
  },
  {
    number: "03",
    title: "Visual Design",
    description: "The design process followed a clear, iterative flow:<br /><br />• <span class='highlight-text'>Research & Discovery:</span> Studied apps like Mint, Walnut, and Splitwise to identify pain points and user needs.<br />• <span class='highlight-text'>Wireframing:</span> Focused on two-tap user flows for budgeting, expense splitting, and analytics.<br />• <span class='highlight-text'>Visual Design:</span> Built a calming pastel palette for financial trust and simplicity.<br />• <span class='highlight-text'>Prototyping:</span> Tested interactive Figma prototypes to refine flow clarity and input ergonomics.<br />• <span class='highlight-text'>Development:</span> Implemented modular UI components and smooth animations using React Native."
  },
  {
    number: "04",
    title: "Development & Testing",
    description: "KOA successfully turned financial management into an experience that feels <span class='highlight-text'>natural and engaging</span>.<br /><br />Every screen encourages clarity and confidence — transforming money management from chaos into <span class='highlight-text'>a story of progress, transparency, and collaboration.</span>"
  }
];

const SCREEN_SECTIONS = [
  { title: "Auth Screens", screens: [], placeholder: true, count: 3 },
  {
    title: "Home Screens",
    screens: [
      { src: homeScreen1, alt: "KOA Home Screen - Dashboard" },
      { src: homeScreen2, alt: "KOA Home Screen - Wallets & Savings" },
      { src: homeScreen3, alt: "KOA Home Screen - Wallets & Savings" }
    ]
  },
  {
    title: "Transaction Screens",
    screens: [
      { src: transactionScreen1, alt: "KOA Transactions - Incomes View" },
      { src: transactionScreen2, alt: "KOA Transactions - Expenses View" },
      { src: transactionScreen3, alt: "KOA Transactions - Savings View" },
      { src: transactionScreen4, alt: "KOA Transactions - Add Transaction" },
      { src: transactionScreen5, alt: "KOA Transactions - Budget Overview" }
    ]
  },
  {
    title: "Savings",
    screens: [
      { src: savingsScreen1, alt: "KOA Savings - Dashboard View" },
      { src: savingsScreen2, alt: "KOA Savings - Goals View" },
      { src: savingsScreen3, alt: "KOA Savings - Goals View" },
      { src: savingsScreen4, alt: "KOA Savings - Goals View" }
    ]
  },
  {
    title: "Analytics",
    screens: [
      { src: analyticsScreen1, alt: "KOA Analytics - Overview Dashboard" },
      { src: analyticsScreen2, alt: "KOA Analytics - Expense Trends" },
      { src: analyticsScreen3, alt: "KOA Analytics - Budget Analysis" },
      { src: analyticsScreen4, alt: "KOA Analytics - Savings Progress" }
    ]
  },
  {
    title: "Wallets",
    screens: [{ src: walletScreen, alt: "KOA Wallet - Overview" }]
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
  { src: codeImage, alt: "KOA API Integration", size: "large" },
  { src: codeImage, alt: "Authentication Logic", size: "small" },
  { src: codeImage, alt: "Expense Service Function", size: "medium" },
];

const Hero = () => (
  <div className="showcase-hero koa-hero">
    <div className="showcase-hero-image">
      <div className="hero-gradient-overlay"></div>
    </div>

    <div className="showcase-hero-content glass-effect">
      <h1 className="showcase-title">KOA</h1>
      <div className="showcase-tags">
        <span className="showcase-tag">React Native</span>
        <span className="showcase-tag">AI UX</span>
        <span className="showcase-tag">Finance App</span>
        <span className="showcase-tag">IOS</span>
        <span className="showcase-tag">REACT NATIVE</span>
        <span className="showcase-tag">PASSION PROJECT</span>
      </div>
      <p className="showcase-subtitle">
        KOA transforms how you handle money — blending automation,
        analytics, and collaboration into one calm, intelligent finance
        experience. Built with React Native, Node.js, and Supabase for
        real-time clarity across all your devices.
      </p>
    </div>
  </div>
);


const InfoCard = ({ icon, title, description }) => (
  <div className="showcase-info-card">
    <div className="showcase-icon-h3-wrap">
      <div className="info-card-icon">{icon}</div>
      <h3>{title}</h3>
    </div>
    <p>{description}</p>
  </div>
);

const ProjectOverview = () => (
  <section className="showcase-section">
    <h2 className="showcase-section-title highlight-title">Project Overview</h2>
    <div className="showcase-grid">
      <div className="showcase-inner-grid">
        {PROJECT_INFO.map((info, idx) => (
          <InfoCard key={idx} {...info} />
        ))}
      </div>

      <div className="showcase-info-card-para">
        Let's be honest —{" "}
        <span className="highlight-text">managing money isn't fun</span>.
        Between budgeting apps, expense trackers, and bill-splitting
        tools, users constantly jump between platforms just to stay
        financially organized. That's exactly what{" "}
        <span className="highlight-text">KOA</span> fixes.
        <br /><br />
        KOA is a{" "}
        <span className="highlight-text">full-stack React Native app</span>{" "}
        that combines{" "}
        <span className="highlight-text">
          budget tracking, goal-based saving, and Splitwise-style expense
          sharing
        </span>{" "}
        into one clean, intelligent platform. It's built for people who
        want{" "}
        <span className="highlight-text">
          financial clarity without the clutter
        </span>
        .
        <br /><br />
        Whether it's splitting rent with roommates, tracking monthly
        spending, or saving for that Goa trip — KOA keeps everything in
        one place. Users can see where their money goes, manage shared
        expenses transparently, and stay aligned with their goals
        through{" "}
        <span className="highlight-text">
          intuitive visuals and real-time sync
        </span>
        .
        <br /><br />
        Under the hood, KOA runs on{" "}
        <span className="highlight-text">React Native</span>, powered by a{" "}
        <span className="highlight-text">Node.js + Supabase backend</span>{" "}
        for fast, secure, and scalable performance. The UI is
        intentionally minimalist — every element designed to make
        managing money feel smooth, reliable, and even a little
        enjoyable.
        <br /><br />
        KOA isn't just another finance tracker — it's your{" "}
        <span className="highlight-text">personal money companion</span>,
        built to make budgeting{" "}
        <span className="highlight-text">
          collaborative, transparent, and stress-free
        </span>
        .
      </div>
    </div>
  </section>
);

const Challenge = () => (
  <section className="showcase-section">
    <h2 className="showcase-section-title highlight-title">Challenge</h2>
    <p className="showcase-text">
      Let's face it —{" "}
      <span className="highlight-text">
        managing money across personal budgets and group expenses is a
        nightmare
      </span>
      . Most people juggle between multiple apps: one for budgeting, one
      for splitting bills, and another for tracking goals. The result?{" "}
      <span className="highlight-text">
        Scattered data, unclear spending patterns, and no sense of
        financial direction
      </span>
      .
    </p>
    <br />
    <p className="showcase-text">
      Users needed a single space where they could:
      <br />•{" "}
      <span className="highlight-text">
        Track personal expenses and shared bills effortlessly
      </span>
      <br />•{" "}
      <span className="highlight-text">Set meaningful savings goals</span>
      <br />•{" "}
      <span className="highlight-text">
        Visualize where their money goes — without spreadsheets or
        confusion
      </span>
      <br /><br />
      The challenge wasn't just building another finance tracker. It was
      designing a{" "}
      <span className="highlight-text">
        unified experience that's simple enough for daily use
      </span>
      ,{" "}
      <span className="highlight-text">
        smart enough to handle shared payments
      </span>
      , and{" "}
      <span className="highlight-text">
        visually engaging enough to keep users coming back
      </span>
      .
    </p>
  </section>
);

const Solution = () => (
  <section className="showcase-section">
    <h2 className="showcase-section-title highlight-title">Solution</h2>
    <p className="showcase-text">
      KOA was designed to bridge that exact gap — a{" "}
      <span className="highlight-text">
        one-stop financial companion
      </span>{" "}
      that simplifies money management for individuals and groups alike.
      <br /><br />
      I designed and developed KOA using{" "}
      <span className="highlight-text">React Native</span> for seamless
      cross-platform performance, backed by a{" "}
      <span className="highlight-text">Node.js + Supabase</span> stack
      for real-time data sync and secure authentication. The entire
      experience focuses on{" "}
      <span className="highlight-text">
        clarity, collaboration, and control
      </span>
      .
      <br /><br />
      <span className="highlight-text"><b>Smart Budgeting:</b></span> Users can create personalized budgets, set limits, and visualize expenses through clean, interactive analytics.
      <br />
      <span className="highlight-text"><b>Splitwise-style Sharing:</b></span> Group expenses can be created, split, and settled transparently — no math, no awkward reminders.
      <br />
      <span className="highlight-text"><b>Goal-Based Saving:</b></span> Users can assign specific saving targets (like "New Laptop" or "Trip Fund") and track progress visually.
      <br />
      <span className="highlight-text"><b>Minimalist UI:</b></span> Designed in Figma, the interface uses soft gradients, clean typography, and simple navigation to make complex data feel effortless.
      <br />
      <span className="highlight-text"><b>Real-time Sync:</b></span> Supabase handles instant updates across users and groups — ensuring every transaction, budget, or balance stays accurate and live.
      <br /><br />
      KOA turns{" "}
      <span className="highlight-text">
        chaotic money management into an organized, collaborative, and
        goal-driven experience
      </span>
      . It doesn't just track expenses —{" "}
      <span className="highlight-text">it builds financial confidence</span>.
    </p>
  </section>
);

const DesignProcess = () => (
  <section className="showcase-section">
    <h2 className="showcase-section-title highlight-title">Design Process</h2>
    <div className="flowchart-body">
      {DESIGN_PROCESS_STEPS.map((step) => (
        <div key={step.number} className="flowchart-step">
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

const KeyFeatures = () => (
  <section className="showcase-section">
    <h2 className="showcase-section-title highlight-title">Key Features</h2>
    <div className="bento-grid">
      {KEY_FEATURES.map((feature, idx) => (
        <div key={idx} className={`bento-item ${feature.size}`}>
          <div className="bento-icon">{feature.icon}</div>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  </section>
);

const VisualDesign = () => (
  <section className="showcase-section">
    <h2 className="showcase-section-title highlight-title">Visual Design</h2>

    <div className="visual-subsection">
      <h3 className="visual-subtitle">Wireframes</h3>
      <p className="showcase-text">
        I started with low-fidelity <span className="highlight-text">wireframes</span> to validate core flows —
        creating a budget, splitting expenses, and visualizing analytics.
        Each wireframe focused on minimizing taps while keeping navigation clear and consistent.
        The goal was to make financial management feel as effortless as scrolling a feed.
      </p>
      <div className="visual-image-placeholder">Wireframe Mockups Here</div>
    </div>

    <div className="visual-subsection">
      <h3 className="visual-subtitle">Typography</h3>
      <p className="showcase-text">
        KOA uses a dual-type system to maintain both <span className="highlight-text">character</span> and <span className="highlight-text">readability</span>.
        <br />
        <b>Bebas Neue</b> delivers bold, confident headings, while <b>Inter</b> ensures clarity across interfaces.
        The pairing brings structure, hierarchy, and personality without visual clutter.
      </p>
      <div className="typography-preview">
        <div className="font-sample bebas">Aa Bb Cc — Bebas Neue</div>
        <div className="font-sample inter">Aa Bb Cc — Inter</div>
      </div>
    </div>

    <div className="visual-subsection">
      <h3 className="visual-subtitle">Color Scheme</h3>
      <p className="showcase-text">
        KOA's palette conveys <span className="highlight-text">trust and calm</span>.
        Deep navy tones represent stability, while soft cream and neutral grays introduce warmth and balance.
        The subtle gradient transitions create visual depth without distraction.
      </p>
      <div className="color-palette">
        {COLOR_SWATCHES.map((swatch, idx) => (
          <div
            key={idx}
            className="color-swatch"
            style={{ background: swatch.color, color: swatch.textColor }}
          >
            {swatch.color.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ScreenImage = ({ src, alt }) => (
  <div className="mockup-placeholder">
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
  <div className="mockup-placeholder">
    <div className="mockup-device">
      <p>{label}</p>
    </div>
  </div>
);

const FinalDesigns = () => (
  <section className="showcase-section">
    <h2 className="showcase-section-title highlight-title">Final Designs</h2>
    <p className="showcase-text">
      The visual identity and structure of KOA translate into an intuitive, high-clarity interface across all touchpoints — from onboarding to analytics.
      Each flow was refined for simplicity, legibility, and touch precision across devices.
    </p>

    {SCREEN_SECTIONS.map((section, idx) => (
      <div key={idx} className="final-design-subsection">
        <h3 className="final-subtitle">{section.title}</h3>
        <div
          className="mockup-row"
          style={
            section.title === "Transaction Screens"
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

const Development = () => (
  <section className="showcase-section">
    <h2 className="showcase-section-title highlight-title">Development</h2>

    <p className="showcase-text">
      KOA was engineered with a focus on <span className="highlight-text">performance</span> and
      <span className="highlight-text"> scalability</span>.
      Built using <span className="highlight-text">React Native</span> and
      <span className="highlight-text"> Node.js + Supabase</span>, the architecture ensures seamless real-time updates,
      optimized API calls, and minimal latency across devices.
      <br /><br />
      Each module — from expense handling to analytics — is built using clean modular principles,
      enabling rapid iteration, testing, and maintainability. The visual layer integrates
      <span className="highlight-text"> Reanimated</span> for micro-interactions and
      <span className="highlight-text"> gesture-based transitions</span>.
    </p>

    <div className="code-collage">
      {CODE_IMAGES.map((code, idx) => (
        <div key={idx} className={`code-card ${code.size}`}>
          <img src={code.src} alt={code.alt} />
        </div>
      ))}
    </div>

    <p className="showcase-text">
      The app leverages <span className="highlight-text">Supabase's real-time channels</span> for collaborative
      group expense sync and <span className="highlight-text">JWT-secured endpoints</span> for user authentication.
      Animations, transitions, and caching mechanisms are implemented with a focus on device efficiency
      and offline-first UX.
    </p>

    <div className="github-link-wrap">
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

const KeyLearnings = () => (
  <section className="showcase-section showcase-section-last">
    <h2 className="showcase-section-title highlight-title">Key Learnings</h2>
    <p className="showcase-text">
      Building KOA reinforced that great financial tools should feel
      like a helpful companion, not an accountant. The most impactful
      features were those that reduced friction—auto-categorization and
      smart suggestions saved users hours of manual entry. This project
      taught me that when designing for sensitive topics like money,
      trust and clarity are paramount.
    </p>
  </section>
);

// Main Component
export default function ProjectShowcaseKOA() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const handleClose = useCallback((e) => {
    e?.stopPropagation();
    navigate(-1);
  }, [navigate]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") handleClose();
  }, [handleClose]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden auto";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div
      className="showcase-overlay"
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="showcase-container"
        onClick={(e) => e.stopPropagation()}
        ref={containerRef}
        aria-label="KOA showcase"
      >
        <button
          className="showcase-close"
          onClick={handleClose}
          aria-label="Close showcase"
        >
          <span>×</span>
        </button>

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
    </div>
  );
}