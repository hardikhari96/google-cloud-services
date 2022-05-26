const express = require('express');
const uploadControllers = require('../controllers/upload.controller');
const indexControllers = require('../controllers/index.controller');
const visionControllers = require('../controllers/vision.controller');
const index = express.Router();

index.post('/upload/singleFile', uploadControllers.uploadFile);
index.post('/vision/detectText',visionControllers.uploadFileFetchText)
index.post('/vision/detectLandMark',visionControllers.uploadFileFetchLandMark)

index.get('/', indexControllers.mainpage)

module.exports = index;