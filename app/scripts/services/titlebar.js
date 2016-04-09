'use strict'

angular.module('sixminsClientApp')
    .service('TitleBarService', function TitleBarService($http, $q) {
    
    this.projectList = function(){
        var deferred = $q.defer();
        $http.get('api_simulation/project_list.json')
            .success(function(data, status, headers, config){
                deferred.resolve(data);
            })
            .error(function(data, status, headers, config){
                deferred.reject(data);
            });
        return deferred.promise;
    };
    this.updateInfo = function(){
        var deferred = $q.defer();
        $http.get('api_simulation/update_info.json')
            .success(function(data, status, headers, config){
                deferred.resolve(data);
            })
            .error(function(data, status, headers, config){
                deferred.reject(data);
            });
        return deferred.promise;
    };
    
    
});