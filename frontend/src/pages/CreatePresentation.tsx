import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreatePresentation.css';

const CreatePresentation: React.FC = () => {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const navigate = useNavigate();

  const handleCreatePresentation = () => {
    const authorsArray = authors.split(',').map(author => author.trim());
    const currentDate = new Date().toISOString();

    axios.post('/api/presentations', {
      title,
      authors: authorsArray,
      dateOfPublishment: currentDate,
      slides: []
    })
    .then(() => navigate('/'))
    .catch(error => console.error('Error creating presentation:', error));
  };

  return (
    <div className="container">
      <div className="create-presentation-container">
        <h1 className="text-center mb-4">Create New Presentation</h1>
        <div className="form-group">
          <FormInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </div>
        <div className="form-group">
          <FormInput
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            placeholder="Authors (comma-separated)"
          />
        </div>
        <Button onClick={handleCreatePresentation} className="btn btn-primary">
          Create Presentation
        </Button>
      </div>
    </div>
  );
};

export default CreatePresentation;
