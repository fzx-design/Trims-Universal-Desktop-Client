'use strict';


angular.module('sixminsClientApp')
    .filter('amPmDateFilter', function () {
        return function(input) {
            var ret = "";
            if (input == null) {
                return ret;
            }
            
            var theTime = new Date(input);
            
            ret = theTime.getFullYear()+"-"+(theTime.getMonth()+1)+"-"+theTime.getDate();

            var middle = "上午";
            var hour = theTime.getHours();
            var minit = theTime.getMinutes();
            if (hour > 12) {
                hour = hour - 12;
                middle = "下午";
            }
            
            ret += " " + middle + " " + hour + ":" + minit;
            
            
            return ret;
        }
    });