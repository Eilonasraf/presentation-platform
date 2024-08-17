import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

interface Presentation {
  title: string;
}

const Dashboard: React.FC = () => {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
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
    <div className="container">
      <h1 className="text-center my-4">Presentation Dashboard</h1>
      <Button onClick={handleNavigateToCreate} className="btn btn-success mb-3">
        Create Presentation
      </Button>
      <div className="row">
        {presentations.map((presentation) => (
          <div className="col-md-4 mb-3" key={presentation.title}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/presentation/${presentation.title}`} className="presentation-link">
                    {presentation.title}
                  </Link>
                </h5>
                <Button onClick={() => handleDeletePresentation(presentation.title)} className="btn btn-danger">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
