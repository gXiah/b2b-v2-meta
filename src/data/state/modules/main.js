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
	session_lifespan: -1 // (-1) for no expiry date; date in seconds otherwise
}

const actions = {

	/*
	** example ({localState, commit, rootState}) {
	**		...
	** }
	*/

}

export const mutations = {

	/*
	** example (localState) {
	**		...
	** }
	*/

}

const getters = {

	/*
	** example (localState, ?localGetters[Namespaces], rootState, rootGetters) {
	**		...
	** }
	*/

	lifespan (state) {
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