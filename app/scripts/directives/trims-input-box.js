'use strict';

angular.module('sixminsClientApp')
    .constant('trimsInputBoxConstant', {
        inputRules: {
            'text': {
                emptyMsg: "不能为空"
            },
            'password': {
                emptyMsg: "密码不能为空",
                rules: [
                    {
                        'msg': '最少输入6位',
                        'verify': function (value) { // 通过返回true，失败返回false
                            return value.length >= 6;
                        }
                    }
                ]
            },
            'email': {
                emptyMsg: "邮箱不能为空",
                rules: [
                    {
                        'msg': '不合法的邮箱地址',
                        'verify': function (value) {
                            var reg=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;;
                            return reg.test(value);
                        }
                    }
                ]
            }
        }
    })
    .directive('trimsInputBox', function ($parse, $animate, trimsInputBoxConstant) {
        return {
            restrict: 'AE',
            scope: {
                type: '@',
                placeholder: '@',
                disabled: '@',
                value: '=',
                required: '='
            },
            template: '<div><input type="{{type==\'email\'?\'text\':type}}" ng-disabled="{{disabled}}" placeholder="{{placeholder}}" ng-model="value"><div>{{errorMsg}}</div><button class="trims-btn-menu" ng-click="clear()"><img src="images/icon/text_clear.svg"></button></div>',
            link: function postLink(scope, element, attrs, ngModel) {

                // 检验输入是否正确，正确返回null，错误返回错误信息
                scope.verify = function (type, required, value) {
                    //console.debug("in verify");
                    //console.debug(type + '-' + required + '-' + value);

                    var rule = trimsInputBoxConstant.inputRules[type];

                    if (required) {
                        if (value == null || value == undefined || value == '') {
                            //console.debug(value);
                            return rule.emptyMsg;
                        }
                    }

                    var rules = rule.rules;
                    if (rules == undefined || rules == null || rules.length == 0) {
                        return null;
                    }

                    var i = 0;
                    for (i = 0; i < rules.length; i++) {
                        var theRule = rules[i];
                        if (!theRule.verify(value)) {
                            return theRule.msg;
                        }
                    }
                    return null;
                };

                scope.error = false;
                scope.errorMsg = "";
                scope.isEmpty = true;

                scope.$watch("error", function(error) {
                    $animate[error?'addClass':'removeClass'](element, 'error');
                });

                scope.$watch("value", function (value) {
                    if (value == null || value == '') {
                        scope.isEmpty = true;
                    } else {
                        scope.isEmpty = false;
                    }

                    if (scope.error) {
                        var ret = scope.verify(scope.type, scope.required, scope.value);
                        if (ret == null) {
                            //console.debug("error fixed");
                            scope.error = false;
                        }
                    }
                });

                element.find('input').bind("change", function () {
                    //console.debug("changed:" + scope.value);
                    var ret = scope.verify(scope.type, scope.required, scope.value);
                    if (ret != null) {
                        //console.error("error: "+ret);
                        scope.error = true;
                        scope.errorMsg = ret;
                        scope.$apply();
                    }
                });

                scope.clear = function() {
                    scope.value = "";
                };

                scope.$watch("isEmpty", function(isEmpty) {
                    $animate[!isEmpty?'addClass':'removeClass'](element, 'fill');
                });

            }
        };
    });
