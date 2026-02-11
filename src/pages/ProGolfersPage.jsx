import { useState } from 'react';
import proGolfers from '../data/proGolfers';
import ProGolferCard from '../components/ProGolferCard';
import RadarChart from '../components/RadarChart';
import { swingMetricLabels } from '../data/proGolfers';

export default function ProGolfersPage() {
  const [filter, setFilter] = useState('all');
  const [selectedPro, setSelectedPro] = useState(null);
  const [comparePro, setComparePro] = useState(null);

  const filtered = filter === 'all'
    ? proGolfers
    : proGolfers.filter(p => p.gender === filter);

  const radarMetrics = [
    'power', 'accuracy', 'tempo', 'balance',
    'clubSpeed', 'faceControl', 'hipRotation', 'wristLag',
    'consistency', 'followThrough',
  ];
  const radarLabels = radarMetrics.map(m => swingMetricLabels[m] || m);

  const handleSelect = (golfer) => {
    if (!selectedPro) {
      setSelectedPro(golfer);
    } else if (selectedPro.id === golfer.id) {
      setSelectedPro(null);
    } else if (!comparePro) {
      setComparePro(golfer);
    } else if (comparePro.id === golfer.id) {
      setComparePro(null);
    } else {
      setSelectedPro(golfer);
      setComparePro(null);
    }
  };

  return (
    <div className="pros-page">
      <div className="page-header">
        <h1>Pro Golfer Swing Profiles</h1>
        <p>
          Study the swings of the world's best golfers. Watch their videos, compare
          their metrics, and find out who you should model your swing after.
        </p>
      </div>

      {/* Comparison section */}
      {selectedPro && (
        <div className="comparison-section">
          <h2>
            {selectedPro.name}
            {comparePro ? ` vs ${comparePro.name}` : ' — Select another to compare'}
          </h2>
          <div className="comparison-radar">
            <RadarChart
              data={selectedPro.swingProfile}
              comparisonData={comparePro?.swingProfile}
              metrics={radarMetrics}
              labels={radarLabels}
              size={380}
              color="#00e676"
              comparisonColor="#ff9800"
            />
            <div className="radar-legend">
              <div className="radar-legend-item">
                <span className="radar-dot" style={{ background: '#00e676' }} />
                {selectedPro.name}
              </div>
              {comparePro && (
                <div className="radar-legend-item">
                  <span className="radar-dot" style={{ background: '#ff9800' }} />
                  {comparePro.name}
                </div>
              )}
            </div>
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => { setSelectedPro(null); setComparePro(null); }}
          >
            Clear Selection
          </button>
        </div>
      )}

      {/* Filter */}
      <div className="filter-bar">
        <button
          className={`filter-btn ${filter === 'all' ? 'filter-btn--active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Golfers
        </button>
        <button
          className={`filter-btn ${filter === 'male' ? 'filter-btn--active' : ''}`}
          onClick={() => setFilter('male')}
        >
          Male Golfers
        </button>
        <button
          className={`filter-btn ${filter === 'female' ? 'filter-btn--active' : ''}`}
          onClick={() => setFilter('female')}
        >
          Female Golfers
        </button>
      </div>

      {/* Grid */}
      <div className="pros-grid">
        {filtered.map(golfer => (
          <ProGolferCard
            key={golfer.id}
            golfer={golfer}
            onSelect={handleSelect}
            selected={
              selectedPro?.id === golfer.id || comparePro?.id === golfer.id
            }
          />
        ))}
      </div>
    </div>
  );
}
