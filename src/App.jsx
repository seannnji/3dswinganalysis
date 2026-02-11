import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AnalyzePage from './pages/AnalyzePage';
import ProGolfersPage from './pages/ProGolfersPage';
import ToolsPage from './pages/ToolsPage';
import BlogPage from './pages/BlogPage';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analyze" element={<AnalyzePage />} />
            <Route path="/pros" element={<ProGolfersPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/blog" element={<BlogPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
