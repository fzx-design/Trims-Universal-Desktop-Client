'use strict'

angular.module('sixminsClientApp')
    .service('WelcomService', function WelcomService($http, $q) {

        this.register = function () {
            var deferred = $q.defer();
            $http.get('api_simulation/login_no_projects.json')
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        };

//        this.login = function () {
//            var deferred = $q.defer();
//            $http.get('api_simulation/login.json')
//                .success(function (data, status, headers, config) {
//                    deferred.resolve(data);
//                })
//                .error(function (data, status, headers, config) {
//                    deferred.reject(data);
//                });
//            return deferred.promise;
//        };
        this.login = function () {
            var deferred = $q.defer();
            $http.get('api_simulation/login.json')
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        };

    });
