(function () {
	'use strict';

	/**
	 * @ngdoc provider
	 * @name FlashMessagesProvider
	 * @description
	 * Provider for configuration of the FlashMessages service
	 */
	function FlashMessagesProvider () {
		var provider = this;

		/**
		 * @ngdoc property
		 * @name FlashMessagesProvider#useLocalStorage
		 * @propertyOf FlashMessagesProvider
		 * @description
		 * Whether to use localStorage to persist flash messages
		 *
		 * @type {boolean}
		 */
		provider.useLocalStorage = true;

		/**
		 * @ngdoc property
		 * @name FlashMessagesProvider#useTranslate
		 * @propertyOf FlashMessagesProvider
		 * @description
		 * Whether to use the translation filter to translate flash messages
		 *
		 * @type {boolean}
		 */
		provider.useTranslate = true;

		/**
		 * @ngdoc property
		 * @name FlashMessagesProvider#defaults
		 * @propertyOf FlashMessagesProvider
		 * @description
		 * Per-type defaults, for now only messageOptions are used. Type defaults override common defaults, and the conjunction is overriden by properties passed manually
		 *
		 * @type {Object}
		 */
		provider.defaults = {
			error: {
				messageOptions: {
					lifetime: undefined,
					allowDismissCancel: true
				}
			},
			warning: {
				messageOptions: {
					lifetime: undefined,
					allowDismissCancel: true
				}
			},
			information: {
				messageOptions: {}
			},
			success: {
				messageOptions: {}
			},
			common: {
				messageOptions: {
					lifetime: 4000,
					dismissDuration: 1000,
					allowDismiss: true,
					allowDismissCancel: false
				}
			}
		};

		/**
		 * @ngdoc service
		 * @name angular-flash-messages:FlashMessages
		 * @description
		 * Service that provides functions for automating a scope's interaction with the pagination widget and server
		 */
		function FlashMessages ($localStorage, $timeout) {
			var service = {};

			/**
			 * @ngdoc property
			 * @name FlashMessages#ERROR
			 * @propertyOf FlashMessages
			 * @description
			 * Marks a flash message as an error message
			 *
			 * @type {string}
			 */
			service.ERROR = 'error';

			/**
			 * @ngdoc property
			 * @name FlashMessages#WARNING
			 * @propertyOf FlashMessages
			 * @description
			 * Marks a flash message as a warning message
			 *
			 * @type {string}
			 */
			service.WARNING = 'warning';

			/**
			 * @ngdoc property
			 * @name FlashMessages#INFORMATION
			 * @propertyOf FlashMessages
			 * @description
			 * Marks a flash message as an information message
			 *
			 * @type {string}
			 */
			service.INFORMATION = 'information';

			/**
			 * @ngdoc property
			 * @name FlashMessages#SUCCESS
			 * @propertyOf FlashMessages
			 * @description
			 * Marks a flash message as a success message
			 *
			 * @type {string}
			 */
			service.SUCCESS = 'success';

			/**
			 * @ngdoc property
			 * @propertyOf FlashMessages
			 * @name FlashMessages#dismissPromises
			 * @description
			 * When messages are dismissed, their promises are added to this cache in order to be able to be cancelled
			 *
			 * @type {Object}
			 */
			service.dismissPromises = {};

			/**
			 * @ngdoc property
			 * @name FlashMessages#messages
			 * @propertyOf FlashMessages
			 * @description
			 * The flash messages, if local storage is set the messages are also saved in a storage variable
			 *
			 * @type {Array}
			 */
			service.messages = [];

			if (provider.useLocalStorage) {

				/**
				 * @ngdoc property
				 * @name FlashMessages#$storage
				 * @propertyOf FlashMessages
				 * @description
				 * The local storage for the flash messages service, contains a messages array inside to echo the one we have in the service
				 *
				 * @type {Object}
				 */
				service.$storage = $localStorage.$default({
					messages: []
				});

				service.messages = service.$storage.messages;
			}

			/**
			 * @ngdoc property
			 * @name FlashMessages#types
			 * @propertyOf FlashMessages
			 * @description
			 * The available flash message types
			 *
			 * @type {Object}
			 */
			service.types = {
				ERROR: service.ERROR,
				WARNING: service.WARNING,
				INFORMATION: service.INFORMATION,
				SUCCESS: service.SUCCESS
			};

			/**
			 * @ngdoc method
			 * @name FlashMessages#add
			 * @methodOf FlashMessages
			 * @param {string} textKey
			 * @param {string} type
			 * @param {Object} options
			 * @description
			 * Initialize the sorter values in the scope, attach it to a new helper and return it
			 *
			 * @returns {Object}
			 */
			service.add = function (textKey, type, options) {
				var date = new Date(), message;

				options = angular.extend(
					angular.copy(provider.defaults.common.messageOptions),
					angular.copy(provider.defaults[type].messageOptions),
					options || {}
				);

				message = {
					textKey: textKey,
					type: type,
					translate: provider.useTranslate,
					options: options,
					date: date.getTime(),
					id: '' + date.getTime() + Math.round(Math.random() * 999)
				};

				service.messages.push(message);

				if (provider.useLocalStorage) {
					service.synchronizeWithLocalStorage();
				}

				if (options.lifetime) {
					$timeout(function () {
						service.dismiss(message);
					}, options.lifetime);
				}

				return message;
			};

			/**
			 * @ngdoc method
			 * @name FlashMessages#getMessageIndex
			 * @methodOf FlashMessages
			 * @param {string} id
			 * @description
			 * Find a message by its ID
			 *
			 * @returns {int}
			 */
			service.getMessageIndex = function (id) {
				var index;
				for (index in service.messages) {
					if (service.messages[index].id == id) {
						return index;
					}
				}
				return -1;
			};

			/**
			 * @ngdoc method
			 * @name FlashMessages#dismiss
			 * @methodOf FlashMessages
			 * @param {Object} message
			 * @description
			 * Dismiss the message, which is to say set the message as "dismissing" for the given duration and then delete it unless it is interrupted
			 *
			 * @returns {void}
			 */
			service.dismiss = function (message) {
				message.dismissing = true;
				service.dismissPromises[message.id] = $timeout(function () {
					service.delete(message.id);
				}, message.options.dismissDuration);
			};

			/**
			 * @ngdoc method
			 * @name FlashMessages#delete
			 * @methodOf FlashMessages
			 * @param {string} id
			 * @description
			 * Delete the message that matches the ID
			 *
			 * @returns {void}
			 */
			service.delete = function (id) {
				var index = service.getMessageIndex(id);
				if (index >= 0) {
					service.messages.splice(index, 1);
					if (provider.useLocalStorage) {
						service.synchronizeWithLocalStorage();
					}
				}
			};

			/**
			 * @ngdoc method
			 * @name FlashMessages#cancelDismissing
			 * @methodOf FlashMessages
			 * @param {Object} message
			 * @description
			 * Cancel dismissing the message
			 *
			 * @returns {void}
			 */
			service.cancelDismissing = function (message) {
				message.dismissing = false;
				if (service.dismissPromises[message.id]) {
					$timeout.cancel(service.dismissPromises[message.id]);
				}
			};

			/**
			 * @ngdoc method
			 * @name FlashMessages#synchronizeWithLocalStorage
			 * @methodOf FlashMessages
			 * @description
			 * Synchronize the messages with the local storage
			 *
			 * @returns {void}
			 */
			service.synchronizeWithLocalStorage = function () {
				service.$storage.messages = service.messages;
			};

			/**
			 * @ngdoc method
			 * @name FlashMessages#getMessages
			 * @methodOf FlashMessages
			 * @description
			 * Get the messages, use this function to retrieve the messages reactively
			 *
			 * @returns {Array}
			 */
			service.getMessages = function () {
				return service.messages;
			};

			return service;
		}

		FlashMessages.$inject = [
			'$localStorage',
			'$timeout'
		];

		provider.$get = FlashMessages;
	}

	angular
		.module('angular-flash-messages')
		.provider('FlashMessages', FlashMessagesProvider);
})();