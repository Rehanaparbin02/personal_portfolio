import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
        
        <NavLink to="/contact" className="contact-btn">
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