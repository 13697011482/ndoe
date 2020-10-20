var express = require('express');
var router = express.Router();
var ControllerUser = require('../controller/user')
var getCheckCode = require('../common/checkCode')

router.post('/login' , ControllerUser.login);
router.post('/register' , ControllerUser.register);
router.get('/logout' , ControllerUser.logout);
router.get('/checkCode' , getCheckCode)

module.exports = router;
