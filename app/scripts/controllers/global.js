'use strict';

var fs = require('fs');
var gui = require('nw.gui');
var app = process.mainModule.exports.trims;
var win = gui.Window.get();

var _state = null;

var _show_standard = function() {
    _state.go("standard");
};
var _show_main = function() {
    _state.go("main");
};
var _show_exporter = function() {
    _state.go("exporter");
};

var _reload = function() {
    win.reload();
};

if (app.win) {
    app.win.close();
} else {
    app.win = win;
}


angular.module('sixminsClientApp')
    .controller('GlobalCtrl', function ($scope, GlobalService, $urlRouter, $state) {
        // 调试用
        _state = $state;
        console.log("run global");

        // 解决nw在windows下无边框窗口阴影丢失的问题
        // win.setTransparent(!win.isTransparent);
        // win.setTransparent(!win.isTransparent);

        $scope.isFocused = true;
        win.on('blur', function () {
          $scope.$broadcast("window-blur", true);
        });
        win.on('focus', function () {
          $scope.$broadcast("window-blur", false);
        });

        win.showDevTools();


    });
