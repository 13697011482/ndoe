var fs = require('fs')
var path = require('path')
var WorkModel = require("../model/work")
var CountModel = require('../model/count')


var admin = async (req,res,next) => {
  var body = req.body
  var file = req.file 
  console.log(file);
  fs.renameSync(path.join('./public/uploads' , file.filename) , path.join('./public/uploads' , file.filename + '.jpg') );

  var {postId} = await CountModel.findOneAndUpdate({} , {$inc : {postId : 1 }} , {
    upsert : true,
    new : true
  })

  var data = {
    ...body,
    image : 'http://localhost:3000/uploads/' + file.filename + '.jpg',
    postId
  }

  WorkModel(data).save().then((infos) => {
    if(infos){
      res.send('<script>alert("添加成功！");history.back();</script>')
    }
  }).catch((err) => {
    if(err){
      console.log(err);
      res.send('<script>alert("添加失败！");history.back();</script>')
    }
  })
}

var update = (req,res,next) => {
  var body = req.body;
  var file = req.file

  if(file){
    body.prevLogo = body.prevLogo.replace(/http:\/\/localhost:3000/ , './public');
    fs.unlinkSync(body.prevLogo);
    delete body.prevLogo

    fs.renameSync( path.join('./public/uploads' , file.filename) , path.join('./public/uploads' , file.filename + '.png') );

    var data = {
      ...body,
      image : 'http://localhost:3000/uploads/' + file.filename + '.jpg',
    }
    WorkModel.update({postId : body.postId} , {$set : data}).then((info) => {
      res.send('<script>alert("更新成功！"); history.back();</script>')
     }).catch((err) => {
       res.send('<script>alert("更新失败！"); history.back();</script>')
     })
  }else{
    WorkModel.update({postId : body.postId} , {$set : body}).then((info) => {
     res.send('<script>alert("更新成功！"); history.back();</script>')
    }).catch((err) => {
      res.send('<script>alert("更新失败！"); history.back();</script>')
    })
  }
}
var remove = (req,res,next) => {
  var query = req.query
  WorkModel.deleteOne(query).then((info) => {
    res.send({
      code : 0,
      errmsg : "ok",
    })
  }).catch((err) => {
    res.send({
      code : -1,
      errmsg : "not remove",
    })
  })
}

module.exports = {
  admin,
  update,
  remove
}