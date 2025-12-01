import React, { useEffect, useRef, useState } from 'react';
import './Process.css';

const processSteps = [
  {
    id: '01',
    title: 'Discover',
    subtitle: 'Research, context & constraints',
    description:
      'I start by understanding users, business goals, and technical constraints — aligning design ambitions with what’s realistic to build.',
  },
  {
    id: '02',
    title: 'Define',
    subtitle: 'Flows, architecture & systems',
    description:
      'I map user journeys, information architecture, and system behavior — including API needs, component structure, and edge cases.',
  },
  {
    id: '03',
    title: 'Design',
    subtitle: 'Interfaces, interactions & systems',
    description:
      'I design UI and interactions that are component-based, dev-friendly, and ready to plug into design systems or frontend frameworks.',
  },
  {
    id: '04',
    title: 'Build',
    subtitle: 'Code, prototypes & performance',
    description:
      'I turn designs into responsive, accessible experiences using modern stacks — from web apps to mobile, with clean, scalable code.',
  },
  {
    id: '05',
    title: 'Refine',
    subtitle: 'Test, iterate & ship',
    description:
      'I test, debug, and refine — improving UX, fixing edge cases, and polishing motion and microinteractions before and after launch.',
  },
];

const whatIDoItems = [
  {
    label: 'Research',
    tag: 'Insights',
    description:
      'Digging into user needs, behavior, and context to uncover the story behind the solution.',
  },
  {
    label: 'Strategize',
    tag: 'Vision & Direction',
    description:
      'Mapping vision and product strategy so creativity, constraints, and goals stay aligned.',
  },
  {
    label: 'Design',
    tag: 'Product & Visual',
    description:
      'Where ideas turn into interfaces — systems, flows, and visuals that feel bold and intentional.',
  },
  {
    label: 'Build',
    tag: 'Code · Web & Mobile',
    description:
      'Turning designs into performant, responsive experiences that bridge form and function.',
  },
  {
    label: 'Test',
    tag: 'Quality & UX',
    description:
      'Fine-tuning details through testing, validation, and iteration so everything feels effortless to use.',
  },
  {
    label: 'Repeat',
    tag: 'Evolve & Grow',
    description:
      'Refining, evolving, and improving — because great products are never really “done”.',
  },
];

/**
 * Hook: returns [ref, inView] for scroll-into-view animation
 */
const useInViewOnce = (options = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target); // animate once
        }
      },
      {
        threshold: 0.2,
        ...options,
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return [ref, inView];
};

/**
 * Process card – each one animates when scrolled into view
 */
