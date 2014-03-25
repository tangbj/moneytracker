var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Transaction Schema
 */

var TransactionSchema = new Schema({
  amount: Number,
  category: String,
  description: String,
  transactionDate: Date,
  dateCreated: Date
});

mongoose.model('Transaction', TransactionSchema);