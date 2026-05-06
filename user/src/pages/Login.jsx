import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Briefcase, ArrowRight, GitBranch, Globe } from 'lucide-react';
import Swal from 'sweetalert2';
import './Auth.css';

const Login = () => {
  const [error, setError] = useState('');
  const router = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prevent default form submission to show UI only
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Login failed');
        return;
      }
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      Swal.fire({
        title: 'Login Successful',
        text: 'Welcome to WorkConnect! Redirecting...',
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
        background: '#0a0a0a',
        color: '#ffffff',
        iconColor: '#22d3ee'
      }).then(() => {
        router('/');
        window.location.reload(); // Force reload to update header
      });
    } catch (error) {
      setError('An error occurred during login. Please try again.');
    }
    console.log('Login attempt', formData);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const { value: email } = await Swal.fire({
      title: 'Forgot Password',
      input: 'email',
      inputLabel: 'Enter your email address',
      inputPlaceholder: 'name@example.com',
      showCancelButton: true,
      background: '#0a0a0a',
      color: '#ffffff',
      confirmButtonColor: '#22d3ee',
      cancelButtonColor: '#1f2937',
    });

    if (email) {
      // Check if email exists
      try {
        const response = await fetch('http://localhost:5000/api/forgot-password/check-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (!response.ok) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.message || 'User not found!',
            background: '#0a0a0a',
            color: '#ffffff',
          });
          return;
        }

        // If exists, ask for new password
        const { value: newPassword } = await Swal.fire({
          title: 'Update Password',
          input: 'password',
          inputLabel: 'Enter your new password',
          inputPlaceholder: '••••••••',
          showCancelButton: true,
          background: '#0a0a0a',
          color: '#ffffff',
          confirmButtonColor: '#22d3ee',
          cancelButtonColor: '#1f2937',
          inputAttributes: {
            minlength: 6,
            autocapitalize: 'off',
            autocorrect: 'off'
          }
        });

        if (newPassword) {
          const updateResponse = await fetch('http://localhost:5000/api/forgot-password/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, newPassword }),
          });
          const updateData = await updateResponse.json();
          if (updateResponse.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Your password has been updated.',
              background: '#0a0a0a',
              color: '#ffffff',
              confirmButtonColor: '#22d3ee',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: updateData.message || 'Failed to update password.',
              background: '#0a0a0a',
              color: '#ffffff',
            });
          }
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred. Please try again later.',
          background: '#0a0a0a',
          color: '#ffffff',
        });
      }
    }
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
                <a href="#" className="forgot-password" onClick={handleForgotPassword}>Forgot password?</a>
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

            {
              error && <div className="error-message">{error}</div>
            }

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
