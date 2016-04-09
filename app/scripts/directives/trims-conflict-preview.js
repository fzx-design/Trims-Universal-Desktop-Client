'use strict';

angular.module('sixminsClientApp')
	.directive('trimsConflictPreview', function() {
		return {
			restrict: 'A',
			templateUrl: 'template/trims-conflict-preview.html',
			replace: true,
			scope: {
				value: "=",
				location: '@', // local or cloud
				reason: '@', // lock or duplicate
			},
			link: function(scope, element, attr){
				
				var img = new Image();
				img.src = scope.value.snapshotUrl;
				var callback = function(imgWidth, imgHeight){
					if(imgWidth >= imgHeight){
						element.find('img')[0].width = 90;
					}else{
						element.find('img')[0].height = 90;
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