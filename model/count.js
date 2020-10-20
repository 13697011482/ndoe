var mongoose = require('mongoose')
var countSchema = mongoose.Schema({
  postId : {type : Number , required : true}
})

var CountModel = mongoose.model('countList' , countSchema)

module.exports = CountModel