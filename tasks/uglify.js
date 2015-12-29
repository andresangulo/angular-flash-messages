(function (module) {
	'use strict';

	module.exports = function (grunt) {
		grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.config('uglify', {
			bundle: {
				files: [{
					src: ['dist/angular-flash-messages.js'],
					dest: 'dist/angular-flash-messages.min.js'
				}]
			}
		});
	};

})(module);