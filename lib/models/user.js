var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var User = new Schema({
  name: String,
  categories: [],
  transactions: Schema.Types.Mixed
})