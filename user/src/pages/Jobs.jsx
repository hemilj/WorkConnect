import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, IndianRupee, Building2, Search, Filter } from 'lucide-react';
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="jobs-page">
        <div className="container">
          <div className="loading-spinner-container">
            <div className="spinner"></div>
            <p>Loading available opportunities...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="jobs-page">
      {/* Background decorations */}
      <div className="auth-glow-1"></div>
      <div className="auth-glow-2"></div>

      <div className="container">
        <div className="jobs-header animate-fade-in">
          <h1 className="jobs-title">Find Your Next Career</h1>
          <p className="jobs-subtitle">Browse through the latest job openings from top companies</p>
        </div>

        {/* Search and Filter Section */}
        <div className="search-bar-wrapper animate-fade-in-up">
          <div className="glass-panel search-bar-container">
            <div className="search-input-group">
              <Search size={20} className="search-icon" />
              <input type="text" placeholder="Search by job title or keyword..." className="search-input" />
            </div>
            <div className="search-divider"></div>
            <div className="search-input-group">
              <MapPin size={20} className="search-icon" />
              <input type="text" placeholder="Location..." className="search-input" />
            </div>
            <button className="btn btn-primary search-btn">
              Search Jobs
            </button>
          </div>
        </div>

        {error && (
          <div className="error-banner">
            <p>Error: {error}. Please try refreshing the page.</p>
          </div>
        )}

        {!loading && jobs.length === 0 ? (
          <div className="no-jobs animate-fade-in">
            <Briefcase size={48} className="mb-4 opacity-20" />
            <h3>No jobs found</h3>
            <p>Check back later for new opportunities.</p>
          </div>
        ) : (
          <div className="jobs-grid">
            {jobs.map((job, index) => (
              <div key={job._id} className="glass-panel job-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="job-card-header">
                  <div className="flex justify-between items-start mb-4">
                    <div className="job-company">
                      <Building2 size={14} />
                      {job.company?.name || 'Company Name'}
                    </div>
                    <div className="job-category-badge">
                      {job.category || 'Technology'}
                    </div>
                  </div>
                  <h2 className="job-title">{job.title}</h2>
                  <div className="job-location">
                    <MapPin size={16} />
                    {job.location || 'Remote'}
                  </div>
                </div>
                
                <p className="job-description">{job.description}</p>
                
                <div className="job-card-footer">
                  <div className="job-salary">
                    <IndianRupee size={18} />
                    <span>{job.salary ? job.salary.toLocaleString() : 'Negotiable'}</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 400, color: '#94a3b8' }}>/mo</span>
                  </div>
                  <div className="job-card-actions" style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link to={`/job/${job._id}`} className="btn btn-outline apply-btn">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
