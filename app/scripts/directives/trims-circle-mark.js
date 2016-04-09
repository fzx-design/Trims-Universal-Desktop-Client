'use strict';

/**
 * @ngdoc function
 * @name sixminsClientApp.directive: CircleMark
 * @description
 * # CircleMark
 * Directive of the sixminsClientApp
 */
angular.module('sixminsClientApp')
    .directive('trimsCircleMark', function() {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                type: '=',
                isself: '='
            },
            templateUrl: 'template/trims-circle-mark.html',
            link: function postLink(scope, element, attrs, ngModel) {
            }
        };
    });
