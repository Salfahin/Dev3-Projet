import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProcessorPage from './pages/ProcessorPage';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Accueil</Link> | <Link to="/about">À propos</Link> | <Link to = "/processors"> Processors </Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/processors" element={<ProcessorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
