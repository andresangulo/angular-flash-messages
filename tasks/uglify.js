(function (module) {
	'use strict';

	module.exports = function (grunt) {
		grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.config('uglify', {
			bundle: {
				files: [{
					src: ['dist/angulo-flash-messages.js'],
					dest: 'dist/angulo-flash-messages.min.js'
				}]
			}
		});
	};

})(module);