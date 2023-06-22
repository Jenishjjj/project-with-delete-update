const express = require('express');
const routes = express.Router();
const Admin = require('../model/Admin')
const adminController = require('../controller/adminController');

routes.get('/',adminController.home);

routes.post('/bookDetail',Admin.uploadedFile,adminController.bookDetail);

routes.get('/viewData',adminController.viewData);

routes.get('/deleteRec/:id',adminController.deleteRec)

routes.get('/updateRec',adminController.updateRec);

routes.post('/EditRec',Admin.uploadedFile,adminController.EditRec);

module.exports = routes