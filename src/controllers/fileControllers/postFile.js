const cloudinary = require("./../../cloudinary");
const Pdf = require("./../../models/pdfModel");

async function postFile(req, res) {
  try {
    const ext = req.file.originalname.slice(req.file.originalname.indexOf(".")+1)
    if(ext !== "pdf")
      return res.status(400).send({message: 'File extension is not supported (.pdf only). Use convert instead'});
    const result = await cloudinary.uploader.upload(req.file.path);
    const fileData = {
      name: req.file.originalname,
      link: result.secure_url,
      userId: req.user._id,
      description: req.body.description,
      fileId: result.public_id,
    };
    const pdf = await Pdf.create(fileData);
    res.send({ status: "OK", data: pdf }).status(201);
  } catch (err) {
    console.log(err);
  }
}

module.exports = postFile;
