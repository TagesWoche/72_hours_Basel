module.exports = function(grunt) {

  grunt.config('compass', {
      develop: {
          options: {
              sassDir: 'app/styles/sass',
              cssDir: 'generated/styles'
          }
      },
      dist: {
          options: {
              sassDir: 'app/styles/sass',
              cssDir: 'dist/styles',
              outputStyle: 'compressed'
          }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');

};