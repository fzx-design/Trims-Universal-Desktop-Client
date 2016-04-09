module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.initConfig({
        nodewebkit: {
            options: {
                platforms: ['osx64'],
                buildDir: './build',
                cacheDir: './cache',
                macIcns: './app/icon.icns',
                macZip: false
            },
            src: ['./app/**/*', 
            './config.json', 
            './node_modules/**/*', 
            './package.json', 
            './bower_components/**/*', 
            './bower.json']
        }
    })
};