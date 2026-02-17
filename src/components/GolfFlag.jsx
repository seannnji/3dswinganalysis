export default function GolfFlag({ size = 60, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hole */}
      <ellipse cx="50" cy="88" rx="22" ry="6" fill="#1a5c38" opacity="0.5" />
      {/* Pole */}
      <line x1="50" y1="15" x2="50" y2="88" stroke="#e0e0e0" strokeWidth="2.5" />
      {/* Flag */}
      <path d="M50 15 L78 28 L50 41 Z" fill="#e74c3c" />
      {/* Ball */}
      <circle cx="62" cy="85" r="5" fill="white" stroke="#ccc" strokeWidth="0.5" />
    </svg>
  );
}
