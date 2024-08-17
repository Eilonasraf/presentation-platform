const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({
  content: { type: String, required: true } // Ensures that the content field is always provided and is of type String
});

module.exports = slideSchema; 
