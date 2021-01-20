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