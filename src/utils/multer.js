const multer = require('multer');
const path = require('path');

// Multer config
module.exports = multer({
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== '.pdf' && ext !== '.docx' && ext !== '.pptx') {
      cb(new Error('File type is not supported'), false);
      return;
    }
    cb(null, true);
  },
});
