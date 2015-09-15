'use strict';

angular.module('bridge')
  .controller('SplashController', SplashController);

SplashController.$inject =  ['$ionicBackdrop', '$timeout'];

/**
 * Manages the splash screens
 */
function SplashController ($ionicBackdrop, $timeout) {
  var vm = this;

  vm.title = 'Create Tab';
  vm.action = action;

  activate();

  //////////

  function activate () {
    vm.action();
  }

  function action () {
    // $ionicBackdrop.retain();
  }
}
