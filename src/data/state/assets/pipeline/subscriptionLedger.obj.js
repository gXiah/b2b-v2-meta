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
			
			this.addSubscription_main_list(subscriptionObject)
			this.addSubscription_publicId(subscriptionObject)
			this.addSubscription_privateKey(subscriptionObject)
			this.addSubscription_signature(subscriptionObject)

			console.info(this.#subscriptions)

		}else{
			this.#FLAG = this.#NON_VALID_SUBSCRIPTION
			return false
		}

	}

		addSubscription_main_list(subscriptionObject){

			if (this.#sampleSubscription.isValidSubscription(subscriptionObject)){
				// The internal ID of a subscription,
				// arbitrarily decided it to be the first 'internal_id_size' chars 
				// of the subscription's private_key
				let internal_id_size = 5
				//let internal_id = GUID.generate(internal_id_size)
				let internal_id = GUID.truncate(subscriptionObject.get_private_key() ,internal_id_size)

				// Preventing duplicates
				while (internal_id in this.#subscriptions){
					internal_id = GUID.generate(internal_id_size)
				}


				this.#subscriptions[internal_id] = subscriptionObject
				return true

			}else{
				this.#FLAG = this.#NON_VALID_SUBSCRIPTION
				return false
			}
		}

		addSubscription_publicId(subscriptionObject){}
		addSubscription_privateKey(subscriptionObject){}
		addSubscription_signature(subscriptionObject){}
	
}