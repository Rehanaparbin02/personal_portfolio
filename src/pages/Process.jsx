import { useEffect, useRef, useState } from 'react';
import './Process.css';

const Process = () => {
  const [isVisible, setIsVisible] = useState({});
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true,
            }));
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((section) => observerRef.current.observe(section));

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const processSteps = [
    {
      number: '01',
      title: 'Understand',
      subtitle: 'Research & Discovery',
      description:
        'I start by deeply understanding the problem space, user needs, and business constraints. This involves user research, competitive analysis, and stakeholder interviews to establish clear goals and success metrics.',
      highlights: ['User Research', 'Competitive Analysis', 'Goal Setting', 'Metrics Definition'],
    },
    {
      number: '02',
      title: 'Explore',
      subtitle: 'Ideation & Prototyping',
      description:
        'With a solid foundation, I explore multiple solutions through sketching, wireframing, and rapid prototyping. This phase is about divergent thinking—generating ideas, testing assumptions, and iterating quickly.',
      highlights: ['Sketching', 'Wireframing', 'User Flows', 'Low-Fi Prototypes'],
    },
    {
      number: '03',
      title: 'Refine',
      subtitle: 'Design Systems & Polish',
      description:
        'I refine the chosen direction by building out design systems, crafting pixel-perfect interfaces, and adding micro-interactions. Every detail matters—from typography to motion, ensuring consistency and delight.',
      highlights: ['Design Systems', 'UI Polish', 'Microinteractions', 'Accessibility'],
    },
    {
      number: '04',
      title: 'Ship',
      subtitle: 'Development & Launch',
      description:
        'Finally, I bring designs to life with production-ready code. I work closely with developers (or code it myself) to ensure the final product matches the vision, then iterate based on real user feedback.',
      highlights: ['React/React Native', 'Component Libraries', 'Performance', 'User Testing'],
    },
  ];

  const services = [
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description:
        'Crafting intuitive, beautiful interfaces that users love. From wireframes to high-fidelity mockups, I design with both aesthetics and usability in mind.',
    },
    {
      icon: '⚛️',
      title: 'Frontend Development',
      description:
        'Building responsive, performant web applications with React, TypeScript, and modern CSS. Pixel-perfect implementation with smooth animations.',
    },
    {
      icon: '📱',
      title: 'Mobile Apps',
      description:
        'Creating cross-platform mobile experiences with React Native. Native feel, shared codebase, and seamless user experiences on iOS and Android.',
    },
    {
      icon: '🎯',
      title: 'Design Systems',
      description:
        'Establishing scalable design systems with reusable components, design tokens, and comprehensive documentation for consistent brand experiences.',
    },
    {
      icon: '🔧',
      title: 'Full-Stack Development',
      description:
        'End-to-end development with Node.js, Express, PostgreSQL, and Supabase. Building robust backends that power delightful frontend experiences.',
    },
    {
      icon: '✨',
      title: 'Prototyping',
      description:
        'Rapid prototyping in Figma and Framer to validate ideas quickly. Interactive prototypes that feel real and help stakeholders visualize the vision.',
    },
  ];

  return (
    <div className="process-container">
      {/* HERO SECTION */}
      <div
        className={`process-hero ${isVisible.hero ? 'reveal' : ''}`}
        data-section="hero"
      >

      </div>

      {/* WHAT I DO SECTION */}
      <div
        className={`what-i-do-section ${isVisible.whatIDo ? 'reveal' : ''}`}
        data-section="whatIDo"
      >
        <h2 className="what-i-do-title">What I Do</h2>
        <p className="what-i-do-subtitle">
          I wear multiple hats—designer, developer, and problem solver. Here's how I can help bring
          your ideas to life.
        </p>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-card ${isVisible[`service${index}`] ? 'reveal' : ''}`}
              data-section={`service${index}`}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">
                {index === 0 && (
                  <>
                    Crafting <span className="highlighted-name">intuitive</span>, beautiful interfaces that users love. From wireframes to high-fidelity mockups, I design with both <span className="highlighted-name">aesthetics</span> and <span className="highlighted-name">usability</span> in mind.
                  </>
                )}
                {index === 1 && (
                  <>
                    Building <span className="highlighted-name">responsive</span>, performant web applications with <span className="highlighted-name">React</span>, <span className="highlighted-name">TypeScript</span>, and modern CSS. Pixel-perfect implementation with smooth animations.
                  </>
                )}
                {index === 2 && (
                  <>
                    Creating <span className="highlighted-name">cross-platform</span> mobile experiences with <span className="highlighted-name">React Native</span>. Native feel, shared codebase, and seamless user experiences on iOS and Android.
                  </>
                )}
                {index === 3 && (
                  <>
                    Establishing <span className="highlighted-name">scalable design systems</span> with reusable components, design tokens, and comprehensive documentation for consistent brand experiences.
                  </>
                )}
                {index === 4 && (
                  <>
                    End-to-end development with <span className="highlighted-name">Node.js</span>, <span className="highlighted-name">Express</span>, <span className="highlighted-name">PostgreSQL</span>, and <span className="highlighted-name">Supabase</span>. Building robust backends that power delightful frontend experiences.
                  </>
                )}
                {index === 5 && (
                  <>
                    Rapid prototyping in <span className="highlighted-name">Figma</span> and <span className="highlighted-name">Framer</span> to validate ideas quickly. Interactive prototypes that feel real and help stakeholders visualize the vision.
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* PROCESS STEPS */}
      <div className="process-steps">
        <div className="process-hero-content">
          <h1 className="process-title">My Process</h1>
          <p className="process-intro">
            From <span className="highlighted-name">concept to code</span>, here's how I approach
            every project—blending design thinking with technical execution.
          </p>
        </div>
        {processSteps.map((step, index) => (
          <div
            key={step.number}
            className={`process-step ${isVisible[`step${index}`] ? 'reveal' : ''}`}
            data-section={`step${index}`}
          >
            <div className="step-number-wrapper">
              <span className="step-number">{step.number}</span>
            </div>

            <div className="step-content">
              <div className="step-header">
                <h2 className="step-title">{step.title}</h2>
                <p className="step-subtitle">{step.subtitle}</p>
              </div>

              <p className="step-description">{step.description}</p>

              <div className="step-highlights">
                {step.highlights.map((highlight, i) => (
                  <span key={i} className="highlight-tag">
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PHILOSOPHY SECTION */}
      <div
        className={`process-philosophy ${isVisible.philosophy ? 'reveal' : ''}`}
        data-section="philosophy"
      >
        <h2 className="philosophy-title">Design First, Function Always</h2>
        <p className="philosophy-text">
          I believe that <span className="highlighted-name">great design</span> isn't just about
          aesthetics—it's about solving real problems with{' '}
          <span className="highlighted-name">elegant solutions</span>. Every pixel, every
          interaction, every line of code should serve a purpose. My process is iterative,
          collaborative, and always focused on creating experiences that feel{' '}
          <span className="highlighted-name">effortless</span> for the user.
        </p>
      </div>

      {/* TOOLS & TECH */}
      {/* <div
        className={`process-tools ${isVisible.tools ? 'reveal' : ''}`}
        data-section="tools"
      >
        <h2 className="tools-title">Tools & Technologies</h2>
        <div className="tools-grid">
          <div className="tool-category">
            <h3 className="tool-category-title">Design</h3>
            <ul className="tool-list">
              <li>Figma</li>
              <li>Framer</li>
              <li>Adobe Creative Suite</li>
              <li>Webflow</li>
            </ul>
          </div>

          <div className="tool-category">
            <h3 className="tool-category-title">Frontend</h3>
            <ul className="tool-list">
              <li>React & React Native</li>
              <li>TypeScript</li>
              <li>Next.js</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>

          <div className="tool-category">
            <h3 className="tool-category-title">Backend</h3>
            <ul className="tool-list">
              <li>Node.js & Express</li>
              <li>PostgreSQL</li>
              <li>Supabase</li>
              <li>RESTful APIs</li>
            </ul>
          </div>

          <div className="tool-category">
            <h3 className="tool-category-title">Other</h3>
            <ul className="tool-list">
              <li>Git & GitHub</li>
              <li>VS Code</li>
              <li>Postman</li>
              <li>Expo</li>
            </ul>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Process;
