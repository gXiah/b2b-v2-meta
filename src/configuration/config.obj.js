/*
**
** Config object
**
**
*/

class ConfObj{

	name = undefined;

	data = [];

	constructor(conf_name){
		this.name = conf_name
	}

	add(key_name, key_data){
		this.data.push({[key_name]: key_data})
	}

}

export default{
	ConfObj
}