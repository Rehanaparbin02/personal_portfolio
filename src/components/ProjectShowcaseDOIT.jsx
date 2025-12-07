import React, { useEffect, useState } from "react";
import "./ProjectShowcaseDOIT.css";
import "./TechStackGraph.css";
import "./TechStackAnimations.css";

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
const PROJECT_INFO = [
    { icon: "👤", title: "Role", description: "UI/UX Designer & Developer" },
    { icon: "⏱️", title: "Duration", description: "Current" },
    { icon: "📅", title: "Year", description: "2024" },
    { icon: "📱", title: "Platform", description: "iOS & Android" }
];

const KEY_FEATURES = [
    {
        icon: "🎭",
        title: "Frictionless Guest Mode",
        description: "Start instantly without an account. Full functionality with local storage, isolated sessions, and seamless migration to authenticated accounts.",
        size: "large"
    },
    {
        icon: "�",
        title: "Smart Workspaces",
        description: "Organize notes into custom Spaces—dedicated contexts for projects without overwhelming nested folder structures.",
        size: "medium"
    },
    {
        icon: "�",
        title: "Rich Media Support",
        description: "Attach photos, videos, PDFs, and audio recordings directly to notes, consolidated in one searchable location.",
        size: "wide"
    },
    {
        icon: "�",
        title: "Native Widgets",
        description: "Interactive home screen widgets for recent notes and quick creation without launching the app, featuring deep linking.",
        size: "tall"
    },
    {
        icon: "⏱️",
        title: "Focus & Analytics",
        description: "Built-in Pomodoro timer and automatic time tracking to visualize productivity patterns and completion trends.",
        size: "medium"
    },
    {
        icon: "📡",
        title: "Offline-First",
        description: "Full functionality without internet. Changes sync automatically to Supabase when connectivity returns, with conflict resolution.",
        size: "wide"
    }
];

