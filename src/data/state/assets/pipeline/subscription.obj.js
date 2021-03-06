/*
** Subscription Class 
**
**	 A subscription is :
**
**	  =====================================
**	 |
**	 |	Subscriber ID
**	 |	Subscriber Private Key
**	 |	Subscriber Signature(s)
**	 |
**	  =====================================
**	 
**	 Bellow is a blueprint for comparison purposes
*/

import { GUID } from '@guid';
import { Types } from '@utils/consistency/types';
import { Lists } from '@utils/consistency/lists';


export class Subscription{



	public_id = ""
	private_key = GUID.generate()
	signatures = []


	// This holds the last error that occurs
	#FLAG = undefined

	#SUCCESS = 0;
	#NON_VALID_SUBSCRIPTION = 1;
	#TYPE_ERROR = 2;


	/*
	**
	** 	@params Object{
					public_id <string>, 
					private_key <string>, 
					signatures <Array(<string>)>
				}
	**  @return this.isValidSubscription(this) -> true / false
	*/
	constructor({public_id, private_key, signatures}={}, signatures_separator=" "){
		
		this.set_public_id(public_id)
		this.set_private_key(private_key)

		try{
			this.set_signatures(signatures.split(signatures_separator))
		}catch{
			1+1
		}

	}


	/* 
	** =======
	** GETTERS
	** =======
	*/


	/*
	** @return <String>
	*/
	get_public_id(){
		return this.public_id
	}

	/*
	** @return <String>
	*/
	get_private_key(){
		return this.private_key
	}

	/*
	** @return <Array>
	*/
	get_signatures(){
		return this.signatures
	}

	/* 
	** =======
	** SETTERS
	** =======
	*/


	/*
	** PUBLIC ID SETTER
	** @params  public_id <string>
				debug <boolean> if true, the value is not set (used to check if
				value)
	** @return <boolean>
	** @raises this.#TYPE_ERROR if type is not <string>
	*/
	set_public_id(public_id, debug=false){

		if (Types.isString(public_id, true)){
			if (!debug){
				this.public_id = public_id
			}
			return true
		}else{
			this.#FLAG = this.#TYPE_ERROR
			return false
		}

	}


	/*
	** PRIVATE KEY SETTER
	** @params 	private_key <string>
				debug <boolean> if true, the value is not set (used to check if
				value)
	** @return <boolean>
	** @raises this.#TYPE_ERROR if type is not <string>
	*/
	set_private_key(private_key, debug=false){

		if (Types.isString(private_key)){
			if (!debug){
				this.private_key = private_key
			}
			return true
		}else{
			this.#FLAG = this.#TYPE_ERROR
			return false
		}

	}


	/*
	** SIGNATURES parser and SETTER
	** parses the signatures (separator is separator) and adds them to the this.signatures
	** @params signatures <string>
				debug <boolean> if true, the value is not set (used to check if
				value)
	** @return <boolean>
	** @retur this.#TYPE_ERROR if type is not <Array(<string>)>
	*/
	set_signatures(signatures, debug=false, separator=" "){

		if (Types.isArrayOf(signatures, Types.isString, true)){
			if (!debug){
				try{
					this.signatures = signatures
				}catch{
					this.signatures = ""
				}
			}
			return true
		}else{
			this.#FLAG = this.#TYPE_ERROR
			return false
		}

	}

	/*
	** =====
	** UTILS
	** =====
	*/


	/*
	** Checks if subscription is valid
	**
	** @return <boolean>
	*/
	isValidSubscription(subscriptionObject=this){

		let s_o = subscriptionObject

		let public_id_check   = this.set_public_id(s_o.get_public_id(), true)
		let private_key_check = this.set_private_key(s_o.get_private_key(), true)
		let signatures_check  = this.set_signatures(s_o.get_signatures(), true)

		if (!public_id_check || !private_key_check || !signatures_check){
			return false
		}else{
			return true
		}
	}

}