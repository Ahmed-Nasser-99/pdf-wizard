const mongoose = require('mongoose');

const pdfSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  timestamps: true,
});

const Pdf = mongoose.model('Pdf', pdfSchema);

module.exports = Pdf;
