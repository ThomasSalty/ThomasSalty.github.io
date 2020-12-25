module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'build/index.html': 'index.html',
                    'build/about.html': 'about.html'
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    'build/assets/css/critical.css': 'assets/css/critical.css',
                    'build/assets/css/main.css': 'assets/css/main.css',
                    'build/assets/css/noscript.css': 'assets/css/noscript.css'
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            target: {
                files: {
                    'build/assets/js/main.js': 'assets/js/main.js',
                    'build/assets/js/info.js': 'assets/js/info.js',
                    'build/assets/js/form-submission-handler.js': 'assets/js/form-submission-handler.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('html', 'htmlmin');
    grunt.registerTask('css', 'cssmin');
    grunt.registerTask('js', 'uglify');

    grunt.registerTask('default', ['html', 'css', 'js']);
}