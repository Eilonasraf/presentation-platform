const Presentation = require('../models/presentation');

exports.createPresentation = async (req, res) => {
  const presentation = new Presentation(req.body);
  try {
    await presentation.save();
    res.status(201).send(presentation);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.getPresentationByTitle = async (req, res) => {
  const title = req.params.title;
  try {
    const presentation = await Presentation.findOne({ title });
    if (!presentation) {
      return res.status(404).send();
    }
    res.send(presentation);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.addSlideToPresentation = async (req, res) => {
  const title = req.params.title;
  const slide = req.body;
  try {
    const presentation = await Presentation.findOne({ title });
    if (!presentation) {
      return res.status(404).send();
    }
    presentation.slides.push(slide);
    await presentation.save();
    res.send(presentation);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.updateAuthors = async (req, res) => {
  const title = req.params.title;
  const authors = req.body.authors;
  
  try {
    const presentation = await Presentation.findOneAndUpdate(
      { title },
      { authors },
      { new: true }
    );
    if (!presentation) {
      return res.status(404).send();
    }
    res.send(presentation);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.updateSlide = async (req, res) => {
  const title = req.params.title;
  const slideId = req.params.slideId;
  const updatedSlide = req.body;
  try {
    const presentation = await Presentation.findOne({ title });
    if (!presentation) {
      return res.status(404).send();
    }
    const slide = presentation.slides.id(slideId);
    if (!slide) {
      return res.status(404).send();
    }
    Object.assign(slide, updatedSlide); // Updating the slide
    await presentation.save();
    res.send(presentation);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.deleteSlide = async (req, res) => {
  const title = req.params.title;
  const slideId = req.params.slideId;
  try {
    const presentation = await Presentation.findOne({ title });
    if (!presentation) {
      return res.status(404).send();
    }
    presentation.slides.id(slideId).remove();
    await presentation.save();
    res.send(presentation);
  } catch (e) {
    res.status(500).send(e);
  }
};

// addition 
exports.deleteAllSlides = async (req, res) => {
  const title = req.params.title;
  try {
      const presentation = await Presentation.findOneAndUpdate(
          { title },
          { slides: [] },
          { new: true }
      );
      if (!presentation) {
          return res.status(404).send();
      }
      res.send(presentation);
  } catch (e) {
      res.status(500).send(e);
  }
};

exports.deletePresentation = async (req, res) => {
  const title = req.params.title;
  
  try {
    const presentation = await Presentation.findOneAndDelete({ title });
    if (!presentation) {
      return res.status(404).send();
    }
    res.send(presentation); // Sending the deleted presentation
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.getAllPresentations = async (req, res) => {
  try {
    const presentations = await Presentation.find();
    res.send(presentations);
  } catch (e) {
    res.status(500).send(e);
  }
};
