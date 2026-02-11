import { useMemo } from 'react';

// SVG-based radar chart for 2D display
export default function RadarChart({
  data = {},
  comparisonData = null,
  metrics = [],
  labels = [],
  size = 300,
  color = '#00e676',
  comparisonColor = '#ff9800',
}) {
  const center = size / 2;
  const radius = size * 0.38;
  const numAxes = metrics.length;

  const getPoint = (value, index) => {
    const angle = (index / numAxes) * Math.PI * 2 - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const dataPath = useMemo(() => {
    const points = metrics.map((m, i) => getPoint(data[m] || 0, i));
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
  }, [data, metrics]);

  const comparisonPath = useMemo(() => {
    if (!comparisonData) return '';
    const points = metrics.map((m, i) => getPoint(comparisonData[m] || 0, i));
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
  }, [comparisonData, metrics]);

  // Grid rings
  const rings = [25, 50, 75, 100];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="radar-chart">
      {/* Background rings */}
      {rings.map(ring => (
        <circle
          key={ring}
          cx={center}
          cy={center}
          r={(ring / 100) * radius}
          fill="none"
          stroke="#333"
          strokeWidth={0.5}
          opacity={0.5}
        />
      ))}

      {/* Axis lines */}
      {metrics.map((_, i) => {
        const point = getPoint(100, i);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={point.x}
            y2={point.y}
            stroke="#333"
            strokeWidth={0.5}
            opacity={0.5}
          />
        );
      })}

      {/* Comparison data polygon */}
      {comparisonData && (
        <path
          d={comparisonPath}
          fill={comparisonColor}
          fillOpacity={0.1}
          stroke={comparisonColor}
          strokeWidth={1.5}
          strokeOpacity={0.6}
        />
      )}

      {/* User data polygon */}
      <path
        d={dataPath}
        fill={color}
        fillOpacity={0.15}
        stroke={color}
        strokeWidth={2}
      />

      {/* Data points */}
      {metrics.map((m, i) => {
        const point = getPoint(data[m] || 0, i);
        return (
          <circle
            key={m}
            cx={point.x}
            cy={point.y}
            r={4}
            fill={color}
            stroke="#fff"
            strokeWidth={1}
          />
        );
      })}

      {/* Labels */}
      {labels.map((label, i) => {
        const point = getPoint(115, i);
        const angle = (i / numAxes) * Math.PI * 2 - Math.PI / 2;
        const textAnchor = Math.abs(Math.cos(angle)) < 0.1
          ? 'middle'
          : Math.cos(angle) > 0 ? 'start' : 'end';

        return (
          <text
            key={label}
            x={point.x}
            y={point.y}
            textAnchor={textAnchor}
            dominantBaseline="middle"
            fill="#ccc"
            fontSize={11}
            fontFamily="inherit"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}
