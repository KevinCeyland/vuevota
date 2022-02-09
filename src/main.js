import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import Vuex from 'vuex'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(Vuex)

Vue.prototype.$axios = axios
Vue.prototype.$store = store

axios.defaults.baseURL = "http://laravota/api/"

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')