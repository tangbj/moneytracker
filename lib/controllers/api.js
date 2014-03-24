'use strict';

var mongoose = require('mongoose'),
  Transaction = mongoose.model('Transaction');

exports.index = function(req, res) {
  return Transaction.find( function(err, transactions) {
    if (err || !transactions.length) return res.send(err);
    return res.json(transactions);
  })
};

exports.create = function(req, res) {
  var info = req.body;
  //KIV - server side validation

  var transaction = new Transaction(info);
  transaction.save();
}