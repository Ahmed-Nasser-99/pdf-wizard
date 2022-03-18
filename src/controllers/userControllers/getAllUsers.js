const Users = require("../../database")
function getAllUsers(req,res){
    res.status(200).json({
        status: "ok",
        data: Users
    }

    )

}
module.exports = getAllUsers;
