export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(timeStr) {
  const [hours, minutes] = timeStr.split(':');
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${minutes} ${ampm}`;
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getRelativeTime(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = date - now;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays <= 7) return `In ${diffDays} days`;
  return formatDate(dateStr);
}

export function getStatusCounts(guests) {
  return {
    going: guests.filter(g => g.status === 'going').length,
    maybe: guests.filter(g => g.status === 'maybe').length,
    cantGo: guests.filter(g => g.status === 'cant_go').length,
  };
}

export function getRoundShareUrl(roundId) {
  return `${window.location.origin}/round/${roundId}`;
}

export function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}

const GOLF_BACKGROUNDS = [
  'linear-gradient(135deg, #0d4a2e 0%, #1a6b42 30%, #2d8f5e 60%, #43b97c 100%)',
  'linear-gradient(135deg, #1a3a2a 0%, #2d6b4a 40%, #f4a460 100%)',
  'linear-gradient(135deg, #0b3d2e 0%, #1b6b4a 50%, #87ceeb 100%)',
  'linear-gradient(135deg, #2c1810 0%, #4a3728 30%, #2d8f5e 70%, #43b97c 100%)',
  'linear-gradient(135deg, #1a1a3e 0%, #2d4a3e 40%, #2d8f5e 80%, #90ee90 100%)',
  'linear-gradient(135deg, #ff6b35 0%, #f7c948 30%, #2d8f5e 70%, #0d4a2e 100%)',
];

export function getRandomBackground(seed) {
  const index = seed
    ? Math.abs(seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % GOLF_BACKGROUNDS.length
    : Math.floor(Math.random() * GOLF_BACKGROUNDS.length);
  return GOLF_BACKGROUNDS[index];
}

export function getInitials(name) {
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getAvatarColor(name) {
  const colors = [
    '#2d8f5e', '#e67e22', '#3498db', '#e74c3c', '#9b59b6',
    '#1abc9c', '#f39c12', '#2ecc71', '#e91e63', '#00bcd4',
  ];
  const index = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length;
  return colors[index];
}
