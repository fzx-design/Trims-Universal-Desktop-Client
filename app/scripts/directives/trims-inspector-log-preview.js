'use strict';

angular.module('sixminsClientApp')
    .directive('trimsInspectorLogPreview', function ($parse, $animate) {
        return {
            restrict: 'C',
            scope: {
                value: '=',
                type: '='
            },
            templateUrl: 'template/trims-inspector-log-preview.html',
            link: function postLink(scope, element, attrs, ngModel) {
                scope.isExpand = false;
                scope.$element = element;
                scope.toggle = function() {
                    scope.isExpand = !scope.isExpand;

                    if (scope.isExpand) {
                        scope.$element.find('.title+div').slideDown(200, 'easeOutCubic');
                    } else {
                        scope.$element.find('.title+div').slideUp(200, 'easeOutCubic');
                    }
                }
            }
        };
    });
