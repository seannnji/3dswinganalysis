import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plus, CalendarDays, Menu, X } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">&#9971;</span>
          <span className="logo-text">Gowf</span>
        </Link>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link
            to="/my-rounds"
            className={`nav-link ${location.pathname === '/my-rounds' ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            <CalendarDays size={18} />
            My Rounds
          </Link>
          <Link
            to="/create"
            className="nav-link nav-cta"
            onClick={() => setMenuOpen(false)}
          >
            <Plus size={18} />
            Create Round
          </Link>
        </div>

        <button
          className="navbar-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}
