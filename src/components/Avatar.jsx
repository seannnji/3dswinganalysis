import { getInitials, getAvatarColor } from '../utils/helpers.js';

export default function Avatar({ name, size = 40, className = '' }) {
  const initials = getInitials(name);
  const color = getAvatarColor(name);

  return (
    <div
      className={`avatar ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 600,
        fontSize: size * 0.38,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}
