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
                    'build/assets/css/basic.css': 'assets/css/basic.css',
                    'build/assets/css/noscript.css': 'assets/css/noscript.css',
                    'build/assets/css/reset.css': 'assets/css/reset.css',
                    'build/assets/css/security.css': 'assets/css/security.css',
                    
                    'build/assets/css/components/actions.css': 'assets/css/components/actions.css',
                    'build/assets/css/components/button.css': 'assets/css/components/button.css',
                    'build/assets/css/components/contact.css': 'assets/css/components/contact.css',
                    'build/assets/css/components/features.css': 'assets/css/components/features.css',
                    'build/assets/css/components/footer.css': 'assets/css/components/footer.css',
                    'build/assets/css/components/form.css': 'assets/css/components/form.css',
                    'build/assets/css/components/header.css': 'assets/css/components/header.css',
                    'build/assets/css/components/icon.css': 'assets/css/components/icon.css',
                    'build/assets/css/components/image.css': 'assets/css/components/image.css',
                    'build/assets/css/components/intro.css': 'assets/css/components/intro.css',
                    'build/assets/css/components/logo.css': 'assets/css/components/logo.css',
                    'build/assets/css/components/menu.css': 'assets/css/components/menu.css',
                    'build/assets/css/components/section.css': 'assets/css/components/section.css',
                    'build/assets/css/components/sidebar.css': 'assets/css/components/sidebar.css',
                    'build/assets/css/components/split.css': 'assets/css/components/split.css',
                    'build/assets/css/components/spotlights.css': 'assets/css/components/spotlights.css',
                    'build/assets/css/components/wrapper.css': 'assets/css/components/wrapper.css',
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