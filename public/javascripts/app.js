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