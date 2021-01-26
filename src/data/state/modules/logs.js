/*
**
** Logs module
** 
** This module manages internal logs, or info messages that components
** can send.
** 
**
** Note :   No component should directly console.log() any message, to keep
** 			a tight control of logs flow
**
*/

/*
** /!\ On Standby /!\
**
** This store module will become a wrapper to the 'VueLogger' plugin
**	
*/


const state = {
	module_name: 'logs'
}

export const mutations = {}

const actions = {}

const getters = {}


export default{
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}