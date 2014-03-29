'use strict';

describe('MainCtrl', function() {

  //scope to be used in tests
  var scope, $httpBackend;

  beforeEach(angular.mock.module('moneyTrackerApp'));
  beforeEach(angular.mock.inject(function($rootScope, $controller, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.when('GET', '/api/transactions').respond([
      {
        "amount": 100,
        "category": "food",
        "description": "lunch",
        "transactionDate": "2010-10-10T00:00:00.000Z",
      },
      {
        "amount": 150,
        "category": "food",
        "description": "lunch",
        "transactionDate": "2010-10-11T00:00:00.000Z",
      }        
    ])

    //creates empty scope
    scope = $rootScope.$new();

    //declares controllers and injects empty scope
    $controller('MainCtrl', {$scope: scope});
  }))

  //begin tests
  it('should fetch list of transactions', function() {
    $httpBackend.flush();
    expect(scope.data.transactions.length).toBe(2);
  });

  it('transaction object should be valid', function() {
    $httpBackend.flush();
    expect(typeof scope.data.transactions[0].amount).toBe('number');
    expect(typeof scope.data.transactions[0].category).toBe('string');
    expect(typeof scope.data.transactions[0].description).toBe('string');    

    expect(scope.data.transactions[0].amount).toBeGreaterThan(0);
  })
})