const Users = require("../../models/userModel")
 
async function getAllUsers(req,res){
    const allUsers = await Users.find()
    res.status(200).json({
        status: "ok",
        data: allUsers
    }

    )

}
module.exports = getAllUsers;
