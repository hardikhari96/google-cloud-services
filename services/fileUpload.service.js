const util = require('util')
const gc = require('../config/gc.config')
const path = require('path');
require('dotenv').config({path:path.join(__dirname,'../credantials/.env')})
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
        resolve(publicUrl)
    })
        .on('error', (err) => {
            reject(err.message)
        })
        .end(buffer)
})

exports.uploadImage = googleCloudFileUplaod;

module.exports = exports;