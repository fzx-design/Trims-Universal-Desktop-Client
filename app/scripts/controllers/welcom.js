'use strict';

angular.module('sixminsClientApp')
    .controller('WelcomCtrl', function ($scope, $state, WelcomService, GlobalService) {
        $scope.isFirst = true;
        $scope.isLogin = false;

        $scope.goBack = function () {
            $scope.isFirst = false;
            $scope.isLogin = false;
        };

        $scope.goRegister = function () {
            $state.go("welcom.register");
        };
        $scope.goLogin = function () {
            $scope.isFirst = false;
            $scope.isLogin = true;
        };
        $scope.goHelp = function () {
            alert("Can't help you ~");
        };
        $scope.register = function () {
            console.log("register");
            $scope.isFirst = true;
            var promise = WelcomService.register();
            promise.then(function (data) {
                if (data.status != 'success') {
                    console.log("register fail");
                } else {
                    console.log("register success");
                    finishLogin(data.data);
                }
            }, function () {
                console.log("login fail");
            });
        };
        $scope.login = function () {
            console.log("login");
            var promise = WelcomService.login();
            promise.then(function (data) {
                if (data.status != 'success') {
                    console.log("login fail");
                } else {
                    console.log("login success");
                    finishLogin(data.data);
                }
            }, function () {
                console.log("login fail");
            });
        };

        /**
         * 根据线上配置更新本地配置
         * @return {[type]} [description]
         */
        var finishLogin = function(onlineConfig) {
            if (app.config != null && app.config.id == onlineConfig.id) {
                for (var i in onlineConfig.projects) {
                    var old = getProjectById(app.config.projects, onlineConfig.projects[i].id);
                    if (old != null) {
                        onlineConfig.projects[i].location = old.location;
                    }
                }
            }
            app.config = onlineConfig;
            GlobalService.saveConfig();
            go();
        };
        var getProjectById = function (projects, projectId) {
            if (projects == null) {
                return null;
            }
            for (var i in projects) {
                if (projects[i].id == projectId) {
                    return projects[i];
                }
            }
            return null;
        };
        //win.focus();

        /**
         * 检查配置项，若有项目跳转到资源库，若无项目，跳转到创建页面
         * @return {[type]} [description]
         */
        var go = function () {
            console.log(app.config);
            if (app.config != null) {
                if (app.config.projects.length == 0) {
                    // 本地无project列表记录
                    console.log('跳转到新建或导入项目页面');
                    $state.go('welcom.init', {});
                } else {
                    // 本地有project列表记录
                    console.log('跳转到主界面');
                    $state.go('main', {});
                }
            }
        };

        GlobalService.loadConfig();
        go();
    });
