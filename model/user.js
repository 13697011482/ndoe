var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
  username : {type : String , required : true , unique : true},
  password : {type : String , required : true}
})

var UserModel = mongoose.model('userList' , UserSchema);

module.exports = UserModel