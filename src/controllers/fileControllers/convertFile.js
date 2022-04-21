const cloudinary = require("./../../cloudinary");
const Pdf = require("./../../models/pdfModel");
const fs = require("fs");

async function postFile(req, res) {  
  try {
    console.log(req.file) 
    const result = await cloudinary.uploader.upload(req.file.path, {
      format: "pdf",
    });
    const fileData = {
      name: req.file.originalname,
      link: result.secure_url,
      userId: req.userId,
      description: req.body.description,
      fileId: result.public_id,
    };
    fs.unlink(req.file.path, (err)=>{
      if(err) throw err
    });
    const pdf = await Pdf.create(fileData);
    res.send({ status: "OK", data: pdf }).status(201);
  } catch (err) {
    console.log(err);
  }

}

module.exports = postFile;