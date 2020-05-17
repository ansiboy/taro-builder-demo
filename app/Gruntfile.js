
module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        copy: {
            components: {
                files: [
                    { expand: true, cwd: "src", src: "**/*.scss", dest: "out" }
                ]
            }
        }
    });

    grunt.registerTask('default', ['copy']);

}