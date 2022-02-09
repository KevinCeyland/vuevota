/* eslint-disable */
import axios from 'axios'
import router from "/src/router";
export default {
    namespaced: true,
    state: {
        candidats: Array,
        candidatSelected: Array,
        candidatFind: null,
        dataload: false,
    },
    mutations: {
        SET_ELECTIONS(state, datas) {
            state.candidats = datas
        },
        SET_ELECTION_FIND(state, data) {
            state.candidatFind = data
        },
        SET_DATALOAD(state, data) {
            state.dataload = data
        },
        ADD_ELECTION(state, data) {
            state.candidats.push(data)
        },
        EDIT_ELECTION(state, data) {
            state.candidats = state.candidats.map(candidat => {
                if (candidat.id === data.id) {
                    return Object.assign({}, candidat, data)
                }
            })
        },
        REMOVE_ELECTION(state, id) {
            var index = state.candidats.findIndex(candidat => candidat.id == id)
            state.candidats.splice(index, 1)
        },
    },
    getters: {
        getCandidats: (state) => (limite) => {
            return state.candidats.slice(0, limite)
        },
        getCandidatsLength(state) {
            return state.candidats.length
        },
        getCandidatFind(state) {
            return state.candidatFind
        },
        dataLoad(state) {
            return state.dataload
        },
        getCandidatById: (state) => (id) => {
            return state.candidats.find(candidat => candidat.id == id)
        },

    },
    actions: {
        setCandidats({ commit }) {
            axios.get('/candidat/index').then((response) => {
                commit('SET_ELECTIONS', response.data.candidats)
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
        setCandidatsById({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios.get('/candidat/getCandidatById/' + id).then((response) => {
                    if (response.data.messageError) {
                        resolve(response)
                    }
                    commit('SET_ELECTION_FIND', response.data)
                    resolve(response)
                }).catch(function(error) {
                    if (error.response.status === 401) {
                        setTimeout(() => {
                            router.push({
                                name: "Authentification"
                            });
                        }, 1200);
                    }
                });
            })
        },
        addCandidat({
            commit
        }, payload) {
            var arrayPayload = {
                libelle: payload.libelle,
            }
            return new Promise((resolve, reject) => {
                axios.post('/candidat/store', arrayPayload).then((response) => {
                    if (response.data.messageError) {
                        resolve(response)
                    }
                    commit('ADD_ELECTION', response.data.candidat)
                    resolve(response)
                }).catch(function(error) {
                    if (error.response.status === 401) {
                        setTimeout(() => {
                            router.push({
                                name: "Authentification"
                            });
                        }, 1200);
                    }
                });
            })
        },
        editCandidat({
            commit
        }, payload) {
            var arrayPayload = {
                libelle: payload.libelle,
            }
            return new Promise((resolve, reject) => {
                axios.put('/candidat/update/' + payload.id, arrayPayload).then((response) => {
                    if (response.data.messageError) {
                        resolve(response)
                    }
                    commit('EDIT_ELECTION', response.data.candidat)
                    resolve(response)
                }).catch(function(error) {
                    if (error.response.status === 401) {
                        setTimeout(() => {
                            router.push({
                                name: "Authentification"
                            });
                        }, 1200);
                    }
                });
            })
        },
        removeCandidat({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios.delete('/candidat/delete/' + id).then((response) => {
                    if (response.data.messageError) {
                        resolve(response)
                    }
                    commit('REMOVE_ELECTION', id)
                    resolve(response)
                }).catch(function(error) {
                    if (error.response.status === 401) {
                        setTimeout(() => {
                            router.push({
                                name: "Authentification"
                            });
                        }, 1200);
                    }
                });
            })
        }
    }
}