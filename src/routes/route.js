const express = require("express"); //import express
const router = express.Router(); 
const adminController=require('../controller/AdminController');
const writterController=require('../controller/writterController');
const userController=require('../controller/userController');
const articalController=require('../controller/articalController')
const {Authentication,Authorization}=require=('../middleWare/auth.js');

/********* Admin Api ***********/
router.post('/admitRegister',adminController.adminCreate);
router.post('/adminLogin',adminController.AdminLogin);

/********* Writter Api ***********/
router.post('/writterRegister',writterController.WritterCreate);
router.post('/writterLogin',writterController.writeLogin);
router.get('/writterAll',writterController.getAllWritter);
router.get('/writterDetails/:writterId',writterController.getWritterById);
router.put('/writerUpdate/:writterId',writterController.updatedWritter);
router.post('/writterForgetPWD',writterController.forgetPWD);

/********* Artical Api ***********/

//export router
module.exports = router;