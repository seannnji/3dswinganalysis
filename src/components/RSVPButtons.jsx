import { Check, HelpCircle, X } from 'lucide-react';

const OPTIONS = [
  { value: 'going', label: "I'm In", icon: Check, className: 'rsvp-going' },
  { value: 'maybe', label: 'Maybe', icon: HelpCircle, className: 'rsvp-maybe' },
  { value: 'cant_go', label: "Can't Go", icon: X, className: 'rsvp-cant' },
];

export default function RSVPButtons({ currentStatus, onSelect, disabled }) {
  return (
    <div className="rsvp-buttons">
      {OPTIONS.map(opt => {
        const Icon = opt.icon;
        const isActive = currentStatus === opt.value;
        return (
          <button
            key={opt.value}
            className={`rsvp-btn ${opt.className} ${isActive ? 'active' : ''}`}
            onClick={() => onSelect(opt.value)}
            disabled={disabled}
          >
            <Icon size={18} />
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
