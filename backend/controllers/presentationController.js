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

  console.log(`Received request to delete slide with id ${slideId} from presentation ${title}`);

  try {
    const presentation = await Presentation.findOne({ title });
    if (!presentation) {
      console.log('Presentation not found');
      return res.status(404).send({ error: 'Presentation not found' });
    }

    const slide = presentation.slides.id(slideId);
    if (!slide) {
      console.log('Slide not found');
      return res.status(404).send({ error: 'Slide not found' });
    }

    // Use the $pull operator to remove the slide
    presentation.slides.pull({ _id: slideId });
    await presentation.save();

    console.log('Slide deleted successfully');
    res.status(200).send(presentation);  // Send back the updated presentation
  } catch (e) {
    console.error('Error during slide deletion:', e);
    res.status(500).send({ error: 'Error during slide deletion' });
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
