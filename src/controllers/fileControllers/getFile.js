const Pdf = require("../../models/pdfModel");
async function getFile(req, res) {
  try {
    const file = await Pdf.findById(req.params.id);
    if (file && file.userId.equals(req.user._id)) {
      res.status(200).json({
        status: "ok",
        data: file,
      });
    } else {
      res.status(404).json({
        status: "No file exist with this id",
      });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = getFile;
