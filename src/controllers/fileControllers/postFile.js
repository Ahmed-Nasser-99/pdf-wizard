const cloudinary = require("./../../cloudinary");
const Pdf = require("./../../models/pdfModel");

async function postFile(req, res) {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      format: "pdf",
    });
    const fileData = {
      name: req.file.originalname,
      link: result.secure_url,
      description: req.body.description,
      fileId: result.asset_id,
    };
    const pdf = await Pdf.create(fileData);
    res.send({ status: "OK", data: pdf }).status(201);
  } catch (err) {
    console.log(err);
  }
}

module.exports = postFile;
