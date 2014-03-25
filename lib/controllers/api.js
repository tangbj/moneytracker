'use strict';

var mongoose = require('mongoose'),
  Transaction = mongoose.model('Transaction'),
  _ = require('lodash');

//returns true if test is a number and is greater than 0
function isValidNumber(test) {
  return test && !isNaN(test) && test >= 0;
}


exports.index = function(req, res) {
  return Transaction.find( function(err, transactions) {
    if (err || !transactions.length) return res.send(err);
    
    //converts amount back to dollar form
    //note not to save as we do not want to change the value in the database
    transactions.forEach(function(transaction) {
      transaction.amount /= 100;
    })
    return res.json(transactions);
  })
};

exports.create = function(req, res) {
  var info = req.body;

  //server side validation
  if (!isValidNumber(info.amount) || !info.category || !info.description) {
    throw new Error('submitted bad data');
  }

  //we store everything in terms of how many cents to avoid problems with floating point calculations
  info.amount = Math.floor(info.amount * 100);
  info.dateCreated = new Date();
  
  var transaction = new Transaction(info);
  transaction.save(function(err) {
    if (err) return res.send(err);
    res.json(info);
  });
}