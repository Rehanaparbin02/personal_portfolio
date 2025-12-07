import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import ScrollReveal from '../components/ScrollReveal';
import './Process.css';
import homeCard1 from '../assets/home-card-1.png';


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

  // horizontal offsets for each of the 4 stack cards
  // index 0 -> bottom (layer-3), 1 -> layer-2, 2 -> layer-1, 3 -> main card (top)
  const [cardOffsets, setCardOffsets] = useState([0, 0, 0, 0]);
  // slide state for each card: 'left' | 'right' | null
  const [cardSlideDirection, setCardSlideDirection] = useState([
    null,
    null,
    null,
    null,
  ]);
  // index of current top/active card still in the stack (starts at 3: main card)
  const [activeCardIndex, setActiveCardIndex] = useState(3);

  const containerRef = useRef(null);
  const descriptionRef = useRef(null);
  const bentoRef = useRef(null);
  const bannerCtaRef = useRef(null);
  const bentoStackRef = useRef(null);

  const navigate = useNavigate();
  const baseMarqueeDurationPrimary = 26; // UI/UX row
  const baseMarqueeDurationSecondary = 32; // mobile row

  const primaryDuration = baseMarqueeDurationPrimary / marqueeSpeed;
  const secondaryDuration =
    baseMarqueeDurationSecondary / (0.6 * marqueeSpeed + 0.1);

  useEffect(() => {
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
    // Intersection Observer for bento section scroll-to-reveal
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
      // Much gentler mapping: 0–0.6 → 1x–1.6x speed
      const normalized = Math.min(velocity * 10, 0.6);
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

  // Hover / swipe effect for the CURRENT TOP card only
  const handleBentoMouseMove = (e) => {
    const stack = bentoStackRef.current;
    if (!stack) return;
    if (activeCardIndex < 0) return; // no cards left
    if (cardSlideDirection[activeCardIndex]) return; // already slid out

    const rect = stack.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const relativeX = e.clientX - centerX;

    const maxDistance = rect.width / 2;
    const normalized = Math.max(-1, Math.min(1, relativeX / maxDistance));
    const MAX_OFFSET = 28; // px; subtle hover drift

    setCardOffsets((prev) => {
      const next = [...prev];
      next[activeCardIndex] = normalized * MAX_OFFSET;
      return next;
    });
  };

  const handleBentoMouseLeave = () => {
    if (activeCardIndex < 0) return;
    if (cardSlideDirection[activeCardIndex]) return; // keep slid ones as-is
    setCardOffsets((prev) => {
      const next = [...prev];
      next[activeCardIndex] = 0;
      return next;
    });
  };

  // Click:
  // - left third  -> if a card is parked on the left, bring it back;
  //                  otherwise slide current top card fully left.
  // - right third -> same for right side.
  // - middle third -> reset ALL cards back into original stack.
  const handleBentoClick = (e) => {
    const stack = bentoStackRef.current;
    if (!stack) return;

    const rect = stack.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const third = rect.width / 3;

    // Center click → reset whole deck anytime
    if (x >= third && x <= 2 * third) {
      setCardOffsets([0, 0, 0, 0]);
      setCardSlideDirection([null, null, null, null]);
      setActiveCardIndex(3);
      return;
    }

    // Determine side ('left' or 'right')
    const side = x < third ? 'left' : 'right';

    // 1) If there is already a card parked on this side, bring the
    //    *topmost* one back to the stack & make it active.
    const parkedIndex = (() => {
      for (let i = 3; i >= 0; i--) {
        if (cardSlideDirection[i] === side) return i;
      }
      return -1;
    })();

    if (parkedIndex !== -1) {
      // Restore that card
      setCardOffsets((prev) => {
        const next = [...prev];
        next[parkedIndex] = 0;
        return next;
      });

      setCardSlideDirection((prev) => {
        const next = [...prev];
        next[parkedIndex] = null;
        return next;
      });

      setActiveCardIndex(parkedIndex);
      return;
    }

    // 2) Otherwise, slide the current active (top) card to this side
    if (activeCardIndex < 0) return; // nothing to slide

    const slideAmount =
      side === 'left' ? -rect.width * 1.2 : rect.width * 1.2;

    setCardOffsets((prev) => {
      const next = [...prev];
      next[activeCardIndex] = slideAmount;
      return next;
    });

    // mark this card as slid and compute the next active card
    setCardSlideDirection((prev) => {
      const next = [...prev];
      next[activeCardIndex] = side;

      // find next unslid card below this one
      let nextTop = activeCardIndex - 1;
      while (nextTop >= 0 && next[nextTop] !== null) {
        nextTop -= 1;
      }
      setActiveCardIndex(nextTop);

      return next;
    });
  };

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
              <span
                key={item}
                className="home-marquee-text"
                style={{ color: '#f9f0de' }}
              >
                {item} •
              </span>
            ))}
            {uiUxMarqueeItems.map((item) => (
              <span
                key={item + '-clone'}
                className="home-marquee-text"
                style={{ color: '#f9f0de' }}
              >
                {item} •
              </span>
            ))}
          </div>
        </div>

        {/* Row 2: Mobile & app development */}
        <div
          className="home-marquee-row home-marquee-row--secondary"
          style={{
            backgroundColor: '#f9f0de',
            border: '1px solid #1d2342',
          }}
        >
          <div
            className="home-marquee-track home-marquee-track--secondary"
            style={{ animationDuration: `${secondaryDuration}s` }}
          >
            {mobileMarqueeItems.map((item) => (
              <span
                key={item}
                className="home-marquee-text"
                style={{ color: '#1d2342' }}
              >
                {item} •
              </span>
            ))}
            {mobileMarqueeItems.map((item) => (
              <span
                key={item + '-clone'}
                className="home-marquee-text"
                style={{ color: '#1d2342' }}
              >
                {item} •
              </span>
            ))}
          </div>
        </div>
      </div>


      {/* Description Section */}

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
          <div className="description-top-frame">
            <div className="description-top-frame-thinLine"></div>
            <div className="description-top-frame-thickLine"></div>
          </div>
          {/* top row */}
          <div className="description-top">
            <span className="description-top-label">ABOUT THE BLEND</span>


            <h2 className="description-top-heading-vertical">
              <span className="description-top-small-vertical">DESIGN THINKING</span>
            </h2>


            <h2 className="description-top-heading-horizontal">
              <span className="description-top-small-horizontal">
                MEETS SHIPPING CODE.
              </span>
            </h2>

            {/* <p className="description-top-copy">
              I work across <span>product, visual and front-end</span> so ideas
              don&apos;t get lost between Figma and production.
            </p> */}
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
                  transform: isDescriptionVisible
                    ? 'translateY(0)'
                    : 'translateY(24px)',
                  transition:
                    'opacity 0.7s cubic-bezier(0.4,0,0.2,1) 0.15s, transform 0.7s cubic-bezier(0.4,0,0.2,1) 0.15s',
                }}
              >
                <p className="description-card-1">
                  Hi, I’m Rehana — the person who loves turning “what if…” into
                  “oh wow, this actually works.” I design and build digital
                  experiences that feel clean, intuitive, and quietly powerful.
                  Think of me as someone who speaks both languages — the visual
                  poetry of UI/UX and the logical precision of full-stack
                  development. I sketch ideas, shape interactions, architect
                  systems, and then bring it all to life in code.
                </p>
              </div>

              <div
                className="description-card"
                style={{
                  opacity: isDescriptionVisible ? 1 : 0,
                  transform: isDescriptionVisible
                    ? 'translateY(0)'
                    : 'translateY(24px)',
                  transition:
                    'opacity 0.7s cubic-bezier(0.4,0,0.2,1) 0.25s, transform 0.7s cubic-bezier(0.4,0,0.2,1) 0.25s',
                }}
              >
                <p className="description-card-2">
                  To me, code isn’t the destination — it’s the vehicle. What
                  excites me is taking messy, complex problems and transforming
                  them into smooth, beautifully engineered products that feel
                  effortless for the user. Natural interactions, scalable
                  backends, motion-rich mobile interfaces, offline-ready
                  workflows — I love building things that not only look great
                  but behave great. My mission is simple: to create digital
                  experiences that work beautifully, feel seamless, and make
                  people think, “yes — this is exactly how it should be.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WORK / STACKED CARDS SECTION */}
      <div
        ref={bentoRef}
        className={`bento-section ${isBentoVisible ? 'visible' : ''}`}
      >
        <div className="bento-top-frame">
          <div className="bento-top-frame-thinLine"></div>
          <div className="bento-top-frame-thickLine"></div>
        </div>
        {/* Header like the reference image */}
        <div className="bento-header-main">
          <p className="bento-headline-bg">
            DESIGNED TO FEEL. BUILT TO PERFORM.
          </p>
          <h2 className="bento-title-new">WORK</h2>
        </div>

        {/* Stacked cards */}
        <div
          className="bento-stack"
          ref={bentoStackRef}
          onMouseMove={handleBentoMouseMove}
          onMouseLeave={handleBentoMouseLeave}
          onClick={handleBentoClick}
        >
          {/* bottom card
          <div
            className="bento-layer bento-layer-3"
            style={{ transform: `translateX(${cardOffsets[0]}px)` }}
          /> */}
          {/* middle */}
          <div
            className="bento-layer bento-layer-2"
            style={{ transform: `translateX(${cardOffsets[1]}px)` }}
          >
            <div className="bento-main-card-content">
              {/* Top title with decorative lines */}
              <div className="bento-card-header">
                <div className="bento-card-header-lines bento-card-header-lines-left">
                  <div className="bento-line-thin"></div>
                  <div className="bento-line-thick"></div>
                </div>
                <h2 className="bento-card-top-title">ZENFLOW</h2>
                <div className="bento-card-header-lines bento-card-header-lines-right">
                  <div className="bento-line-thin"></div>
                  <div className="bento-line-thick"></div>
                </div>
              </div>

              {/* Mockup image */}
              <div className="bento-card-image-wrapper">
                <img src={homeCard1} alt="Zenflow app mockup" className="bento-card-image" />
              </div>

              <div className="bento-card-info">
                {/* Case study label */}
                <p className="bento-card-case-label">CASE STUDY 01</p>

                {/* Main title */}
                <h3 className="bento-card-main-title">ZENFLOW - MICRO JOURNLING APP</h3>

                {/* Tags */}
                <div className="bento-card-tags">
                  <span className="bento-card-tag">FULL STACK</span>
                  <span className="bento-card-tag-separator">-</span>
                  <span className="bento-card-tag">REACT NATIVE</span>
                  <span className="bento-card-tag-separator">-</span>
                  <span className="bento-card-tag">ANDROID APP</span>
                </div>
              </div>

              {/* CTA Button */}
              <button className="bento-card-cta"
                onClick={() => navigate('/work')}
              >VIEW CASE STUDY</button>
            </div>
          </div>
          {/* upper middle */}
          <div
            className="bento-layer bento-layer-1"
            style={{ transform: `translateX(${cardOffsets[2]}px)` }}
          >
            <div className="bento-main-card-content">
              {/* Top title with decorative lines */}
              <div className="bento-card-header">
                <div className="bento-card-header-lines bento-card-header-lines-left">
                  <div className="bento-line-thin"></div>
                  <div className="bento-line-thick"></div>
                </div>
                <h2 className="bento-card-top-title">ZENFLOW</h2>
                <div className="bento-card-header-lines bento-card-header-lines-right">
                  <div className="bento-line-thin"></div>
                  <div className="bento-line-thick"></div>
                </div>
              </div>

              {/* Mockup image */}
              <div className="bento-card-image-wrapper">
                <img src={homeCard1} alt="Zenflow app mockup" className="bento-card-image" />
              </div>

              <div className="bento-card-info">
                {/* Case study label */}
                <p className="bento-card-case-label">CASE STUDY 01</p>

                {/* Main title */}
                <h3 className="bento-card-main-title">ZENFLOW - MICRO JOURNLING APP</h3>

                {/* Tags */}
                <div className="bento-card-tags">
                  <span className="bento-card-tag">FULL STACK</span>
                  <span className="bento-card-tag-separator">-</span>
                  <span className="bento-card-tag">REACT NATIVE</span>
                  <span className="bento-card-tag-separator">-</span>
                  <span className="bento-card-tag">ANDROID APP</span>
                </div>
              </div>

              {/* CTA Button */}
              <button className="bento-card-cta"
                onClick={() => navigate('/work')}
              >VIEW CASE STUDY</button>
            </div>
          </div>
          {/* top / main */}
          <div
            className="bento-main-card"
            style={{ transform: `translateX(${cardOffsets[3]}px)` }}
          >

            <div className="bento-main-card-content">
              {/* Top title with decorative lines */}
              <div className="bento-card-header">
                <div className="bento-card-header-lines bento-card-header-lines-left">
                  <div className="bento-line-thin"></div>
                  <div className="bento-line-thick"></div>
                </div>
                <h2 className="bento-card-top-title">ZENFLOW</h2>
                <div className="bento-card-header-lines bento-card-header-lines-right">
                  <div className="bento-line-thin"></div>
                  <div className="bento-line-thick"></div>
                </div>
              </div>

              {/* Mockup image */}
              <div className="bento-card-image-wrapper">
                <img src={homeCard1} alt="Zenflow app mockup" className="bento-card-image" />
              </div>

              <div className="bento-card-info">
                {/* Case study label */}
                <p className="bento-card-case-label">CASE STUDY 01</p>

                {/* Main title */}
                <h3 className="bento-card-main-title">ZENFLOW - MICRO JOURNLING APP</h3>

                {/* Tags */}
                <div className="bento-card-tags">
                  <span className="bento-card-tag">FULL STACK</span>
                  <span className="bento-card-tag-separator">-</span>
                  <span className="bento-card-tag">REACT NATIVE</span>
                  <span className="bento-card-tag-separator">-</span>
                  <span className="bento-card-tag">ANDROID APP</span>
                </div>
              </div>

              {/* CTA Button */}
              <button className="bento-card-cta"
                onClick={() => navigate('/work')}
              >VIEW CASE STUDY</button>
            </div>

          </div>
        </div>

        {/* See more button – bottom right */}
        {/* <div className="see-more-wrapper">
          <button className="see-more-btn" onClick={handleSeeMore}>
            <span className="see-more-label">See more</span>
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default Home;


