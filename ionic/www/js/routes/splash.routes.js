'use strict';

angular.module('bridge')
  .config(bridgeRoutes);

bridgeRoutes.$inject = ['$stateProvider'];

function bridgeRoutes ($stateProvider) {
  $stateProvider
    .state('splash', {
      parent: 'app',
      url: '/splash',
      views: {
        'content': {
          templateUrl: '../views/splash.view.html',
          controller: 'SplashController',
          controllerAs: 'vm'
        }
      }
    });
}
