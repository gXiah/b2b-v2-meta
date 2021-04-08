*Description by directories*

*****************
src/configuration
*****************

-------------------------------------

Description
^^^^^^^^^^^

The ``./src/configuration`` directory contains the global configuration for all apps, and can contain custom configuration data, that are specific to a particular set of apps.

it is diveded into 3 main parts
- The ``index.js`` file
- The ``global.conf.js`` file
- And the *customConfigurations/* folder


index.js
^^^^^^^^

This file contains the main *Configuration* class, that is instantiated at the projects entry point (``./src/main.js``). 

Its main role is to load from both ``global.conf.js`` and one of the files inside *customConfiguration/*, the app's configuration (The app that we aim to build, that is).

The initalization is done like so :

.. code-block:: javascript
	
	// ./src/main.js

	import Configuration from '@config';


	let config = new Configuration.Configuration()

	config.setGlobal(/*The global config file path*/)
	config.setCustom(/*The custom config file path*/)

	config
		.init()
		.then(() => {
			/* Main code here */
		})
		.catch(() => {})

Configuration files
^^^^^^^^^^^^^^^^^^^

Be it the global configuration file, or any custom one (there must at least be one empty custom configuration file), they can both be setup in the same way:

.. code-block:: javascript

	// ./src/configuration/global.conf.js

	import ConfObj from './config.obj.js'; // located @ ./src/configuration/

	// Initializing a new configuration object, that will describe our 
	// app's configuration (This one is arbitrarily named "global")
	const Config = new ConfObj.ConfObj("global")



	let configurationElement = {
		'sample': 		'value',
	}

		// Adding the configuration element to the configuration object
		// and naming it "Sample Config Element"
		Config.add('Sample Config Element', configurationElement)


	export default{
		Config
	}

Accessing the configuration inside our app
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

One way by which we can access configuration elements and values is to add the ``config`` object to the *Vue prototype* inside ``./src/main.js``

.. code-block:: javascript

	// ./src/main.js

	import Configuration from '@config';


	let config = new Configuration.Configuration()

	config.setGlobal(/*The global config file path*/)
	config.setCustom(/*The custom config file path*/)

	config
		.init()
		.then(() => {
			
			Vue.prototype.$config = config
			
			//...

			app.mount("#app")

		})
		.catch(() => {})


Another way is to pass the configuration object as a dependency.