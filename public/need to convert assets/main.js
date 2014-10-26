(function(){
  'use strict';
  var main = angular.module('falldown');

  main.controller('MainCtrl', ['$scope', function($scope){
    $scope.gameActive = false;
    $scope.clock = 0;

    var game = new Game();

    //wait for device ready and then load the game
    document.addEventListener('deviceready', function(){
      game = new Game();
    });

    //start game on user click
    $scope.start = function(){
      $scope.clock = 0;
      $scope.gameActive = true;
      game.start();
    };

    window.addEventListener('shipcrash', function(){
      //alert('crash event triggered from main.js');
      game = new Game();
      $scope.gameActive = false;

      $scope.$digest();
    });

    window.addEventListener('timer', function(time){
      //console.log(time);
      $scope.clock = time.detail;

      $scope.$digest();
    });


  }]);
})();
