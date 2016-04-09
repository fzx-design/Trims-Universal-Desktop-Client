'use strict';

/**
 * @ngdoc function
 * @name sixminsClientApp.controller:ExporterCtrl
 * @description
 * # ExporterCtrl
 * Controller of the sixminsClientApp
 */
angular.module('sixminsClientApp')
    .controller('ExporterCtrl', function($scope) {
        $scope.inspectorRadio = 'left';
        var ec = this;
        ec.psd = {
            name: 'weather icon.psd',
            layers: [
                {
                    name: 'icons',
                    layers: [
                        {
                            name: 'wind',
                            shadow: {
                                color: {
                                    rgb: '#ff7575',
                                    alpha: 0.8
                                }, 
                                radius: 4,
                                pos: {
                                    x: 0,
                                    y: 2
                                },
                            },
                            stroke: {
                                width: 2,
                                color: {
                                    rgb: '#000000',
                                    alpha: 1
                                }
                            },
                            fill_color: null
                        },
                        {
                            name: 'rainbow',
                            layers: [
                                {
                                    name: 'test1'
                                },
                                {
                                    name: 'test2'
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'bg-image'
                }
            ]
        };
        ec.currentLayer = ec.psd;

        ec.setCurrentLayer = function(newValue) {
            ec.currentLayer = newValue;
        };

        ec.isCurrentLayer = function(value) {
            // TODO: compare ID or other identifier instead
            return ec.currentLayer.name == value.name;
        }
    })
    .controller('ExporterInspectorCtrl', function($scope) {
        $scope.status = {
            isPreviewOpen: true,
            isShadowOpen: true,
            isColorStrokeOpen: true,
            isSizeFontOpen: true
        };
    })
    .controller('ExporterLayersCtrl', function($scope) {
        $scope.layer = $scope.exporter.psd;
     })
    .directive('stopEvent', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                element.bind('click', function (e) {
                    e.stopPropagation();
                });
            }
        };
    });

