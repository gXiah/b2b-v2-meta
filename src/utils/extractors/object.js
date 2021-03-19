/*
** EXTRACTOR util
**
** to correctly extract data from an object coming from a non-trusted source
**
*/

import { Types } from '@utils/consistency/types'


export class ObjectExtractor{

	#FLAG;
	FLAG_MESSAGE;


	static get_error_msg(){
		return this.FLAG_MESSAGE
	}


	/*
	** Tries to extracts a matching image of the blueprint from the payload 
	**
	** @params 	payload		<Object>
				blueprint 	<Object> dictionnary of keys and check methods
							Can either be: 
									{name: <Boolean> (v) => {}}
									or {name: () => {return true}}
							The second one make 'extract_as()' look for key names without checking their types

	**
	** @example extract_as(
							{first: 1, second: "string", third: 3},
							{
								first: Types.isInteger,
								second: Types.isString
							}
						)
				// will return {first:1, second: "string"}
				// Note: Types.isInteger (resp. Types.isString) both return 	     true if the passed on parameter is of type <Integer>
						 (resp. <String>)
	**
	** @return 	<Object> the extracted object, on success
				<Boolean> on failure (false)
	*/
	static extract_as(
						payload, 
						blueprint, 
						{all_required}={all_required:true}
					){

		try{

			let extracted_object = {}

			// If payload & blueprint are of type dictionnary
			if (Types.isDict(payload) && Types.isDict(blueprint)){ 

				Object.keys(payload).forEach((element) => {

					// looking for current payload element in blueprint
					if (blueprint[element]){

						// getting the type check method from the BP
						let blueprint_type_checker = blueprint[element]
						let typeof_checker = typeof blueprint_type_checker
						

						/* 
							checking element against its supposed type (if a method has been passed for it)
						*/

						//type checker is a valid function (ie returns boolean)
						if (
								typeof_checker == 'function' 
								&& typeof(blueprint_type_checker('test val')) == 'boolean'
							){

							if (blueprint_type_checker(payload[element])){
								extracted_object[element] = payload[element]
							}else{

								throw `An element of the payload did not match the expected value type, as defined in the blueprint (${element})`
							}

						
						}else{ // type checker is not a function
							extracted_object[element] = payload[element]

						}

					}
				})

				return extracted_object

			}else{
				// throwing just to switch to the catch{} block
				throw 'Payload is not a dictionnary'
			}

		}catch(e){
			this.FLAG_MESSAGE = e
			return false
		}

	}


} 