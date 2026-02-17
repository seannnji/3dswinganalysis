import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import CreateRoundPage from './pages/CreateRoundPage.jsx';
import RoundDetailPage from './pages/RoundDetailPage.jsx';
import MyRoundsPage from './pages/MyRoundsPage.jsx';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateRoundPage />} />
          <Route path="/round/:id" element={<RoundDetailPage />} />
          <Route path="/my-rounds" element={<MyRoundsPage />} />
        </Routes>
      </main>
    </div>
  );
}
