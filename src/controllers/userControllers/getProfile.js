
async function getProfile(req, res) {
 res.status(200).json({
    status: "ok",
    data: {
        user: req.user,
    },
    });
}

module.exports = getProfile;
