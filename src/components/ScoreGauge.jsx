// Circular gauge for displaying overall swing score
export default function ScoreGauge({ score, size = 160, label = 'Overall' }) {
  const radius = size * 0.4;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const center = size / 2;

  const getColor = (s) => {
    if (s >= 80) return '#00e676';
    if (s >= 60) return '#ffeb3b';
    if (s >= 40) return '#ff9800';
    return '#f44336';
  };

  const getGrade = (s) => {
    if (s >= 90) return 'Elite';
    if (s >= 80) return 'Advanced';
    if (s >= 70) return 'Solid';
    if (s >= 60) return 'Average';
    if (s >= 50) return 'Developing';
    if (s >= 40) return 'Beginner';
    return 'Needs Work';
  };

  const color = getColor(score);

  return (
    <div className="score-gauge" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#222"
          strokeWidth={8}
        />
        {/* Score arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={8}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
        {/* Score text */}
        <text
          x={center}
          y={center - 8}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={color}
          fontSize={size * 0.22}
          fontWeight="bold"
          fontFamily="inherit"
        >
          {score}
        </text>
        <text
          x={center}
          y={center + 16}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#999"
          fontSize={11}
          fontFamily="inherit"
        >
          {getGrade(score)}
        </text>
      </svg>
      <div className="score-gauge-label">{label}</div>
    </div>
  );
}
