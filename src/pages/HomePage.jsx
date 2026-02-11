import { Link } from 'react-router-dom';
import SwingVisualization3D from '../components/SwingVisualization3D';

const sampleProfile = {
  tempo: 80,
  power: 85,
  accuracy: 82,
  consistency: 80,
  flexibility: 78,
  hipRotation: 83,
  shoulderTurn: 80,
  wristLag: 78,
  followThrough: 85,
  balance: 82,
  clubSpeed: 84,
  attackAngle: 80,
  clubPath: 82,
  faceControl: 83,
};

export default function HomePage() {
  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Understand Your Swing.
            <br />
            <span className="hero-accent">Unlock Your Game.</span>
          </h1>
          <p className="hero-subtitle">
            Get a comprehensive 3D analysis of your golf swing — strengths,
            weaknesses, what your swing produces, and a clear path to your
            ideal swing. Compare with the pros and know exactly what to work on.
          </p>
          <div className="hero-actions">
            <Link to="/analyze" className="btn btn-accent btn-lg">
              Analyze My Swing
            </Link>
            <Link to="/pros" className="btn btn-secondary btn-lg">
              Browse Pro Swings
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <SwingVisualization3D swingProfile={sampleProfile} height="420px" />
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Describe Your Swing</h3>
            <p>
              Answer questions about your swing characteristics, common faults,
              shot shape, and goals. Be honest — that's the fastest path to improvement.
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Get Your Analysis</h3>
            <p>
              Receive a detailed breakdown of your strengths, weaknesses, what your
              swing typically produces (both good and bad), and your overall swing score.
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Compare with Pros</h3>
            <p>
              See which tour pro your swing most closely matches. Watch their swings
              and understand the key differences you can work on.
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <h3>Follow Your Plan</h3>
            <p>
              Get specific drills and recommendations tailored to your swing faults
              and your goal swing. Know exactly what to practice.
            </p>
          </div>
        </div>
      </section>

      {/* Featured pros */}
      <section className="section section--dark">
        <h2 className="section-title">Learn from the Best</h2>
        <p className="section-subtitle">
          Study swing videos and profiles from the world's best golfers — men and women.
          Find out who you should model your swing after.
        </p>
        <div className="featured-pros">
          {[
            { name: 'Tiger Woods', style: 'Powerful, compact, rotational' },
            { name: 'Rory McIlroy', style: 'Fluid, athletic, free-flowing' },
            { name: 'Scottie Scheffler', style: 'Unique, ground-force driven' },
            { name: 'Nelly Korda', style: 'Effortless, athletic, powerful' },
            { name: 'Lydia Ko', style: 'Textbook, consistent, smart' },
            { name: 'Jon Rahm', style: 'Compact, powerful, fiery' },
          ].map(pro => (
            <div key={pro.name} className="featured-pro">
              <div className="featured-pro-avatar">
                {pro.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h4>{pro.name}</h4>
              <p>{pro.style}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/pros" className="btn btn-primary">
            View All Pro Golfers
          </Link>
        </div>
      </section>

      {/* Tools teaser */}
      <section className="section">
        <h2 className="section-title">Golf Tools & Resources</h2>
        <div className="tools-grid">
          <Link to="/tools#ball-flight" className="tool-card">
            <div className="tool-icon">&#127935;</div>
            <h3>Ball Flight Calculator</h3>
            <p>See how clubhead speed, attack angle, and launch conditions affect your distance and trajectory.</p>
          </Link>
          <Link to="/tools#benchmarks" className="tool-card">
            <div className="tool-icon">&#128202;</div>
            <h3>Swing Benchmarks</h3>
            <p>Compare your numbers to handicap-based benchmarks and tour averages.</p>
          </Link>
          <Link to="/blog" className="tool-card">
            <div className="tool-icon">&#128214;</div>
            <h3>How-To Guides</h3>
            <p>Step-by-step guides for fixing common faults, building power, and lowering your scores.</p>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="navbar-logo">3D</span>
            <span className="navbar-title">SwingAnalysis</span>
          </div>
          <p className="footer-tagline">
            Understand your swing. Unlock your game.
          </p>
          <div className="footer-links">
            <Link to="/analyze">Swing Analysis</Link>
            <Link to="/pros">Pro Golfers</Link>
            <Link to="/tools">Tools</Link>
            <Link to="/blog">Blog</Link>
          </div>
          <p className="footer-copy">&copy; 2026 3D SwingAnalysis. Built for golfers, by golfers.</p>
        </div>
      </footer>
    </div>
  );
}
