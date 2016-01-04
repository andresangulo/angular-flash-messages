(function (module) {
	'use strict';

	module.exports = function (grunt) {
		grunt.loadNpmTasks('grunt-contrib-cssmin');
		grunt.config('cssmin', {
			dist: {
				files: [{
					src: ['dist/flash-messages.css'],
					dest: 'dist/flash-messages.min.css'
				}]
			}
		});
	};

})(module);