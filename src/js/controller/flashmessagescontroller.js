(function () {
	'use strict';

	/**
	 * @ngdoc controller
	 * @name angular-flash-messages:FlashMessagesController
	 * @description
	 * Controller for flash messages directive
	 */
	function FlashMessagesController ($scope, FlashMessages) {
		$scope.FlashMessages = FlashMessages;
	}

	FlashMessagesController.$inject = [
		'$scope',
		'FlashMessages'
	];

	angular
		.module('angular-flash-messages')
		.controller('FlashMessagesController', FlashMessagesController);
})();