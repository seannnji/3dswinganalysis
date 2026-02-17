import Avatar from './Avatar.jsx';
import { Check, HelpCircle, X, DollarSign } from 'lucide-react';

const STATUS_CONFIG = {
  going: { label: 'Going', icon: Check, className: 'status-going' },
  maybe: { label: 'Maybe', icon: HelpCircle, className: 'status-maybe' },
  cant_go: { label: "Can't Go", icon: X, className: 'status-cant' },
};

export default function GuestList({ guests, showPayment = false }) {
  const grouped = {
    going: guests.filter(g => g.status === 'going'),
    maybe: guests.filter(g => g.status === 'maybe'),
    cant_go: guests.filter(g => g.status === 'cant_go'),
  };

  return (
    <div className="guest-list">
      {Object.entries(grouped).map(([status, group]) => {
        if (group.length === 0) return null;
        const config = STATUS_CONFIG[status];
        const Icon = config.icon;

        return (
          <div key={status} className="guest-group">
            <div className={`guest-group-header ${config.className}`}>
              <Icon size={16} />
              <span>
                {config.label} ({group.length})
              </span>
            </div>
            <div className="guest-group-list">
              {group.map(guest => (
                <div key={guest.id} className="guest-row">
                  <Avatar name={guest.name} size={36} />
                  <div className="guest-info">
                    <span className="guest-name">{guest.name}</span>
                    {guest.handicap && (
                      <span className="guest-handicap">HCP {guest.handicap}</span>
                    )}
                  </div>
                  {showPayment && status === 'going' && (
                    <div className={`guest-payment ${guest.paid ? 'paid' : 'unpaid'}`}>
                      <DollarSign size={14} />
                      <span>{guest.paid ? 'Paid' : 'Unpaid'}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
      {guests.length === 0 && (
        <div className="guest-list-empty">
          <p>No responses yet. Share the link to invite players!</p>
        </div>
      )}
    </div>
  );
}
