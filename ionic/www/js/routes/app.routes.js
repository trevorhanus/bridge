'use strict';

angular.module('bridge')
  .config(mainConfig);

mainConfig.$inject = ['$httpProvider', '$stateProvider', '$urlRouterProvider'];

function mainConfig ($httpProvider, $stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/splash');

  $stateProvider
    // MAIN PARENT ROUTE
    .state('app', {
      templateUrl: '../views/app.view.html',
      abstract: true
    });

  // $httpProvider.interceptors.push('attachTokens');
}
