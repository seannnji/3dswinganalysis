import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Calendar, Archive } from 'lucide-react';
import { getRounds } from '../utils/storage.js';
import RoundCard from '../components/RoundCard.jsx';

export default function MyRoundsPage() {
  const [rounds, setRounds] = useState([]);
  const [filter, setFilter] = useState('upcoming');

  useEffect(() => {
    setRounds(getRounds());
  }, []);

  const now = new Date();
  const upcoming = rounds.filter(r => new Date(r.date) >= now);
  const past = rounds.filter(r => new Date(r.date) < now);
  const displayed = filter === 'upcoming' ? upcoming : past;

  // Sort: upcoming by soonest first, past by most recent first
  displayed.sort((a, b) => {
    if (filter === 'upcoming') return new Date(a.date) - new Date(b.date);
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="my-rounds-page">
      <div className="my-rounds-header">
        <h1>My Rounds</h1>
        <Link to="/create" className="btn btn-primary">
          <Plus size={18} />
          New Round
        </Link>
      </div>

      <div className="rounds-tabs">
        <button
          className={`rounds-tab ${filter === 'upcoming' ? 'active' : ''}`}
          onClick={() => setFilter('upcoming')}
        >
          <Calendar size={16} />
          Upcoming ({upcoming.length})
        </button>
        <button
          className={`rounds-tab ${filter === 'past' ? 'active' : ''}`}
          onClick={() => setFilter('past')}
        >
          <Archive size={16} />
          Past ({past.length})
        </button>
      </div>

      {displayed.length > 0 ? (
        <div className="rounds-grid">
          {displayed.map(round => (
            <RoundCard key={round.id} round={round} />
          ))}
        </div>
      ) : (
        <div className="rounds-empty">
          <span className="rounds-empty-emoji">&#127948;&#65039;</span>
          <h3>
            {filter === 'upcoming'
              ? 'No upcoming rounds'
              : 'No past rounds'}
          </h3>
          <p>
            {filter === 'upcoming'
              ? "Create a round and rally the crew!"
              : "Play more golf!"}
          </p>
          {filter === 'upcoming' && (
            <Link to="/create" className="btn btn-primary">
              <Plus size={18} />
              Create a Round
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
