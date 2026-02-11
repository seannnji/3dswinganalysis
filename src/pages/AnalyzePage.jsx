import { useState } from 'react';
import SwingInputForm from '../components/SwingInputForm';
import ResultsDashboard from './ResultsDashboard';
import { analyzeSwing } from '../utils/swingAnalysis';

export default function AnalyzePage() {
  const [results, setResults] = useState(null);

  const handleSubmit = (formData) => {
    const analysis = analyzeSwing(formData);
    setResults({ ...analysis, formData });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setResults(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (results) {
    return <ResultsDashboard results={results} onReset={handleReset} />;
  }

  return (
    <div className="analyze-page">
      <div className="page-header">
        <h1>Analyze Your Swing</h1>
        <p>
          Answer these questions honestly to get the most accurate analysis.
          Don't worry — every golfer has faults. Identifying them is the first step to improvement!
        </p>
      </div>
      <div className="form-container">
        <SwingInputForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
