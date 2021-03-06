/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import auth from "../store/auth"
import elections from "./elections.js"
import candidat from "./candidat.js"
import resultats from "./resultats.js"
import users from "./users.js"

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
        resultats,
        users,
    },
})

export default store