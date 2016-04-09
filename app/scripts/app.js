'use strict';

/**
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
        // main window
        .state("main", {
            url: "/main",
            templateUrl: "views/main/main.html",
            controller: 'MainCtrl',
            onEnter: function () {
                console.log("in main");
            }
        })
        .state("exporter", {
                url: "/exporter",
                templateUrl: "views/exporter/exporter.html",
                controller: 'ExporterCtrl',
                controllerAs: 'exporter'
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

        $urlRouterProvider.otherwise('/main');
    });
