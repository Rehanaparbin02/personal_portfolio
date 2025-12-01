import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import ScrollReveal from '../components/ScrollReveal';
import './Process.css';

// Same capabilities marquee items as in Process
// UI/UX design focused
const uiUxMarqueeItems = [
  'Animated Dashboards',
  'Gradient Themes',
  'Neobrutalist UI',
  'Interaction Design',
  'Design Systems',
  'Microinteractions',
  'Accessible Interfaces',
  'Product Thinking',
  'Visual Storytelling',
  'Motion Systems',
];

// Mobile & app development focused
const mobileMarqueeItems = [
  'React Native Apps',
  'Cross-Platform Mobile',
  'Supabase Backends',
  'Real-Time Sync',
  'Offline-First Flows',
  'Secure Auth',
  'Budgeting Tools',
  'Productivity Systems',
  'Emotion Journals',
  'Android Performance',
];


const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [isBentoVisible, setIsBentoVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [marqueeSpeed, setMarqueeSpeed] = useState(1); // scroll-velocity factor

  const containerRef = useRef(null);
  const descriptionRef = useRef(null);
  const bentoRef = useRef(null);
  const bannerCtaRef = useRef(null);

  const navigate = useNavigate();
  const baseMarqueeDurationPrimary = 26;  // UI/UX row
  const baseMarqueeDurationSecondary = 32; // mobile row

  const primaryDuration = baseMarqueeDurationPrimary / marqueeSpeed;
  const secondaryDuration =
    baseMarqueeDurationSecondary / (0.8 * marqueeSpeed + 0.2);

  useEffect(() => {
    // Trigger fade-in animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Intersection Observer for description scroll-to-reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsDescriptionVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentDescription = descriptionRef.current;
    if (currentDescription) {
      observer.observe(currentDescription);
    }

    return () => {
      if (currentDescription) {
        observer.unobserve(currentDescription);
      }
    };
  }, []);

  useEffect(() => {
    // Intersection Observer for bento grid scroll-to-reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsBentoVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentBento = bentoRef.current;
    if (currentBento) {
      observer.observe(currentBento);
    }

    return () => {
      if (currentBento) {
        observer.unobserve(currentBento);
      }
    };
  }, []);

  // Scroll-velocity based marquee speed (smoothed)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lastY = window.scrollY;
    let lastT = performance.now();
    let targetSpeed = 1; // where we want to go

    const handleScroll = () => {
      const now = performance.now();
      const y = window.scrollY;

      const dy = Math.abs(y - lastY);
      const dt = now - lastT || 16;

      const velocity = dy / dt; // px per ms
      // Map to 0–2 range, then +1 → 1x–3x
      const normalized = Math.min(velocity * 40, 2);
      targetSpeed = 1 + normalized;

      lastY = y;
      lastT = now;
    };

    // Smoothly ease marqueeSpeed toward targetSpeed (no jumps)
    const interval = setInterval(() => {
      setMarqueeSpeed((prev) => {
        const easing = 0.12; // smaller = smoother, slower change
        const next = prev + (targetSpeed - prev) * easing;
        return next;
      });
    }, 40); // ~25fps is enough for smoothness

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);


  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleSeeMore = () => {
    navigate('/work');
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Parallax cursor-follow for bento items
  const handleBentoMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateMax = 8; // how strong the tilt feels

    const rotateY = ((x - midX) / midX) * rotateMax; // left/right
    const rotateX = ((y - midY) / midY) * -rotateMax; // up/down (invert)

    card.style.transform = `
      translateY(-8px)
      scale(1.03)
      rotateX(${rotateX.toFixed(2)}deg)
      rotateY(${rotateY.toFixed(2)}deg)
    `;
  };

  const handleBentoMouseLeave = (e) => {
    const card = e.currentTarget;
    // Reset to whatever CSS/animation has defined as default
    card.style.transform = '';
  };

  const handleBannerCTA = () => {
    if (bentoRef.current) {
      bentoRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Magnetic CTA logic
  const handleBannerCTAMouseMove = (e) => {
    const btn = bannerCtaRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = e.clientX - centerX;
    const y = e.clientY - centerY;

    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = 140; // px range where magnet kicks in

    if (distance > maxDistance) {
      btn.style.transform = 'translate3d(0, 0, 0)';
      btn.style.boxShadow = '';
      return;
    }

    const strength = 1 - distance / maxDistance; // 0 → 1
    const moveX = (x / rect.width) * 16 * strength; // max ~16px
    const moveY = (y / rect.height) * 16 * strength;

    btn.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    btn.style.boxShadow = '0 12px 30px rgba(0,0,0,0.35)';
  };

  const handleBannerCTAMouseLeave = () => {
    const btn = bannerCtaRef.current;
    if (!btn) return;
    btn.style.transform = 'translate3d(0, 0, 0)';
    btn.style.boxShadow = '';
  };

  const baseMarqueeDuration = 22; // seconds at rest
  const marqueeDuration = baseMarqueeDuration / marqueeSpeed;

  return (
    <section
      className="home"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition:
          'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* MODERN INTERACTIVE HOME BANNER */}
      <div className="construction-banner">
        <div
          className="construction-pill"
          onMouseMove={handleBannerCTAMouseMove}
          onMouseLeave={handleBannerCTAMouseLeave}
        >
          <span className="status-dot" />
          <span className="status-label">Live beta</span>
          <span className="status-text">
            Portfolio v0.9 · polishing micro-interactions & case studies
          </span>
          <button
            type="button"
            className="status-cta"
            ref={bannerCtaRef}
            onClick={handleBannerCTA}
          >
            View featured work ↗
          </button>
        </div>
      </div>

      <div
        className={`home-container ${isHovered ? 'container-hovered' : ''}`}
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.95)',
          transition:
            'opacity 1.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, transform 1.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="noise-overlay"></div>

        <div className="hero-content">
          <div className="text-wrapper">
            <h1 className="home-line home-line-1" data-text="UI/UX">
              <span className="line-text">UI/UX</span>
              <span className="line-shadow">UI/UX</span>
            </h1>
          </div>

          <div className="text-wrapper">
            <h1 className="home-line home-line-2" data-text="DESIGNER">
              <span className="line-text">DESIGNER</span>
              <span className="line-shadow">DESIGNER</span>
            </h1>
          </div>

          <div className="text-wrapper amp-wrapper">
            <h1 className="home-line amp" data-text="&">
              <span className="line-text ampersand">&</span>
              <span className="line-shadow">&</span>
            </h1>
          </div>

          <div className="text-wrapper">
            <h1 className="home-line home-line-3" data-text="DEVELOPER">
              <span className="line-text">DEVELOPER</span>
              <span className="line-shadow">DEVELOPER</span>
            </h1>
          </div>
        </div>

        <div className="decorative-elements">
          <div className="corner-bracket top-left"></div>
          <div className="corner-bracket top-right"></div>
          <div className="corner-bracket bottom-left"></div>
          <div className="corner-bracket bottom-right"></div>
        </div>
      </div>

      {/* Dual marquee – UI/UX row + Mobile/App row */}
      <div className="home-marquee-block">
        {/* Row 1: UI/UX design */}
        <div className="home-marquee-row" style={{ backgroundColor: '#1d2342' }}>
          <div
            className="home-marquee-track"
            style={{ animationDuration: `${primaryDuration}s` }}
          >
            {uiUxMarqueeItems.map((item) => (
              <span key={item} className="home-marquee-text" style={{ color: '#f9f0de' }}>
                {item} •
              </span>
            ))}
            {uiUxMarqueeItems.map((item) => (
              <span key={item + '-clone'} className="home-marquee-text" style={{ color: '#f9f0de' }}>
                {item} •
              </span>
            ))}
          </div>
        </div>

        {/* Row 2: Mobile & app development */}
        <div className="home-marquee-row home-marquee-row--secondary" style={{ backgroundColor: '#f9f0de', border: '1px solid #1d2342' }}>
          <div
            className="home-marquee-track home-marquee-track--secondary"
            style={{ animationDuration: `${secondaryDuration}s` }}
          >
            {mobileMarqueeItems.map((item) => (
              <span key={item} className="home-marquee-text" style={{ color: '#1d2342' }}>
                {item} •
              </span>
            ))}
            {mobileMarqueeItems.map((item) => (
              <span key={item + '-clone'} className="home-marquee-text" style={{ color: '#1d2342' }}>
                {item} •
              </span>
            ))}
          </div>
        </div>
      </div>


      <div className="description-section" ref={descriptionRef}>
        <div
          className="description-shell"
          style={{
            opacity: isDescriptionVisible ? 1 : 0,
            transform: isDescriptionVisible ? 'translateY(0)' : 'translateY(30px)',
            transition:
              'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {/* top row */}
          <div className="description-top">
            <span className="description-top-label">ABOUT THE BLEND</span>

            <h2 className="description-top-heading-vertical">
              <span className="description-top-small-vertical">DESIGN THINKING</span>

            </h2>

            <h2 className="description-top-heading-horizontal">
              <span className="description-top-small-horizontal">MEETS SHIPPING CODE.</span>
            </h2>

            <p className="description-top-copy">
              I work across <span>product, visual and front-end</span> so ideas don&apos;t get
              lost between Figma and production.
            </p>
          </div>

          {/* second row: vertical word + blue cards */}
          <div
            className="description-main"
            style={{
              opacity: isDescriptionVisible ? 1 : 0,
              transform: isDescriptionVisible ? 'translateY(0)' : 'translateY(20px)',
              transition:
                'opacity 0.8s cubic-bezier(0.4,0,0.2,1) 0.05s, transform 0.8s cubic-bezier(0.4,0,0.2,1) 0.05s',
            }}
          >

            <div className="description-cards-row">
              <div
                className="description-card"
                style={{
                  opacity: isDescriptionVisible ? 1 : 0,
                  transform: isDescriptionVisible ? 'translateY(0)' : 'translateY(24px)',
                  transition:
                    'opacity 0.7s cubic-bezier(0.4,0,0.2,1) 0.15s, transform 0.7s cubic-bezier(0.4,0,0.2,1) 0.15s',
                }}
              >
                <p className="description-card-1">
                  Hi, I’m Rehana — the person who loves turning “what if…” into “oh wow, this actually works.” I design and
                  build digital experiences that feel clean, intuitive, and quietly powerful. Think of me as someone who
                  speaks both languages — the visual poetry of UI/UX and the logical precision of full-stack development.
                  I sketch ideas, shape interactions, architect systems, and then bring it all to life in code.
                </p>
              </div>

              <div
                className="description-card"
                style={{
                  opacity: isDescriptionVisible ? 1 : 0,
                  transform: isDescriptionVisible ? 'translateY(0)' : 'translateY(24px)',
                  transition:
                    'opacity 0.7s cubic-bezier(0.4,0,0.2,1) 0.25s, transform 0.7s cubic-bezier(0.4,0,0.2,1) 0.25s',
                }}
              >
                <p className="description-card-2">
                  To me, code isn’t the destination — it’s the vehicle. What excites me is taking messy, complex problems and
                  transforming them into smooth, beautifully engineered products that feel effortless for the user. Natural
                  interactions, scalable backends, motion-rich mobile interfaces, offline-ready workflows — I love building
                  things that not only look great but behave great. My mission is simple: to create digital experiences that
                  work beautifully, feel seamless, and make people think, “yes — this is exactly how it should be.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>





      <div
        ref={bentoRef}
        className={`bento-section ${isBentoVisible ? 'visible' : ''}`}
      >
        <div className="bento-header-main">
          <div className="bento-title">WORK</div>
          <div className="bento-header-subtitle">Designed to Feel. Built to </div>
          <div className="bento-header-subtitle-leftover">Perform.</div>
        </div>
        <div className="bento-grid">

          {/* BENTO 1 – KOA style metric card with arrow */}
          <div
            className={`bento-item bento-item-1 bento-item-cta ${isBentoVisible ? 'animate' : ''
              }`}
            onMouseMove={handleBentoMouseMove}
            onMouseLeave={handleBentoMouseLeave}
          >
            <div className="bento-cta-copy">
              <span className="bento-cta-kicker">KOA case study</span>
              <div className="bento-cta-main">
                <span className="bento-cta-metric">x2</span>
                <span className="bento-cta-sub">conversion rate</span>
              </div>
              <p className="bento-cta-description">
                Reimagined onboarding and pricing to reduce friction and make value obvious in the
                first 30 seconds.
              </p>
              <div className="bento-tag-row">
                <span className="bento-tag">SaaS</span>
                <span className="bento-tag">Onboarding</span>
                <span className="bento-tag">A/B testing</span>
              </div>
            </div>

            <button
              type="button"
              className="bento-arrow-btn"
              aria-label="Open KOA project"
              onClick={() => {
                handleScrollToTop();
                navigate('/Work');
              }}
            >
              ↗
            </button>
          </div>

          {/* BENTO 2 – case study list / mock data */}
          <div
            className={`bento-item bento-item-2 ${isBentoVisible ? 'animate' : ''}`}
            onMouseMove={handleBentoMouseMove}
            onMouseLeave={handleBentoMouseLeave}
          >
            <div className="bento-heading-row">
              <span className="bento-pill-label">Selected work</span>
              <span className="bento-pill-badge">3 live · 2 in progress</span>
            </div>

            <ul className="bento-list">
              <li>
                <div className="bento-list-title">Zenflow – mindful journaling app</div>
                <div className="bento-list-meta">
                  Product design · Mobile · +40% daily retention
                </div>
              </li>
              <li>
                <div className="bento-list-title">Koa – subscription analytics dashboard</div>
                <div className="bento-list-meta">
                  UX overhaul · Web · x2 conversion from trial → paid
                </div>
              </li>
              <li>
                <div className="bento-list-title">Studio Orbit – portfolio system</div>
                <div className="bento-list-meta">
                  Design systems · Frontend engineering · React
                </div>
              </li>
            </ul>

            <div className="bento-footer-note">
              Built with a design-systems mindset, shipped with production-ready code.
            </div>
          </div>

          {/* BENTO 3 – toolstack / skills */}
          <div
            className={`bento-item bento-item-3 ${isBentoVisible ? 'animate' : ''}`}
            onMouseMove={handleBentoMouseMove}
            onMouseLeave={handleBentoMouseLeave}
          >
            <div className="bento-heading-row">
              <span className="bento-pill-label">Toolstack</span>
            </div>

            <div className="bento-multi-metric">
              <div className="bento-metric-item">
                <span className="bento-metric-label">Design</span>
                <span className="bento-metric-value">Figma · Framer</span>
              </div>
              <div className="bento-metric-item">
                <span className="bento-metric-label">Frontend</span>
                <span className="bento-metric-value">React · TypeScript</span>
              </div>
              <div className="bento-metric-item">
                <span className="bento-metric-label">Systems</span>
                <span className="bento-metric-value">Design tokens · DS</span>
              </div>
            </div>

            <div className="bento-tag-row tight">
              <span className="bento-tag">Microinteractions</span>
              <span className="bento-tag">Accessibility</span>
              <span className="bento-tag">Performance-first</span>
            </div>
          </div>

          {/* BENTO 4 – “currently” / focus */}
          <div
            className={`bento-item bento-item-4 ${isBentoVisible ? 'animate' : ''}`}
            onMouseMove={handleBentoMouseMove}
            onMouseLeave={handleBentoMouseLeave}
          >
            <div className="bento-heading-row">
              <span className="bento-pill-label">Currently</span>
            </div>

            <ul className="bento-list current-list">
              <li>
                Shipping a <strong>mini design system</strong> for this portfolio.
              </li>
              <li>
                Exploring <strong>motion as feedback</strong>, not decoration.
              </li>
              <li>
                Iterating on <strong>case studies</strong> that show thinking, not just shots.
              </li>
            </ul>
          </div>

          {/* BENTO 5 – another CTA tile, same style */}
          <div
            className={`bento-item bento-item-5 bento-item-cta ${isBentoVisible ? 'animate' : ''
              }`}
            onMouseMove={handleBentoMouseMove}
            onMouseLeave={handleBentoMouseLeave}
          >
            <div className="bento-cta-copy">
              <span className="bento-cta-kicker">Zenflow journal</span>
              <div className="bento-cta-main">
                <span className="bento-cta-metric">+40%</span>
                <span className="bento-cta-sub">daily retention</span>
              </div>
              <p className="bento-cta-description">
                Reduced cognitive load with calmer flows, better empty states and gentle nudges to
                build a daily habit.
              </p>
              <div className="bento-tag-row">
                <span className="bento-tag">Mobile</span>
                <span className="bento-tag">Behavioural design</span>
                <span className="bento-tag">Dark mode</span>
              </div>
            </div>

            <button
              type="button"
              className="bento-arrow-btn"
              aria-label="Open Zenflow project"
              onClick={() => {
                handleScrollToTop();
                navigate('/Work');
              }}
            >
              ↗
            </button>
          </div>

          {/* BENTO 6 – process snapshot / timeline */}
          <div
            className={`bento-item bento-item-6 ${isBentoVisible ? 'animate' : ''}`}
            onMouseMove={handleBentoMouseMove}
            onMouseLeave={handleBentoMouseLeave}
          >
            <div className="bento-heading-row">
              <span className="bento-pill-label">Process snapshot</span>
              <span className="bento-pill-badge">End-to-end</span>
            </div>

            <div className="bento-process">
              <div className="bento-process-step">
                <span className="bento-process-index">01</span>
                <div className="bento-process-copy">
                  <span className="bento-process-title">Understand</span>
                  <span className="bento-process-meta">users, constraints & metrics</span>
                </div>
              </div>
              <div className="bento-process-step">
                <span className="bento-process-index">02</span>
                <div className="bento-process-copy">
                  <span className="bento-process-title">Explore</span>
                  <span className="bento-process-meta">flows, states & information</span>
                </div>
              </div>
              <div className="bento-process-step">
                <span className="bento-process-index">03</span>
                <div className="bento-process-copy">
                  <span className="bento-process-title">Refine</span>
                  <span className="bento-process-meta">design systems & microcopy</span>
                </div>
              </div>
              <div className="bento-process-step">
                <span className="bento-process-index">04</span>
                <div className="bento-process-copy">
                  <span className="bento-process-title">Ship</span>
                  <span className="bento-process-meta">production-ready front-end</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEE MORE BUTTON BELOW BENTO */}
        <div className="see-more-wrapper">
          <button className="see-more-btn" onClick={handleSeeMore}>
            <span className="see-more-label">See more</span>
            <span className="see-more-icon">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;