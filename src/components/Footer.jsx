import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
import "./Footer.css";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done
  const footerRef = useRef(null);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Scroll-into-view for footer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const current = footerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  // Fake subscribe just for animation/micro-interaction
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || status === "sending") return;
    setStatus("sending");
    setTimeout(() => {
      setStatus("done");
      setEmail("");
      setTimeout(() => setStatus("idle"), 2000);
    }, 900);
  };

  return (
    <footer
      ref={footerRef}
      className={`footer ${isVisible ? "is-visible" : ""}`}
    >
      {/* Big background word for modern hero-like footer */}
      <div className="footer-bigword" aria-hidden="true">
        PORTFOLIO
      </div>

      <div className="footer-shell">
        {/* Newsletter / CTA card */}
        {/* <section className="newsletter-card">
          <div className="newsletter-left">
            <p className="footer-kicker">Stay in the loop</p>
            <h2 className="newsletter-heading">
              Subscribe to <span>design updates</span>
            </h2>
            <p className="newsletter-copy">
              No spam. Just case studies, product experiments and small design
              notes a few times a month.
            </p>
          </div>

          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <label className="newsletter-label">
              <span className="newsletter-label-text">Email address</span>
              <div className="newsletter-input-shell">
                <FaEnvelope className="newsletter-input-icon" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="newsletter-input"
                />
              </div>
            </label>
            <button
              type="submit"
              className={`newsletter-btn newsletter-btn-${status}`}
            >
              {status === "idle" && (
                <>
                  Subscribe
                  <HiArrowUpRight className="newsletter-btn-icon" />
                </>
              )}
              {status === "sending" && <span className="dot-loader" />}
              {status === "done" && <span>Joined ✓</span>}
            </button>
            <p className="newsletter-meta">
              By subscribing you agree to the{" "}
              <button
                type="button"
                className="inline-link"
                onClick={handleScrollToTop}
              >
                privacy notes
              </button>
              .
            </p>
          </form>
        </section> */}

        {/* Main footer content */}
        <section className="footer-main">
          <div className="footer-brand">
            {/* <div className="brand-mark">↗</div> */}
            <div className="brand-text-group">
              <p className="brand-title">REHANA — UI/UX & developer</p>
              <p className="brand-tagline">
                Turning complex products into simple, considered experiences.
              </p>
            </div>
          </div>

          <div className="footer-columns">
            <div className="footer-column">
              <h4 className="footer-column-title">Explore</h4>
              <button
                className="footer-link-btn"
                onClick={() => (window.location.href = "/work")}
              >
                Work
              </button>
              <button
                className="footer-link-btn"
                onClick={handleScrollToTop}
              >
                About
              </button>
              <button className="footer-link-btn">Process</button>
            </div>

            <div className="footer-column" style={{ position: "relative" , left: "-6rem" }}>
              <h4 className="footer-column-title">Contact</h4>
              <a
                href="mailto:rehanaparbin0210@gmail.com"
                className="footer-link"
              >
                rehanaparbin0210@gmail.com
              </a>
              <span className="footer-link muted">
                Based in India · Remote friendly
              </span>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Social</h4>
              <div className="footer-social-row">
                <a
                  href="https://github.com/geniusdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-pill"
                >
                  <FaGithub />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/geniusdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-pill"
                >
                  <FaLinkedin />
                  <span>LinkedIn</span>
                </a>
              </div>
              <div className="footer-social-row">
                <a
                  href="https://twitter.com/geniusdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-pill"
                >
                  <FaTwitter />
                  <span>Twitter</span>
                </a>
                <a
                  href="https://instagram.com/geniusdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-pill"
                >
                  <FaInstagram />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom line */}
        <div className="footer-bottom">
          <p className="footer-meta">
            © {new Date().getFullYear()} Rehana. Crafted with care.
          </p>
          <div className="footer-bottom-right">
            {/* <span className="footer-meta muted">CET · 24° · Clear sky</span> */}
            <button
              onClick={handleScrollToTop}
              className="back-to-top-chip"
              aria-label="Back to top"
            >
              Back to top
              <HiArrowUpRight className="chip-icon" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
