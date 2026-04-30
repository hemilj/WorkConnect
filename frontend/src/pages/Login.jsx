import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Briefcase, ArrowRight, GitBranch, Globe } from 'lucide-react';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prevent default form submission to show UI only
    console.log('Login attempt', formData);
  };

  return (
    <div className="auth-page">
      {/* Background decorations */}
      <div className="auth-glow-1"></div>
      <div className="auth-glow-2"></div>

      <div className="auth-container animate-fade-in-up">
        <div className="auth-header">
          <Link to="/" className="auth-logo-link group">
            <div className="auth-logo-icon">
              <Briefcase size={24} color="white" />
            </div>
          </Link>
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Enter your credentials to access your account</p>
        </div>

        <div className="glass-panel auth-card">
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
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
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label mb-0">Password</label>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>
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
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
              Sign In <ArrowRight size={18} />
            </button>
          </form>

          <div className="divider">
            <hr className="divider-line" />
            <span className="divider-text">Or continue with</span>
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
          Don't have an account? <Link to="/register" className="footer-link">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
