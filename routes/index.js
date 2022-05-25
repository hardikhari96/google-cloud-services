const express = require('express');
const uploadControllers = require('../controllers/upload.controller');
const indexControllers = require('../controllers/index.controller');
const index = express.Router();

index.post('/upload/singleFile', uploadControllers.uploadFile);

index.get('/', indexControllers.mainpage)

module.exports = index;