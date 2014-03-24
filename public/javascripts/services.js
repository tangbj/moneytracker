'use strict';

angular.module('moneyTrackerApp')
  .factory('TransactionResource', ['$resource', function($resource) {
    return $resource('/api/transactions');
  }])