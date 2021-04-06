/*
**
** Message
** A message transits through the mail rool <MailRoom>
** A message has 
					a sender (private key), 
					a target (either public id, signature, or special target), 
					a body, 
					meta data (timestamp, request/or/response, ...(?) )
**
*/

import { ObjectExtractor } from '@utils/extractors/object'
import { Types } from '@utils/consistency/types'

export class Message{

	#FLAG = 0
	FLAG_MESSAGE


	/*
	** Message data
	**
	**	message_data is a dictionnary that represents a message
	**  before constructing a message, the values of message_data
	**  should be functions that return true on certain types of data
	**  or empty function for a value that can be of any type
	**
	**  @example: 	meta_data can be of any type
				 	sender_key should be of type <String>
				 	...
	**	
	**  Types are verified by (method) ObjectExtractor.extract_as
	*/
	message_data = {

		meta_data : () => {}, // Can be anything or empty

		sender_key : Types.isString, // string
		sender_id : Types.isString, // string
		target : Types.isString, // string
		body : Types.isDict // object

	}



	constructor(payload){

		// Extracting payload data to fill message_data
		payload = ObjectExtractor.extract_as(
											payload, 
											this.message_data,
											{all_required:true}
										)

		// if data has been correctly extracted
		if (payload){

			this.message_data = payload
			console.log(this.message_data)

		}else{
			this.FLAG_MESSAGE = `Could not create message object`
			return false

		}
	}


	/*
	** =======
	** GETTERS
	** =======
	*/

	get_error_msg(){
		return this.FLAG_MESSAGE
	}
}