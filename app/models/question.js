var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var QuestionSchema   = new Schema
({
  description: String,
  title: String,
  question: String
    
});

module.exports = mongoose.model('Question', QuestionSchema);