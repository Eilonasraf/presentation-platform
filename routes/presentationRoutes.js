const express = require('express');
const presentationController = require('../controllers/presentationController');
const router = express.Router();

router.post('/presentations', presentationController.createPresentation);
router.get('/presentations/:title', presentationController.getPresentationByTitle);
router.post('/presentations/:title/slides', presentationController.addSlideToPresentation);
router.delete('/presentations/:title/slides', presentationController.deleteAllSlides); // // additional funcationallity
router.put('/presentations/:title/slides/:slideId', presentationController.updateSlide);
router.put('/presentations/:title/authors', presentationController.updateAuthors);
router.delete('/presentations/:title/slides/:slideId', presentationController.deleteSlide);
router.delete('/presentations/:title', presentationController.deletePresentation);
router.get('/presentations', presentationController.getAllPresentations);

module.exports = router;
