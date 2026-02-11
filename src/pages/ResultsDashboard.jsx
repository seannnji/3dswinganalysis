import { useState } from 'react';
import SwingVisualization3D from '../components/SwingVisualization3D';
import RadarChart from '../components/RadarChart';
import ScoreGauge from '../components/ScoreGauge';
import ProGolferCard from '../components/ProGolferCard';
import { swingMetricLabels } from '../data/proGolfers';

export default function ResultsDashboard({ results, onReset }) {
  const {
    userProfile,
    strengths,
    weaknesses,
    tendencies,
    shotShape,
    matchedPros,
    recommendations,
    overallScore,
    formData,
  } = results;

  const [selectedPro, setSelectedPro] = useState(matchedPros[0] || null);

  const radarMetrics = [
    'power', 'accuracy', 'tempo', 'balance',
    'clubSpeed', 'faceControl', 'hipRotation', 'wristLag',
  ];
  const radarLabels = radarMetrics.map(m => swingMetricLabels[m] || m);

  const getSeverityClass = (severity) => {
    if (severity === 'major') return 'severity--major';
    if (severity === 'moderate') return 'severity--moderate';
    return 'severity--minor';
  };

  return (
    <div className="results-page">
      <div className="results-header">
        <div className="results-header-text">
          <h1>
            {formData.name ? `${formData.name}'s` : 'Your'} Swing Analysis
          </h1>
          <p className="results-subtitle">
            Here's a comprehensive breakdown of your swing — strengths, weaknesses,
            tendencies, and a clear path to improvement.
          </p>
        </div>
        <button className="btn btn-secondary" onClick={onReset}>
          Analyze Another Swing
        </button>
      </div>

      {/* Score + 3D Viz */}
      <div className="results-top-row">
        <div className="results-score-section">
          <ScoreGauge score={overallScore} size={180} label="Swing Score" />
          <div className="results-quick-stats">
            <div className="quick-stat">
              <span className="quick-stat-value">{formData.handicap}</span>
              <span className="quick-stat-label">Handicap</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-value">{formData.clubheadSpeed}</span>
              <span className="quick-stat-label">mph Speed</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-value">{shotShape.shape}</span>
              <span className="quick-stat-label">Shot Shape</span>
            </div>
          </div>
        </div>
        <div className="results-viz-section">
          <SwingVisualization3D
            swingProfile={userProfile}
            comparisonProfile={selectedPro?.swingProfile}
            showComparison={!!selectedPro}
            height="400px"
          />
          <p className="viz-caption">
            <span style={{ color: '#00e676' }}>Green</span> = Your swing
            {selectedPro && (
              <> | <span style={{ color: '#ff9800' }}>Orange</span> = {selectedPro.name}</>
            )}
            &nbsp;| Drag to rotate, scroll to zoom
          </p>
        </div>
      </div>

      {/* Radar comparison */}
      <div className="results-section">
        <h2>Swing Profile Comparison</h2>
        <div className="radar-container">
          <RadarChart
            data={userProfile}
            comparisonData={selectedPro?.swingProfile || null}
            metrics={radarMetrics}
            labels={radarLabels}
            size={350}
          />
          <div className="radar-legend">
            <div className="radar-legend-item">
              <span className="radar-dot" style={{ background: '#00e676' }} />
              Your Swing
            </div>
            {selectedPro && (
              <div className="radar-legend-item">
                <span className="radar-dot" style={{ background: '#ff9800' }} />
                {selectedPro.name}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="results-two-col">
        <div className="results-section results-section--green">
          <h2>Strengths</h2>
          {strengths.length > 0 ? (
            <div className="strength-list">
              {strengths.map((s, i) => (
                <div key={i} className="strength-item">
                  <div className="strength-header">
                    <span className="strength-label">{s.label}</span>
                    <span className="strength-score">{Math.round(s.score)}</span>
                  </div>
                  <div className="strength-bar">
                    <div
                      className="strength-bar-fill strength-bar-fill--green"
                      style={{ width: `${s.score}%` }}
                    />
                  </div>
                  <p className="strength-desc">{s.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Work on the fundamentals below and your strengths will emerge!</p>
          )}
        </div>

        <div className="results-section results-section--red">
          <h2>Areas to Improve</h2>
          {weaknesses.map((w, i) => (
            <div key={i} className="weakness-item">
              <div className="weakness-header">
                <span className="weakness-label">{w.label}</span>
                <span className={`weakness-severity ${getSeverityClass(w.severity)}`}>
                  {w.severity}
                </span>
                <span className="weakness-score">{Math.round(w.score)}</span>
              </div>
              <div className="strength-bar">
                <div
                  className="strength-bar-fill strength-bar-fill--red"
                  style={{ width: `${w.score}%` }}
                />
              </div>
              <p className="weakness-desc">{w.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What your swing produces */}
      <div className="results-section">
        <h2>What Your Swing Produces</h2>
        <p className="shot-shape-desc">{shotShape.description}</p>
        <div className="tendencies-grid">
          <div className="tendencies-col tendencies-col--good">
            <h3>The Good</h3>
            <ul>
              {tendencies.good.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="tendencies-col tendencies-col--bad">
            <h3>The Bad</h3>
            <ul>
              {tendencies.bad.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Pro matches */}
      <div className="results-section">
        <h2>Your Pro Swing Matches</h2>
        <p className="section-desc">
          These pros have the most similar swing profiles to yours. Select one to compare on the 3D visualization above.
        </p>
        <div className="pro-matches-grid">
          {matchedPros.map(pro => (
            <ProGolferCard
              key={pro.id}
              golfer={pro}
              similarity={pro.similarity}
              onSelect={setSelectedPro}
              selected={selectedPro?.id === pro.id}
            />
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="results-section">
        <h2>Your Improvement Plan</h2>
        <p className="section-desc">
          Based on your swing analysis, here are the most impactful things you can work on,
          in order of priority.
        </p>
        <div className="recommendations-list">
          {recommendations.map((rec, i) => (
            <div key={i} className={`recommendation-card recommendation--${rec.priority}`}>
              <div className="rec-header">
                <span className="rec-number">{i + 1}</span>
                <div>
                  <h3>{rec.title}</h3>
                  <p className="rec-reason">{rec.reason}</p>
                </div>
              </div>
              <div className="rec-drills">
                <h4>Drills & Practice</h4>
                <ul>
                  {rec.drills.map((drill, j) => (
                    <li key={j}>{drill}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All metrics */}
      <div className="results-section">
        <h2>Detailed Metrics</h2>
        <div className="metrics-grid">
          {Object.entries(userProfile)
            .filter(([key]) => !key.startsWith('_'))
            .map(([key, value]) => (
              <div key={key} className="metric-item">
                <div className="metric-header">
                  <span className="metric-label">{swingMetricLabels[key] || key}</span>
                  <span className="metric-value">{Math.round(value)}</span>
                </div>
                <div className="metric-bar">
                  <div
                    className="metric-bar-fill"
                    style={{
                      width: `${value}%`,
                      background: value >= 75 ? '#00e676' : value >= 50 ? '#ffeb3b' : '#f44336',
                    }}
                  />
                </div>
                {selectedPro?.swingProfile[key] && (
                  <div className="metric-comparison">
                    <span>{selectedPro.name}: {selectedPro.swingProfile[key]}</span>
                    <span className={value >= selectedPro.swingProfile[key] ? 'metric-ahead' : 'metric-behind'}>
                      {value >= selectedPro.swingProfile[key] ? '+' : ''}{Math.round(value - selectedPro.swingProfile[key])}
                    </span>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
