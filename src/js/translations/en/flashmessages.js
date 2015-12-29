(function () {
	'use strict';

	function ProvideTranslation ($translateProvider) {
		$translateProvider.translations('en', {
			'FlashMessages.date.format': "MMMM d, yyyy 'at' HH:mm:ss"
		});
	}

	ProvideTranslation.$inject = [
		'$translateProvider'
	];

	angular
		.module('angular-flash-messages')
		.config(ProvideTranslation);
})();