import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MessageCircle, Link2, GitBranch, Camera } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Decorative gradient orb */}
      <div className="footer-glow"></div>

      <div className="container relative z-10">
        <div className="footer-grid">
          
          <div className="footer-col">
            <Link to="/" className="logo-link group">
              <div className="logo-icon">
                <Briefcase size={18} color="white" />
              </div>
              <span className="logo-text">
                Work<span className="logo-highlight">Connect</span>
              </span>
            </Link>
            <p className="footer-desc">
              Empowering professionals to find their dream careers and helping companies discover top tier talent globally.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="social-link">
                <Link2 size={18} />
              </a>
              <a href="#" className="social-link">
                <GitBranch size={18} />
              </a>
              <a href="#" className="social-link">
                <Camera size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-title">For Candidates</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Browse Jobs</Link></li>
              <li><Link to="/" className="footer-link">Career Advice</Link></li>
              <li><Link to="/" className="footer-link">Resume Builder</Link></li>
              <li><Link to="/" className="footer-link">Job Alerts</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">For Employers</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Post a Job</Link></li>
              <li><Link to="/" className="footer-link">Search Resumes</Link></li>
              <li><Link to="/" className="footer-link">Pricing Plans</Link></li>
              <li><Link to="/" className="footer-link">Recruitment Solutions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Stay Updated</h4>
            <p className="newsletter-desc">Subscribe to our newsletter for the latest job opportunities.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" className="newsletter-input" required />
              <button type="submit" className="btn btn-primary newsletter-btn">Subscribe</button>
            </form>
          </div>

        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} WorkConnect. All rights reserved.
          </p>
          <div className="footer-legal">
            <Link to="/" className="legal-link">Privacy Policy</Link>
            <Link to="/" className="legal-link">Terms of Service</Link>
            <Link to="/" className="legal-link">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