const DESIGN_PROCESS_STEPS = [
    {
        number: "01",
        title: "Research & Discovery",
        description: "I analyzed top productivity apps and user feedback to identify major pain points: forced sign-ups, cluttered UI, and weak offline access. This shaped personas who need <span class='highlight-text'>fast, frictionless note-taking</span>.<br /><br /><span class='highlight-text'>Key takeaways:</span> quick entry, offline reliability, simple organization, and lightweight productivity tools."
    },
    {
        number: "02",
        title: "Information Architecture",
        description: "I designed a streamlined flow with <span class='highlight-text'>Guest Mode</span> for instant note-taking and a more feature-rich authenticated path.<br />Navigation centers around a <span class='highlight-text'>clean home hub</span> with spaces, quick actions, and tools.<br /><br /><span class='highlight-text'>MVP:</span> note creation, basic organization, guest mode<br /><span class='highlight-text'>Later phases:</span> attachments, search, productivity tools, widgets"
    },
    {
        number: "03",
        title: "Wireframing & Prototyping",
        description: "Early wireframes explored note layouts, FAB placement, and modal patterns.<br />A <span class='highlight-text'>reusable component system</span> ensured visual consistency.<br />The <span class='highlight-text'>high-fidelity prototype</span> included gestures, micro-animations, and accessibility-checked contrast."
    },
    {
        number: "04",
        title: "Visual Design",
        description: "The product uses a <span class='highlight-text'>dark-first theme</span> with green accents for clarity and energy.<br />System fonts and an 8px spacing grid create a <span class='highlight-text'>native, structured experience</span>.<br /><span class='highlight-text'>Key elements:</span> rounded note cards, intuitive modals, clean icons, and subtle motion."
    },
    {
        number: "05",
        title: "Development Handoff",
        description: "I documented <span class='highlight-text'>component states, variants, and design tokens</span>, supplying export-ready assets, animations, and responsive guidelines for smooth implementation."
    },
    {
        number: "06",
        title: "Usability Testing",
        description: "User testing surfaced issues around FAB visibility, space organization, attachment clutter, and multi-select discoverability. Iterations included <span class='highlight-text'>clearer icons, larger FAB, dedicated attachment views, and guided tooltips</span>.<br /><span class='highlight-text'>Accessibility updates</span> improved contrast, labeling, and non-color indicators."
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
    // {
    //     title: "Transaction Screens",
    //     screens: [
    //         { src: transactionScreen1, alt: "KOA Transactions - Incomes View" },
    //         { src: transactionScreen2, alt: "KOA Transactions - Expenses View" },
    //         { src: transactionScreen3, alt: "KOA Transactions - Savings View" },
    //         { src: transactionScreen4, alt: "KOA Transactions - Add Transaction" },
    //         { src: transactionScreen5, alt: "KOA Transactions - Budget Overview" }
    //     ]
    // },
    // {
    //     title: "Savings",
    //     screens: [
    //         { src: savingsScreen1, alt: "KOA Savings - Dashboard View" },
    //         { src: savingsScreen2, alt: "KOA Savings - Goals View" },
    //         { src: savingsScreen3, alt: "KOA Savings - Goals View" },
    //         { src: savingsScreen4, alt: "KOA Savings - Goals View" }
    //     ]
    // },
    // {
    //     title: "Analytics",
    //     screens: [
    //         { src: analyticsScreen1, alt: "KOA Analytics - Overview Dashboard" },
    //         { src: analyticsScreen2, alt: "KOA Analytics - Expense Trends" },
    //         { src: analyticsScreen3, alt: "KOA Analytics - Budget Analysis" },
    //         { src: analyticsScreen4, alt: "KOA Analytics - Savings Progress" }
    //     ]
    // },
    // {
    //     title: "Wallets",
    //     screens: [{ src: walletScreen, alt: "KOA Wallet - Overview" }]
    // },
    // { title: "Settings & Profile", screens: [], placeholder: true, count: 2 }
];

const COLOR_SWATCHES = [
    { color: "#0A0A0A", textColor: "#fff" }, // Deep Void
    { color: "#1A1A1A", textColor: "#fff" }, // Surface Black
    { color: "#22C55E", textColor: "#000" }, // Neon Green
    { color: "#16A34A", textColor: "#fff" }, // Forest Green
    { color: "#3B82F6", textColor: "#fff" }  // Electric Blue
];

const CODE_IMAGES = [
    { src: codeImage, alt: "KOA API Integration", size: "large" },
    { src: codeImage, alt: "Authentication Logic", size: "small" },
    { src: codeImage, alt: "Expense Service Function", size: "medium" },
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
const Hero = ({ id }) => (
    <div id={id} className="showcase-hero koa-hero animate-hero">
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
            <div className="hero-badge">Task Management Reimagined</div>
            <h1 className="showcase-title">DO-IT</h1>
            <div className="showcase-tags">
                <span className="showcase-tag">React Native</span>
                <span className="showcase-tag">AI UX</span>
                <span className="showcase-tag">Task Management App</span>
                <span className="showcase-tag">iOS</span>
                <span className="showcase-tag">Android</span>
                <span className="showcase-tag">Passion Project</span>
            </div>
            <p className="showcase-subtitle" style={{
                color: "#F3F4F6",
                fontSize: "20px"
            }}>
                DO-IT transforms how you handle tasks — blending automation,
                analytics, and collaboration into one calm, intelligent task
                management experience. Built with React Native, Node.js, and Supabase for
                real-time clarity across all your devices.
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
const ProjectOverview = ({ id }) => (
    <section id={id} className="showcase-section reveal">
        <h2 className="showcase-section-title highlight-title">Project Overview</h2>
        <div className="showcase-grid">
            <div className="showcase-inner-grid">
                {PROJECT_INFO.map((info, idx) => (
                    <InfoCard key={idx} {...info} index={idx} />
                ))}
            </div>

            <div className="showcase-info-card-para reveal">
                DO-IT is a{" "}
                <span className="highlight-text">full-stack, cross-platform note-taking and productivity mobile application</span>{" "}
                built with{" "}
                <span className="highlight-text">React Native (v0.81.5)</span>{" "}
                and{" "}
                <span className="highlight-text">Expo SDK (~54.0.23)</span>, featuring a{" "}
                <span className="highlight-text">Supabase PostgreSQL backend</span>{" "}
                for real-time data synchronization and user authentication.
                <br /><br />
                The app delivers a comprehensive task management experience with a complete{" "}
                <span className="highlight-text">authentication system</span>{" "}
                (email/password login, OTP verification, password recovery), an innovative{" "}
                <span className="highlight-text">guest mode with configurable usage limits</span>{" "}
                (5 notes per space, 1 workspace), and seamless{" "}
                <span className="highlight-text">account migration capabilities</span>.
                {/* <br /><br /> */}
                Core features include{" "}
                <span className="highlight-text">workspace organization through custom Spaces</span>,{" "}
                <span className="highlight-text">rich media attachments</span>{" "}
                (photos, videos, PDFs, audio recordings),{" "}
                <span className="highlight-text">advanced filtering and search functionality</span>,{" "}
                <span className="highlight-text">multi-select batch operations</span>, and integrated productivity tools including a{" "}
                <span className="highlight-text">Pomodoro timer</span>,{" "}
                <span className="highlight-text">time tracking analytics</span>,{" "}
                <span className="highlight-text">calendar visualization</span>, and a{" "}
                <span className="highlight-text">reminder system with push notifications</span>.
                <br /><br />
                The application implements{" "}
                <span className="highlight-text">native Android home screen widgets with deep linking</span>{" "}
                for quick note access, utilizes{" "}
                <span className="highlight-text">React Navigation</span>{" "}
                for smooth screen transitions, employs{" "}
                <span className="highlight-text">react-hook-form with Zod validation</span>{" "}
                for robust form handling, and features a sophisticated{" "}
                <span className="highlight-text">guest session management system</span>{" "}
                with isolated data storage and counter synchronization.
                {/* <br /><br /> */}
                Built with modern React patterns including{" "}
                <span className="highlight-text">context providers for state management</span>,{" "}
                <span className="highlight-text">custom hooks for reusable logic</span>, and{" "}
                <span className="highlight-text">React Native Reanimated</span>{" "}
                for fluid animations, the app supports{" "}
                <span className="highlight-text">dark mode theming</span>,{" "}
                <span className="highlight-text">pull-to-refresh mechanics</span>, and includes a polished{" "}
                <span className="highlight-text">onboarding experience with splash screens</span>, making it a{" "}
                <span className="highlight-text">production-ready productivity solution</span>{" "}
                with over 3,500 lines of carefully architected code in the main interface alone.
            </div>
        </div>
    </section>
);

// Challenge Section
const Challenge = ({ id }) => (
    <section id={id} className="showcase-section reveal">
        <h2 className="showcase-section-title highlight-title">Challenge</h2>
        <p className="showcase-text">
            Modern professionals and students struggle with{" "}
            <span className="highlight-text">
                fragmented productivity tools that force them to juggle multiple
                apps
            </span>{" "}
            for note-taking, task management, time tracking, and reminders.
            Existing solutions either{" "}
            <span className="highlight-text">
                lack essential features, require mandatory account creation
            </span>{" "}
            (creating barriers to entry), or fail to provide quick access to
            information when needed most. Users need a{" "}
            <span className="highlight-text">
                unified, native mobile experience that organizes their thoughts
                and tasks efficiently
            </span>{" "}
            while respecting their privacy preferences and offering flexible
            workspace organization—all accessible within seconds, even from
            their home screen.
        </p>
        <br />
        {/* <p className="showcase-text">
            The modern digital workspace is cluttered with an{" "}
            <span className="highlight-text">overwhelming volume of information and tasks</span>,
            leading to cognitive overload and missed deadlines. Traditional task managers
            often fall short by offering static lists, lacking{" "}
            <span className="highlight-text">intelligent features to help users prioritize</span>,
            break down complex projects, or gain actionable insights from their daily activities.
            Furthermore, the demand for{" "}
            <span className="highlight-text">seamless integration of various media types into notes</span>
            and the need for adaptive, context-aware reminders remains largely unaddressed,
            leaving users feeling unsupported in their quest for true productivity and focus.
        </p> */}
    </section>
);

// Solution Section
const Solution = ({ id }) => (
    <section id={id} className="showcase-section reveal">
        <h2 className="showcase-section-title highlight-title">Solution</h2>
        <p className="showcase-text">
            DO-IT delivers a comprehensive, all-in-one productivity platform that consolidates <span className="highlight-text">note-taking,</span> <span className="highlight-text">task management,</span> <span className="highlight-text">workspace organization,</span> and <span className="highlight-text">time tracking</span> into a single native mobile application. The solution features:
            <br /><br />
            <ul>
                <li>
                    <span className="highlight-text"><b>Frictionless Entry:</b> </span>A guest mode with no signup required, allowing users to start immediately while maintaining the option to upgrade for unlimited access
                </li>
                <li>
                    <span className="highlight-text"><b>Unified Workspace:</b> </span>Custom "Spaces" for organizing notes by projects, with rich media attachments (photos, videos, PDFs, audio) and advanced filtering
                </li>
                <li>
                    <span className="highlight-text"><b>Instant Access:</b> </span>Native Android widgets that display recent notes and enable quick note creation directly from the home screen
                </li>
                <li>
                    <span className="highlight-text"><b>Productivity Integration:</b> </span>Built-in Pomodoro timer, time tracking analytics, calendar visualization, and intelligent reminder system with push notifications
                </li>
                <li>
                    <span className="highlight-text"><b>Smart Organization:</b> </span>Multi-select batch operations, favorites, archive functionality, and powerful search capabilities to manage hundreds of notes effortlessly
                </li>
                <li>
                    <span className="highlight-text"><b>Privacy-First Architecture:</b> </span>Isolated guest sessions and secure Supabase backend with seamless migration paths for users who choose to create accounts
                </li>
            </ul>
            <br />
            By combining these features into a <span className="highlight-text">fast, intuitive mobile experience with smooth animations and dark-mode design</span>, DO-IT eliminates the need for multiple productivity apps while providing both casual users and power users with the tools they need to stay organized and focused.
        </p>
    </section>
);

// Tech Stack Section - Graph Inspired Design
const TechStack = ({ id }) => {
    const [hoveredNode, setHoveredNode] = useState(null);

    const techNodes = [
        // Core/Center Node
        {
            id: 'core',
            name: 'DO-IT',
            category: 'Core',
            icon: '🎯',
            position: 'center',
            color: '#22C55E' // Neon Green
        },
        // Frontend Layer
        {
            id: 'react-native',
            name: 'React Native',
            category: 'Frontend',
            icon: '⚛️',
            detail: 'v0.81.5',
            position: 'top-left',
            color: '#61DAFB'
        },
        {
            id: 'expo',
            name: 'Expo SDK',
            category: 'Frontend',
            icon: '📱',
            detail: '~54.0.23',
            position: 'top',
            color: '#FFFFFF' // Whiteish
        },
        {
            id: 'navigation',
            name: 'React Navigation',
            category: 'Frontend',
            icon: '🧭',
            detail: 'Native Stack',
            position: 'top-right',
            color: '#6B46C1'
        },
        // Backend Layer
        {
            id: 'nodejs',
            name: 'Node.js',
            category: 'Backend',
            icon: '🟢',
            detail: 'Runtime',
            position: 'left',
            color: '#68A063'
        },
        {
            id: 'supabase',
            name: 'Supabase',
            category: 'Backend',
            icon: '🗄️',
            detail: 'PostgreSQL',
            position: 'right',
            color: '#3ECF8E'
        },
        {
            id: 'realtime',
            name: 'Real-time Sync',
            category: 'Backend',
            icon: '⚡',
            detail: 'Live Data',
            position: 'bottom-left',
            color: '#F59E0B'
        },
        // Tools Layer
        {
            id: 'figma',
            name: 'Figma',
            category: 'Tools',
            icon: '🎨',
            detail: 'Design',
            position: 'bottom',
            color: '#F24E1E'
        },
        {
            id: 'reanimated',
            name: 'Reanimated',
            category: 'Frontend',
            icon: '✨',
            detail: 'Animations',
            position: 'bottom-right',
            color: '#8B5CF6'
        }
    ];

    // Coordinates inside SVG viewBox (800 x 600)
    // Tuned to visually match your desired layout screenshot.
    const nodeCoordinates = {
        core: { x: 400, y: 300 },

        'react-native': { x: 215, y: 150 },   // top-left
        expo: { x: 400, y: 120 },   // top
        navigation: { x: 585, y: 150 },   // top-right

        nodejs: { x: 210, y: 300 },   // left
        supabase: { x: 590, y: 300 },   // right

        realtime: { x: 230, y: 430 },   // bottom-left
        figma: { x: 400, y: 465 },   // bottom
        reanimated: { x: 570, y: 430 }    // bottom-right
    };

    // const connections = [
    //     // Core connections
    //     { from: 'core', to: 'react-native' },
    //     { from: 'core', to: 'expo' },
    //     { from: 'core', to: 'navigation' },
    //     { from: 'core', to: 'nodejs' },
    //     { from: 'core', to: 'supabase' },
    //     { from: 'core', to: 'realtime' },
    //     { from: 'core', to: 'figma' },
    //     { from: 'core', to: 'reanimated' },
    //     // Frontend interconnections
    //     { from: 'react-native', to: 'expo' },
    //     { from: 'expo', to: 'navigation' },
    //     { from: 'react-native', to: 'reanimated' },
    //     // Backend interconnections
    //     { from: 'nodejs', to: 'supabase' },
    //     { from: 'supabase', to: 'realtime' }
    // ];

    const getNodeCoords = (id) => nodeCoordinates[id] || nodeCoordinates.core;

    return (
        <section id={id} className="showcase-section reveal">
            <h2 className="showcase-section-title highlight-title">Tech Stack</h2>
            <p className="showcase-text">
                DO-IT is built with a modern, scalable technology stack that ensures{" "}
                <span className="highlight-text">high performance</span>,{" "}
                <span className="highlight-text">real-time synchronization</span>, and{" "}
                <span className="highlight-text">seamless cross-platform compatibility</span>.
            </p>

            <div className="tech-graph-container reveal">
                {/* Connection Lines */}
                <svg
                    className="tech-graph-connections"
                    viewBox="0 0 800 600"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.2" />
                            <stop offset="50%" stopColor="#22C55E" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#22C55E" stopOpacity="0.2" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* {connections.map((conn, idx) => {
                        const from = getNodeCoords(conn.from);
                        const to = getNodeCoords(conn.to);
                        const isActive =
                            hoveredNode === conn.from || hoveredNode === conn.to;

                        return (
                            <line
                                key={idx}
                                className={`tech-connection ${isActive ? 'active' : ''}`}
                                x1={from.x}
                                y1={from.y}
                                x2={to.x}
                                y2={to.y}
                                stroke="url(#lineGradient)"
                                strokeWidth={isActive ? 3 : 1.5}
                                opacity={isActive ? 1 : 0.35}
                                style={{ animationDelay: `${idx * 0.12}s` }}
                            />
                        );
                    })} */}
                </svg>

                {/* Tech Nodes */}
                <div className="tech-graph-nodes">
                    {techNodes.map((node, idx) => (
                        <div
                            key={node.id}
                            className={`tech-node reveal ${node.position} ${hoveredNode === node.id ? 'active' : ''
                                } ${node.id === 'core' ? 'core-node' : ''}`}
                            onMouseEnter={() => setHoveredNode(node.id)}
                            onMouseLeave={() => setHoveredNode(null)}
                            style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                            <div className="tech-node-inner">
                                <div className="tech-node-icon">{node.icon}</div>
                                <div className="tech-node-content">
                                    <div className="tech-node-name">{node.name}</div>
                                    {node.detail && (
                                        <div className="tech-node-detail">{node.detail}</div>
                                    )}
                                </div>
                            </div>
                            <div className="tech-node-pulse" />
                        </div>
                    ))}
                </div>

                {/* Legend */}
                <div className="tech-legend">
                    <div className="tech-legend-item">
                        <span className="tech-legend-dot frontend" />
                        <span className="tech-legend-label">Frontend</span>
                    </div>
                    <div className="tech-legend-item">
                        <span className="tech-legend-dot backend" />
                        <span className="tech-legend-label">Backend</span>
                    </div>
                    <div className="tech-legend-item">
                        <span className="tech-legend-dot tools" />
                        <span className="tech-legend-label">Tools</span>
                    </div>
                </div>
            </div>
        </section>
    );
};



