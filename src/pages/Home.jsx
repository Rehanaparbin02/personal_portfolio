import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import ScrollReveal from '../components/ScrollReveal';
import './Process.css';


// Same capabilities marquee items as in Process
const marqueeItems = [
  'User Research',
  'Product Thinking',
  'Information Architecture',
  'Interaction Design',
  'Design Systems',
  'Prototyping',
  'Frontend Engineering',
  'Microinteractions',
  'Performance',
  'Accessibility',
];

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [isBentoVisible, setIsBentoVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const containerRef = useRef(null);
  const descriptionRef = useRef(null);
  const bentoRef = useRef(null);

  const navigate = useNavigate();

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
        rootMargin: '0px 0px -50px 0px'
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
        rootMargin: '0px 0px -50px 0px'
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

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleSeeMore = () => {
    navigate('/work');
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
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

  return (
    <section
      className="home"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition:
          'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div
        className={`home-container ${isHovered ? 'container-hovered' : ''}`}
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.95)',
          transition:
            'opacity 1.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, transform 1.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
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

      {/* NEW – infinite marquee like in Process */}
      <div className="home-marquee-block" style={{ overflow: 'hidden', maxWidth: '117rem' }}>
        <div className="process-marquee" style={{ width: '117rem' }}>
          <div className="process-marquee__fade process-marquee__fade--left" />
          <div className="process-marquee__track">
            <div className="process-marquee__inner">
              {marqueeItems.map((item) => (
                <span key={item} className="process-pill">
                  {item}
                </span>
              ))}
            </div>
            <div className="process-marquee__inner process-marquee__inner--clone">
              {marqueeItems.map((item) => (
                <span key={`${item}-clone`} className="process-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="process-marquee__fade process-marquee__fade--right" />
        </div>
      </div>

      <div className="description-section" ref={descriptionRef}>
        <div className="rec1"></div>

        <p
          className="home-description"
          style={{
            opacity: isDescriptionVisible ? 1 : 0,
            transform: isDescriptionVisible ? 'translateY(0)' : 'translateY(40px)',
            transition:
              'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div
            className="des-rec-1"
            style={{
              opacity: isDescriptionVisible ? 1 : 0,
              transform: isDescriptionVisible ? 'translateX(0)' : 'translateX(-50px)',
              transition:
                'opacity 1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, transform 1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
            }}
          >
            <span className="description-highlight">
              I&apos;m a UI/UX designer and developer
            </span>{' '}
            who turns ideas into
            <span className="description-emphasis">
              {' '}
              clean, functional, and visually sharp
            </span>{' '}
            digital experiences. Design, code, and creativity — all in one workflow to make
            interfaces that
            <span className="description-emphasis">
              {' '}
              work as good as they look.
            </span>
          </div>

          <div
            className="des-rec-2"
            style={{
              opacity: isDescriptionVisible ? 1 : 0,
              transform: isDescriptionVisible ? 'translateY(0)' : 'translateY(30px)',
              transition:
                'opacity 1s cubic-bezier(0.4, 0, 0.2, 1) 0.6s, transform 1s cubic-bezier(0.4, 0, 0.2, 1) 0.6s'
            }}
          >
            I see the code as a <span className="description-highlight">means</span> , not an
            end. What truly motivates me is translating difficult, messy problems into{' '}
            <span className="description-highlight">impeccably designed and effortlessly</span>{' '}
            <span className="description-highlight">
              functional digital experiences
            </span>
          </div>
        </p>

        <div className="rec2"></div>
      </div>

      <div
        ref={bentoRef}
        className={`bento-section ${isBentoVisible ? 'visible' : ''}`}
      >
        <div className="bento-grid">
          {/* BENTO 1 – KOA style metric card with arrow */}
          <div
            className={`bento-item bento-item-1 bento-item-cta ${
              isBentoVisible ? 'animate' : ''
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
            </div>

            <button
              type="button"
              className="bento-arrow-btn"
              aria-label="Open project showcase"
              onClick={() => {
                handleScrollToTop();
                navigate('/Work');
              }}
            >
              ↗
            </button>
          </div>

          {/* BENTO 2–4 stay as normal blocks (you can fill them later) */}
          <div
            className={`bento-item bento-item-2 ${isBentoVisible ? 'animate' : ''}`}
            onMouseMove={handleBentoMouseMove}
            onMouseLeave={handleBentoMouseLeave}
          ></div>

          <div
            className={`bento-item bento-item-3 ${isBentoVisible ? 'animate' : ''}`}
            onMouseMove={handleBentoMouseMove}
            onMouseLeave={handleBentoMouseLeave}
          ></div>

          <div
            className={`bento-item bento-item-4 ${isBentoVisible ? 'animate' : ''}`}
            onMouseMove={handleBentoMouseMove}
            onMouseLeave={handleBentoMouseLeave}
          ></div>

          {/* BENTO 5 – another CTA tile, same style */}
          <div
            className={`bento-item bento-item-5 bento-item-cta ${
              isBentoVisible ? 'animate' : ''
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
            </div>

            <button
              type="button"
              className="bento-arrow-btn"
              aria-label="Open project showcase"
              onClick={() => {
                handleScrollToTop();
                navigate('/Work');
              }}
            >
              ↗
            </button>
          </div>

          <div
            className={`bento-item bento-item-6 ${isBentoVisible ? 'animate' : ''}`}
            onMouseMove={handleBentoMouseMove}
            onMouseLeave={handleBentoMouseLeave}
          ></div>
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
