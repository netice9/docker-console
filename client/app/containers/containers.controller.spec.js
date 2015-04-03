'use strict';

describe('Controller: ContainersCtrl', function () {

  // load the controller's module
  beforeEach(module('dockerConsoleApp'));

  var ContainersCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContainersCtrl = $controller('ContainersCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
