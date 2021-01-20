/*
**
** GUID controller
**
*/

import { v4 as guid_v4} from 'uuid';

export class GUID{

	static generate(){
		return guid_v4();
	}

}