module.exports = function(grunt) {

  grunt.config('watch', {
      scss: {
          files: ['app/styles/sass/**/*.scss'],
          tasks: ['compass:develop'],
      },
      js: {
          files: ['app/**/*.js'],
          tasks: ['uglify:develop']
      },
      html: {
          files: ['app/**/*.html'],
          tasks: ['copy:develop']

      }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

};