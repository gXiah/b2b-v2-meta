/*
** Utils for lists
**
*/

import { Types } from './types';

export class Lists{

	constructor(){}

	/*
	** Removes matched expressions from a list
	**
	** @params  list <Array> list to remove from
	**			literalMatch <Array | String> literals to look for
	** @return  <any> the parameter list
	*/ 
	static removeMatches(list, literalMatch=undefined){
		
		if (literalMatch !== undefined){

			if (Types.isArray(list)){
				
				if (Types.isArray(literalMatch)){

					list.forEach((element, key) => {
						literalMatch.forEach((match) => {
							if (element == match){
								delete list[key]
							}
						})

					})

				}else{
					list.forEach((element, key)=> {
						if (element == literalMatch){
							delete list[key]
						}
					})
				}

			}

		}

		return list

	}

}