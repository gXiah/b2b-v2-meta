
import ConfObj from '../config.obj.js';

const Config = new ConfObj.ConfObj("box-cleed");


// =========================================== 


let identification = {
	'box_name': 		'box-cleed-v1',
	'box_version':		'1.0.0',
	'box_description': 	'Showcase box for Cleed'
}

Config.add('identification', identification)


// ============================================


export default{
	Config
}