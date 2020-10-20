var mongoose = require('mongoose');
var WorkSchema = mongoose.Schema({
  name : { type : String , required : true},
  location : { type : String , required : true},
  company : { type : String , required : true},
  wages : { type : String , required : true},
  WorkYears : { type : String , required : true},
  education : { type : String , required : true},
  number : { type : String , required : true},
  requirement : { type : String , required : true},
  image : { type : String , required : true},
  postId : { type : Number , required : true}
})
var WorkModel = mongoose.model('workList' , WorkSchema)

module.exports = WorkModel