// Design Process Section
const DesignProcess = ({ id }) => (
    <section id={id} className="showcase-section reveal">
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
const KeyFeatures = ({ id }) => (
    <section id={id} className="showcase-section reveal">
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
const VisualDesign = ({ id }) => (
    <section id={id} className="showcase-section reveal">
        <h2 className="showcase-section-title highlight-title">Visual Design</h2>

        <div className="visual-subsection reveal">
            <h3 className="visual-subtitle">Wireframes</h3>
            <p className="showcase-text">
                I started with low-fidelity <span className="highlight-text">wireframes</span> to validate core flows —
                creating a budget, splitting expenses, and visualizing analytics.
                Each wireframe focused on minimizing taps while keeping navigation clear and consistent.
                The goal was to make financial management feel as effortless as scrolling a feed.
            </p>
            <div className="visual-image-placeholder">Wireframe Mockups Here</div>
        </div>

        <div className="visual-subsection reveal">
            <h3 className="visual-subtitle">Typography</h3>
            <p className="showcase-text">
                For a native feel on Android, DO-IT utilizes <span className="highlight-text">system fonts</span>, primarily <span className="highlight-text">Roboto</span>, ensuring seamless integration and optimal readability.
            </p>
            <div className="typography-preview reveal" style={{ animationDelay: '0.2s' }}>
                <div className="font-sample Roboto reveal" style={{ animationDelay: '0.3s' }}>Aa Bb Cc — Roboto</div>
            </div>
        </div>

        <div className="visual-subsection reveal">
            <h3 className="visual-subtitle">Color Scheme</h3>
            <p className="showcase-text">
                DO-IT's palette conveys <span className="highlight-text">trust and calm</span>.
                Deep navy tones represent stability, while soft cream and neutral grays introduce warmth and balance.
                The subtle gradient transitions create visual depth without distraction.
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
const FinalDesigns = ({ id }) => (
    <section id={id} className="showcase-section reveal">
        <h2 className="showcase-section-title highlight-title">Final Designs</h2>
        <p className="showcase-text">
            The visual identity and structure of KOA translate into an intuitive, high-clarity interface across all touchpoints — from onboarding to analytics.
            Each flow was refined for simplicity, legibility, and touch precision across devices.
        </p>

        {SCREEN_SECTIONS.map((section, idx) => (
            <div key={idx} className="final-design-subsection reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
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

// Development Section
const Development = ({ id }) => (
    <section id={id} className="showcase-section reveal">
        <h2 className="showcase-section-title highlight-title">Development</h2>

        <p className="showcase-text reveal">
            Over an eight-week Agile cycle, I built the entire cross-platform app (iOS/Android) as a solo developer, using <span className="highlight-text">React Native + Expo</span> for rapid iteration and <span className="highlight-text">Supabase</span> for authentication, Postgres storage, and real-time sync. The architecture follows an <span className="highlight-text">offline-first model</span>, where all actions write locally first and sync in the background, supported by optimistic UI updates, queued retries, and RLS-secured cloud data. The codebase (~8.5k LOC) is organized into a clear separation of concerns: UI components, business logic (contexts + hooks), data layer (Supabase + AsyncStorage), and navigation (Auth / App stack + deep linking). Each sprint focused on shipping a functional vertical slice—authentication, guest mode, notes, spaces, media attachments, productivity tools, and finally Android widget support—while continuously optimizing performance and accessibility.
            <br /><br />
            Key engineering challenges centered on guest session isolation, sync reliability, widget updates, and maintaining performance at scale. These were solved using session-scoped storage keys, background sync services, debounced search + memoization, FlatList virtualization, and progressive media loading. By the final sprint, the app achieved noticeably faster load times (up to 77%), stable widget behavior, and a flexible component system used across 18 screens. The result is a production-ready foundation with clear extension points for future features.
        </p>

        <h3 className="showcase-subtitle reveal">Core Highlights</h3>
        <ul className="showcase-text bullet-list reveal">
            <li>Cross-platform with one codebase → <span className="highlight-text">React Native (Expo)</span></li>
            <li>Cloud backend → <span className="highlight-text">Supabase (Postgres, RLS, real-time sync)</span></li>
            <li>Architecture → <span className="highlight-text">offline-first, optimistic UI, async queue sync</span></li>
            <li>Delivered features → <span className="highlight-text">Auth, Guest Mode, Notes, Spaces, Search, Attachments, Pomodoro, Analytics, Android widget</span></li>
            <li>Performance → <span className="highlight-text">~50–80% faster loads</span> via virtualization, memoization, caching</li>
            <li>Codebase → <span className="highlight-text">~8,500 LOC, 50+ files, 45 components, 18 screens</span></li>
            <li>Testing → <span className="highlight-text">multi-device QA + 15 beta testers</span></li>
            <li>Outcome → <span className="highlight-text">stable MVP</span> with strong performance + clear scalability path</li>
        </ul>

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
// Key Learnings Section
const KeyLearnings = ({ id }) => (
    <section id={id} className="showcase-section showcase-section-last reveal">
        <h2 className="showcase-section-title highlight-title">Key Learnings</h2>

        {/* Condensed Overview */}
        <div className="learning-overview">
            <p className="showcase-text">
                Building KOA was a masterclass in <strong>offline-first architecture</strong> and <strong>user-centric design</strong>.
                Below are the critical insights that directly impacted the product's success.
            </p>
        </div>

        {/* Consolidated Grid */}
        <div className="learning-grid">
            {/* Card 1: Architecture */}
            <div className="learning-card">
                <h4>Offline-First = Simplified Logic</h4>
                <p>Shifting to local-first storage with background sync reduced code complexity by <strong>~40%</strong> and eliminated most network-error edge cases.</p>
                <div className="takeaway-box">
                    "Offline-first is a design decision, not just an optimization."
                </div>
            </div>

            {/* Card 2: UX / Onboarding */}
            <div className="learning-card">
                <h4>Friction Kills Conversion</h4>
                <p>Forcing signup caused a 68% drop-off. Introducing <strong>Guest Mode</strong> doubled onboarding completion to <strong>71%</strong>.</p>
                <div className="takeaway-box">
                    "Let users experience value before asking for commitment."
                </div>
            </div>

            {/* Card 3: Performance */}
            <div className="learning-card">
                <h4>Performance is a Feature</h4>
                <p>Memoization and virtualized lists reduced home screen load time from <strong>1.2s to 0.28s</strong> (77% faster).</p>
                <div className="takeaway-box">
                    "Build with profiling in mind from day one."
                </div>
            </div>

            {/* Card 4: Product / Research */}
            <div className="learning-card">
                <h4>Behavior Trumps Opinions</h4>
                <p>Users requested nested folders but rarely used them. Usage data proved that <strong>widgets</strong> were the real engagement driver (+28% DAU).</p>
                <div className="takeaway-box">
                    "Validate ideas through actual usage data, not just interviews."
                </div>
            </div>
        </div>

        {/* Visual Summary */}
        <div className="visual-summary">
            <div className="terminal-window">
                <div className="terminal-header">
                    <div className="terminal-buttons">
                        <span className="close"></span>
                        <span className="minimize"></span>
                        <span className="maximize"></span>
                    </div>
                    <div className="terminal-title">key-learnings.txt</div>
                </div>
                <div className="terminal-content">
                    <pre>
                        {`┌─────────────────────────────────────────┐
│                 KEY LEARNINGS           │
├─────────────────────────────────────────┤
│ 1. Architecture                         │
│    - Offline-first simplified everything│
│    - Reusability emerges naturally      │
│                                         │
│ 2. User Experience                      │
│    - Guest Mode doubled onboarding      │
│    - Micro-interactions drive delight   │
│                                         │
│ 3. Product Strategy                     │
│    - Widgets increase DAU significantly │
│    - Behavior > Opinion in UX decisions │
└─────────────────────────────────────────┘`}
                    </pre>
                </div>
            </div>
        </div>
    </section>
);

// Table of Contents Component
const TableOfContents = () => {
    const [activeId, setActiveId] = useState("");
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        // Section Observer
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-40% 0px -40% 0px" }
        );

        const sections = document.querySelectorAll("section[id], div[id='hero']");
        sections.forEach((section) => sectionObserver.observe(section));

        // Footer Observer to hide nav
        const footerObserver = new IntersectionObserver(
            (entries) => {
                const footerEntry = entries[0];
                setIsHidden(footerEntry.isIntersecting);
            },
            { threshold: 0.1 } // Hide when 10% of footer is visible
        );

        const footer = document.querySelector(".footer");
        if (footer) {
            footerObserver.observe(footer);
        }

        return () => {
            sectionObserver.disconnect();
            footerObserver.disconnect();
        };
    }, []);

    const navItems = [
        { id: "overview", label: "Overview" },
        { id: "challenge", label: "The Challenge" },
        { id: "solution", label: "The Solution" },
        { id: "tech-stack", label: "Highlights" },
        { id: "process", label: "Design Process" },
        { id: "features", label: "Key Features" },
        { id: "visuals", label: "Visual Designs" },
        { id: "final-designs", label: "Final Designs" },
        { id: "development", label: "Development Phase" },
        { id: "learnings", label: "Reflections" },
        { id: "hero", label: "Back to Top" },
    ];

    const handleClick = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80, // Adjust for offset
                behavior: "smooth",
            });
            setActiveId(id);
        }
    };

    return (
        <nav className={`project-navigation ${isHidden ? 'hidden' : ''}`}>
            <div className="nav-header">CONTENTS</div>
            <ul className="nav-list">
                {navItems.map((item) => (
                    <li key={item.id}>
                        <a
                            href={`#${item.id}`}
                            className={`nav-link ${activeId === item.id ? "active" : ""}`}
                            onClick={(e) => handleClick(e, item.id)}
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

// Main Component
export default function ProjectShowcaseDOIT() {
    const [isLoaded, setIsLoaded] = useState(false);

    useScrollAnimation();

    useEffect(() => {
        setIsLoaded(true);
        window.scrollTo(0, 0); // Scroll to top on mount
    }, []);

    return (
        <div className={`showcase-full-page ${isLoaded ? 'loaded' : ''}`}>
            <TableOfContents />
            <Hero id="hero" />
            <div className="showcase-body">
                <ProjectOverview id="overview" />
                <Challenge id="challenge" />
                <Solution id="solution" />
                <TechStack id="tech-stack" />
                <DesignProcess id="process" />
                <KeyFeatures id="features" />
                <VisualDesign id="visuals" />
                <FinalDesigns id="final-designs" />
                <Development id="development" />
                <KeyLearnings id="learnings" />
            </div>
        </div>
    );
}
