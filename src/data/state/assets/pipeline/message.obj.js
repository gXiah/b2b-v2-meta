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

import { objectExtractor } from '@utils/extractors/object'

export class Message{

	meta_data = {}

	sender_key = undefined
	sender_id = undefined
	target = undefined
	body = {}



	constructor(payload){
		console.info(payload)
	}

}