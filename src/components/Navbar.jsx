import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/analyze', label: 'Swing Analysis' },
    { to: '/pros', label: 'Pro Golfers' },
    { to: '/tools', label: 'Tools' },
    { to: '/blog', label: 'Blog' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="navbar-logo">3D</span>
          <span className="navbar-title">SwingAnalysis</span>
        </Link>
        <div className="navbar-links">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`navbar-link ${location.pathname === link.to ? 'navbar-link--active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
