# craod-flash-messages
Flash message utility and directives for AngularJS

**[Requirements](#requirements)** **[Installation](#installation)** **[Usage](#usage)**

<a name="requirements"></a>
## Requirements
craod-flash-messages only requires AngularJS to work. However, in order to use the default template design, your website must use 
[font-awesome](https://fortawesome.github.io/Font-Awesome/icons/) as well as [bootstrap CSS](http://getbootstrap.com/css/).

<a name="installation"></a>
## Installation
Simply include the files provided in the dist folder: craod-flash-messages.js and craod-flash-messages.css, or craod-flash-messages.min.js 
and craod-flash-messages.min.css for the uglified/minified versions. Add the ***craod-flash-messages*** module to your application for flash messages
to be available.

<a name="usage"></a>
## Usage
### Directive
The messages are rendered using the directive flash-messages:

```
<flash-messages></flash-messages>
```

The directive has a type parameter, to show only a specific type if needed:

```
<flash-messages type="FlashMessages.ERROR"></flash-messages>
```

### Service
They are controlled using the service called FlashMessages. Add a flash message using the add method:

```
FlashMessages.add('You clicked that button but nothing happened!', FlashMessages.WARNING);
```

If useTranslate is set to true, then you may add text parameters inside the options:

```
FlashMessages.add('your.translation.key', FlashMessages.SUCCESS, {parameters: {name: 'A name used in the translation key'}));
```

Provide a lifetime for flash messages to auto-dismiss:

```
FlashMessages.add('Remember to water your plants', FlashMessages.INFORMATION, {lifetime: 5000});
```

The following message types are understood:

```
FlashMessages.ERROR
FlashMessages.WARNING
FlashMessages.INFORMATION
FlashMessages.SUCCESS
```

The following options are understood:

Option | Default value | Meaning
--- | --- | ---
lifetime | 4000 for INFORMATION and SUCCESS, undefined for ERROR and WARNING | The lifetime for the message to auto-dismiss. If falsy, prevents auto-dismiss
dismissDuration | 1000 | The duration of the dismiss animation. For optimal results, make sure you change the length of the dismiss animation on the css if you change it here
allowDismiss | true | Whether the flash message can be dismissed by clicking on it
allowDismissCancel | false for INFORMATION and SUCCESS, true for ERROR and WARNING | Whether the dismiss action can be prevented by clicking on the flash message
translate | FlashMessagesProvider.useTranslate | Whether to run the text through the translate filter

Retrieve messages using the getMessages method:

```
FlashMessages.getMessages()
```

### Provider
Default options and overall configuration can be controlled using the **FlashMessageProvider**. The following options are available

Option | Default value | Meaning
--- | --- | ---
useLocalStorage | true | Whether to save messages in local storage to prevent them from being deleted when the window is closed
useTranslate | false | Whether to render messages using the translate filter, or to render their text directly as html

#### Defaults
Specify message option defaults using **FlashMessageProvider.defaults**. You may specify defaults either by type, or using the keyword *common*:

```
FlashMessageProvider.defaults.error = {
	messageOptions: {
		allowDismissCancel: false
	}
};

FlashMessageProvider.defaults.common = {
	messageOptions: {
		lifetime: 2000
	}
};
```