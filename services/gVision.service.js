const path = require('path');
const gvClient = require('../config/gc.config').gVision
require('dotenv').config({ path: path.join(__dirname, '../credantials/.env') });
var exports = {};

exports.textReadFromBucket = async (fileName, bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME) => {
    const [result] = await gvClient.textDetection(
        `gs://${bucketName}/${fileName}`
    );
    console.log(`gs://${bucketName}/${fileName}`)
    return result;
}
exports.landMarkReadFromBucket = async (fileName, bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME) => {
    const [result] = await gvClient.landmarkDetection(
        `gs://${bucketName}/${fileName}`
    );
    console.log(`gs://${bucketName}/${fileName}`)
    return result;
}

module.exports = exports;