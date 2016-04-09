'use strict';

/**
 * @ngdoc function
 * @name sixminsClientApp.directive: ColorRep
 * @description
 * # ColorRep
 * Directive of the sixminsClientApp
 */
angular.module('sixminsClientApp')
    .directive('colorRep', function() {
        return {
            restrict: 'E',
            scope: {
                colorInfo: '=color'
            },
            templateUrl: 'template/color-rep.html'
        };
    });
