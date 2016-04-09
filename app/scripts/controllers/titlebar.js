'use strict';

angular.module('sixminsClientApp')
    .controller('TitleBarCtrl', function ($scope, dialogs, TitleBarService) {
    
    $scope.currentProjectId = -1;
    $scope.updateInfo = {};
    $scope.unfocus = false;

    //$scope.projects = $scope.$parent.$parent.projects;

    console.log($scope);
    
    function loadProjectList() {
        var promise = TitleBarService.projectList();
        
        promise.then(function(data) {
            if (data.status != 'success') {
              console.log("load project list fail");
            } else {
              $scope.projects.list = data.data;
                $scope.currentProjectId = $scope.projects.list.length > 0? $scope.projects.list[0].id:-1;
              console.log("load project list success");
            }
        }, function() {
            console.log("load all spaces fail");
        });
    };

    function loadUpdateInfo() {
        var promise = TitleBarService.updateInfo();
        
        promise.then(function(data) {
            if (data.status != 'success') {
              console.log("load update info fail");
            } else {
              $scope.updateInfo = data.data;
              console.log("load update info success");
            }
        }, function() {
            console.log("load all spaces fail");
        });
    }

    $scope.changeCurrentProject = function() {
        for (var i = 0; i < $scope.projects.list.length; i++) {
            if ($scope.currentProjectId == $scope.projects.list[i].id) {
                $scope.projects.current = $scope.projects.list[i];
                console.log($scope.projects.list[i].id+":"+$scope.projects.list[i].name);
                break;
            }
        }
    }

    $scope.$watch('projects.current',function () {
        $scope.currentProjectId = $scope.projects.current.id;
    });
    $scope.$watch('currentProjectId', function() {
        $scope.changeCurrentProject();
    })
        
    loadProjectList();
    loadUpdateInfo();
    
    $scope.$on("window-blur", function(event, isBlur) {
        $scope.unfocus = isBlur;
    });


    // =======================================================
    var syncDialogOpts = {
      size: 'md',
      keyboard: true,
      backdrop: 'static',
      windowClass: 'model-overlay',
    };

    $scope.sync = function() {
        var dialog = dialogs.create('template/sync-dialog.html', 'SyncCtrl', $scope.currentProjectId, syncDialogOpts);
        $scope.unfocus = true;

        dialog.result.then(function(data) {
                $scope.unfocus = false;
            }, function() {
                $scope.unfocus = false;
            });
    };


    
});