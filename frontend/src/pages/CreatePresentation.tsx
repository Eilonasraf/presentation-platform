import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreatePresentation.css';

const CreatePresentation: React.FC = () => {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const navigate = useNavigate();

  const handleCreatePresentation = () => {
    const authorsArray = authors.split(',').map(author => author.trim());
    const currentDate = new Date().toISOString(); // Automatically set the current date

    axios.post('/api/presentations', {
      title,
      authors: authorsArray,
      dateOfPublishment: currentDate,
      slides: [] // No slides initially
    })
    .then(() => navigate('/'))
    .catch(error => console.error('Error creating presentation:', error));
  };

  return (
    <div className="create-presentation-container">
      <h1>Create New Presentation</h1>
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          value={authors}
          onChange={(e) => setAuthors(e.target.value)}
          placeholder="Authors (comma-separated)"
        />
      </div>
      <button className="create-btn" onClick={handleCreatePresentation}>Create Presentation</button>
    </div>
  );
};

export default CreatePresentation;
