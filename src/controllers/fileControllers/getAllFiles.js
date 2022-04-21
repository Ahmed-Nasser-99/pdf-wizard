const Pdf = require("../../models/pdfModel");
async function getAllFiles(req, res) {
  try{
    const files = await Pdf.find({
      userId: req.user.id
    });
    if(files){
      res.status(200).json({
        status: "ok",
        data: files
        })
      }
    else{
      res.status(404).json({
        status: "This user don't have any files"
        })
    }
  } catch(err){
    console.log(err);
  }
}

module.exports = getAllFiles;