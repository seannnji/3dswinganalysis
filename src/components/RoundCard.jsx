import { Link } from 'react-router-dom';
import { MapPin, Clock, Users, DollarSign, Calendar } from 'lucide-react';
import { formatDate, formatTime, formatCurrency, getStatusCounts } from '../utils/helpers.js';
import { THEMES } from '../data/courses.js';

export default function RoundCard({ round }) {
  const counts = getStatusCounts(round.guests);
  const theme = THEMES.find(t => t.value === round.theme) || THEMES[0];

  return (
    <Link to={`/round/${round.id}`} className="round-card">
      <div className="round-card-banner" style={{ background: theme.gradient }}>
        <div className="round-card-banner-content">
          <span className="round-card-emoji">&#9971;</span>
          <div className="round-card-format">{round.format || 'Stroke Play'}</div>
        </div>
      </div>
      <div className="round-card-body">
        <h3 className="round-card-title">{round.title}</h3>
        <div className="round-card-details">
          <div className="round-card-detail">
            <MapPin size={14} />
            <span>{round.courseName}</span>
          </div>
          <div className="round-card-detail">
            <Calendar size={14} />
            <span>{formatDate(round.date)}</span>
          </div>
          <div className="round-card-detail">
            <Clock size={14} />
            <span>{formatTime(round.teeTime)}</span>
          </div>
          {round.costPerPerson > 0 && (
            <div className="round-card-detail">
              <DollarSign size={14} />
              <span>{formatCurrency(round.costPerPerson)} / player</span>
            </div>
          )}
        </div>
        <div className="round-card-footer">
          <div className="round-card-guests">
            <Users size={14} />
            <span>
              {counts.going} going
              {counts.maybe > 0 && ` \u00B7 ${counts.maybe} maybe`}
            </span>
          </div>
          <span className="round-card-spots">
            {round.maxPlayers - counts.going} spots left
          </span>
        </div>
      </div>
    </Link>
  );
}
