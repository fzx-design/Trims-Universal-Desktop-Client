'use strict';

/**
 * @ngdoc function
 * @name sixminsClientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sixminsClientApp
 */
angular.module('sixminsClientApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
