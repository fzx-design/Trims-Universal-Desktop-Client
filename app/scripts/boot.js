'use strict';

/**
 * 启动窗口入口
 * @ngdoc overview
 * @name sixminsClientApp
 * @description
 * # sixminsClientApp
 *
 * Main module of the application.
 */

var _w_standard = 900;
var _h_standard = 850;

angular
    .module('sixminsClientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'dialogs.main',
    'ui.router',
  ])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        // welcome window
        .state("welcom", {
            url: "/welcom",
            abstract: true,
            templateUrl: "views/welcome/welcom.html",
            controller: 'WelcomCtrl',
            onEnter: function () {
                console.log("in welcome");
            }
        })
        .state("welcom.main", {
            url: "/main",
            templateUrl: "views/welcome/main.html"
        })
        .state("welcom.login", {
            url: "/login",
            templateUrl: "views/welcome/login.html"
        })
        .state("welcom.register", {
            url: "/register",
            templateUrl: "views/welcome/register.html"
        })
        .state("welcom.init", {
            url: "/init",
            controller: "InitCtrl",
            templateUrl: "views/welcome/init.html"
        })

        // main window
        .state("main", {
            onEnter: function () {
                var nwin = gui.Window.open('index.html', {
                    "icon": "app/icon.png",
                    "title": "Trims - Main",
                    "toolbar": false,
                    "width": 1346,
                    "height": 768,
                    "fullscreen": false,
                    "allways-on-top": false,
                    "position": "center",
                    "resizable": true,
                    "show_in_taskbar": true,
                    "frame": false,
                    "kiosk": false,
                    "show": true,
                    "as_desktop": true,
                    "min_width": 1024,
                    "min_height": 500
                });
                nwin.focus(false);
            }
        })

        .state("standard", {
            url: "/standard",
            templateUrl: "views/standard.html",
            controller: 'StandardCtrl',
            onEnter: function () {
                console.log("in standard");
                win.width = _w_standard;
                win.height = _h_standard;
            }
        });

        $urlRouterProvider.otherwise('/welcom/main');

    });
