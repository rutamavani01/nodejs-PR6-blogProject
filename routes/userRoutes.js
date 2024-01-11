const express = require('express');

const routes = express.Router();

const userController = require('../controllers/userControllers');
const formModel = require('../controllers/formControllers');
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const imageupload = multer({ storage: storage }).single('image');

routes.get('/',userController.login);
routes.get('/dashboard',userController.dashboard);
routes.get('/logout',userController.logout);
routes.get('/register',userController.register);
routes.post('/registerRecord',userController.registerRecord);
routes.post('/loginRecord',userController.loginRecord);
routes.get('/order',formModel.order);
routes.post('/addRecord',imageupload,formModel.addRecord);
routes.get('/table',imageupload,formModel.table);
routes.get('/deleteRecord',imageupload,formModel.deleteRecord);
routes.get('/editRecord',imageupload,formModel.editRecord);
routes.post('/updateRecord',imageupload,formModel.updateRecord);

module.exports = routes;