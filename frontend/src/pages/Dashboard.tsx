import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [presentations, setPresentations] = useState([]);

  useEffect(() => {
    axios.get('/api/presentations')
      .then(response => setPresentations(response.data))
      .catch(error => console.error('Error fetching presentations:', error));
  }, []);

  return (
    <div>
      <h1>Presentation Dashboard</h1>
      <ul>
        {presentations.map((presentation: any) => (
          <li key={presentation.title}>
            <Link to={`/presentation/${presentation.title}`}>
              {presentation.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
