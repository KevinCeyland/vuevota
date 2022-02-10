/* eslint-disable */
import axios from 'axios'
import router from "/src/router";
export default {
    namespaced: true,
    state: {
        resultats: [],
        dataload: false,
    },
    mutations: {
        SET_RESULTATS(state, datas) {
            state.resultats = datas
        },
        SET_DATALOAD(state, data) {
            state.dataload = data
        },
    },
    getters: {
        getResultats(state) {
            return state.resultats
        },
        dataLoad(state) {
            return state.dataload
        },


    },
    actions: {
        setResultats({ commit }, idElection) {
            axios.get('/resultat/getResultatsElection/' + idElection).then((response) => {
                commit('SET_RESULTATS', response.data.resultat)
                commit('SET_DATALOAD', true)
            }).catch(function(error) {
                if (error.response.status === 401) {
                    setTimeout(() => {
                        router.push({
                            name: "Authentification"
                        });
                    }, 1200);
                }
            });
        },
    }
}