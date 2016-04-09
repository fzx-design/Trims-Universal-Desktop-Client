'use strict';

/**
 * @ngdoc function
 * @name sixminsClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sixminsClientApp
 */
angular.module('sixminsClientApp')
	.directive('trimsPreview', function() {
		return {
			restrict: 'AE',
			templateUrl: 'template/trims-preview.html',
			replace: true,
			scope: {
				value: "=",
				type: "@",
				mode: "="
			},
			link: function(scope, element, attr){
				var img = new Image();
				img.src = scope.value.snapshotUrl;

				function getSize() {
					return scope.mode=='grid'?150:80;
				}

				var imgWidth = 0;
				var imgHeight = 0;
				var callback = function(width, height){
					imgWidth = width;
					imgHeight = height;
					if(imgWidth >= imgHeight){
						element.find('img')[0].width = getSize();
						element.find('img')[0].height = -1;
					}else{
						element.find('img')[0].width = -1;
						element.find('img')[0].height = getSize();
					}
				};
				if (img.complete) {
					callback(img.width, img.height);
				} else {
					img.onload = function () {
						callback(img.width, img.height);
						img.onload = null;
					};
				};

				scope.$watch('mode', function() {
					if(imgWidth >= imgHeight){
						element.find('img')[0].width = getSize();
						element.find('img')[0].height = -1;
					}else{
						element.find('img')[0].width = -1;
						element.find('img')[0].height = getSize();
					}
				});
			}
		};
	});
