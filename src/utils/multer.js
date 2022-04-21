const multer = require('multer');
const path = require('path');

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  limits:{fileSize: 1024*1024*5}, // 5mb file size limit
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== '.pdf' && ext !== '.docx' && ext !== '.pptx') {
      cb(new Error('File type is not supported'), false);
      return;
    }
    cb(null, true);
  },
});
