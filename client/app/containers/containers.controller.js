'use strict';

angular.module('dockerConsoleApp').controller('ContainersCtrl', function ($scope, $http) {
  $scope.message = 'Hello';
  $http.get('/api/containers').success(function(containers) {
    $scope.containers = containers;
  });

  $scope.$on('dockerUpdate', function() {
    console.log("updating containers");
    $http.get('/api/containers').success(function(containers) {
      $scope.containers = containers;
    });
  });

});
