import { useState } from 'react';
import proGolfers from '../data/proGolfers';

const inputSections = [
  {
    title: 'About You',
    fields: [
      {
        name: 'name',
        label: 'Your Name',
        type: 'text',
        placeholder: 'Enter your name',
      },
      {
        name: 'gender',
        label: 'Gender',
        type: 'select',
        options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
        ],
      },
      {
        name: 'handicap',
        label: 'Handicap (or estimated)',
        type: 'number',
        min: -5,
        max: 54,
        placeholder: 'e.g. 15',
      },
      {
        name: 'clubheadSpeed',
        label: 'Driver Clubhead Speed (mph)',
        type: 'number',
        min: 40,
        max: 140,
        placeholder: 'e.g. 95',
        helpText: 'Avg male amateur: 93mph | Avg female amateur: 65mph',
      },
    ],
  },
  {
    title: 'Shot Shape & Misses',
    fields: [
      {
        name: 'shotShape',
        label: 'Typical Shot Shape',
        type: 'select',
        options: [
          { value: 'straight', label: 'Straight' },
          { value: 'fade', label: 'Fade / Left-to-Right' },
          { value: 'draw', label: 'Draw / Right-to-Left' },
          { value: 'slice', label: 'Slice (big fade)' },
          { value: 'hook', label: 'Hook (big draw)' },
          { value: 'varies', label: 'It varies a lot' },
        ],
      },
      {
        name: 'missDirection',
        label: 'Which way do you usually miss?',
        type: 'select',
        options: [
          { value: 'right', label: 'Mostly right' },
          { value: 'left', label: 'Mostly left' },
          { value: 'both', label: 'Both directions (two-way miss)' },
          { value: 'consistent', label: 'Consistent miss pattern' },
        ],
      },
      {
        name: 'missFlight',
        label: 'Miss tendency in the air',
        type: 'select',
        options: [
          { value: 'slice', label: 'Curves away (slice/fade)' },
          { value: 'hook', label: 'Curves in (hook/draw)' },
          { value: 'high', label: 'Too high' },
          { value: 'low', label: 'Too low' },
          { value: 'thin', label: 'Thin/topped shots' },
          { value: 'fat', label: 'Fat/chunked shots' },
        ],
      },
    ],
  },
  {
    title: 'Swing Characteristics',
    fields: [
      {
        name: 'tempo',
        label: 'Swing Tempo',
        type: 'select',
        options: [
          { value: 'slow', label: 'Slow and smooth' },
          { value: 'moderate', label: 'Moderate / balanced' },
          { value: 'fast', label: 'Quick / aggressive' },
          { value: 'veryFast', label: 'Very fast / rushing' },
        ],
      },
      {
        name: 'flexibility',
        label: 'Flexibility Level',
        type: 'select',
        options: [
          { value: 'limited', label: 'Limited — hard to make a full turn' },
          { value: 'average', label: 'Average' },
          { value: 'good', label: 'Good — full turn is comfortable' },
          { value: 'excellent', label: 'Excellent — very athletic and flexible' },
        ],
      },
      {
        name: 'backswingLength',
        label: 'Backswing Length',
        type: 'select',
        options: [
          { value: 'short', label: 'Short (arms barely past waist)' },
          { value: 'threeQuarter', label: 'Three-quarter' },
          { value: 'full', label: 'Full (club parallel at top)' },
          { value: 'past', label: 'Past parallel (overswing)' },
        ],
      },
      {
        name: 'balanceFinish',
        label: 'Balance at Finish',
        type: 'select',
        options: [
          { value: 'falling', label: 'Falling away — can\'t hold finish' },
          { value: 'stumble', label: 'Stumble a bit but recover' },
          { value: 'stable', label: 'Stable — can hold it a moment' },
          { value: 'held', label: 'Perfectly balanced — hold for 3+ seconds' },
        ],
      },
    ],
  },
  {
    title: 'Common Swing Faults',
    description: 'Be honest — identifying faults is the fastest path to improvement!',
    fields: [
      {
        name: 'overTheTop',
        label: 'Over the Top (outside-in path)',
        type: 'select',
        options: [
          { value: 'no', label: 'No — I don\'t do this' },
          { value: 'mild', label: 'Mild — sometimes' },
          { value: 'severe', label: 'Yes — this is my main issue' },
        ],
        helpText: 'Club moves outside and over the ideal swing plane in the downswing',
      },
      {
        name: 'earlyExtension',
        label: 'Early Extension (hips move toward ball)',
        type: 'select',
        options: [
          { value: 'no', label: 'No' },
          { value: 'sometimes', label: 'Sometimes' },
          { value: 'yes', label: 'Yes — I do this' },
        ],
        helpText: 'Your hips thrust toward the ball instead of rotating through impact',
      },
      {
        name: 'castingRelease',
        label: 'Casting / Early Release',
        type: 'select',
        options: [
          { value: 'no', label: 'No — I maintain lag' },
          { value: 'sometimes', label: 'Sometimes' },
          { value: 'yes', label: 'Yes — I lose my angles early' },
        ],
        helpText: 'Releasing wrist angles too early in the downswing (losing lag)',
      },
      {
        name: 'reverseSpine',
        label: 'Reverse Spine Angle',
        type: 'select',
        options: [
          { value: 'no', label: 'No' },
          { value: 'yes', label: 'Yes — I lean toward the target at the top' },
        ],
        helpText: 'Upper body leans toward the target at the top of the backswing',
      },
      {
        name: 'hipSlide',
        label: 'Hip Slide (lateral instead of rotation)',
        type: 'select',
        options: [
          { value: 'no', label: 'No — I rotate well' },
          { value: 'yes', label: 'Yes — my hips slide toward the target' },
        ],
      },
      {
        name: 'swayOff',
        label: 'Lateral Sway (off the ball in backswing)',
        type: 'select',
        options: [
          { value: 'no', label: 'No' },
          { value: 'yes', label: 'Yes — I sway off the ball' },
        ],
      },
      {
        name: 'liftUp',
        label: 'Standing Up / Losing Posture',
        type: 'select',
        options: [
          { value: 'no', label: 'No — I maintain my angles' },
          { value: 'yes', label: 'Yes — I tend to stand up in the swing' },
        ],
      },
    ],
  },
  {
    title: 'Your Goal',
    fields: [
      {
        name: 'goalSwing',
        label: 'Which pro\'s swing would you like to model?',
        type: 'select',
        options: [
          { value: '', label: 'No preference — just improve my swing' },
          ...proGolfers.map(p => ({ value: p.id, label: p.name })),
        ],
      },
      {
        name: 'primaryGoal',
        label: 'What\'s your #1 goal?',
        type: 'select',
        options: [
          { value: 'distance', label: 'More distance' },
          { value: 'accuracy', label: 'Better accuracy' },
          { value: 'consistency', label: 'More consistency' },
          { value: 'scoring', label: 'Lower scores' },
          { value: 'pain', label: 'Swing without pain' },
        ],
      },
    ],
  },
];

