'use strict';

angular.module('dockerConsoleApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [
    {
      'title': 'Main',
      'link': '/'
    },
    {
      'title': 'Containers',
      'link': '/containers'
    }
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });