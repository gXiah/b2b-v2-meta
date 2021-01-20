import { createApp } from 'vue';
import BoxCleed from './apps/Cleed/box-cleed-v1/BoxCleed.vue';

// Vuex (State Management)
import State from './data/state';

// Box-specific style
import '@/assets/custom_styles/box-cleed-v1.scss';

// ES6 Promise for IE (Vuex)
import 'es6-promise/auto';



var app = createApp(BoxCleed)

// Using Global State (Vuex Store)
app.use(State)


/*
** Mount
*/
// @todo : Pre-mount check
app.mount('#app')