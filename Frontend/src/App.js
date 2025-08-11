import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import de toutes les pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProcessorPage from './pages/ProcessorPage';
import Configurations from './pages/Configurations';
import CaseFansPage from './pages/CaseFans';
import CasesPage from './pages/Cases';
import CoolersPage from './pages/Coolers';
import DisksPage from './pages/Disks';
import MemoryPage from './pages/Memory';
import MotherboardPage from './pages/Motherboard';
import OthersPage from './pages/Others';
import PowerSuppliesPage from './pages/PowerSupplies';
import VideoCardsPage from './pages/VideoCards';

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/">Accueil</Link> |
        <Link to="/processors">Processors</Link> |
        <Link to="/case-fans">Case Fans</Link> |
        <Link to="/cases">Cases</Link> |
        <Link to="/coolers">CPU Coolers</Link> |
        <Link to="/disks">Disks</Link> |
        <Link to="/memory">Memory</Link> |
        <Link to="/motherboards">Motherboards</Link> |
        <Link to="/others">Others</Link> |
        <Link to="/power-supplies">Power Supplies</Link> |
        <Link to="/video-cards">Video Cards</Link> |
        <Link to="/config">Configurations</Link> |
        <Link to="/about">À propos</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/processors" element={<ProcessorPage />} />
        <Route path="/case-fans" element={<CaseFansPage />} />
        <Route path="/cases" element={<CasesPage />} />
        <Route path="/coolers" element={<CoolersPage />} />
        <Route path="/disks" element={<DisksPage />} />
        <Route path="/memory" element={<MemoryPage />} />
        <Route path="/motherboards" element={<MotherboardPage />} />
        <Route path="/others" element={<OthersPage />} />
        <Route path="/power-supplies" element={<PowerSuppliesPage />} />
        <Route path="/video-cards" element={<VideoCardsPage />} />
        <Route path="/config" element={<Configurations />} />
      </Routes>
    </Router>
  );
}

export default App;
