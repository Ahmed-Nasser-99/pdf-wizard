const cloudinary = require("../../cloudinary");
const Pdf = require("../../models/pdfModel");

async function deleteFile(req,res){
  try{
     const file = await Pdf.findOne({
         _id: req.params.id
       });
      if(file.userId.equals(req.user.id)){
         return res.status(404).json({
            status: "no file exist with this id to be deleted",
          });  
      }
       if(file){
        await file.delete();
        res.status(204).json({
            status: "ok",
            });
        }
       else{
        res.status(404).json({
            status: "no file exist with this id to be deleted",
          });  
        }
    }catch(err){
    console.log(err);
    }
   }

module.exports = deleteFile;







