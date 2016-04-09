'use strict';

angular.module('sixminsClientApp')
    .directive('trimsInspectorFeedback', function ($parse, $animate) {
        return {
            restrict: 'C',
            scope: {
                value: '='
            },
            templateUrl: 'template/trims-inspector-feedback.html',
            link: function postLink(scope, element, attrs, ngModel) {

            }
        };
    });
