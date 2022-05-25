const express = require('express');
const multerMid = require('./multer.mw');
module.exports.global = [
    express.json(),
    express.urlencoded({ extended: true }),
    multerMid.single('file')
];

module.exports.one = {
    errorHandle:require('./errorHandle.mw')
}