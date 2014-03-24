angular.module('moneyTrackerApp')
  .controller('MainCtrl', ['$scope', 'TransactionResource', function($scope, TransactionResource) {
    $scope.data = {
      transactions: []
    }

    //obtains list of all transactiosn
    TransactionResource.query()
      .$promise.then(function(data) {
        $scope.data.transactions = data;
        var temp = new Date(data[0].dateCreated);
        console.log(temp.getTimezoneOffset())

      })
  }])