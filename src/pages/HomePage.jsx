import { Link } from 'react-router-dom';
import { Plus, Share2, DollarSign, Users, ArrowRight, Zap } from 'lucide-react';
import GolfFlag from '../components/GolfFlag.jsx';

const FEATURES = [
  {
    icon: Plus,
    title: 'Create a Round',
    desc: 'Pick the course, set the tee time, name your price. Done in 30 seconds.',
  },
  {
    icon: Share2,
    title: 'Send the Link',
    desc: 'One link. Text it, DM it, post it. Your crew RSVPs in a tap.',
  },
  {
    icon: DollarSign,
    title: 'Collect Payment',
    desc: 'No more chasing Venmos. Everyone pays before they play.',
  },
  {
    icon: Users,
    title: 'See Who\'s In',
    desc: 'Real-time guest list with going, maybe, and can\'t-go statuses.',
  },
];

export default function HomePage() {
  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-grass" />
          <div className="hero-ball" />
          <div className="hero-flag-wrapper">
            <GolfFlag size={120} />
          </div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <Zap size={14} />
            The easiest way to organize golf
          </div>
          <h1 className="hero-title">
            Rally Your<br />
            <span className="hero-title-accent">Foursome</span>
          </h1>
          <p className="hero-subtitle">
            Create a round, send the link, collect payments.
            <br />
            Like Partiful, but for golf.
          </p>
          <div className="hero-actions">
            <Link to="/create" className="btn btn-primary btn-lg">
              <Plus size={20} />
              Create a Round
            </Link>
            <Link to="/my-rounds" className="btn btn-ghost btn-lg">
              My Rounds
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works">
        <h2 className="section-title">Tee it up in 3 steps</h2>
        <div className="features-grid">
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div key={i} className="feature-card">
                <div className="feature-icon">
                  <Icon size={28} />
                </div>
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <div className="home-cta-content">
          <span className="home-cta-emoji">&#127948;&#65039;</span>
          <h2>Stop texting the group chat.</h2>
          <p>Create your first round and send the invite. It's free.</p>
          <Link to="/create" className="btn btn-primary btn-lg">
            <Plus size={20} />
            Create a Round
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>
          <span>&#9971;</span> Tee Time &mdash; Rally Your Foursome
        </p>
      </footer>
    </div>
  );
}
