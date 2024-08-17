import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [presentations, setPresentations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPresentations();
  }, []);

  const fetchPresentations = () => {
    axios.get('/api/presentations')
      .then(response => setPresentations(response.data))
      .catch(error => console.error('Error fetching presentations:', error));
  };

  const handleDeletePresentation = (title: string) => {
    axios.delete(`/api/presentations/${title}`)
      .then(() => fetchPresentations())
      .catch(error => console.error('Error deleting presentation:', error));
  };

  const handleNavigateToCreate = () => {
    navigate('/create-presentation');
  };

  return (
    <div className="dashboard-container">
      <h1>Presentation Dashboard</h1>
      <button onClick={handleNavigateToCreate} className="create-presentation-btn">
        Create Presentation
      </button>
      <div className="presentation-grid">
        {presentations.map((presentation: any) => (
          <div className="presentation-card" key={presentation.title}>
            <Link to={`/presentation/${presentation.title}`} className="presentation-link">
              {presentation.title}
            </Link>
            <button className="delete-btn" onClick={() => handleDeletePresentation(presentation.title)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
