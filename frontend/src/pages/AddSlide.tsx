import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AddSlide: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const [slideContent, setSlideContent] = useState('');
  const navigate = useNavigate();

  const handleSaveSlide = () => {
    if (slideContent.trim()) {
      axios.post(`/api/presentations/${title}/slides`, { content: slideContent })
        .then(() => {
          navigate(`/presentation/${title}`);
        })
        .catch(error => console.error('Error adding slide:', error));
    }
  };

  return (
    <div className="add-slide-container">
      <h2>Add a New Slide</h2>
      <textarea
        value={slideContent}
        onChange={(e) => setSlideContent(e.target.value)}
        placeholder="Enter new slide content"
        rows={5}
        style={{ width: '100%' }}
      />
      <button onClick={handleSaveSlide}>Save</button>
      <button onClick={() => navigate(`/presentation/${title}`)}>Cancel</button>
    </div>
  );
};

export default AddSlide;
