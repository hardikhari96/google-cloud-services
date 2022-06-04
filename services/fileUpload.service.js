const util = require('util')
const gc = require('../config/gc.config').gStorage
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../credantials/.env') })
const bucket = gc.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME) // should be your bucket name
var exports = {};
/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */
const googleCloudFileUplaod = (file) => new Promise((resolve, reject) => {
    const { originalname, buffer } = file

    const blob = bucket.file(originalname.replace(/ /g, "_"))
    const blobStream = blob.createWriteStream({
        resumable: false
    })
    blobStream.on('finish', () => {
        const publicUrl = util.format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        )
        resolve({ publicUrl, filename: blob.name, bucketName: bucket.name })
    })
        .on('error', (err) => {
            reject(err.message)
        })
        .end(buffer)
})
const googleCloudSignedUrlGenerate = (name) => new Promise(async (resolve, reject) => {

    const options = {
        version: 'v4',
        action: 'write',
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        contentType: 'application/octet-stream',
      };
    
    try {
        const [url] = await bucket.file(name).getSignedUrl({
            action:'write',
            expires:Date.now() + 15 * 60 * 1000,
            contentType:'binary/octet-stream'
        });
        console.log('Generated PUT signed URL:');
        console.log(url);
        console.log('You can use this URL with any user agent, for example:');
        console.log(
          "curl -X PUT -H 'Content-Type: application/octet-stream' " +
            `--upload-file my-file '${url}'`
        );
      
        resolve(url);
    } catch (error) {
        reject(error);
    }
})
const googleCloudSignedUrlGenerateRead = (name) => new Promise(async (resolve, reject) => {

    const options = {
        version: 'v4',
        action: 'read',
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      };
    console.log(name)
    try {
        let respo = await bucket.file(name).getSignedUrl({
            action:'read',
            expires:Date.now() +  60 * 1000,
        });
        console.log(respo)
        resolve(respo);
    } catch (error) {
        console.log(error)
        reject(error);
    }
})

exports.uploadImage = googleCloudFileUplaod;
exports.getUploadUrl = googleCloudSignedUrlGenerate
exports.getGetUrl = googleCloudSignedUrlGenerateRead

module.exports = exports;