import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Correct import statement
import axios from 'axios';

// Define the Slide interface
interface Slide {
  content: string;
  _id?: string;
}

interface PresentationData {
  title: string;
  authors: string[];
  dateOfPublishment: string;
  slides: Slide[];
}

const Presentation: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const [presentation, setPresentation] = useState<PresentationData | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [newSlideContent, setNewSlideContent] = useState('');
  const navigate = useNavigate();  // Correct usage

  useEffect(() => {
    axios.get(`/api/presentations/${title}`)
      .then(response => setPresentation(response.data))
      .catch(error => console.error('Error fetching presentation:', error));
  }, [title]);

  const nextSlide = () => {
    if (presentation && currentSlideIndex < presentation.slides.length) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const previousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleAddSlide = () => {
    if (newSlideContent.trim()) {
      axios.post(`/api/presentations/${title}/slides`, { content: newSlideContent })
        .then(response => {
          if (presentation) {
            setPresentation({
              ...presentation,
              slides: [...presentation.slides, response.data],
            });
          }
          setNewSlideContent('');
          setCurrentSlideIndex(presentation ? presentation.slides.length + 1 : 1);
        })
        .catch(error => console.error('Error adding slide:', error));
    }
  };

  const handleDeleteSlide = () => {
    if (presentation && currentSlideIndex > 0 && currentSlideIndex <= presentation.slides.length) {
      const slideToDelete = presentation.slides[currentSlideIndex - 1];
      
      console.log('Attempting to delete slide with ID:', slideToDelete._id);
      console.log('DELETE request URL:', `/api/presentations/${title}/slides/${slideToDelete._id}`);
      
      if (!slideToDelete._id) {
        console.error('Slide _id is missing');
        return;
      }
  
      axios.delete(`/api/presentations/${title}/slides/${slideToDelete._id}`)
        .then(() => {
          console.log('Slide deletion successful');
          setPresentation({
            ...presentation,
            slides: presentation.slides.filter((_, index: number) => index !== currentSlideIndex - 1),
          });
  
          if (currentSlideIndex > 1) {
            setCurrentSlideIndex(currentSlideIndex - 1);
          } else {
            setCurrentSlideIndex(0);
          }
        })
        .catch(error => {
          console.error('Error deleting slide:', error);
        });
    }
  };
  
  const renderSlideContent = () => {
    if (presentation) {
      if (currentSlideIndex === 0) {
        return (
          <div>
            <h2>{presentation.title}</h2>
            <p><strong>Authors:</strong> {presentation.authors.join(', ')}</p>
            <p><strong>Date of Publishment:</strong> {new Date(presentation.dateOfPublishment).toLocaleDateString()}</p>
          </div>
        );
      } else {
        return (
          <div>
            <h2>{presentation.slides[currentSlideIndex - 1].content}</h2>
          </div>
        );
      }
    } else {
      return <p>Loading...</p>;
    }
  };

  return (
    <div>
      <h1>{title}</h1>
      <div>
        <button onClick={previousSlide} disabled={currentSlideIndex === 0}>Previous</button>
        <button onClick={nextSlide} disabled={!presentation || currentSlideIndex >= (presentation.slides.length)}>Next</button>
      </div>
      <div>
        {renderSlideContent()}
      </div>
      <div>
        <input
          type="text"
          value={newSlideContent}
          onChange={(e) => setNewSlideContent(e.target.value)}
          placeholder="Enter new slide content"
        />
        <button onClick={handleAddSlide}>Add Slide</button>
      </div>
      <div>
        <button onClick={handleDeleteSlide} disabled={!presentation || currentSlideIndex === 0}>Delete Slide</button>
      </div>
      <div>
        <button onClick={() => navigate('/')}>Back to Dashboard</button>
      </div>
    </div>
  );
};

export default Presentation;
