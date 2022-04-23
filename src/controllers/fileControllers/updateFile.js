const Pdf = require("../../models/pdfModel");
async function updateFile(req, res) {
  const { name, description } = req.body;
  try {
    const file = await Pdf.findById(req.params.id);
    if (file && file.userId.equals(req.user._id)) {
      file.name = name || file.name;
      file.description = description || file.description;
      await file.save();

      res.status(200).json({
        status: "ok",
        data: file,
      });
    } else {
      res.status(404).json({
        status: "File Not Found",
      });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = updateFile;
