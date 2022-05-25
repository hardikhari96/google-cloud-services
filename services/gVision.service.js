const path = require('path');
const gvClient = require('../config/gc.config').gVision
require('dotenv').config({ path: path.join(__dirname, '../credantials/.env') });
var exports = {};

exports.readFromBucket = async (fileName, bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME) => {
    console.log(fileName)
    const [result] = await gvClient.landmarkDetection(
        `gs://${bucketName}/${fileName}`
    );
    console.log(`gs://${bucketName}/${fileName}`)
    const landmarks = result.landmarkAnnotations;
    console.log(result)
    return landmarks;
}

module.exports = exports;