var WorkModel = require('../model/work')

var login = (req,res,next) => {
  res.render('login')
}
var register = (req,res,next) => {
  res.render('register')
}
var admin = (req,res,next) => {
  res.render('admin' , {
    username : req.session.username
  })
}
var admin_postEdit = (req,res,next) => {
  var page = req.params.page;
  var count = 10
  Promise.all([
    WorkModel.find().skip( (page - 1) * count ).limit(count),
    WorkModel.find().count()
  ]).then((infos) => {
    if(infos){
      res.render('admin_postEdit' , {
        username : req.session.username,
        infos : infos[0],
        pages : Math.ceil(infos[1]/count),
        now : Number(page)
      })
    }
  }).catch((err) => {
    if(err){
      res.render('admin_postEdit' , {
        username : req.session.username,
        infos : [],
        pages : 0,
        now : 0 
      })
    }
  })
}
var admin_postAdd = (req,res,next) => {
  res.render('admin_postAdd' , {
    username : req.session.username
  })
}
var admin_postUpdate = (req,res,next) => {
  var id = req.params.postId
  console.log(id);
  WorkModel.findOne({postId : id}).then((info) => {
    console.log(info);
      if(info){
        res.render('admin_postUpdate' , {
          username : req.session.username,
          info: info
      })
    }
  }).catch((err) => {
    res.render('admin_postUpdate' , {
      username : req.session.username,
      info : {}
    })
  })
 
}
var home = (req,res,next) => {
  WorkModel.find().then((infos) => {
    if(infos){
      res.render('home' , {
        workList : infos
      })
    }
  })
}
var detail = (req,res,next) => {
  var id = req.params.id
  WorkModel.findOne({_id : id}).then(info => {
    res.render('detail' , {
      WorkDetail : info
    })
  })
}
module.exports = {
  login,
  register,
  admin,
  admin_postEdit,
  admin_postAdd,
  admin_postUpdate,
  home,
  detail
}