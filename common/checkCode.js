var svgCaptcha = require('svg-captcha')

function getCheckCode(req,res,next){
  var captcha = svgCaptcha.create({
    noise : 5
  });
  req.session.captcha = captcha.text.toLowerCase()
  res.type('svg');
  res.status(200).send(captcha.data)
}

module.exports = getCheckCode;