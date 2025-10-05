import React from 'react';
import './why-smart-table.css'; // Make sure this CSS file exists and is scoped properly

const WhySmartTable = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1>
          Why <span>Smart Table</span>?
        </h1>
        <p className="subtitle">Reimagining productivity, one table at a time.</p>
        <div className="hero-bg"></div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <div className="icon">🤝</div>
          <h2>Real-Time Collaboration</h2>
          <p>
            Work together without friction. Share tables, assign tasks, and comment live—no more version chaos.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon">🤝</div>
          <h2>Real-Time Collaboration</h2>
          <p>
            Work together without friction. Share tables, assign tasks, and comment live—no more version chaos.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon">🎨</div>
          <h2>Custom Views</h2>
          <p>
            Tailor your workspace to match your style. Choose layouts, filters, and themes that fit your flow.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon">🧠</div>
          <h2>Intelligent Design</h2>
          <p>
            Smart Table adapts to your workflow, not the other way around. It's built to think with you.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon">⚡</div>
          <h2>Lightning Fast</h2>
          <p>
            From data entry to collaboration, everything happens in real time—no lag, no limits.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon">🌐</div>
          <h2>Cross-Platform Sync</h2>
          <p>
            Access your tables from anywhere. Smart Table keeps everything in sync across devices.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Built for thinkers. Designed for speed. Welcome to Smart Table.</p>
      </footer>
    </div>
  );
};

export default WhySmartTable;
