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
	},

	/*
	** This method deletes an element from the mail room
	**	Only the target can delete a message that was meant to it
	**
	*/
	/* @TODO
	delete_message(state, target_id, private_key){

		state.subscriptions.forEach((sub) => {
			console.log(sub)
		})

	}
	*/

}

const getters = {

	mail_room (state) {
		return state.mail_room;
	},

	listen: (state, getters) => 
		(key, consume=false) => {
			let ret = []
			ret = [
				state.mail_room[key], 
				state.controller.get_special_requests(state.ARP_KEY, state.mail_room),
				state.val
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