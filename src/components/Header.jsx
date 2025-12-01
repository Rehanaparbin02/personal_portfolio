import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { useRef } from 'react';


const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const magneticRef = useRef(null);

  const handleMagneticMove = (e) => {
    const btn = magneticRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    const distance = Math.sqrt(x * x + y * y);
    const maxDist = 120;

    if (distance > maxDist) {
      btn.style.transform = '';
      btn.style.boxShadow = '';
      return;
    }

    const strength = 1 - distance / maxDist;

    btn.style.transform = `translate(${x * 0.18 * strength}px, ${y * 0.18 * strength}px)`;
    btn.style.boxShadow = `0 10px 30px rgba(0,0,0,0.25)`;
  };

  const resetMagnetic = () => {
    if (!magneticRef.current) return;
    magneticRef.current.style.transform = '';
    magneticRef.current.style.boxShadow = '';
  };


  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <header className="navbar">
        <div className="logo">RP</div>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/work">Work</NavLink>
        </nav>

        <NavLink to="/contact" className="contact-btn" ref={magneticRef} onMouseMove={handleMagneticMove} onMouseLeave={resetMagnetic}>
          Contact
        </NavLink>

        {/* Mobile Menu Button */}
        <button
          className="menu-toggle"
          onClick={toggleDrawer}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isDrawerOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </header>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div className="drawer-overlay" onClick={closeDrawer}></div>
      )}

      {/* Drawer Menu */}
      <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
        <nav className="drawer-nav">
          <NavLink to="/" end onClick={closeDrawer}>Home</NavLink>
          <NavLink to="/about" onClick={closeDrawer}>About</NavLink>
          <NavLink to="/work" onClick={closeDrawer}>Work</NavLink>
          <NavLink to="/contact" onClick={closeDrawer} className="drawer-contact">
            Contact
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Header;