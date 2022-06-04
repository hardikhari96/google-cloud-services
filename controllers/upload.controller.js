const { uploadImage ,getUploadUrl,getGetUrl} = require("../services/fileUpload.service");

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
                main:await getGetUrl(imageUrl.filename),
                data: imageUrl,
            })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.getUploadUrl = async (req, res, next) => {
    try {
        res.json(await getUploadUrl(req.query.name))
    } catch (error) {
        res.json(error)   
    }
}


module.exports = exports;