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
	SIG_KEY: new PipelineController.PipelineController().get_requests_aliases().SIG,


	/*
	** This is the list of Orders that have not yet been dealt with
	*/ 
	// orders_stack: [],
	

	/*
	** This is where the orders are stacked before they are consumed
	** by the components (using an action)
	*/
	mail_room: [],

	/*
	** List of subscriptions (by public keys)
	*/
	subscriptions: [],


	refresh: 0 // This is updated with each mutation for store reactivity
}

const actions = {


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

	send(state, payload){
		state.mail_room[payload.target_id] = payload.body
		state.refresh++
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

			// The components profile
			let subscription = {...state.subscriptions[key]}
			let signatures_object = {...subscription.signature}

			let listener_profile = {
				private_key: key,
				public_id: subscription.public_id,
				signatures: Object.keys(signatures_object).map((key) => signatures_object[key])
			}

			ret = [
				state.controller.get_direct_requests(listener_profile.public_id, state.mail_room), 
				state.controller.get_special_requests(state.ARP_KEY, state.mail_room),
				state.controller.get_special_requests(state.SIG_KEY, state.mail_room, listener_profile.signatures),
				state.refresh
			]

			return ret
		}

}


export default{
	namespaced: true,
	state,
	actions,
	mutations,
	getters
}