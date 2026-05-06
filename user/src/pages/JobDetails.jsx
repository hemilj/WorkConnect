import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Briefcase, MapPin, IndianRupee, Building2, Calendar, ArrowLeft, Send, CheckCircle, Layers } from 'lucide-react';
import Swal from 'sweetalert2';
import './Jobs.css';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${id}`);
        if (!response.ok) {
          throw new Error('Job not found');
        }
        const data = await response.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleApply = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      Swal.fire({
        title: 'Login Required',
        text: 'Please log in to apply for this job.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Log In',
        background: '#0a0a0a',
        color: '#ffffff',
        confirmButtonColor: '#22d3ee',
        cancelButtonColor: '#1f2937',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }

    // Since we haven't implemented application logic yet, show a success message
    Swal.fire({
      title: 'Application Sent!',
      text: `Your application for ${job.title} has been submitted successfully.`,
      icon: 'success',
      background: '#0a0a0a',
      color: '#ffffff',
      confirmButtonColor: '#22d3ee',
    });
  };

  if (loading) {
    return (
      <div className="jobs-page">
        <div className="container">
          <div className="loading-spinner-container">
            <div className="spinner"></div>
            <p>Loading job details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="jobs-page">
        <div className="container">
          <div className="error-banner">
            <h2>Error</h2>
            <p>{error || 'Job not found'}</p>
            <Link to="/jobs" className="btn btn-primary mt-4">Back to Jobs</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="jobs-page">
      <div className="auth-glow-1"></div>
      <div className="auth-glow-2"></div>

      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn mb-8" style={{ background: 'transparent', border: 'none', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <ArrowLeft size={20} /> Back to Listings
        </button>

        <div className="job-details-wrapper animate-fade-in-up">
          <div className="glass-panel job-details-card">
            <div className="job-details-header">
              <div className="job-header-main">
                <div className="company-badge mb-4">
                  <Building2 size={16} />
                  <span>{job.company?.name || 'Company Name'}</span>
                </div>
                <h1 className="job-details-title">{job.title}</h1>
                <div className="job-meta-grid mt-4">
                  <div className="job-meta-item">
                    <Layers size={18} />
                    <span>{job.category || 'Technology'}</span>
                  </div>
                  <div className="job-meta-item">
                    <MapPin size={18} />
                    <span>{job.location || 'Remote'}</span>
                  </div>
                  <div className="job-meta-item">
                    <IndianRupee size={18} />
                    <span>{job.salary ? job.salary.toLocaleString() : 'Negotiable'} / month</span>
                  </div>
                  <div className="job-meta-item">
                    <Calendar size={18} />
                    <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="job-header-actions">
                <button onClick={handleApply} className="btn btn-primary apply-now-btn">
                  Apply Now <Send size={18} />
                </button>
              </div>
            </div>

            <div className="job-details-content mt-12">
              <h3 className="section-title">Job Description</h3>
              <p className="job-long-description">
                {job.description}
              </p>

              <div className="job-requirements mt-8">
                <h3 className="section-title">Key Responsibilities & Requirements</h3>
                <ul className="requirements-list">
                  <li>Strong understanding of core concepts related to {job.title}.</li>
                  <li>Ability to work in a fast-paced team environment.</li>
                  <li>Good communication and problem-solving skills.</li>
                  <li>Experience with modern development practices and tools.</li>
                </ul>
              </div>
            </div>

            <div className="job-footer-cta mt-12 p-8 glass-panel" style={{ background: 'rgba(34, 211, 238, 0.05)', borderColor: 'rgba(34, 211, 238, 0.1)' }}>
              <div className="cta-content">
                <h3>Interested in this role?</h3>
                <p>Submit your application now and our recruitment team will review it.</p>
              </div>
              <button onClick={handleApply} className="btn btn-primary">
                Quick Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
