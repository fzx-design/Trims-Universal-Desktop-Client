'use strict';

angular.module('sixminsClientApp')
    .controller('SyncCtrl', function ($scope,$modalInstance,data) {

        $scope.projectId = data;
        $scope.project = {};// loaded by projectId

        $scope.status = 0;
        $scope.title = ['更新本地文件','解决文件冲突','提交我的更新'];
        $scope.nextTitle = ['下一步','解决...','同步'];

        $scope.remoteUpdateLogs = [
            {
                time: 1434959658407,
                user: {
                    id: 2,
                    name: "Evan Fun",
                    avatar: "images/avatars/2.png"
                },
                files: [
                  {
                    name: "about.psd",
                    msg: "低栏设计低栏设计低栏设计低栏设计低栏设计低栏设计低栏设计低栏设计",
                    snapshotUrl: "images/main/design1.png",
                    operation: "create",
                    lock: true
                  },
                  {
                    name: "about.psd",
                    msg: "更新了低栏设计",
                    snapshotUrl: "images/main/design2.png",
                    operation: "modify",
                    lock: false
                  },
                  {
                    name: "about.psd",
                    msg: "更新了低栏设计",
                    snapshotUrl: "images/main/design3.png",
                    operation: "modify",
                    lock: false
                  }
                ]
            },
            {
                time: 1434959658407,
                user: {
                    id: 2,
                    name: "Evan Fun",
                    avatar: "images/avatars/2.png"
                },
                files: [
                  {
                    name: "about.psd",
                    msg: "低栏设计",
                    snapshotUrl: "images/main/design4.png",
                    operation: "create",
                    lock: true
                  }
                ]
            },
        ];

        $scope.conflicts = [
            {
                reason: 'lock',
                solution: 'keep_both',// default value
                remote: {
                    time: 1434959658407,
                    name: "about.psd",
                    msg: "低栏设计",
                    snapshotUrl: "images/main/design1.png",
                    operation: "modify",
                    isSelf: false,
                    lock: true,
                    user: {
                        id: 2,
                        name: "Evan Fun",
                        avatar: "images/avatars/2.png"
                    }
                },
                local: {
                    time: 1434959658407,
                    name: "about.psd",
                    msg: "低栏设计",
                    snapshotUrl: "images/main/design1.png",
                    operation: "modify",
                    isSelf: true,
                }
            },
            {
                reason: 'duplicate',
                solution: 'keep_both',// default value
                remote: {
                    time: 1434959658407,
                    name: "about.psd",
                    msg: "低栏设计",
                    snapshotUrl: "images/main/design2.png",
                    operation: "create",
                    isSelf: false,
                    user: {
                        id: 2,
                        name: "Evan Fun",
                        avatar: "images/avatars/2.png"
                    }
                },
                local: {
                    time: 1434959658407,
                    name: "about.psd",
                    msg: "低栏设计",
                    snapshotUrl: "images/main/design4.png",
                    operation: "modify",
                    isSelf: true,
                }
            }
        ];

        $scope.localChanges = [
            {
                name: "about.psd",
                snapshotUrl: "images/main/design1.png",
                operation: "modify",
                lock: false,    // 是否要锁定
                selected: true, // 是否选中
            },
            {
                name: "sckth.psd",
                snapshotUrl: "images/main/design2.png",
                operation: "create",
                lock: false,
                selected: true,
            },
        ];

        $scope.cancel = function() {
            $modalInstance.close();
        };

        $scope.next = function() {
            if ($scope.status == 2) {
                // todo commit
                $modalInstance.close();
            } else {
                $scope.status++;
                console.log($scope.status);   
            }
        };
        $scope.selectAll = function() {
            for (var change of $scope.localChanges) {
                change.selected = true;
            }
        };
        $scope.selectReverse = function() {
            for (var change of $scope.localChanges) {
                change.selected = !change.selected;
            }
        };

        console.log($scope.status);
});

