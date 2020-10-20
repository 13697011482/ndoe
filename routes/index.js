var express = require('express');
var router = express.Router();
var ControllerIndex = require('../controller/index')

/* GET home page. */
router.get('/login', ControllerIndex.login);
router.get('/register' , ControllerIndex.register);
router.get('/admin' , ControllerIndex.admin)
router.get('/admin/postEdit/:page' , ControllerIndex.admin_postEdit)
router.get('/admin/postAdd' , ControllerIndex.admin_postAdd)
router.get('/admin/postUpdate/:postId' , ControllerIndex.admin_postUpdate)
router.get('/home' , ControllerIndex.home)
router.get('/detail/:id' , ControllerIndex.detail)


module.exports = router;
