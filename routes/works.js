var express = require('express')
var router = express.Router()
var ControllerWork = require('../controller/work')
var multer = require('multer')
var upload = multer({dest : './public/uploads'})


router.post('/admin' , upload.single('image') , ControllerWork.admin)
router.post('/update' , upload.single('image') , ControllerWork.update)
router.get('/remove' , ControllerWork.remove)

module.exports = router