/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import auth from "../store/auth"
import elections from "./elections.js"
Vue.use(Vuex)

const store = new Vuex.Store({
    namespaced: true,
    state: {},
    mutations: {},
    actions: {

    },
    modules: {
        auth,
        elections,
    },
})

export default store