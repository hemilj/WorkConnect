import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Briefcase, TrendingUp, Building2, Users, ArrowRight, Star } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="hero-section">
        {/* Glow Effects */}
        <div className="hero-glow-1"></div>
        <div className="hero-glow-2"></div>
        
        <div className="container text-center animate-fade-in-up">
          <div className="hero-badge">
            <span className="ping-dot">
              <span className="ping-dot-anim"></span>
              <span className="ping-dot-inner"></span>
            </span>
            Over 10,000+ jobs available
          </div>
          
          <h1 className="hero-title">
            Discover Your Next <br />
            <span className="text-gradient-primary">
              Dream Career
            </span>
          </h1>
          
          <p className="hero-subtitle">
            Connect with top employers worldwide. Find opportunities that match your skills, passion, and ambition.
          </p>

          {/* Search Glass Card */}
          <div className="glass-panel search-card">
            <div className="search-input-group">
              <Search className="text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Job title, keywords, or company" 
                className="search-input"
              />
            </div>
            <div className="search-input-group">
              <MapPin className="text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="City, state, or remote" 
                className="search-input"
              />
            </div>
            <button className="btn btn-primary search-btn">
              Find Jobs
            </button>
          </div>

          <div className="popular-tags">
            <span>Popular:</span>
            {['Frontend Developer', 'UI/UX Designer', 'Product Manager', 'Data Scientist'].map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {[
              { icon: <Briefcase size={24}/>, value: '25k+', label: 'Active Jobs' },
              { icon: <Building2 size={24}/>, value: '10k+', label: 'Companies' },
              { icon: <Users size={24}/>, value: '5M+', label: 'Candidates' },
              { icon: <TrendingUp size={24}/>, value: '150k+', label: 'Hired' },
            ].map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-icon">{stat.icon}</div>
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Explore by <span className="text-gradient-primary">Category</span></h2>
              <p className="section-subtitle">Find the role that best suits your skills and expertise.</p>
            </div>
            <Link to="/" className="view-all-link">
              View all categories <ArrowRight size={18} />
            </Link>
          </div>

          <div className="category-grid">
            {[
              { name: 'Technology', jobs: '4,200', icon: '💻' },
              { name: 'Design', jobs: '1,500', icon: '🎨' },
              { name: 'Marketing', jobs: '2,800', icon: '📈' },
              { name: 'Finance', jobs: '1,100', icon: '💰' },
              { name: 'Healthcare', jobs: '3,500', icon: '🏥' },
              { name: 'Education', jobs: '900', icon: '🎓' },
              { name: 'Engineering', jobs: '2,100', icon: '⚙️' },
              { name: 'Sales', jobs: '3,100', icon: '🤝' },
            ].map((cat, idx) => (
              <div key={idx} className="glass-panel category-card group">
                <div className="category-icon">
                  {cat.icon}
                </div>
                <h3 className="category-name">{cat.name}</h3>
                <p className="category-jobs">
                  <span>{cat.jobs} open positions</span>
                  <ArrowRight size={14} className="category-arrow" />
                </p>
              </div>
            ))}
          </div>
          
          <div className="view-all-mobile">
            <button className="btn btn-outline w-full justify-center">View all categories</button>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="jobs-section">
        <div className="container">
          <div className="jobs-header">
            <h2 className="section-title">Featured <span className="text-gradient-primary">Jobs</span></h2>
            <p className="section-subtitle">Hand-picked opportunities from top companies looking for talent like you.</p>
          </div>

          <div className="jobs-grid">
            {[1, 2, 3, 4].map((job) => (
              <div key={job} className="glass-panel job-card">
                <div className="job-logo">
                  {/* Placeholder for company logo */}
                  <Building2 className="text-slate-400" size={32} />
                </div>
                <div className="job-content">
                  <div className="job-title-row">
                    <div>
                      <h3 className="job-title">Senior React Developer</h3>
                      <p className="job-company">TechNova Solutions</p>
                    </div>
                    <div className="job-save">
                      <Star size={16} />
                    </div>
                  </div>
                  
                  <div className="job-tags">
                    <span className="job-tag"><MapPin size={12}/> San Francisco, CA</span>
                    <span className="job-tag"><Briefcase size={12}/> Full-time</span>
                    <span className="job-tag-salary">$120k - $150k</span>
                  </div>
                  
                  <p className="job-desc">
                    We are looking for an experienced React developer to join our core product team. You will be responsible for building new features, improving performance, and mentoring junior developers.
                  </p>
                  
                  <div className="job-footer">
                    <span className="job-posted">Posted 2 days ago</span>
                    <button className="btn btn-primary py-2 px-6 text-sm">Apply Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="jobs-load-more">
            <button className="btn btn-outline py-3 px-8 hover:bg-white/5">Load More Jobs</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-bg"></div>
        <div className="cta-pattern"></div>
        
        <div className="container">
          <div className="glass-panel cta-card">
            <div className="cta-card-highlight"></div>
            <h2 className="cta-title">Ready to accelerate your career?</h2>
            <p className="cta-subtitle">
              Join thousands of professionals who have already found their dream jobs on WorkConnect. Create your profile in minutes.
            </p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-primary btn-lg">
                Create Account
              </Link>
              <Link to="/login" className="btn btn-outline btn-lg">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
