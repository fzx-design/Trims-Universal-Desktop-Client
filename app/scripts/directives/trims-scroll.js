'use strict';

angular.module('sixminsClientApp')
.directive('trimsScroll', function () {
  return {
    restrict: 'A',
    controller: 'TrimsRadioController',
    link: function (scope, element, attrs, ctrls) {
      element.toggleClass("trims-scroll-top",element.scrollTop()==0);
      element.bind("scroll", function() {
        element.toggleClass("trims-scroll-top",element.scrollTop()==0);
      })
    }
  };
});
