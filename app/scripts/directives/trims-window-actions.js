'use strict';

/**
 * @ngdoc function
 * @name sixminsClientApp.directive: CircleMark
 * @description
 * # CircleMark
 * Directive of the sixminsClientApp
 */
angular.module('sixminsClientApp')
    .directive('trimsWindowActions', function() {
        return {
            restrict: 'C',
            scope: {
                close: "=",
                minimize: "=",
                fullscreen: "="
            },
            templateUrl: 'template/trims-window-actions.html',
            link: function postLink(scope, element, attrs, ngModel) {
                //console.log(scope.close+"-"+scope.minimize+"-"+scope.fullscreen);
                scope.doClose = function () {
                    if (scope.close) {
                        win.close();
                    }
                }
                scope.doMinimize = function () {
                    if (scope.minimize) {
                        win.minimize();
                    }
                }
                scope.doFullscreen = function () {
                    if (scope.fullscreen) {
                        win.toggleFullscreen();
                    }
                }

                scope.$on("window-blur", function(event, isBlur) {
                    element.toggleClass("win-blur", isBlur);
                });
            }
        };
    });
