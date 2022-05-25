const { Storage } = require('@google-cloud/storage')
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

module.exports = new Storage({
    keyFilename: serviceKey,
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
})