import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import Vuex from 'vuex'
import vuetify from './plugins/vuetify'
import VueSweetalert2 from 'vue-sweetalert2';
import { VueTypedJs } from 'vue-typed-js'
import 'sweetalert2/dist/sweetalert2.min.css';
import HighchartsVue from 'highcharts-vue'

Vue.use(VueTypedJs)
Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueSweetalert2);
Vue.use(HighchartsVue)
require("@/store/subscriber");

Vue.prototype.$axios = axios
Vue.prototype.$store = store

axios.defaults.baseURL = "http://laravota/api/"
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

store.dispatch("auth/attempt", localStorage.getItem("token"));

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')