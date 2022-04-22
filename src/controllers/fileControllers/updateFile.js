const Pdf = require("../../models/pdfModel");
async function updateFile(req, res) {
  const { name , description } = req.body;
  try{
   
    const file = await Pdf.findOne({
      userId: req.user.id,
      id: req.params.id
    });
   
    if(file){
      file.name = name
      file.description = description
      await file.save()
      
      res.status(200).json({
        status: "ok",
        data: file
        })
      }
    else{
      res.status(404).json({
        status: "File Not Found"
        })
    }
  } catch(err){
    console.log(err);
  }
}

module.exports = updateFile;
