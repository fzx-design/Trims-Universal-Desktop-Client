'use strict';

/**
 * @ngdoc function
 * @name sixminsClientApp.controller:InitCtrl
 * @description
 * # InitCtrl
 * Controller of the sixminsClientApp
 */
angular.module('sixminsClientApp')
    .controller('InitCtrl', function ($scope) {



    })
    .controller('InitCreateCtrl', function ($scope) {

    })
    .controller('InitImportCtrl', function ($scope) {
        $scope.import = function () {
            console.log($scope.folder+" is selected");
        };
        $scope.changed = function (value) {
            $scope.folder = value;
        };
        $scope.changedByTextFolder = function (value) {
            $scope.folder = value;
        };
    });
