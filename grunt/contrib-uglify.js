module.exports = function(grunt) {

  grunt.config('uglify', {
      develop: {
          options: {
              compress: false,
              mangle: false,
              beautify: true
          },
          files: {
              'generated/scripts/script.js': ['app/scripts/*.js'],
              'generated/scripts/vendor.js': ['bower_components/angular/angular.min.js', 'bower_components/angular-i18n/angular-locale_de-ch.js', 'bower_components/leaflet/dist/leaflet.js']

          }
      },
      dist: {
          options: {
              compress: true,
              compress: {
                  warnings: false
              },
              mangle: true
          },
          files: {
              'dist/scripts/script.js': ['app/scripts/*.js'],
              'dist/scripts/vendor.js': ['bower_components/angular/angular.min.js', 'bower_components/angular-i18n/angular-locale_de-ch.js', 'bower_components/leaflet/dist/leaflet.js']
          }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

};