'use strict';

angular.module('dockerConsoleApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('containers', {
        url: '/containers',
        templateUrl: 'app/containers/containers.html',
        controller: 'ContainersCtrl'
      });
  });