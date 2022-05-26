const { uploadImage } = require("../services/fileUpload.service");
const { textReadFromBucket,landMarkReadFromBucket } = require("../services/gVision.service");

var exports = {};


exports.uploadFileFetchText = async (req, res, next) => {
    try {
        // key name is file
        const myFile = req.file
        const imageData = await uploadImage(myFile)
        const data = await textReadFromBucket(imageData.filename,imageData.bucketName)
        res
            .status(200)
            .json({
                message: "Upload was successful",
                data: imageData,
                readText: data
            })
    } catch (error) {
        console.log(error)
        next(error)
    }
}
exports.uploadFileFetchLandMark = async (req, res, next) => {
    try {
        // key name is file
        const myFile = req.file
        const imageData = await uploadImage(myFile)
        const data = await landMarkReadFromBucket(imageData.filename,imageData.bucketName)
        res
            .status(200)
            .json({
                message: "Upload was successful",
                data: imageData,
                readText: data
            })
    } catch (error) {
        console.log(error)
        next(error)
    }
}


module.exports = exports;