'use strict';

angular.module('dockerConsoleApp').controller('ContainerCtrl', function ($scope, $http) {
  $scope.wipe = function() {
    $http.delete('/api/containers/'+$scope.id).success(function(containers) {
      // $scope.containers = containers;
      console.log("deleted");
    });
  };
});
