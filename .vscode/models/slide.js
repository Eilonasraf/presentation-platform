const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({
  content: { type: String, required: true }
});

module.exports = slideSchema;
