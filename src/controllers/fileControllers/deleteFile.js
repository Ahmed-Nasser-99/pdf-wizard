const cloudinary = require('../../cloudinary');
const Pdf = require('../../models/pdfModel');

async function deleteFile(req, res) {
  try {
    const file = await Pdf.findById(req.params.id);
    if (file && file.userId.equals(req.user._id)) {
      const result = await cloudinary.uploader.destroy(file.fileId); // delete file on cloudinary
      await file.delete();
      res.status(204).json({
        status: 'ok',
      });
    } else {
      res.status(404).json({
        status: 'no file exist with this id to be deleted',
      });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = deleteFile;
