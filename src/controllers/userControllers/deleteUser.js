const User = require("../../models/userModel");



// DELETE /Users/{id}
const deleteUser = async(req, res) => {
  
 try{
      const user_de = await User.findById(req.params.id);

      await user_de.delete();

      res.status(204).json({status:"ok"});
       
    }catch(err){console.log(err);}
  };

module.exports = deleteUser;
