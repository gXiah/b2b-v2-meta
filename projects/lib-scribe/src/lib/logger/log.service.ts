import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
    
	private type_name_match = {
		0:'info',
		1:'success',
		2:'warning',
		3:'danger',
		4:'fatal'
	}

	INFO 	= 0
	SUCCESS = 1
	WARNING = 2
	DANGER 	= 3
	FATAL 	= 4

    constructor(){}

    log(message: any, type?: number, signature?: any, misc?: any){

    	let message_object = [message]

    	if (type){ message_object = [this.type_name_match[type], message]; }
    	if (signature){ message_object.push(signature); }
    	if (misc){ message_object.push(misc); }

        console.log(message_object);
    }
}
