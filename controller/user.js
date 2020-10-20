var UserModel = require('../model/user')
var getCrypto = require('../common/crypto')

var login = (req,res,next) => {
  // res.send('hello login')
  var { username , password , checkCode } = req.body;
  
  UserModel.findOne({
    username,
    password : getCrypto(password)
  } , (info , err) => {
    if(err){
      res.send('<script>alert("登录失败！");location.href="/login";</script>')
    }
    req.session.username = username
    res.send('<script>alert("登录成功！");location.href="/admin";</script>')
  })
};

var register = (req,res,next) => {
  // res.send('hello register')
  var { username , password ,checkCode } = req.body;
  if(checkCode != req.session.captcha){
    res.send('<script>alert("验证码输入错误！");location.href="/register";</script>');
    return;
  }
  UserModel({
    username,
    password : getCrypto(password)
  }).save().then((info) => {
    if(info){
      res.send('<script>alert("注册成功！");location.href="/login";</script>')
    }
  }).catch((err) => {
      res.send('<script>alert("注册失败！";location.href="/register";</script>')
  })

}
var logout = (req,res,next) => {
  req.session.username = null;
  res.redirect('/login')
}
module.exports = {
  login,
  register,
  logout
}