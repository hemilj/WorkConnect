import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Briefcase, ArrowRight, Globe, GitBranch, Building } from 'lucide-react';
import './Auth.css';

const Register = () => {
  const [accountType, setAccountType] = useState('candidate');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register attempt', { accountType, ...formData });
  };

  return (
    <div className="auth-page">
      {/* Background decorations */}
      <div className="auth-glow-3"></div>
      <div className="auth-glow-4"></div>

      <div className="auth-container large animate-fade-in-up">
        <div className="auth-header">
          <Link to="/" className="auth-logo-link group">
            <div className="auth-logo-icon cyan">
              <Briefcase size={24} color="white" />
            </div>
          </Link>
          <h1 className="auth-title large">Create an account</h1>
          <p className="auth-subtitle">Join WorkConnect to find your dream job or ideal candidate</p>
        </div>

        <div className="glass-panel auth-card">
          {/* Account Type Selector */}
          <div className="tab-selector">
            <button
              type="button"
              className={`tab-btn ${accountType === 'candidate' ? 'active' : ''}`}
              onClick={() => setAccountType('candidate')}
            >
              <User size={18} /> Candidate
            </button>
            <button
              type="button"
              className={`tab-btn ${accountType === 'employer' ? 'active' : ''}`}
              onClick={() => setAccountType('employer')}
            >
              <Building size={18} /> Employer
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">
                {accountType === 'candidate' ? 'Full Name' : 'Company Name'}
              </label>
              <div className="input-wrapper">
                <div className="input-icon">
                  {accountType === 'candidate' ? (
                    <User size={18} />
                  ) : (
                    <Building size={18} />
                  )}
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="auth-input"
                  placeholder={accountType === 'candidate' ? 'John Doe' : 'Acme Corp'}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Work Email</label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="auth-input"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="auth-input"
                  placeholder="Create a strong password"
                  required
                />
              </div>
              <p className="input-hint">Must be at least 8 characters long</p>
            </div>

            <div className="checkbox-group">
              <div className="checkbox-wrapper">
                <input
                  id="terms"
                  type="checkbox"
                  className="auth-checkbox"
                  required
                />
              </div>
              <label htmlFor="terms" className="checkbox-label">
                I agree to the <a href="#" className="auth-link">Terms of Service</a> and <a href="#" className="auth-link">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
              Create Account <ArrowRight size={18} />
            </button>
          </form>

          <div className="divider">
            <hr className="divider-line" />
            <span className="divider-text">Or sign up with</span>
          </div>

          <div className="social-login">
            <button className="btn btn-outline social-btn">
              <Globe size={18} /> Google
            </button>
            <button className="btn btn-outline social-btn">
              <GitBranch size={18} /> GitHub
            </button>
          </div>
        </div>

        <p className="auth-footer">
          Already have an account? <Link to="/login" className="footer-link">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
