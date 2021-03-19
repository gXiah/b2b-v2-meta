/*
**
** Session Module
**
** Manages the local session
**
*/

import { GUID } from '@utils/identities/guid';

/* =============================================*/

const state = {
	module_name: 'session',

	session_guid: undefined,
	creation_date: undefined,
	lifespan: undefined // In seconds; (-1) to have no lifespan limit
}

export const mutations = {

	// Generates a new session
	generate (state, lifespan) {
		state.session_guid = GUID.generate();
		state.creation_date = Date.now();
		state.lifespan = lifespan || -1;

		return state.session_guid;
	},

	// Deletes session data
	destroy (state) {
		for (let key in state.keys){
			state[key] = undefined
		}
	}

}

export const actions = {

	generate ({ commit }, payload) {
		return commit(
				'generate',payload.lifespan)
	},

	destroy ({ commit }) {
		commit('destroy');
	},


	/*
	** Check to see if session if still alive or has expired
	**
	*/
	check_expired ({ state }) {
		return new Promise((resolve, reject) => {

			let age = Date.now() - state.creation_date;
			age /= 1000; // To seconds
			
			let over_expiry_date = age - state.lifespan
			let expired = (
					(
						over_expiry_date > 0 
						&& state.lifespan > 0
					)
					|| state.session_guid === undefined
				)

			if (
				typeof(age) == 'number' 
				&& typeof(over_expiry_date) == 'number'
			){

				if (expired){
					resolve()
				}else{
					reject()
				}
				

			}else{
				resolve()
			}

		})
			
	}

}

const getters = {

	session_guid (state) {
		return state.session_guid;
	},

	creation_date (state) {
		return state.creation_date;
	},

	lifespan (state) {
		return state.lifespan;
	},

	age (state, getters) {
		return getters.lifespan - getters.creation_date;
	}

}



/* ============================================= */


export default{
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}