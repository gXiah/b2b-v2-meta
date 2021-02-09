/*
**
** Pipeline module controller
**
*/

import { GUID } from './guid';

class PipelineController{

	/* 
	** ======================================================
	** TYPES
	** ======================================================
	*/

	/*
	** A subscription is :
	**
	**  =====================================
	** |
	** |	Subscriber ID
	** |	Subscriber Private Key
	** |	Subscriber Signature(s)
	** |
	**  =====================================
	** 
	** Bellow is a blueprint for comparison purposes
	*/
	SUBSCRIPTION = {
						"public_id": "", 
						"private_key":GUID.generate(), 
						"signatures": []
					}


	/*
	** An Order is :
	**
	**  =====================================
	** |
	** |	Sender (Private) Key
	** |	Sender ID
	** |	Request Body
	** |	Target ID / Boradcast ID (ARP)
	** |
	**  =====================================
	** 
	** Bellow is a blueprint for comparison purposes
	*/
	ORDER = {
				"sender_key": "",
				"sender_id": "",
				"request_body": {},
				"target_id": ""
			}


	REQUESTS = [
		"#ARP::Broadcast",

		"#SIG::Signature"
	]

		REQUESTS_ALIASES = {
			ARP: 				this.REQUESTS[0],
			"#ARP::Broadcast": 	this.REQUESTS[0],
			"#ARP": 			this.REQUESTS[0],

			SIG: 				this.REQUESTS[1],
			"#SIG::Signature": 	this.REQUESTS[1],
			"#SIG": 			this.REQUESTS[1]
		}

	// If the sender_key should be sent to the target or not
	SEND_KEY = false

	/*
	** ======================================================
	** CONSTANTS
	** ======================================================
	*/

	PARSE_ERROR = -1;


	constructor(){}

	get_requests_aliases(){
		return this.REQUESTS_ALIASES
	}


	/*
	** Parses an order
	** 
	** @params  payload : Data to be parsed
	**			type	: Parsing blueprint
	**
	**
	** @return  if OK returns object with blueprint keys and corresponding
	**			payload values
	**			if ERROR returns the blueprint (empty)
	*/
	parse(payload, blueprint){

		let ret = blueprint
		let error_flag = false;


		// Going through the blueprint's elements
		Object.keys(ret).forEach((key) => {
			
			try{
				
				// Checking to see if payload's key type matches the blueprint's
				if (typeof(ret[`${key}`]) == typeof(payload[`${key}`])){
					ret[key] = payload[key]
				}else{
					error_flag = true;
				}

			}catch{
				error_flag = true;
			}

		})

		return (error_flag) ? this.PARSE_ERROR : ret;
	}


	/*
	**
	** Parses an ID
	**
	** @return 	If the ID is a normal components / panel ID, returns the same ID
	**			if the ID is a special one (eg: #ARP::Broadcast), returns the 
				special ID with a random ID appended to it (ARP)-(RandID)
	*/
	parse_id(id){

		let ret = undefined

		let s_id = id.split("-")

		Object.keys(this.REQUESTS_ALIASES).forEach((req) => {
			if (s_id[0] == req){

				// HERE : The ID is a special one

				if (this.REQUESTS_ALIASES[s_id[0]] == this.REQUESTS_ALIASES.ARP)
				{
					// If it's an ARP

					ret = `${this.REQUESTS_ALIASES[s_id[0]]}-${GUID.min_gen()}`;
				}
				else
				{
					// If it's not an ARP

					s_id[1] = (typeof s_id[1] !== undefined) ? s_id[1] : "anonymous";
					let slug = s_id.slice(1).join('-')

					ret = `${this.REQUESTS_ALIASES[s_id[0]]}-${slug}-${GUID.min_gen()}`;
				}
				

			}
		})
		return (ret === undefined) ? `${id}-${GUID.min_gen()}` : ret;

	}


	/*
	**	Looks for the data in 'heystack' whose index is 'key' and then
	**  fills a list according to the blueprints
	**
	*/
	fillOrder(key, haystack, blueprints){

		let tmp_order = { blueprints };

		let tmp_body_data = {}
		let tmp_sender_id = haystack[key].sender_id;

		tmp_body_data = {...haystack[key]}.request_body;
		tmp_order.target_id = key;
		tmp_order.sender_id = tmp_sender_id;
		tmp_order.request_body = tmp_body_data;
		tmp_order.sender_key = (this.SEND_KEY) 
									? tmp_order.sender_key
									: undefined
		
		return tmp_order
	}


	get_direct_requests(public_id, haystack){
		let ret = []

		let req_regex = new RegExp(
									"" 
								+ 	public_id
								+ 	"-(.*)"
							)

		Object.keys(haystack).forEach((key) => {

			if (req_regex.test(key)){
				ret.push(this.fillOrder(key, haystack, this.ORDER));
			}
		});

		return ret;
	}

	/*
	** (...)
	**
	** @params: 
	**			request_filters : Filters the special requests
	**					example : #Sig:Signtaure-myCustomSignature can be
	**							  selected using ["myCustomSignature"]
	*/
	get_special_requests(request_type, haystack, request_filters){

		let req_regex = new RegExp(
									"" 
								+ 	this.REQUESTS_ALIASES[request_type]
								+ 	"-(.*)"
							)

		let ret = [] // List of orders to be returned

		Object.keys(haystack).forEach((key) => {

			if (req_regex.test(key)){
				ret.push(this.fillOrder(key, haystack, this.ORDER));
			}
		})		

		return ret;
	}

}

export default {
	PipelineController
}