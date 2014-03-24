'use strict';

var api = require('./controllers/api'),
  index = require('./controllers/index');

module.exports = function(app) {
  app.get('/api/transactions', api.index);
  app.post('/api/transactions', api.create);

  app.get('/partials/:name', index.partials);
  app.get('/*', index.index);
}
