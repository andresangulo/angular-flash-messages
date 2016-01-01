(function (module) {
	'use strict';

	module.exports = function (grunt) {
		grunt.loadNpmTasks('grunt-contrib-cssmin');
		grunt.config('cssmin', {
			dist: {
				files: [{
					src: ['dist/craod-flash-messages.css'],
					dest: 'dist/craod-flash-messages.min.css'
				}]
			}
		});
	};

})(module);