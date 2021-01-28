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
	** CONSTANTS
	*/
	SUBSCRIPTION_ERROR: -1,
	SEND_ERROR: -1,
	ARP_KEY: new PipelineController.PipelineController().get_requests_aliases().ARP,


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


	,val: 0 // DEV
}

const actions = {

	/*val ({ commit }) {
		commit('val');
	},*/

	send ({ commit }, payload){

		// Parse payload ( & Check if payload is valid)
		let order = state.controller.parse(payload, state.controller.ORDER)

		if (order != state.controller.PARSE_ERROR){
			// Add order or state's orders_stacks
			
			let target_id = state.controller.parse_id(order.target_id)
			let body = {
							sender_id: order.sender_id,
							request_body: order.request_body
						}
			commit('send', {target_id, body})
			commit('val')
		}else{
			return state.SEND_ERROR;
		}


	},

	subscribe({ commit }, payload){

		// Parse and check payload
		let subscription = state.controller.parse(payload, state.controller.SUBSCRIPTION)

		if (subscription != state.controller.PARSE_ERROR){
			// Add subscription to state

			state.subscriptions[subscription.private_key] = {
											public_id: subscription.public_id,
											signature: subscription.signatures
															}
		}else{
			return state.SUBSCRIPTION_ERROR
		}

	}

}

export const mutations = {

	val(state){
		state.val++
	},

	send(state, payload){
		state.mail_room[payload.target_id] = payload.body
	}

}

const getters = {

	mail_room (state) {
		return state.mail_room;
	},

	listen: (state, getters) => 
		(key) => {
			let ret = []
			ret = [
				state.mail_room[key], 
				state.val, 
				state.controller.get_special_requests(state.ARP_KEY, state.mail_room)
			]
			
			return ret
		}

	
	/*val: (state) => (k) => {
		return k;
	}*/
	
	

}


export default{
	namespaced: true,
	state,
	actions,
	mutations,
	getters
}