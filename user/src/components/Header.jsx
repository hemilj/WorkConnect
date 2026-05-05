import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Menu, X } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`glass-nav header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="logo-link group">
          <div className="logo-icon">
            <Briefcase size={22} color="white" />
          </div>
          <span className="logo-text">
            Work<span className="logo-highlight">Connect</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
          <a href="#jobs" className="nav-link">Jobs</a>
          <a href="#companies" className="nav-link">Companies</a>
          <a href="#about" className="nav-link">About</a>
        </nav>

        <div className="desktop-auth">
          <Link to="/login" className="auth-login">Log in</Link>
          <Link to="/register" className="btn btn-primary">
            Sign up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="mobile-nav glass-panel animate-fade-in-up">
          <Link to="/" className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <a href="#jobs" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Jobs</a>
          <a href="#companies" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Companies</a>
          <hr className="mobile-nav-divider" />
          <div className="mobile-auth-container">
            <Link to="/login" className="btn btn-outline btn-full" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
            <Link to="/register" className="btn btn-primary btn-full" onClick={() => setIsMobileMenuOpen(false)}>Sign up</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
