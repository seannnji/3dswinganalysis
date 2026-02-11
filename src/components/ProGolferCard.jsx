import { useState } from 'react';

export default function ProGolferCard({ golfer, similarity, onSelect, selected }) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className={`pro-card ${selected ? 'pro-card--selected' : ''}`}>
      <div className="pro-card-header">
        <div className="pro-card-avatar">
          <div className="pro-card-avatar-placeholder">
            {golfer.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
        <div className="pro-card-info">
          <h3>{golfer.name}</h3>
          <span className="pro-card-country">{golfer.nationality}</span>
          {golfer.majors > 0 && (
            <span className="pro-card-majors">{golfer.majors} Major{golfer.majors > 1 ? 's' : ''}</span>
          )}
        </div>
        {similarity !== undefined && (
          <div className="pro-card-match">
            <span className="pro-card-match-pct">{Math.round(similarity)}%</span>
            <span className="pro-card-match-label">Match</span>
          </div>
        )}
      </div>

      <p className="pro-card-desc">{golfer.description}</p>

      <div className="pro-card-style">
        <span className="pro-card-style-label">Swing Style:</span>
        <span className="pro-card-style-value">{golfer.swingStyle}</span>
      </div>

      <div className="pro-card-shape">
        <span className="pro-card-style-label">Shot Shape:</span>
        <span className="pro-card-style-value">{golfer.commonShotShape}</span>
      </div>

      <div className="pro-card-strengths">
        <h4>Key Strengths</h4>
        <ul>
          {golfer.keyStrengths.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      <div className="pro-card-misses">
        <h4>Typical Misses</h4>
        <ul>
          {golfer.typicalMisses.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </div>

      <div className="pro-card-actions">
        <button
          className="btn btn-sm btn-secondary"
          onClick={() => setShowVideo(!showVideo)}
        >
          {showVideo ? 'Hide Video' : 'Watch Swing'}
        </button>
        {onSelect && (
          <button
            className="btn btn-sm btn-primary"
            onClick={() => onSelect(golfer)}
          >
            {selected ? 'Selected' : 'Compare'}
          </button>
        )}
      </div>

      {showVideo && (
        <div className="pro-card-video">
          <iframe
            src={golfer.videoUrl}
            title={`${golfer.name} swing video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