const ProcessCard = ({ step, index }) => {
  const [cardRef, inView] = useInViewOnce();

  return (
    <div
      ref={cardRef}
      className={`process-card ${inView ? 'is-in-view' : ''}`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="process-card__glow" />
      <div className="card-number">{step.id}</div>
      <div className="card-content">
        <div className="card-chip">{step.subtitle}</div>
        <h3 className="card-title">{step.title}</h3>
        <p className="card-description">{step.description}</p>
        <div className="card-progress">
          <div className="card-progress-bar" />
        </div>
      </div>
    </div>
  );
};

/**
 * What I Do card – used inside scroll-driven marquee
 */
const WhatCard = ({ item, index }) => {
  const [cardRef, inView] = useInViewOnce();

  return (
    <div
      ref={cardRef}
      className={`what-card ${inView ? 'is-in-view' : ''}`}
      style={{ transitionDelay: `${220 + index * 80}ms` }}
    >
      <div className="what-card-glow" />
      <div className="what-card-tag">{item.tag}</div>
      <h4 className="what-card-title">{item.label}</h4>
      <p className="what-card-description">{item.description}</p>
    </div>
  );
};

const Process = () => {
  const [isVisible, setIsVisible] = useState(false); // section reveal
  const [parallax, setParallax] = useState({
    header: 0,
    grid: 0,
    what: 0,
    footer: 0,
  });

  const [whatScrollProgress, setWhatScrollProgress] = useState(0); // 0 → 1

  const sectionRef = useRef(null);
  const whatRef = useRef(null);

  // Section-level reveal
  useEffect(() => {
    if (!sectionRef.current || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // Parallax + scroll-driven "What I Do" marquee
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight || 1;

      const sectionRect = sectionRef.current.getBoundingClientRect();

      const rawProgress =
        (viewportHeight - sectionRect.top) /
        (viewportHeight + sectionRect.height);
      const progress = Math.min(1.2, Math.max(0, rawProgress));

      const headerOffset = -28 * progress;
      const gridOffset = -10 * progress;
      const whatOffset = -6 * progress;
      const footerOffset = -3 * progress;

      setParallax({
        header: headerOffset,
        grid: gridOffset,
        what: whatOffset,
        footer: footerOffset,
      });

      // === Scroll progress specifically for the WHAT section ===
      if (whatRef.current) {
        const whatRect = whatRef.current.getBoundingClientRect();
        const total = whatRect.height + viewportHeight;

        // 0 when section just enters, 1 when fully passed
        const rawWhat = (viewportHeight - whatRect.top) / total;
        const clampedWhat = Math.min(1, Math.max(0, rawWhat));

        setWhatScrollProgress(clampedWhat);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const slideCount = whatIDoItems.length;
  const maxOffset = (slideCount - 1) * 100;
  const trackTranslateX = whatScrollProgress * maxOffset;

  const activeIndex = Math.min(
    slideCount - 1,
    Math.max(0, Math.round(whatScrollProgress * (slideCount - 1)))
  );
  const activeItem = whatIDoItems[activeIndex];

  return (
    <section className="process-section" ref={sectionRef}>
      {/* background ambient glow for parallax feeling */}
      <div className="process-ambient process-ambient--one" />
      <div className="process-ambient process-ambient--two" />

      <div className={`process-container ${isVisible ? 'reveal' : ''}`}>
        {/* Header */}
        <div
          className="process-header"
          style={{ transform: `translateY(${parallax.header}px)` }}
        >
          <p className="process-eyebrow">Workflow • Craft • Clarity</p>
          <h2 className="process-title">Process, not guesswork.</h2>
          <p className="process-intro">
            A systematic workflow where{' '}
            <span className="highlighted-name">creativity</span> and{' '}
            <span className="highlighted-name">engineering</span> move in sync — from idea
            spark to shipped product.
          </p>
        </div>

        {/* What I Do (and Do Well) – scroll-driven marquee */}
        <div
          className="what-i-do"
          style={{ transform: `translateY(${parallax.what}px)` }}
          ref={whatRef}
        >
          <div className="what-i-do-header">
            <p className="what-i-do-eyebrow">Capabilities</p>
            <h3 className="what-i-do-title">What I Do (and Do Well)</h3>
            <p className="what-i-do-intro">
              A mix of <span className="highlighted-name">product thinking</span>,{' '}
              <span className="highlighted-name">visual craft</span>, and{' '}
              <span className="highlighted-name">hands-on development</span> — so the work is
              beautiful, usable, and shippable.
            </p>
          </div>

          {/* marquee driven by scroll */}
          <div className="what-carousel">
            <div className="what-carousel-viewport">
              <div
                className="what-carousel-track"
                style={{
                  transform: `translateX(-${trackTranslateX}%)`,
                }}
              >
                {whatIDoItems.map((item, index) => (
                  <div className="what-slide" key={item.label}>
                    <WhatCard item={item} index={index} />
                  </div>
                ))}
              </div>
            </div>

            {/* Step indicator like — 1 — RESEARCH */}
            <div className="what-carousel-indicator">
              <span className="what-step-number">— {activeIndex + 1} —</span>
              <span className="what-step-label">
                {activeItem.label.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Process Grid – bento layout + per-card scroll animation */}
        <div
          className="process-grid"
          style={{ transform: `translateY(${parallax.grid}px)` }}
        >
          {processSteps.map((step, index) => (
            <ProcessCard key={step.id} step={step} index={index} />
          ))}
        </div>

        {/* Tiny footer copy */}
        <div
          className="process-footer"
          style={{ transform: `translateY(${parallax.footer}px)` }}
        >
          <span className="process-footer-dot" />
          <p>
            Designed to be repeatable, flexible, and tailored — whether it’s a single feature
            or a full product build.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Process;
