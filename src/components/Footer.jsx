import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  FaBehance,
  FaDownload,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
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
              <Link
                to="/"
                className="footer-link-btn"
                onClick={handleScrollToTop}
              >
                Home
              </Link>
              <Link
                to="/work"
                className="footer-link-btn"
                onClick={handleScrollToTop}
              >
                Work
              </Link>
              <Link
                to="/about"
                className="footer-link-btn"
                onClick={handleScrollToTop}
              >
                About
              </Link>
              {/* <Link
                to="/process"
                className="footer-link-btn"
                onClick={handleScrollToTop}
              >
                Process
              </Link> */}
            </div>

            <div className="footer-column footer-column-contact">
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
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {/* <span className="scan-code">Scan to download resume</span>
                  <img
                    src={resumeQR}
                    alt="qrcode"
                    style={{ width: '10rem', height: '10rem', objectFit: 'contain', position: 'relative', left: '-2rem' }}
                  /> */}
                </div>


                <a
                  href="https://drive.google.com/file/d/1lukj9n9z_l9NBTKAghiJOchmJlcXFYWT/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link-download-btn"
                >
                  <FaDownload />
                  Download Resume
                </a>
              </div>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title"
                style={{ position: 'relative', right: '-2rem' }}
              >Social</h4>
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
                  <FaBehance />
                  <span>Behance</span>
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
      </div >
    </footer >
  );
};

export default Footer;
