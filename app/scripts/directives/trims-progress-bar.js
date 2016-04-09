'use strict';

angular.module('sixminsClientApp')
    .directive('trimsProgressBar', function ($parse, $animate) {
        return {
            restrict: 'AE',
            scope: {
                percent: '=',
                mode: '@'
            },
            template: '<div class="trims-progress-container"><div ng-if="mode==\'dynamic\'" class="trims-progress" style="width: {{percent}}%"></div><div ng-if="mode==\'static\'" class="trims-progress-loading"></div></div>',
            link: function postLink(scope, element, attrs, ngModel) {
            }
        };
    });


