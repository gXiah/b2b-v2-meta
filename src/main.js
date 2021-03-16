import { createApp } from 'vue';
import BoxCleed from './apps/Cleed/box-cleed-v1/BoxCleed.vue';

// Configuration
import Configuration from '@config';

// Vuex (State Management)
import State from './data/state';

// Box-specific style
import '@/assets/custom_styles/box-cleed-v1.scss';

// ES6 Promise for IE (Vuex)
import 'es6-promise/auto';

// Logger
import VueLogger from 'vuejs-logger';


/*
** =================================
*/

// Configuration Setup
let config = new Configuration.Configuration()
config.setGlobal(process.env.VUE_APP_GLOBAL_CONFIG_FILE)
config.setCustom(process.env.VUE_APP_CUSTOM_CONFIG_FILE)

config
	.init()
	.then(() => {


		// 
		var app = createApp(BoxCleed)



		/* 
		** ===============================
		** Using Global State (Vuex Store)
		** ===============================
		*/
		

		let store = State.store;
		app.use(store)

		/* Config Initialization */
			store.dispatch(
				'main/set_session_lifespan', 
				config.get('session/lifespan'))
		
		/* Checks */

			// Check to see if session has expired
			store.dispatch('session/check_expired')
				.then(() => { // Session has expired
					store.dispatch('session/destroy')
					store.dispatch(
									'session/generate', 
									{lifespan: store.getters['main/session_lifespan']}
								)	
				})
				.catch(() => {}) // Session hasn't expired yet





		// Using Vue-logger
		app.use(VueLogger, config.get('logging/*'))
		
		/*
		** Mount
		*/
		app.mount('#app');

	})
	.catch((err) => {
		console.log('[Cleed]', err)
	})