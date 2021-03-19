/*
** EXTRACTOR util
**
** to correctly extract data from an object coming from a non-trusted source
**
*/

export class objectExtractor{


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
	static extract_as(payload, blueprint){

		try{

			payload.forEach((element) => {



			})

		}catch{
			return false
		}

	}


}