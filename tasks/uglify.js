(function (module) {
	'use strict';

	module.exports = function (grunt) {
		grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.config('uglify', {
			bundle: {
				files: [{
					src: ['dist/flash-messages.js'],
					dest: 'dist/flash-messages.min.js'
				}]
			}
		});
	};

})(module);