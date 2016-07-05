module.exports = function(grunt) {
	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json')
	});

	grunt.loadTasks('grunt');

	grunt.registerTask('default', ['copy:develop', 'compass:develop','uglify:develop']);
    grunt.registerTask('dist', ['copy:dist', 'compass:dist', 'uglify:dist']);

};