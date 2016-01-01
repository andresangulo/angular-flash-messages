(function (module) {
	'use strict';

	module.exports = function (grunt) {
		grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.config('uglify', {
			bundle: {
				files: [{
					src: ['dist/craod-flash-messages.js'],
					dest: 'dist/craod-flash-messages.min.js'
				}]
			}
		});
	};

})(module);