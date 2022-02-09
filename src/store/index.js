/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import auth from "../store/auth"
import elections from "./elections.js"
import candidat from "./candidat.js"
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
        candidat,
    },
})

export default store