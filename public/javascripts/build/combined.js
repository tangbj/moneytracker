'use strict';

angular.module('moneyTrackerApp', ['ngRoute', 'ngResource'])
  .config(['$routeProvider', '$locationProvider', 
  function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
      templateUrl: 'partials/main',
      controller: 'MainCtrl'
    })
    .when('/new', {
      templateUrl: 'partials/new',
      controller: 'NewCtrl'
    })
    .otherwise({
      redirectTo: '/'
    })
    $locationProvider.html5Mode(true);
  }])
  .run(function() {
    console.log('hmmm')
  })
angular.module('moneyTrackerApp')
  .controller('MainCtrl', ['$scope', 'TransactionResource', function($scope, TransactionResource) {
    $scope.data = {
      transactions: [],
      hello: 'world'
    }
    //obtains list of all transactiosn
    TransactionResource.query()
      .$promise.then(function(data) {
        $scope.data.transactions = data;
      })
  }])
  .controller('NewCtrl', ['$scope', 'TransactionResource', 
  function($scope, TransactionResource) {
    $scope.data = {
      transaction: {},
    };
    
    $scope.submitted = false;

    $scope.submit = function(form) {
      $scope.submitted = true;
      if (form.$valid) {
        $scope.data.transaction.transactionDate = new Date($scope.data.transaction.transactionDate);
        new TransactionResource($scope.data.transaction).$save()
          .then(function(data) {
            console.log(data)

            //clears and resets the form
            $scope.transactionForm.$setPristine();
            $scope.data.transaction = {};
            $scope.submitted = false;            
          });
        
      }
    }
  }])
'use strict';

angular.module('moneyTrackerApp')
  .factory('TransactionResource', ['$resource', function($resource) {
    return $resource('/api/transactions');
  }])