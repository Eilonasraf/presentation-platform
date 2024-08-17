import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Presentation from './pages/Presentation';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Dashboard */}
        <Route path="/" element={<Dashboard />} />
        {/* Route for the Presentation page */}
        <Route path="/presentation/:title" element={<Presentation />} />
      </Routes>
    </Router>
  );
}

export default App;
