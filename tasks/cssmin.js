(function (module) {
	'use strict';

	module.exports = function (grunt) {
		grunt.loadNpmTasks('grunt-contrib-cssmin');
		grunt.config('cssmin', {
			dist: {
				files: [{
					src: ['dist/angular-flash-messages.css'],
					dest: 'dist/angular-flash-messages.min.css'
				}]
			}
		});
	};

})(module);