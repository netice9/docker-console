'use strict';

angular.module('dockerConsoleApp').controller('ContainerCtrl', function ($scope) {
  $scope.toggleTerminal = function() {
    var terminalContainer = document.getElementById('terminal-container'),
    term = new Terminal(),
    prompt = '> ';

    term.open(terminalContainer);
    term.fit();

    term.prompt = function () {
      term.write('\r\n' + prompt);
    };

    term.writeln('Welcome to xterm.js');
    term.writeln('Just type some keys in the prompt below.');
    term.writeln('');
    term.prompt();
  };
});
