import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Type, MapPin, AlignLeft, Send, ArrowLeft, IndianRupee, Layers } from 'lucide-react';
import Swal from 'sweetalert2';
import './Auth.css'; // Reusing some auth styles for consistency

const PostJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    salary: '',
    location: '',
    category: 'Technology'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Authentication Required',
        text: 'Please log in to post a job.',
        background: '#0a0a0a',
        color: '#ffffff'
      });
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/jobs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Job Posted!',
          text: 'Your job listing has been created successfully.',
          background: '#0a0a0a',
          color: '#ffffff',
          confirmButtonColor: '#22d3ee'
        }).then(() => {
          navigate('/');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Post Job',
          text: data.message || 'Something went wrong.',
          background: '#0a0a0a',
          color: '#ffffff'
        });
      }
    } catch (error) {
      console.error('Error posting job:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while posting the job.',
        background: '#0a0a0a',
        color: '#ffffff'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-glow-1"></div>
      <div className="auth-glow-2"></div>

      <div className="auth-container large animate-fade-in-up">
        <div className="auth-header">
          <button onClick={() => navigate(-1)} className="back-btn mb-4" style={{ background: 'transparent', border: 'none', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <ArrowLeft size={18} /> Back
          </button>
          <div className="auth-logo-icon mb-4">
            <Briefcase size={24} color="white" />
          </div>
          <h1 className="auth-title">Post a New Job</h1>
          <p className="auth-subtitle">Fill in the details to find your next great hire</p>
        </div>

        <div className="glass-panel auth-card">
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Job Title</label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <Type size={18} />
                </div>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="auth-input"
                  placeholder="e.g. Senior React Developer"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Job Description</label>
              <div className="input-wrapper" style={{ alignItems: 'flex-start' }}>
                <div className="input-icon" style={{ marginTop: '0.75rem' }}>
                  <AlignLeft size={18} />
                </div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="auth-input"
                  style={{ minHeight: '120px', padding: '0.75rem 0.75rem 0.75rem 3rem', resize: 'vertical' }}
                  placeholder="Describe the role, requirements, and responsibilities..."
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Job Category</label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <Layers size={18} />
                </div>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="auth-input"
                  style={{ appearance: 'none', cursor: 'pointer' }}
                  required
                >
                  <option value="Technology">Technology</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Salary (Monthly)</label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <IndianRupee size={18} />
                  </div>
                  <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="auth-input"
                    placeholder="e.g. 50000"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Location</label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <MapPin size={18} />
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="auth-input"
                    placeholder="e.g. Remote, Ahmedabad"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary submit-btn mt-4"
              disabled={loading}
            >
              {loading ? 'Posting...' : 'Post Job Listing'} <Send size={18} className="ml-2" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
