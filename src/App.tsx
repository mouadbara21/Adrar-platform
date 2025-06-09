
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import TrailDetail from './pages/TrailDetail';
import Parks from './pages/Parks';
import Refuges from './pages/Refuges';
import RefugeDetail from './pages/RefugeDetail';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/trail/:id" element={<TrailDetail />} />
          <Route path="/parks" element={<Parks />} />
          <Route path="/parks/:id" element={<Parks />} />
          <Route path="/refuges" element={<Refuges />} />
          <Route path="/refuge/:id" element={<RefugeDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/saved" element={<div>Saved trails page coming soon</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;