/*
**
** Pipepline (store module)
** 
** Used to transmit 'Orders' among the apps elements
**
*/

import PipelineController from '../controllers/pipeline';

const state = {
	module_name : 'pipeline',
	controller: new PipelineController.PipelineController(),

	/*
	** This is the list of Orders that have not yet been dealt with
	*/ 
	orders_stack: [],
	

	/*
	** This is where the orders are stacked before they are consumed
	** by the components (using an action)
	*/
	mail_room: [],

	/*
	** List of elements' subscriptions
	*/
	subscriptions: []


	//val: 0 // DEV
}

const actions = {

	/*val ({ commit }) {
		commit('val');
	}*/

	send ({ commit }, payload){

		// Parse payload ( & Check if payload is valid)

		// Get back parsed order

		// Add order or state's orders_stacks

	},

	subscribe({ commit }, payload){

		// Parse and check payload
		console.log(state.controller.parse(payload, state.controller.SUBSCRIPTION));

		// Add subscription to state

	}

}

export const mutations = {

	/*val(state){
		state.val++
	}*/

}

const getters = {

	/*val(){
		return (v) => { return v + 1; };
	}*/

}


export default{
	namespaced: true,
	state,
	actions,
	mutations,
	getters
}