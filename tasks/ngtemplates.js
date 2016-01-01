(function (module) {
	'use strict';

	module.exports = function (grunt) {
		grunt.loadNpmTasks('grunt-angular-templates');
		grunt.config('ngtemplates', {
			'craod-flash-messages': {
				cwd: 'src',
				src: 'templates/flashmessages.html',
				dest: 'src/templates/flashmessages.js'
			}
		});
	};

})(module);