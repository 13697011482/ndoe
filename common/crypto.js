var crypto = require('crypto')
var secret = 'asdhjklyuie'
function getCrypto(msg){
  var hash = crypto.createHmac('sha256' , secret).update(msg).digest('hex')
  return hash;
}
module.exports = getCrypto;