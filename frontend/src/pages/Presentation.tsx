import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Presentation.css';

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
  const [editMode, setEditMode] = useState(false);
  const [currentContent, setCurrentContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/presentations/${title}`)
      .then(response => setPresentation(response.data))
      .catch(error => console.error('Error fetching presentation:', error));
  }, [title]);

  useEffect(() => {
    if (presentation && currentSlideIndex > 0) {
      setCurrentContent(presentation.slides[currentSlideIndex - 1].content);
    }
  }, [currentSlideIndex, presentation]);

  const nextSlide = () => {
    if (presentation && currentSlideIndex < presentation.slides.length) {
      setCurrentSlideIndex(currentSlideIndex + 1);
      setEditMode(false);
    }
  };

  const previousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
      setEditMode(false);
    }
  };

  const handleSaveSlide = () => {
    if (presentation && currentSlideIndex > 0) {
      const slideToUpdate = presentation.slides[currentSlideIndex - 1];
      axios.put(`/api/presentations/${title}/slides/${slideToUpdate._id}`, { content: currentContent })
        .then(() => {
          setPresentation(prev => {
            if (!prev) return null;
            const updatedSlides = prev.slides.map((slide, index) =>
              index === currentSlideIndex - 1 ? { ...slide, content: currentContent } : slide
            );
            return { ...prev, slides: updatedSlides };
          });
          setEditMode(false);
        })
        .catch(error => console.error('Error updating slide:', error));
    }
  };

  const handleDeleteSlide = (slideId: string) => {
    if (presentation && currentSlideIndex > 0 && currentSlideIndex <= presentation.slides.length) {
      axios.delete(`/api/presentations/${title}/slides/${slideId}`)
        .then(() => {
          const updatedSlides = presentation.slides.filter(slide => slide._id !== slideId);
          setPresentation({
            ...presentation,
            slides: updatedSlides,
          });
          setCurrentSlideIndex(currentSlideIndex > 1 ? currentSlideIndex - 1 : 0);
        })
        .catch(error => console.error('Error deleting slide:', error));
    }
  };

  const renderSlideThumbnails = () => {
    if (!presentation) return null;

    return (
      <div className="slide-thumbnails">
        {presentation.slides.map((slide, index) => (
          <div
            key={slide._id}
            className={`thumbnail ${currentSlideIndex === index + 1 ? 'active' : ''}`}
            onClick={() => setCurrentSlideIndex(index + 1)}
          >
            Slide {index + 1}
            <span className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteSlide(slide._id!); }}>X</span>
          </div>
        ))}
        <div className="thumbnail add-thumbnail" onClick={() => navigate(`/presentation/${title}/add-slide`)}>
          + Add Slide
        </div>
      </div>
    );
  };

  const renderSlideContent = () => {
    if (presentation) {
        if (currentSlideIndex === 0) {
            return (
                <div className="slide-content">
                    <p><strong>Title:</strong> {presentation.title}</p>
                    <p><strong>Authors:</strong> {presentation.authors.join(', ')}</p>
                    <p><strong>Date of Publishment:</strong> {new Date(presentation.dateOfPublishment).toLocaleDateString()}</p>
                    <Button onClick={nextSlide} className="btn-primary">Next</Button>
                </div>
            );
        } else if (editMode) {
            return (
                <div className="slide-content">
                    <textarea
                        value={currentContent}
                        onChange={(e) => setCurrentContent(e.target.value)}
                        rows={5}
                        style={{ width: '100%' }}
                    />
                    <Button onClick={handleSaveSlide} className="btn-primary">Save</Button>
                </div>
            );
        } else {
            return (
                <div className="slide-content">
                    {currentContent}
                    <Button onClick={() => setEditMode(true)} className="btn-purple">Update</Button>
                </div>
            );
        }
    } else {
        return <p>Loading...</p>;
    }
  };

  return (
    <div className="presentation-container">
      <div className="presentation-layout">
        {renderSlideThumbnails()}
        <div className="slide-content-container">
          {renderSlideContent()}
          {currentSlideIndex > 0 && (
            <div className="navigation-buttons">
              <Button onClick={previousSlide} className="btn-secondary">Previous</Button>
              <Button onClick={nextSlide} className="btn-secondary">Next</Button>
            </div>
          )}
        </div>
      </div>
      <div className="back-dashboard">
        <Button onClick={() => navigate('/')} className="btn-secondary">Back to Dashboard</Button>
      </div>
    </div>
  );
};

export default Presentation;
