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

		sender_key : Types.isString,
		sender_id : Types.isString,
		target : Types.isString,
		body : Types.isObject

	}



	constructor(payload){
		console.info(payload)

		payload = ObjectExtractor.extract_as(
											payload, 
											this.message_data,
											{all_required:true}
										)
		console.info('extracted payload', payload, ObjectExtractor.get_error_msg())
	}

}