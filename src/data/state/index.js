/*
**
**
** Global State (Vuex 4 Store)
**
**
*/

import { createStore } 	from 'vuex'

// Importing store modules
import main_module 		from './modules/main';
import pipeline_module 	from './modules/pipeline';
import logs_module 		from './modules/logs';
import session_module 	from './modules/session';

// plugins
import { createLogger } 	from 'vuex';
import createPersistedState from 'vuex-persistedstate';

/*
** =================================
** Plugins
** =================================
*/
	const logger = createLogger({
		collapsed: false,
		logActions: false,
		logMutations: false,
		logger: console
	});

	const sessionPersistedState = createPersistedState({
		key : 'session_local_storage',
		paths: ['session']
	})

const dev_plugins 		= [logger] 			// Plugins in DEV env
const prod_plugins 		= []				// Plugins in PROD env
const common_plugins 	= [sessionPersistedState]  // Plugins in boths



const isProductionMode = process.env.NODE_ENV !== 'production'



/*
** =================================
** Store Initialization
** =================================
*/
const store = createStore({

	/* Config */

	// Store state change can only be done via mutations
	strict: isProductionMode ? true : false, 

	
	/* Modules */
	/* 
	** /!\ Modules are namespaced /!\
	** example : (store.dispatch('session/...'))
	*/
	modules : {
		main: 		main_module,
		pipeline: 	pipeline_module,
		logs: 		logs_module,
		session: 	session_module
	},


	/* Plugins */
	plugins: isProductionMode
		? [...dev_plugins, ...common_plugins]
		: [...prod_plugins, ...common_plugins]

});


export default{
	store
}