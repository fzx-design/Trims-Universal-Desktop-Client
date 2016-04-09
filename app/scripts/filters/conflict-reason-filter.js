'use strict';


angular.module('sixminsClientApp')
    .filter('conflictReasonFilter', function () {
        return function(reason, location) {

            if (reason == 'lock') {
                if (location=='remote') {
                    return '文件锁定，无法覆盖';
                } else {
                    return '';
                }
            }

            if (reason == 'duplicate') {
                return '重名文件';
            }

            return 'unknown';
        }
    });