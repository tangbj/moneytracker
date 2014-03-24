
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , fs = require('fs');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


//loads all the model files
var pathName = path.join(__dirname, '/lib/models/');
fs.readdirSync(pathName).forEach(function(file) {
  if (/.+\.js/.test(file)) require('./lib/models/' + file);
});

mongoose.connect('mongodb://localhost/moneytracker');
var Transaction = mongoose.model('Transaction');

new Transaction({
  amount: Math.floor(Math.random() * 10),
  description: 'Lunch',
  category: 'Food',
  dateCreated: new Date()
}).save();

require('./lib/routes')(app);



http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
