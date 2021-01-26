/*
**
** Configuration manager
** 
** Global configurations and custom ones
**
*/



class Configuration{

	config_file_type = 'js';

	config_root = undefined;
	custom_config_dir = "customConfigurations";

	globalConfigPath = undefined;
	customConfigPath = undefined;

	globalConfig = {}
	customConfig = {}

	wildcard = '*';


	constructor(){
		this.config_root = '.';
	}

	/* === Setters === */

	setGlobal(path){
		path = `${this.config_root}/${path}.conf.${this.config_file_type}`
		this.globalConfigPath = path;
	}

	setCustom(path){
		path = `${this.config_root}/${this.custom_config_dir}/${path}.conf.${this.config_file_type}`
		this.customConfigPath = path;

	}

	async init(){

		await import(`${this.globalConfigPath}`)
			.then((data) => {
				this.globalConfig = data.default.Config.data
			})
		
		await import(`${this.customConfigPath}`)
			.then((data) => {
				this.customConfig = data.default.Config.data
			})
		
	}


	/*
	** Retrieves the value of the config element @ address
	** Custom configs have a higher priority than the global ones
	*/
	get(address){
		let path = this.parse_address(address);
		
		//***** @todo ****** //
		// Add a comparison between global and custom config //
		
		return this.lookup(path, this.globalConfig);
	}


		// address/to/config -> [address, to, config]
		parse_address(address){
			return address.split('/');
		}


		// Looks up a parsed path in a config
		lookup(parsed_path, config){

			let ret = undefined

			config.forEach((value) => {

				// Config entry name
				let entry_name = Object.keys(value)[0];

				if (entry_name === parsed_path[0]){
					if (parsed_path[1] == this.wildcard){
						ret = value[parsed_path[0]];
					}else{
						ret = value[parsed_path[0]][parsed_path[1]];
					}
				}

			});	
			
			return ret;	
		}

}

export default{
	Configuration
}