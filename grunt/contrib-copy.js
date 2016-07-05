module.exports = function(grunt) {

  grunt.config('copy', {
      develop: {
          files: [
              {expand: true, cwd: 'app', src: '*.html', dest: 'generated/', filter: 'isFile'},
              {expand: true, cwd: 'app/images', src: '**/*', dest: 'generated/images/', filter: 'isFile'}

          ]
      },
      dist: {
          files: [
              {expand: true, cwd: 'app', src: '*.html', dest: 'dist/', filter: 'isFile'},
              {expand: true, cwd: 'app/images', src: '**/*', dest: 'dist/images/', filter: 'isFile'}
          ]
      }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

};