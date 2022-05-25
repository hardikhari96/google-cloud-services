const { Storage } = require('@google-cloud/storage')
const vision = require('@google-cloud/vision');
const path = require('path')
require('dotenv').config({path:path.join(__dirname,'../credantials/.env')})
/**
 *  
 * 1) to get secrate key create cloude project
 * 2) create storage bucket
 * 3) create Service account from credential service
 * 4) create key for service account  
 * 
 */
const serviceKey = path.join(__dirname, './../credantials/gs.cred.json');

module.exports.gStorage = new Storage({
    keyFilename: serviceKey,
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
})

module.exports.gVision = new vision.ImageAnnotatorClient({
    keyFilename: serviceKey,
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
});