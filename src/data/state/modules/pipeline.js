/*
**
** Pipepline (store module)
** 
** Used to transmit 'Orders' among the apps elements
**
*/

import { PipelineController } from '../controllers/pipeline';
import { Subscription } from '../assets/pipeline/subscription.obj';
import { SubscriptionLedger } from '../assets/pipeline/subscriptionLedger.obj';
import { MailRoom } from '../assets/pipeline/mailRoom.obj';
import { Message } from '../assets/pipeline/message.obj';


let pipelineController = new PipelineController()


const state = {
	module_name : 'pipeline',
	controller: pipelineController,


	/*
	** CONSTANTS
	*/
	SUBSCRIPTION_ERROR: -1,
	SEND_ERROR: -1,
	ARP_KEY: pipelineController.get_requests_aliases().ARP,
	SIG_KEY: pipelineController.get_requests_aliases().SIG,


	/*
	** This is the list of Orders that have not yet been dealt with
	*/ 
	// orders_stack: [],
	

	/*
	** This is where the orders are stacked before they are consumed
	** by the components (using an action)
	*/
	mail_room: [],
	internal_mailroom: new MailRoom("internal mailroom"),
	onpremise_mailroom: new MailRoom("on premise mailroom"),
	external_mailroom: new MailRoom("external mailroom"),

	/*
	** List of subscriptions
	*/
	subscriptions: [], // DEPRECATED
	subscriptionLedger: new SubscriptionLedger("pipeline subscriptions ledger"),


	refresh: 0 // This is updated with each mutation for store reactivity
}


const actions = {


	send ({ commit }, payload){

		let message = new Message(payload)

		// DEPRECATED
		// vvvvvvvvvv


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

		// ^^^^^^^^^^^^^^
		// EOf DEPRECATED


	},

	/* ===================
	** @TODO
	** needs to return a 
	** subscriber profile
	** (or false)
	** ===================
	*/
	subscribe({ commit }, payload){

		let tmp_sub = new Subscription(payload)

		if (tmp_sub.isValidSubscription()){

			state.subscriptionLedger.addSubscription(tmp_sub)

		}else{
			return state.SUBSCRIPTION_ERROR
		}

		//   DEPRECATED =========================================
		
		// This is the old version of the ledger, will be deleted when the time
		// comes


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

		// # DEPRECATED =========================================

	}

}


/*
** 	/!\ IMPORTANT /!\
**
**  To be able to have store reactivity, each mutation need to update 
	state.refresh (an increment is standard, but is not the only way)
**
*/
export const mutations = {

	send(state, payload){
		state.mail_room[payload.target_id] = payload.body
		state.refresh++
	},

}

const getters = {

	mail_room (state) {
		return state.mail_room;
	},

	listen: (state, getters) => 
		(key, consume=false) => {
			let ret = []

			// The component's profile
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