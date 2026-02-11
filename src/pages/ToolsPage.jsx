import { useState } from 'react';

// ============ BALL FLIGHT CALCULATOR ============
function BallFlightCalculator() {
  const [inputs, setInputs] = useState({
    clubheadSpeed: 95,
    launchAngle: 12,
    spinRate: 2800,
    attackAngle: -2,
    smashFactor: 1.45,
  });
  const [result, setResult] = useState(null);

  const calculate = () => {
    const { clubheadSpeed, launchAngle, spinRate, attackAngle, smashFactor } = inputs;
    const ballSpeed = clubheadSpeed * smashFactor;

    // Simplified physics model
    const launchRad = (launchAngle * Math.PI) / 180;
    const gravity = 32.174; // ft/s²
    const ballSpeedFps = ballSpeed * 1.467; // mph to ft/s
    const vx = ballSpeedFps * Math.cos(launchRad);
    const vy = ballSpeedFps * Math.sin(launchRad);

    // Drag factor adjusted by spin
    const dragFactor = 0.0002 + (spinRate / 10000000);
    const liftFactor = spinRate * 0.000015;

    // Simulate trajectory
    let x = 0, y = 0;
    let vxCurr = vx, vyCurr = vy;
    const dt = 0.01;
    let maxHeight = 0;
    let totalTime = 0;
    const trajectory = [{ x: 0, y: 0 }];

    while (y >= 0 || totalTime < 0.5) {
      vxCurr -= dragFactor * vxCurr * Math.abs(vxCurr) * dt;
      vyCurr += (liftFactor * vxCurr - gravity) * dt;

      x += vxCurr * dt;
      y += vyCurr * dt;
      totalTime += dt;

      if (y > maxHeight) maxHeight = y;
      if (totalTime % 0.1 < dt) {
        trajectory.push({ x: x / 3, y: Math.max(0, y) });
      }

      if (totalTime > 15 || y < -10) break;
    }

    const carryYards = Math.round(x / 3); // ft to yards approx
    const totalYards = Math.round(carryYards * 1.08); // rough roll estimate
    const peakHeight = Math.round(maxHeight);
    const landingAngle = Math.round(Math.atan2(-vyCurr, vxCurr) * 180 / Math.PI);

    // Flight quality assessment
    let quality = 'Good';
    let notes = [];

    if (spinRate > 3500 && launchAngle > 14) {
      quality = 'Too High';
      notes.push('High spin + high launch = balloon ball that loses distance');
    } else if (spinRate < 1800 && launchAngle < 9) {
      quality = 'Too Low';
      notes.push('Low spin + low launch = nose-diving ball that doesn\'t carry');
    } else if (smashFactor < 1.4) {
      quality = 'Inefficient';
      notes.push('Low smash factor — you\'re not compressing the ball well');
    }

    if (spinRate > 3000) notes.push('High spin — consider a lower spin shaft or ball');
    if (spinRate < 2000) notes.push('Low spin — check your attack angle and dynamic loft');
    if (launchAngle > 16) notes.push('Very high launch — may lose distance in wind');
    if (launchAngle < 8) notes.push('Low launch — may not carry bunkers and hazards');

    if (notes.length === 0) {
      notes.push('Good launch conditions — efficient ball flight!');
    }

    setResult({
      ballSpeed: Math.round(ballSpeed),
      carryYards,
      totalYards,
      peakHeight,
      landingAngle: Math.abs(landingAngle),
      totalTime: totalTime.toFixed(1),
      quality,
      notes,
      trajectory,
    });
  };

  const handleChange = (name, value) => {
    setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <div className="tool-section" id="ball-flight">
      <h2>Ball Flight Calculator</h2>
      <p className="tool-desc">
        Enter your launch conditions to see estimated carry distance, ball flight trajectory,
        and optimization tips.
      </p>

      <div className="calc-grid">
        <div className="calc-inputs">
          <div className="calc-field">
            <label>Clubhead Speed (mph)</label>
            <input
              type="range" min="50" max="130" step="1"
              value={inputs.clubheadSpeed}
              onChange={e => handleChange('clubheadSpeed', e.target.value)}
            />
            <span className="calc-value">{inputs.clubheadSpeed} mph</span>
          </div>
          <div className="calc-field">
            <label>Launch Angle (°)</label>
            <input
              type="range" min="2" max="30" step="0.5"
              value={inputs.launchAngle}
              onChange={e => handleChange('launchAngle', e.target.value)}
            />
            <span className="calc-value">{inputs.launchAngle}°</span>
          </div>
          <div className="calc-field">
            <label>Spin Rate (rpm)</label>
            <input
              type="range" min="1000" max="6000" step="100"
              value={inputs.spinRate}
              onChange={e => handleChange('spinRate', e.target.value)}
            />
            <span className="calc-value">{inputs.spinRate} rpm</span>
          </div>
          <div className="calc-field">
            <label>Attack Angle (°)</label>
            <input
              type="range" min="-8" max="8" step="0.5"
              value={inputs.attackAngle}
              onChange={e => handleChange('attackAngle', e.target.value)}
            />
            <span className="calc-value">{inputs.attackAngle}°</span>
          </div>
          <div className="calc-field">
            <label>Smash Factor</label>
            <input
              type="range" min="1.2" max="1.52" step="0.01"
              value={inputs.smashFactor}
              onChange={e => handleChange('smashFactor', e.target.value)}
            />
            <span className="calc-value">{inputs.smashFactor}</span>
          </div>
          <button className="btn btn-accent" onClick={calculate}>
            Calculate Ball Flight
          </button>
        </div>

        {result && (
          <div className="calc-results">
            <div className="calc-result-grid">
              <div className="calc-result-item">
                <span className="calc-result-value">{result.ballSpeed}</span>
                <span className="calc-result-label">Ball Speed (mph)</span>
              </div>
              <div className="calc-result-item calc-result-item--highlight">
                <span className="calc-result-value">{result.carryYards}</span>
                <span className="calc-result-label">Carry (yards)</span>
              </div>
              <div className="calc-result-item">
                <span className="calc-result-value">{result.totalYards}</span>
                <span className="calc-result-label">Total (yards)</span>
              </div>
              <div className="calc-result-item">
                <span className="calc-result-value">{result.peakHeight} ft</span>
                <span className="calc-result-label">Peak Height</span>
              </div>
              <div className="calc-result-item">
                <span className="calc-result-value">{result.landingAngle}°</span>
                <span className="calc-result-label">Landing Angle</span>
              </div>
              <div className="calc-result-item">
                <span className="calc-result-value">{result.totalTime}s</span>
                <span className="calc-result-label">Hang Time</span>
              </div>
            </div>

            {/* Trajectory visualization */}
            <div className="trajectory-chart">
              <svg viewBox="0 0 400 200" className="trajectory-svg">
                {/* Grid */}
                {[50, 100, 150].map(y => (
                  <line key={y} x1="0" y1={200 - y} x2="400" y2={200 - y}
                    stroke="#333" strokeWidth="0.5" strokeDasharray="4" />
                ))}
                {/* Trajectory path */}
                {result.trajectory.length > 1 && (
                  <polyline
                    points={result.trajectory.map(p => {
                      const maxX = Math.max(...result.trajectory.map(t => t.x));
                      const maxY = Math.max(...result.trajectory.map(t => t.y), 1);
                      const px = (p.x / maxX) * 380 + 10;
                      const py = 190 - (p.y / maxY) * 170;
                      return `${px},${py}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#00e676"
                    strokeWidth="2"
                  />
                )}
                {/* Ground */}
                <line x1="0" y1="195" x2="400" y2="195" stroke="#4a7c4a" strokeWidth="2" />
              </svg>
            </div>

            <div className={`calc-quality calc-quality--${result.quality.toLowerCase().replace(' ', '-')}`}>
              <strong>Flight Quality: {result.quality}</strong>
            </div>
            <ul className="calc-notes">
              {result.notes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// ============ BENCHMARKS TABLE ============
function SwingBenchmarks() {
  const benchmarks = [
    {
      category: 'Driver',
      metrics: [
        { label: 'Clubhead Speed (mph)', scratch: '113', hcp10: '100', hcp20: '93', hcp30: '85', tourAvg: '115' },
        { label: 'Ball Speed (mph)', scratch: '165', hcp10: '145', hcp20: '135', hcp30: '123', tourAvg: '171' },
        { label: 'Carry Distance (yds)', scratch: '275', hcp10: '240', hcp20: '215', hcp30: '190', tourAvg: '289' },
        { label: 'Launch Angle (°)', scratch: '11.5', hcp10: '12.5', hcp20: '13.5', hcp30: '14.5', tourAvg: '10.9' },
        { label: 'Spin Rate (rpm)', scratch: '2,500', hcp10: '2,900', hcp20: '3,200', hcp30: '3,600', tourAvg: '2,350' },
        { label: 'Smash Factor', scratch: '1.48', hcp10: '1.45', hcp20: '1.44', hcp30: '1.42', tourAvg: '1.49' },
      ],
    },
    {
      category: '7-Iron',
      metrics: [
        { label: 'Clubhead Speed (mph)', scratch: '92', hcp10: '85', hcp20: '80', hcp30: '72', tourAvg: '95' },
        { label: 'Ball Speed (mph)', scratch: '128', hcp10: '118', hcp20: '108', hcp30: '98', tourAvg: '132' },
        { label: 'Carry Distance (yds)', scratch: '172', hcp10: '155', hcp20: '140', hcp30: '125', tourAvg: '180' },
        { label: 'Launch Angle (°)', scratch: '16', hcp10: '18', hcp20: '20', hcp30: '22', tourAvg: '16.3' },
        { label: 'Spin Rate (rpm)', scratch: '6,500', hcp10: '7,000', hcp20: '7,500', hcp30: '8,200', tourAvg: '6,200' },
      ],
    },
    {
      category: 'Pitching Wedge',
      metrics: [
        { label: 'Clubhead Speed (mph)', scratch: '83', hcp10: '78', hcp20: '73', hcp30: '66', tourAvg: '87' },
        { label: 'Carry Distance (yds)', scratch: '135', hcp10: '120', hcp20: '105', hcp30: '90', tourAvg: '142' },
        { label: 'Launch Angle (°)', scratch: '24', hcp10: '26', hcp20: '28', hcp30: '30', tourAvg: '23.7' },
        { label: 'Spin Rate (rpm)', scratch: '8,800', hcp10: '9,200', hcp20: '9,500', hcp30: '10,200', tourAvg: '8,500' },
      ],
    },
  ];

  return (
    <div className="tool-section" id="benchmarks">
      <h2>Swing Benchmarks</h2>
      <p className="tool-desc">
        Compare your numbers against handicap-based benchmarks and PGA Tour averages.
        These numbers help you understand where you stand and what's realistic for your game.
      </p>
      {benchmarks.map(cat => (
        <div key={cat.category} className="benchmark-table-wrap">
          <h3>{cat.category}</h3>
          <table className="benchmark-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Scratch</th>
                <th>10 HCP</th>
                <th>20 HCP</th>
                <th>30 HCP</th>
                <th className="benchmark-tour">Tour Avg</th>
              </tr>
            </thead>
            <tbody>
              {cat.metrics.map(m => (
                <tr key={m.label}>
                  <td>{m.label}</td>
                  <td>{m.scratch}</td>
                  <td>{m.hcp10}</td>
                  <td>{m.hcp20}</td>
                  <td>{m.hcp30}</td>
                  <td className="benchmark-tour">{m.tourAvg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

// ============ CLUB DISTANCE ESTIMATOR ============
function ClubDistanceEstimator() {
  const [speed, setSpeed] = useState(95);

  const clubs = [
    { name: 'Driver', loft: 10.5, factor: 2.58, smash: 1.48 },
    { name: '3-Wood', loft: 15, factor: 2.31, smash: 1.44 },
    { name: '5-Wood', loft: 18, factor: 2.14, smash: 1.42 },
    { name: '4-Iron', loft: 21, factor: 1.95, smash: 1.39 },
    { name: '5-Iron', loft: 24, factor: 1.83, smash: 1.37 },
    { name: '6-Iron', loft: 27, factor: 1.72, smash: 1.35 },
    { name: '7-Iron', loft: 31, factor: 1.60, smash: 1.33 },
    { name: '8-Iron', loft: 35, factor: 1.47, smash: 1.31 },
    { name: '9-Iron', loft: 39, factor: 1.34, smash: 1.29 },
    { name: 'PW', loft: 44, factor: 1.22, smash: 1.27 },
    { name: 'GW', loft: 50, factor: 1.08, smash: 1.24 },
    { name: 'SW', loft: 56, factor: 0.92, smash: 1.21 },
    { name: 'LW', loft: 60, factor: 0.82, smash: 1.18 },
  ];

  return (
    <div className="tool-section" id="club-distances">
      <h2>Club Distance Estimator</h2>
      <p className="tool-desc">
        Estimate your carry distances for each club based on your driver clubhead speed.
      </p>
      <div className="calc-field" style={{ maxWidth: 400 }}>
        <label>Driver Clubhead Speed: {speed} mph</label>
        <input
          type="range" min="50" max="130" step="1"
          value={speed}
          onChange={e => setSpeed(parseInt(e.target.value))}
        />
      </div>
      <div className="club-distance-grid">
        {clubs.map(club => {
          const carry = Math.round(speed * club.factor);
          return (
            <div key={club.name} className="club-distance-item">
              <span className="club-name">{club.name}</span>
              <div className="club-distance-bar">
                <div
                  className="club-distance-bar-fill"
                  style={{ width: `${(carry / (speed * 2.7)) * 100}%` }}
                />
              </div>
              <span className="club-carry">{carry} yds</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ MAIN TOOLS PAGE ============
export default function ToolsPage() {
  return (
    <div className="tools-page">
      <div className="page-header">
        <h1>Golf Tools & Calculators</h1>
        <p>
          Free tools to help you understand your game better. Calculate ball flights,
          compare your numbers to benchmarks, and estimate your club distances.
        </p>
      </div>

      <div className="tools-nav">
        <a href="#ball-flight" className="tools-nav-link">Ball Flight Calculator</a>
        <a href="#benchmarks" className="tools-nav-link">Swing Benchmarks</a>
        <a href="#club-distances" className="tools-nav-link">Club Distances</a>
      </div>

      <BallFlightCalculator />
      <SwingBenchmarks />
      <ClubDistanceEstimator />
    </div>
  );
}
