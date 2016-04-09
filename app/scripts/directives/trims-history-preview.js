'use strict';

/**
 * @ngdoc function
 * @name sixminsClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sixminsClientApp
 */
angular.module('sixminsClientApp')
	.directive('trimsHistoryPreview', function() {
		return {
			restrict: 'A',
			templateUrl: 'template/trims-history-preview.html',
			replace: true,
			scope: {
				value: "=",
			},
			link: function(scope, element, attr){
				
				var img = new Image();
				img.src = scope.value.snapshotUrl;
				var callback = function(imgWidth, imgHeight){
					if(imgWidth >= imgHeight){
						element.find('img')[0].width = 110;
					}else{
						element.find('img')[0].height = 110;
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

			}
		};
	});