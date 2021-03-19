/**
**
** Mail Room
** Manages messages <Message>: Sending, reading, consuming, checking, ...
**
*/

import { Types } from '@utils/consistency/types';

export class MailRoom{


	mailRoom_name = "unnamed mail room"

	// List of messages (type <Message>)
	messages = []

	constructor(mailRoom_name){

		this.set_mailRoom_name(mailRoom_name)

	}


	/*
	** =======
	** GETTERS
	** =======
	*/

	get_name(){
		return this.mailRoom_name
	}



	/*
	** =======
	** SETTERS
	** =======
	*/

	set_mailRoom_name(name){
		if (Types.isString(name)){
			this.mailRoom_name = name
		}
	}

}