const { uploadImage } = require("../services/fileUpload.service");

var exports = {};


exports.uploadFile = async (req, res, next) => {
    try {
        // key name is file
        const myFile = req.file
        const imageUrl = await uploadImage(myFile)
        res
            .status(200)
            .json({
                message: "Upload was successful",
                data: imageUrl
            })
    } catch (error) {
        console.log(error)
        next(error)
    }
}


module.exports = exports;