'use strict';

angular.module('sixminsClientApp')
    .directive('trimsInspectorHistory', function ($parse, $animate) {
        return {
            restrict: 'C',
            scope: {
                value: '=',
                type: '='
            },
            templateUrl: 'template/trims-inspector-history.html',
            link: function postLink(scope, element, attrs, ngModel) {

            }
        };
    });
