'use strict';

angular.module('dockerConsoleApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  }).run(function($rootScope) {

    var uri = "ws://"+location.hostname+":"+location.port+"/dockerEvents"
    var ws = new WebSocket(uri);
    ws.onopen = function() {
    };
    ws.onmessage = function (evt) {
      var receivedMsg = evt.data;
      $rootScope.$broadcast('dockerUpdate', receivedMsg);
    };
    ws.onclose = function() {
    };
  });
