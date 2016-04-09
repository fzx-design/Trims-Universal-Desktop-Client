'use strict';

angular.module('sixminsClientApp')

.constant('trimsRadioConfig', {
  activeClass: 'checked',
  inactiveClass: 'unchecked',
  toggleEvent: 'click'
})
.controller('TrimsRadioController', ['trimsRadioConfig', function(trimsRadioConfig) {
  this.activeClass = trimsRadioConfig.activeClass || 'unchecked';
  this.inactiveClass = trimsRadioConfig.inactiveClass || 'checked';
  this.toggleEvent = trimsRadioConfig.toggleEvent || 'click';
}])
.directive('trimsRadio', function () {
  return {
    require: ['trimsRadio', 'ngModel'],
    controller: 'TrimsRadioController',
    link: function (scope, element, attrs, ctrls) {
      var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      //model -> UI
      ngModelCtrl.$render = function () {
        element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, scope.$eval(attrs.trimsRadio)));
      };

      //ui->model
      element.bind(buttonsCtrl.toggleEvent, function () {
        var isActive = element.hasClass(buttonsCtrl.activeClass);

        if (!isActive || angular.isDefined(attrs.uncheckable)) {
          scope.$apply(function () {
            ngModelCtrl.$setViewValue(isActive ? null : scope.$eval(attrs.trimsRadio));
            ngModelCtrl.$render();
          });
        }

        // 阻止向上冒泡
        return false;
      });
    }
  };
});
