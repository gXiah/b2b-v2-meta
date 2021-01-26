/*
**
** Main module
**
** Will act as a config file
**
*/


const state = {
	module_name : 'main',

	/*
	** Session Config 
	*/
	session_lifespan: undefined // (-1) for no expiry date; date in seconds otherwise
}

const actions = {

	/*
	** example ({localState, commit, rootState}) {
	**		...
	** }
	*/

	set_session_lifespan({ commit }, payload){
		commit('set_session_lifespan', payload)
	}

}

export const mutations = {

	/*
	** example (localState) {
	**		...
	** }
	*/

	set_session_lifespan(state, value){
		state.session_lifespan = value;
		return state.session_lifespan;
	}

}

const getters = {

	/*
	** example (localState, ?localGetters[Namespaces], rootState, rootGetters) {
	**		...
	** }
	*/

	session_lifespan (state) {
		return state.session_lifespan;
	}

}


export default{
	namespaced: true,
	state,
	actions,
	mutations,
	getters
}