What is section
===============

This section aims te define the components of Porthole, as well as to explain
how to use / modify them.

***********
State Store
***********



********************
Configuration System
********************

What it is
##########

The configuration system is a set of **tools** and of **rules** that aim to
provide an interface between the apps components, and their configuration.

The goal is to have an independant configuration interface, to modify the
apps behaviors without having to directly modify their code files.

How it works
############

The configuration system is located in ```./src/configuration``` and is made of
**3 main components** :

* The controllers : which are ```index.js``` and ```config.obj.js```
* The Global Config file : A global configuration file that acts as a default configuration
* The Custom Config Directory : A folder that contains custom configuration files that can override the global configuration.

The **controller** ```index.js``` has the following structure


.. code-block:: javascript
	:linenos:
	
	class Configuration

		/*
		** Variables 
		*/

		// Config files have this extension
		config_file_type = 'js';

		// Configuration directories (Global and custom)
		//     Custom is always inside global
		config_root = undefined;
		custom_config_dir = "customConfigurations";

		// Configuration files paths
		globalConfigPath = undefined;
		customConfigPath = undefined;

		// This is where the configuration is stored, after is has been
		// retrieved, for it to be consumed by other components
		globalConfig = {}
		customConfig = {}


		/*
		** Methods
		*/

		constructor(void)

		// Sets the global config path, and calls importConfig()
		setGlobal(path: text)

		// Sets the custom config path, and calls importConfig()
		setCustom(path: text)

		// Reads the config data from the corresponding config file
		(private) importConfig(path: text)

This is the main file, the methods setGlobal(1)  [and optionally setCustom(1)] 
need to be called. 


The **controller** ```config.obj.js``` has the following structure

.. code-block:: javascript
	:linenos:

	class ConfObj

		/*
		** Variables
		*/

		// Configuration name
		name

		// Configuration data
		data

		/*
		** Methods
		*/

		// Initializes the configuration object, and names it 'conf_name'
		constructor(conf_name)

		// Add a new entry to the config object
		// An entry is a JS object {key_name : key_data}
		add(key_name, key_data)


The **global configuration file** acts as both a default configuration and
a template for other configuration files

Here is its structure :

.. code-block:: javascript
	:linenos:

	// A JS object
	let entry = {}

	globalConfig.add('Entry Name', entry)

	/*
	** IMPORTANT : Global config exports as 'globalConfig'
	** 	and a custom config ALWAYS exports as 'customConfig'
	*/
	export default{
		globalConfig
	}

How to use it
#############

Initialisation
**************

In your application entry point (Example : ```main.js``` for a *Vue* application of ```main.ts``` for an *Angular* one) : 

.. code-block:: javascript

	// Call the Configuration system


	// @config is the path to the configuration system
	// For further details about this path, check out ```./vue.config.js``` @ *configureWebpack ... alias*
	import Configuration from '@config';`` 
	

	// Setup the configuration system
	// process.env() here is the configuration file name  
	let config = new Configuration.Configuration()
	config.setGlobal(process.env.VUE_APP_GLOBAL_CONFIG_FILE)
	config.setCustom(process.env.VUE_APP_CUSTOM_CONFIG_FILE)





How to add a configuration file
*******************************

How to Read / Write from a configuration file
*********************************************