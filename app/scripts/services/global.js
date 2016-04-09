'use strict'

angular.module('sixminsClientApp')
    .service('GlobalService', function GlobalService($http, $q) {

        /**
         * 从配置文件加载程序配置信息到 global.app.config
         * @return {[type]} [description]
         */
        this.loadConfig = function () {
            console.log('检查配置文件...');
            var flag = fs.existsSync('config.json');
            // todo 强制设置进入注册页面
            flag = false;
            if (flag) {
                console.log('存在配置文件，加载');
                app.config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
                // todo 联网同步项目列表
                $scope.save();
            } else {
                app.config = null;
            }
        };

        /**
         * 保存配置程序配置信息(global.app.config)到配置文件
         * @return {[type]} [description]
         */
        this.saveConfig = function () {
            fs.writeFile("config.json", JSON.stringify(app.config), function (err) {
                if (err) throw err;
                console.log("Config File Saved !"); //文件被保存
            });
        };

});
