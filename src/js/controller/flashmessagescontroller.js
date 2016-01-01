(function () {
	'use strict';

	/**
	 * @ngdoc controller
	 * @name craod-flash-messages:FlashMessagesController
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
		.module('craod-flash-messages')
		.controller('FlashMessagesController', FlashMessagesController);
})();