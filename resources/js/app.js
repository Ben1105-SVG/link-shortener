// import application bootstrap file
import('./bootstrap');
// import create app
import {createApp} from 'vue'

// import main component
import App from './App.vue'
import '../css/app.css'
// import axios
import axios from 'axios'

// import vue axios
import VueAxios from 'vue-axios'

// import prime vue styles
import('primevue/resources/themes/saga-blue/theme.css')
import('primevue/resources/primevue.min.css')
import('primeicons/primeicons.css')

// import prime vue
import PrimeVue from 'primevue/config';

// import vuex createstore
import { createStore } from "vuex";

//import vuex store options
import storeOptions from './store/index'

// create new vue application
const app = createApp(App)

// Create a new store instance or import from module.
const store = createStore(storeOptions);

// use vuex
app.use(store)

// use PrimeVue ui lib
app.use(PrimeVue, {ripple:true, inputStyle:'filled'})

// set root container for our app
app.mount('#app')


