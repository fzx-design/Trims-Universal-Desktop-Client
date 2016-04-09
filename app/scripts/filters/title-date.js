'use strict';


angular.module('sixminsClientApp')
    .filter('titleDateFilter', function () {
        return function(input) {
            var ret = "";
            if (input == null) {
                return ret;
            }
            
            var nowTime = new Date();
            var theTime = new Date(input);
            
            var hour = theTime.getHours();
            var minit = theTime.getMinutes();
            
            ret = hour+":"+minit;
            
            if (nowTime.getTime() - theTime.getTime() > 1000*3600*24*30) {
                ret = "很久以前 " + ret;
            } else {
                // 几天前判断 
                
                nowTime.setHours(0);
                nowTime.setMinutes(0);
                nowTime.setSeconds(0);
                theTime.setHours(0);
                theTime.setMinutes(0);
                theTime.setSeconds(0);
                
//                console.log(nowTime);
//                console.log(theTime);
                
                var offset = nowTime.getTime() - theTime.getTime();
                var number = Math.round(offset / (24*3600*1000));
                
                if (number == 0) {
                    ret = "今天 "+ret;
                } else if (number == 1) {
                    ret = "昨天 " + ret;
                } else if (number == 2) {
                    ret = "前天 " + ret;
                } else {
                    ret = (number+1) + "天前 "+ret;
                }
                
//                console.log(ret);
                
            }
            
            return ret;
        }
    });