import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(Vuex)

Vue.prototype.$axios = axios
Vue.prototype.$store = store



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')