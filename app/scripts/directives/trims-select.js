'use strict';

angular.module('sixminsClientApp')
  .constant('trimsSelectConfig', {
    openClass: 'open',
    closeClass: 'closed'
  })
  .service('trimsSelectService', function($document){
    var openScope = null;

    this.open = function( dropdownScope ) {
      if ( !openScope ) {
        $document.bind('click', closeDropdown);
        $document.bind('keydown', escapeKeyBind);
      }

      if ( openScope && openScope !== dropdownScope ) {
          openScope.isOpen = false;
      }

      openScope = dropdownScope;
    };

    this.close = function( dropdownScope ) {
      if ( openScope === dropdownScope ) {
        openScope = null;
        $document.unbind('click', closeDropdown);
        $document.unbind('keydown', escapeKeyBind);
      }
    };

    var closeDropdown = function( evt ) {
      if (evt && evt.isDefaultPrevented()) {
          return;
      }

      openScope.$apply(function() {
        openScope.isOpen = false;
      });
    };

    var escapeKeyBind = function( evt ) {
      if ( evt.which === 27 ) {
        openScope.focusToggleElement();
        closeDropdown();
      }
    };
  })

  .controller('trimsSelectCtrl', function($scope, $attrs, $parse, $animate, trimsSelectService, trimsSelectConfig){
    var self = this,
      scope = $scope.$new(), // create a child scope so we are not polluting original one
      openClass = trimsSelectConfig.openClass,
      closeClass = trimsSelectConfig.closeClass,
      getIsOpen,
      setIsOpen = angular.noop,
      toggleInvoker = $attrs.onToggle ? $parse($attrs.onToggle) : angular.noop,

      getModel,
      setModel = angular.noop,
      modelInvoker = $attrs.ngChange ? $parse($attrs.ngChange) : angular.noop,

      items = self.items = scope.items = [];

    this.init = function( element ) {
      self.$element = element;

      if ( $attrs.isOpen ) {
        getIsOpen = $parse($attrs.isOpen);
        setIsOpen = getIsOpen.assign;

        $scope.$watch(getIsOpen, function(value) {
          scope.isOpen = !!value;
        });
      }

      if ( $attrs.ngModel ) {
        getModel = $parse($attrs.ngModel);
        setModel = getModel.assign;

        $scope.$watch(getModel, function(value) {
          scope.model = value;
        });
      }
    };

    this.toggle = function( open ) {
      return scope.isOpen = arguments.length ? !!open : !scope.isOpen;
    };

    this.isOpen = function() {
      return scope.isOpen;
    };

    this.getModel = function() {
      return scope.model;
    };

    this.setModel = function(value) {
      return scope.model = value;
    };

    this.addItem = function ( item, element) {
      item.$element = element;
      items.push(item);
    };

    this.removeItem = function ( item ) {
      var index = items.indexOf(item);
      items.splice(index, 1);
    };

    scope.focusToggleElement = function() {
      if ( self.toggleElement ) {
        self.toggleElement[0].focus();
      }
    };

    scope.$watch('isOpen', function( isOpen, wasOpen ) {
      $animate[isOpen ? 'addClass' : 'removeClass'](self.$element, openClass);
      $animate[!isOpen ? 'addClass' : 'removeClass'](self.$element, closeClass);

        if (isOpen) {
            self.$element.find("ul").slideDown(200, 'easeOutCubic');
        } else {
            self.$element.find("ul").slideUp(200, 'easeOutCubic');
        }

      if ( isOpen ) {
        scope.focusToggleElement();
        trimsSelectService.open( scope );
      } else {
        trimsSelectService.close( scope );
      }

      setIsOpen($scope, isOpen);
      if (angular.isDefined(isOpen) && isOpen !== wasOpen) {
        toggleInvoker($scope, { open: !!isOpen });
      }
    });

    scope.$watch('model', function( model, wasModel ) {
      if (angular.isDefined(model))
        setModel($scope, model);
      if (angular.isDefined(model) && angular.isDefined(wasModel) && model !== wasModel) {
        modelInvoker($scope);
      }
    });

    $scope.$on('$locationChangeSuccess', function() {
      scope.isOpen = false;
    });

    $scope.$on('$destroy', function() {
      scope.$destroy();
    });
  })

  .directive('trimsSelect', function () {
    return {
      restrict: 'CA',
      controller: 'trimsSelectCtrl',
      link: function(scope, element, attrs, trimsSelectCtrl) {
        trimsSelectCtrl.init( element );
      }
    };
  })

  .directive('trimsSelectToggle', function (){
    return {
      restrict: 'CA',
      require: '?^trimsSelect',
      link: function(scope, element, attrs, trimsSelectCtrl) {
        trimsSelectCtrl.toggleElement = element;

        var toggleDropdown = function(event) {
          event.preventDefault();

          if ( !element.hasClass('disabled') && !attrs.disabled ) {
            scope.$apply(function() {
              trimsSelectCtrl.toggle();
            });
          }
        };

        element.bind('click', toggleDropdown);

        scope.$watch(trimsSelectCtrl.isOpen, function( isOpen ) {
          if(isOpen)
            element.addClass("focus");
          else
            element.removeClass("focus");
        });

        scope.$watch(trimsSelectCtrl.getModel, function( model ) {
          for(var i = 0; i < trimsSelectCtrl.items.length; i++) {
            if(parseInt(trimsSelectCtrl.items[i].itemValue) == model) {
              element.html(trimsSelectCtrl.items[i].itemText);
              break;
            }
          }
        });

        scope.$on('$destroy', function() {
          element.unbind('click', toggleDropdown);
        });
      }
    };
  })

  .directive('trimsSelectItem', function (){
    return {
      restrict: 'CA',
      require: '?^trimsSelect',
      scope: {
        itemValue: '=itemValue',
        itemText: '=itemText'
      },
      link: function(scope, element, attrs, trimsSelectCtrl) {
        trimsSelectCtrl.addItem(scope, element);

        var clickItem = function(event) {
          scope.$apply(function() {
            trimsSelectCtrl.setModel(parseInt(scope.itemValue));
          });
        };

        element.bind('click', clickItem);

        scope.$watch(trimsSelectCtrl.getModel, function( model ) {
          if(model == parseInt(scope.itemValue)) {
            element.parent().children().removeClass('selected');
            element.addClass('selected');
          }
        });

        scope.$on('$destroy', function() {
          element.unbind('click', clickItem);
          trimsSelectCtrl.removeItem(scope);
        });
      }
    };
  });
