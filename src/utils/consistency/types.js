/*
**
** TYPES consistency utils
**
*/

export class Types{

	constructor(){}

	/*
	** Returns type of subject
	** @params subject <any>
	*/
	static whatIs(subject){
		return typeof(subject)
	}


	static isUndefined(subject){
		return (subject == undefined)
	}


	/*
	** Returns true if the subject type is <string>
	** @params  subject
				noEmptyStrings <boolean> : if true, returns false on empty strings
	*/
	static isString(subject, noEmptyStrings=false){

		if(noEmptyStrings && subject == ""){
			return false
		}

		return (typeof(subject) == typeof("sample string"))
	}

	/*
	** Returns true if the subject type is <Array>
	** @params subject
	*/
	static isArray(subject){
		return Array.isArray(subject)
	}


		/*
		** @return true is the subject type is <Array(<innerType>)>
		** @params subject <any>
		** @params innerTypeMethod <function> Function that returns true or false
											  on certain types
		** @example: isArrayof(["str1", "str2"], isString) -> true
		** @example: isArrayof(["str1", "str2"], isInteger) -> false
		*/
		static isArrayOf(subject, innerTypeMethod, undefinedOk=false){

			let isArray = this.isArray(subject)

			if (isArray){

				let foundWrongType = false

				subject.forEach((element) => {
					if (this.isUndefined(element)){
						if (!undefinedOk){
							foundWrongType = true
						}
					}else if(!innerTypeMethod(element)){
						foundWrongType = true
					}
				})

				if(!foundWrongType){
					return true
				}else{
					return false
				}

			}else{
				return false
			}

		}

}