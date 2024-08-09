const mongoose = require('mongoose'); 
const slideSchema = require('./slide'); 

const presentationSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true }, 
  authors: { type: [String], required: true }, 
  dateOfPublishment: { type: Date, default: Date.now }, 
  slides: [slideSchema] // Embedding slide schema within presentation schema
});

const Presentation = mongoose.model('Presentation', presentationSchema);

module.exports = Presentation; 
