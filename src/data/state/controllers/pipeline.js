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
	** |	Sender ID
	** |	Request Body
	** |	Target ID / Boradcast ID (ARP)
	** |
	**  =====================================
	** 
	** Bellow is a blueprint for comparison purposes




	/*
	** ======================================================
	** CONSTANTS
	** ======================================================
	*/

	PARSE_ERROR = -1;


	constructor(){}




	/*
	** Parses an order
	** 
	** @params  payload : Data to be parsed
	**			type	: Parsing blueprint
	**
	**
	** @return  if OK returns object with blueprint keys and corresponding
	**			payload values
	**			if ERROR returns empty object
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

}

export default {
	PipelineController
}