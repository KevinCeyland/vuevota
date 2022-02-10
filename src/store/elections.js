/* eslint-disable */
import axios from 'axios'
import router from "/src/router";
export default {
    namespaced: true,
    state: {
        elections: [],
        electionSelected: [],
        electionFind: null,
        dataload: false,
    },
    mutations: {
        SET_ELECTIONS(state, datas) {
            state.elections = datas
        },
        SET_ELECTION_FIND(state, data) {
            state.electionFind = data
        },
        SET_DATALOAD(state, data) {
            state.dataload = data
        },
        ADD_ELECTION(state, data) {
            state.elections.push(data)
        },
        EDIT_ELECTION(state, data) {
            state.elections = state.elections.map(election => {
                if (election.id === data.id) {
                    return Object.assign({}, election, data)
                }
            })
        },
        REMOVE_ELECTION(state, id) {
            var index = state.elections.findIndex(election => election.id == id)
            state.elections.splice(index, 1)
        },
    },
    getters: {
        getElections(state) {
            return state.elections
        },
        getElectionFind(state) {
            return state.electionFind
        },
        dataLoad(state) {
            return state.dataload
        },
        getElectionById: (state) => (id) => {
            return state.elections.find(election => election.id == id)
        },

    },
    actions: {
        setElections({ commit }) {
            axios.get('/election/index').then((response) => {
                commit('SET_ELECTIONS', response.data.elections)
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
        setElectionsById({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios.get('/election/getElectionById/' + id).then((response) => {
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
        addElection({
            commit,
            dispatch
        }, payload) {
            var arrayPayload = {
                libelle: payload.libelle,
                arrayCandidats: payload.arrayCandidats,
                dateElection: payload.dateElection
            }
            return new Promise((resolve, reject) => {
                axios.post('/election/store', arrayPayload).then((response) => {
                    if (response.data.messageError) {
                        resolve(response)
                    }
                    commit('ADD_ELECTION', response.data.election)
                    dispatch('setElections')
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
        editElection({
            commit,
            dispatch
        }, payload) {
            var arrayPayload = {
                libelle: payload.libelle,
                arrayCandidats: payload.arrayCandidats,
                dateElection: payload.dateElection
            }
            return new Promise((resolve, reject) => {
                axios.put('/election/update/' + payload.id, arrayPayload).then((response) => {
                    if (response.data.messageError) {
                        resolve(response)
                    }
                    dispatch('setElections')
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
        removeElection({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios.delete('/election/delete/' + id).then((response) => {
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