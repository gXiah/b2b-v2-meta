/*
** Subscription ledger class
**
** Stores & manages subscription objects
**
** DESCRIPTION
**
		The subscription ledger stores a list of subscription objects
		The ledger asigns each subscription object, a unique local ID

		The ledger will also have other 'tables' (or lists), that store
		the subscriptions in a sorted fashion
		For example:

				subscriptions = {
								localId_1: sub_1,
								localId_2: sub_2,
								localId_3: sub_3
							}

				subscriptions_sortedBy_privateKeys = {
								"privKey_2": localId_2, 
								"privKey_1": localId_1,
								"privKey_3": localId_3,
				}

				subscriptions_sortedBy_attribute = {
								"attribute_3": localId_3,
								"attribute_2": localId_2,
								"attribute_1": localId_1,
				}
*/

import { Types } from '@utils/consistency/types';
import { GUID } from '@utils/identities/guid';

import { Subscription } from './subscription.obj'


export class SubscriptionLedger{

	#ledgerName = "unnamed ledger"

	#subscriptions = {}
	#subscriptions_by_publicId = {}
	#subscriptions_by_privateKey = {}
	#subscriptions_by_signatures = {}


	// This is a sample subscription to be used for comparison and checks
	#sampleSubscription = new Subscription()


	#FLAG = 0;

	#NON_VALID_SUBSCRIPTION = 2

	constructor(ledgerName=undefined){
		this.set_ledgerName(ledgerName)
	}

	/*
	** =======
	** GETTERS
	** =======
	*/

	/*
	** GETTER 
	** @return ledgername
	*/
	get_ledgerName(){
		return this.ledgerName
	}


	/*
	** GETTER
	** @param private_key <string> the private key of the desired subscription
	** @return subscription with private key 'private_key'
	*/
	get_subscription_by_private_key(private_key){
		return -1
	}

		get_byPrivateKey(private_key){
			return this.get_subscription_by_private_key(private_key)
		}


	/*
	** =======
	** SETTERS
	** =======
	*/

	set_ledgerName(ledgerName){
		if (Types.isString(ledgerName)){
			this.ledgerName = ledgerName
		}
	}


	/*
	** Adds a subscription to the main list and to the sorted lists
	**
	** @param subscriptionObject <Subscription>
	** @return <boolean> : true on success and false otherwise
	*/
	addSubscription(subscriptionObject){

		// Check: if subscription object is valid
		if (this.#sampleSubscription.isValidSubscription(subscriptionObject)){
			
			let subscription_internal_id = this.addSubscription_main_list(subscriptionObject)

			if (subscription_internal_id != false){
				this.addSubscription_publicId(subscriptionObject, subscription_internal_id)
				this.addSubscription_privateKey(subscriptionObject, subscription_internal_id)
				this.addSubscription_signature(subscriptionObject, subscription_internal_id)				
			}
			

			console.info(this.#subscriptions_by_signatures)

		}else{
			this.#FLAG = this.#NON_VALID_SUBSCRIPTION
			return false
		}

	}

		/*
		** Internal (private method)
		** Adds a subscription to #subscriptions
		**
		** @params subscriptionObject <Subscription>
		** @returns <boolean>
		*/
		addSubscription_main_list(subscriptionObject){

			if (this.#sampleSubscription.isValidSubscription(subscriptionObject)){
				// The internal ID of a subscription,
				// arbitrarily decided it to be the first 'internal_id_size' chars 
				// of the subscription's private_key
				let internal_id_size = 5
				let internal_id = GUID.truncate(subscriptionObject.get_private_key() ,internal_id_size)

				// Preventing duplicates
				while (internal_id in this.#subscriptions){
					internal_id = GUID.generate(internal_id_size)
				}


				this.#subscriptions[internal_id] = subscriptionObject
				return internal_id

			}else{
				this.#FLAG = this.#NON_VALID_SUBSCRIPTION
				return false
			}
		}

		/*
		** Adds a subscription to the subscriptions by public id list
		**
		** @params 	subscriptionObject <Subscription>
					internal_id <String>
		** @return <boolean>
		*/
		addSubscription_publicId(subscriptionObject, internal_id){

			if (this.#sampleSubscription.isValidSubscription(subscriptionObject)){
				let public_id = subscriptionObject.get_public_id()

				if (!(public_id in this.#subscriptions_by_publicId)){
					this.#subscriptions_by_publicId[public_id] = internal_id
				
					return true
				}

				return false
			}else{
				return false
			}

		}


		/*
		** Adds a subscription to the subscriptions by private key list
		**
		** @params 	subscriptionObject <Subscription>
					internal_id <String>
		** @return <boolean>
		*/
		addSubscription_privateKey(subscriptionObject, internal_id){

			if (this.#sampleSubscription.isValidSubscription(subscriptionObject)){
				let private_key = subscriptionObject.get_private_key()

				if (!(private_key in this.#subscriptions_by_privateKey)){
					this.#subscriptions_by_privateKey[private_key] = internal_id

					return true
				}

				return false
			}else{
				return false
			}

		}


		/*
		** Adds a subscription to the subscriptions by signatures list
		**
		** @params 	subscriptionObject <Subscription>
					internal_id <String>
		** @return <boolean>
		*/
		addSubscription_signature(subscriptionObject, internal_id){

			if (this.#sampleSubscription.isValidSubscription(subscriptionObject)){

				let signatures = subscriptionObject.get_signatures()

				// ======
				// Remove
				// vvvvvv
				//signatures = [...signatures, ...signatures]
				// ^^^^^^

				if (Types.isArray(signatures)){

					signatures.forEach((signature) => {

						// If the current signature is not in the subscriptions 
						// by signatures list, we add it to is and append an
						// empty array as its value
						if (!this.#subscriptions_by_signatures[signature]){
							this.#subscriptions_by_signatures[signature] = []
						}

						try{
							this.#subscriptions_by_signatures[signature].push(internal_id)
						}catch{
							return false
						}

					})

				}

			}	

		}
	
}