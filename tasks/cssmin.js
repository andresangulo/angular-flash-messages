(function (module) {
	'use strict';

	module.exports = function (grunt) {
		grunt.loadNpmTasks('grunt-contrib-cssmin');
		grunt.config('cssmin', {
			dist: {
				files: [{
					src: ['dist/angulo-flash-messages.css'],
					dest: 'dist/angulo-flash-messages.min.css'
				}]
			}
		});
	};

})(module);