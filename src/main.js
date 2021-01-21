import { createApp } from 'vue';
import BoxCleed from './apps/Cleed/box-cleed-v1/BoxCleed.vue';

// Configuration
import Configuration from '@config';

// Vuex (State Management)
import State from './data/state';

// Box-specific style
import '@/assets/custom_styles/box-cleed-v1.scss';

// ES6 Promise for IE (Vuex)
import 'es6-promise/auto';


// 
var app = createApp(BoxCleed)


// Configuration Setup
let config = new Configuration.Configuration()
config.setGlobal(process.env.VUE_APP_GLOBAL_CONFIG_FILE)
config.setCustom(process.env.VUE_APP_CUSTOM_CONFIG_FILE)


// Using Global State (Vuex Store)
app.use(State)



/*
** Mount
*/
app.mount('#app')