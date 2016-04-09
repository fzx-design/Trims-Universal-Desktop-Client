'use strict';

angular.module('sixminsClientApp')
    .directive('trimsSearchBox', function ($parse, $animate) {
        return {
            restrict: 'AE',
            scope: {
                value: '=',
                placeholder: '@',
                disabled: '@',
                loading: '='
            },
            template: '<div><input placeholder="{{placeholder}}" ng-disabled="{{disabled}}" ng-model="value"><button class="trims-btn-menu" ng-click="clear()"><img src="images/icon/text_clear.svg"></button></div>',
            link: function postLink(scope, element, attrs, ngModel) {

                if (scope.disabled == undefined) {
                    scope.disabled = false;
                }

                scope.isEmpty = false;
                scope.clear = function() {
                    scope.value = "";
                }

                scope.$watch("value", function (value, wasValue) {
                    if (value == undefined || value == null || value == '') {
                        scope.isEmpty = true;
                    } else {
                        scope.isEmpty = false;
                    }
                });

                scope.$watch("loading", function(loading) {
                    $animate[loading?'addClass':'removeClass'](element, 'loading');
                });

                scope.$watch("isEmpty", function(isEmpty) {
                    $animate[!isEmpty?'addClass':'removeClass'](element, 'fill');
                });
            }
        };
    });
