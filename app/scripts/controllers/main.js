'use strict';

/**
 * @ngdoc function
 * @name sixminsClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sixminsClientApp
 */
angular.module('sixminsClientApp')
  .controller('MainCtrl', function ($scope, TitleBarService) {

    $scope.user = {
        id: 1,
        name: "Alex Yan",
        avatar: "images/avatars/1.png",
        role: "设计师",
        authoration: "Authentec"
    }

    $scope.projects = {
      list : [],
      current : {},
      showSideView : true,
    }

    // =======================================================
    // inspector data model
    $scope.inspector = {
      status : 'history',     // 当前inspector显示标签
      feedbackMode : 'open',  // 当前反馈信息显示表情
      history : {},   // 当前history内容
      feedback : {},  // 当前feedback内容
      info : {},      // 当前info内容
    };
    // 根据selectedFile变化，更新其历史
    $scope.inspector.history = {
        type: "file", // or 'project'
        name: "about.psd",
        size: "45.3M",
        history: [
            {
                user: {
                    id: 1,
                    name: "Alex Yan",
                    avatar: "images/avatars/1.png"
                },
                logs: [
                    {
                        time: 1434959658407,
                        files: [
                          {
                            name: "about.psd",
                            msg: "低栏设计",
                            snapshotUrl: "images/main/design1.png",
                            operation: "create",
                            isSelf: true
                          },
                          {
                            name: "about.psd",
                            msg: "更新了低栏设计",
                            snapshotUrl: "images/main/design1.png",
                            operation: "modify",
                            isSelf: true
                          }
                        ]
                    },
                    {
                        time: 1434959658407,
                        files: [
                          {
                            name: "about.psd",
                            msg: "更新了低栏设计",
                            snapshotUrl: "images/main/design1.png",
                            operation: "modify",
                            isSelf: true
                          }
                        ]
                    }
                ]
            },
            {
                user: {
                    id: 2,
                    name: "Evan Fun",
                    avatar: "images/avatars/2.png"
                },
                logs: [
                    {
                        time: 1434959658407,
                        files: [
                          {
                            name: "about.psd",
                            msg: "更新了低栏设计",
                            snapshotUrl: "images/main/design1.png",
                            operation: "modify",
                            isSelf: false
                          }
                        ]
                    }
                ]
            }
        ]
    }
    // 根据selectedFile变化，更新其反馈
    $scope.inspector.feedback = {
      open: [
        {
          id: 1,
          from: {
            id: 1,
            name: "Alex Yan",
            avatar: "images/avatars/1.png",
            role: "设计师",
            authoration: "Authentec"
          },
          to: {
            id: 2,
            name: "Evan Fun",
            avatar: "images/avatars/2.png",
            role: "设计师",
            authoration: "Authentec"
          },
          file: {
            name: "about.psd",
            msg: "低栏设计",
            snapshotUrl: "images/main/design1.png",
            operation: "create",
            isSelf: true
          },
          lastUpdateTime: 1434959658407,
          content: "第二栏的图标背景是没有 Alpha 的吗？"
        },
        {
          id: 2,
          from: {
            id: 1,
            name: "Alex Yan",
            avatar: "images/avatars/1.png",
            role: "设计师",
            authoration: "Authentec"
          },
          to: {
            id: 2,
            name: "Evan Fun",
            avatar: "images/avatars/2.png",
            role: "设计师",
            authoration: "Authentec"
          },
          file: {
            name: "about.psd",
            msg: "低栏设计",
            snapshotUrl: "images/main/design1.png",
            operation: "modify",
            isSelf: false
          },
          lastUpdateTime: 1434959658407,
          content: "主页 Menu bar 是要随着滚动就上去了还是要固定在顶部呢？"
        },
      ],
      closed: [
        {
          id: 3,
          to: {
            id: 1,
            name: "Alex Yan",
            avatar: "images/avatars/1.png",
            role: "设计师",
            authoration: "Authentec"
          },
          from: {
            id: 2,
            name: "Evan Fun",
            avatar: "images/avatars/2.png",
            role: "设计师",
            authoration: "Authentec"
          },
          file: {
            name: "about.psd",
            msg: "低栏设计",
            snapshotUrl: "images/main/design1.png",
            operation: "modify",
            isSelf: true
          },
          lastUpdateTime: 1434959658407,
          content: "底栏的 icon 貌似不对。"
        },
      ]
    }
    // 根据selectedFile变化，更新其信息
    $scope.inspector.info = {
        type: "file", // or 'project'
        name: "about.psd",
        size: "45.3M",
        format: "PSD",
        location: "Mcintosh HD/User/evanfun/Projects",
        createdBy: {
          name: "Evan Fun",
          time: 1434959658407,
          avatar: "images/avatars/2.png",
        },
        updatedBy: {
          name: "Alex Yan",
          time: 1434959658407,
          avatar: "images/avatars/1.png",
        }
    }
    // $scope.inspector.info = {
    //     type: "project", // or 'project'
    //     name: "Trims",
    //     location: "Mcintosh HD/User/evanfun/Projects",
    //     createdBy: {
    //       name: "Alex Yan",
    //       time: 1434959658407,
    //       avatar: "images/avatars/1.png",
    //     },
    //     fileNumber: 12,
    //     leftSpace: 3.8,
    //     usedSpace: 3.1,
    //     projectSize: 0.7,
    //     participants: [
    //       {
    //         id: 1,
    //         name: "Alex Yan",
    //         avatar: "images/avatars/1.png"
    //       },
    //       {
    //         id: 2,
    //         name: "Evan Fun",
    //         avatar: "images/avatars/2.png"
    //       },
    //     ]
    // }

    // =======================================================
    // viewer data model
    $scope.viewer = {
      projectPath : '', // 项目路径
      currentReletivePath : '/',  // 当前展示项目内相对路径
      mode : 'grid',  // 当前viewer的显示模式，grid/list
      selected : {},  // 当前选择的文件/文件夹
      updates : {},   // 当前目录更新的文件/文件夹
      files : {},     // 当前目录的所有文件/文件夹
    };
    $scope.viewer.updates = [
      {
        mode: "onUpdate",                       // 用于区分更新列表和文件列表,在选择时
        name: "about.psd",
        author: "Alex Yan",
        snapshotUrl: "images/main/design1.png",
        operation: "create",
        isSelf: true,
        lock: true,
        size: "10.2M",
        updatedBy: {
          name: "Alex Yan",
          time: 1434959658407,
          avatar: "images/avatars/1.png",
        }
      },
      {
        mode: "onUpdate",
        name: "tour.psd",
        author: "Alex Yan",
        snapshotUrl: "images/main/design2.png",
        operation: "modify",
        isSelf: true,
        size: "10.2M",
        updatedBy: {
          name: "Alex Yan",
          time: 1434959658407,
          avatar: "images/avatars/1.png",
        }
      },
      {
        mode: "onUpdate",
        name: "iconset.sketch",
        author: "Evan Fun",
        snapshotUrl: "images/main/design3.png",
        operation: "modify",
        isSelf: false,
        size: "10.2M",
        updatedBy: {
          name: "Alex Yan",
          time: 1434959658407,
          avatar: "images/avatars/1.png",
        }
      }
    ];
    $scope.viewer.files = [
      {
        name: "about.psd",
        author: "Alex Yan",
        snapshotUrl: "images/main/design1.png",
        operation: "create",
        isSelf: true,
        size: "10.2M",
        updatedBy: {
          name: "Alex Yan",
          time: 1434959658407,
          avatar: "images/avatars/1.png",
        }
      },
      {
        name: "logo.sketch",
        author: "Evan Fung",
        snapshotUrl: "images/main/design5.png",
        operation: "create",
        isSelf: true,
        size: "10.2M",
        updatedBy: {
          name: "Alex Yan",
          time: 1434959658407,
          avatar: "images/avatars/1.png",
        }
      },
      {
        name: "tour.psd",
        author: "Alex Yan",
        snapshotUrl: "images/main/design2.png",
        operation: "modify",
        isSelf: true,
        size: "10.2M",
        updatedBy: {
          name: "Alex Yan",
          time: 1434959658407,
          avatar: "images/avatars/1.png",
        }
      },
      {
        name: "iconset.sketch",
        author: "Evan Fun",
        snapshotUrl: "images/main/design3.png",
        operation: "modify",
        isSelf: false,
        size: "10.2M",
        updatedBy: {
          name: "Alex Yan",
          time: 1434959658407,
          avatar: "images/avatars/1.png",
        }
      },
      {
        name: "register.psd",
        author: "Alex Yan",
        snapshotUrl: "images/main/design6.png",
        operation: "modify",
        isSelf: true,
        size: "10.2M",
        updatedBy: {
          name: "Alex Yan",
          time: 1434959658407,
          avatar: "images/avatars/1.png",
        }
      },
      {
        name: "six.psd",
        author: "Alex Yan",
        snapshotUrl: "images/main/design7.png",
        operation: "modify",
        isSelf: true,
        size: "10.2M",
        updatedBy: {
          name: "Alex Yan",
          time: 1434959658407,
          avatar: "images/avatars/1.png",
        }
      },
      {
        name: "leg.psd",
        author: "Alex Yan",
        snapshotUrl: "images/main/design8.png",
        operation: "modify",
        isSelf: true,
        size: "10.2M",
        updatedBy: {
          name: "Alex Yan",
          time: 1434959658407,
          avatar: "images/avatars/1.png",
        }
      },
      {
        name: "hint.psd",
        author: "Alex Yan",
        snapshotUrl: "images/main/design9.png",
        operation: "modify",
        isSelf: true,
        size: "10.2M",
        updatedBy: {
          name: "Alex Yan",
          time: 1434959658407,
          avatar: "images/avatars/1.png",
        }
      }
    ];

    $scope.clearSelected = function() {
      $scope.viewer.selected = {};
      console.log($scope.projects);
    };

    $scope.changeProject = function (project) {
      // body...
      console.log(project);
      $scope.projects.current = project;
      
    }
    
  });