const defaultValues = {
  name: '',
  gender: 'male',
  handicap: 15,
  clubheadSpeed: 93,
  shotShape: 'fade',
  missDirection: 'right',
  missFlight: 'slice',
  tempo: 'moderate',
  flexibility: 'average',
  backswingLength: 'full',
  balanceFinish: 'stable',
  overTheTop: 'mild',
  earlyExtension: 'no',
  castingRelease: 'sometimes',
  reverseSpine: 'no',
  hipSlide: 'no',
  swayOff: 'no',
  liftUp: 'no',
  goalSwing: '',
  primaryGoal: 'scoring',
};

export default function SwingInputForm({ onSubmit }) {
  const [formData, setFormData] = useState(defaultValues);
  const [currentSection, setCurrentSection] = useState(0);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentSection < inputSections.length - 1) {
      setCurrentSection(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const section = inputSections[currentSection];
  const isLastSection = currentSection === inputSections.length - 1;
  const progress = ((currentSection + 1) / inputSections.length) * 100;

  return (
    <form onSubmit={handleSubmit} className="swing-form">
      {/* Progress bar */}
      <div className="form-progress">
        <div className="form-progress-bar" style={{ width: `${progress}%` }} />
        <span className="form-progress-text">
          Step {currentSection + 1} of {inputSections.length}
        </span>
      </div>

      <div className="form-section">
        <h2 className="form-section-title">{section.title}</h2>
        {section.description && (
          <p className="form-section-desc">{section.description}</p>
        )}

        <div className="form-fields">
          {section.fields.map(field => (
            <div key={field.name} className="form-field">
              <label htmlFor={field.name}>{field.label}</label>
              {field.helpText && (
                <span className="form-help">{field.helpText}</span>
              )}

              {field.type === 'select' ? (
                <select
                  id={field.name}
                  value={formData[field.name]}
                  onChange={e => handleChange(field.name, e.target.value)}
                >
                  {field.options.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : field.type === 'number' ? (
                <input
                  id={field.name}
                  type="number"
                  value={formData[field.name]}
                  onChange={e => handleChange(field.name, parseFloat(e.target.value) || 0)}
                  min={field.min}
                  max={field.max}
                  placeholder={field.placeholder}
                />
              ) : (
                <input
                  id={field.name}
                  type="text"
                  value={formData[field.name]}
                  onChange={e => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="form-navigation">
        {currentSection > 0 && (
          <button type="button" className="btn btn-secondary" onClick={handlePrev}>
            Back
          </button>
        )}
        <div className="form-nav-spacer" />
        {!isLastSection ? (
          <button type="button" className="btn btn-primary" onClick={handleNext}>
            Next
          </button>
        ) : (
          <button type="submit" className="btn btn-accent">
            Analyze My Swing
          </button>
        )}
      </div>
    </form>
  );
}
