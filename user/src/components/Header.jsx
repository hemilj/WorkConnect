import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Briefcase, Menu, X, User, LogOut } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Get user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
    window.location.reload();
  };

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
          {user && user.accountType === 'employer' && (
            <Link to="/post-job" className={`nav-link ${isActive('/post-job') ? 'active' : ''}`}>Post a Job</Link>
          )}
          <Link to="/jobs" className={`nav-link ${isActive('/jobs') ? 'active' : ''}`}>Jobs</Link>
          <a href="#companies" className="nav-link">Companies</a>
          <a href="#about" className="nav-link">About</a>
        </nav>

        <div className="desktop-auth">
          {user ? (
            <div className="user-profile-wrapper">
              <div className="user-profile">
                <div className="user-avatar">
                  {user.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
                </div>
                <div className="user-info">
                  <span className="user-name">{user.name}</span>
                </div>
                <button onClick={handleLogout} className="logout-icon-btn" title="Logout">
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="auth-login">Log in</Link>
              <Link to="/register" className="btn btn-primary">
                Sign up
              </Link>
            </>
          )}
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
          {user && user.accountType === 'employer' && (
            <Link to="/post-job" className={`mobile-nav-link ${isActive('/post-job') ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Post a Job</Link>
          )}
          <Link to="/jobs" className={`mobile-nav-link ${isActive('/jobs') ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Jobs</Link>
          <a href="#companies" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Companies</a>
          <hr className="mobile-nav-divider" />
          
          {user ? (
            <div className="mobile-user-section">
              <div className="user-profile">
                <div className="user-avatar">
                  {user.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
                </div>
                <div className="user-info">
                  <span className="user-name">{user.name}</span>
                </div>
              </div>
              <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="btn btn-outline btn-full logout-btn-mobile">
                <LogOut size={18} /> Logout
              </button>
            </div>
          ) : (
            <div className="mobile-auth-container">
              <Link to="/login" className="btn btn-outline btn-full" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
              <Link to="/register" className="btn btn-primary btn-full" onClick={() => setIsMobileMenuOpen(false)}>Sign up</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
