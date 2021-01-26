/*
**
** Global Configuration File
**
** This can also be used as template for future configuration files (even
** custom configs)
**
*/

/*
**
** How to :
**
** A single list is exported : 'conf'
**
** 'conf' contains other config objects
** conf : [
			ConfObj,
			ConfObj,
			ConfObj: {
						name: str
						data: []
					}
			ConfObj
			]
** 
*/

import ConfObj from './config.obj.js';

const Config = new ConfObj.ConfObj("global");


// =========================================== 


let identification = {
	'app_name': 		'cleed workshop',
	'app_version':		'1.0.0',
	'app_description': 	'Vue Framework for application development'
}
	Config.add('identification', identification);

// --------------

let session = {
	'lifespan': 	-1
}
	Config.add('session', session);

// --------------

let logging = {
	isEnabled: true,
    logLevel : 'debug',
    stringifyArguments : false,
    showLogLevel : true,
    showMethodName : true,
    separator: '>',
    showConsoleColors: true
}
	Config.add('logging', logging)

// ============================================



export default{
	Config
}