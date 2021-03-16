/*
** UTILS for IDENTITIES -> GUIDs
** ie. IDs, (((  GUIDs  ))), Hashing, encryption, ...
*/

import * as uuid from 'uuid';


export class GUID{

	constructor(){}


	/*
	** Generates a V4 UUID, if offset > 0 truncates the UUID {0, offset}
	**
	** @params offset
	** @return uuid <string>
	*/
	static generate(offset=0){

		let guid = uuid.v4();
		
		return this.truncate(guid, offset)
	}


	/*
	** Truncates a string UUID {0, offset}
	** @returns <string> truncated uuid if offset > 0, 
	            <string> same uuid in given as params otherwise
	*/
	static truncate(guid, offset=0){

		if (offset > 0){
			guid = guid.substring(0, offset)
		}

		return guid

	}

}