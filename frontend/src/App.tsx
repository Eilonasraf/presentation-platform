import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Presentation from './pages/Presentation';
import AddSlide from './pages/AddSlide';
import CreatePresentation from './pages/CreatePresentation';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Dashboard */}
        <Route path="/" element={<Dashboard />} />
        {/* Route for the Presentation page */}
        <Route path="/presentation/:title" element={<Presentation />} />
        <Route path="/presentation/:title/add-slide" element={<AddSlide />} />
        <Route path="/create-presentation" element={<CreatePresentation />} />
      </Routes>
    </Router>
  );
}

export default App;
