'use strict';

angular.module('sixminsClientApp')

.constant('trimsToggleConfig', {
  activeClass: 'unchecked',
  inactiveClass: 'checked',
  toggleEvent: 'click'
})
.controller('TrimsToggleController', ['trimsToggleConfig', function(trimsToggleConfig) {
  this.activeClass = trimsToggleConfig.activeClass || 'unchecked';
  this.inactiveClass = trimsToggleConfig.inactiveClass || 'checked';
  this.toggleEvent = trimsToggleConfig.toggleEvent || 'click';
}])
.directive('trimsToggle', function () {
  return {
    require: ['trimsToggle', 'ngModel'],
    controller: 'TrimsToggleController',
    link: function (scope, element, attrs, ctrls) {
      var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      function getTrueValue() {
        return getCheckboxValue(attrs.btnCheckboxTrue, true);
      }

      function getFalseValue() {
        return getCheckboxValue(attrs.btnCheckboxFalse, false);
      }

      function getCheckboxValue(attributeValue, defaultValue) {
        var val = scope.$eval(attributeValue);
        return angular.isDefined(val) ? val : defaultValue;
      }

      //model -> UI
      ngModelCtrl.$render = function () {
        element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, getFalseValue()));
        element.toggleClass(buttonsCtrl.inactiveClass, angular.equals(ngModelCtrl.$modelValue, getTrueValue()));
      };

      //ui->model
      element.bind(buttonsCtrl.toggleEvent, function () {
        scope.$apply(function () {
          ngModelCtrl.$setViewValue(element.hasClass(buttonsCtrl.activeClass) ? getTrueValue() : getFalseValue());
          ngModelCtrl.$render();
        });
      });
    }
  };
});
