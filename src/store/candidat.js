/* eslint-disable */
import axios from 'axios'
import router from "/src/router";
export default {
    namespaced: true,
    state: {
        candidats: [],
        candidatsAll: [],
        candidatSelected: [],
        candidatFind: null,
        partiePolitiques: [],
        dataloadCandidat: false,
        dataloadCandidatAll: false,
    },
    mutations: {
        SET_CANDIDATS(state, datas) {
            state.candidats = datas
        },
        SET_CANDIDATS_ALL(state, datas) {
            state.candidatsAll = datas
        },
        SET_PARTIE_POLITIQUE(state, datas) {
            state.partiePolitiques = datas
        },
        SET_CANDIDAT_FIND(state, data) {
            state.candidatFind = data
        },
        SET_DATALOAD_CANDIDAT(state, data) {
            state.dataloadCandidat = data
        },
        SET_DATALOAD_CANDIDAT_ALL(state, data) {
            state.dataloadCandidatAll = data
        },
        ADD_CANDIDAT(state, data) {
            state.candidats.push(data)
        },
        EDIT_CANDIDAT(state, data) {
            state.candidats = state.candidats.map(candidat => {
                if (candidat.id === data.id) {
                    return Object.assign({}, candidat, data)
                }
            })
        },
        REMOVE_CANDIDAT(state, id) {
            var index = state.candidats.findIndex(candidat => candidat.id == id)
            state.candidats.splice(index, 1)
        },
    },
    getters: {
        getCandidats(state) {
            return state.candidats
        },
        getCandidatsAll(state) {
            return state.candidatsAll
        },
        getPartiePolitiques(state) {
            return state.partiePolitiques
        },
        getCandidatsLength(state) {
            return state.candidats.length
        },
        getCandidatFind(state) {
            return state.candidatFind
        },
        dataLoadCandidat(state) {
            return state.dataloadCandidat
        },
        dataLoadCandidatAll(state) {
            return state.dataloadCandidatAll
        },
        getCandidatById: (state) => (id) => {
            return state.candidats.find(candidat => candidat.id == id)
        },

    },
    actions: {
        setAllCandidats({ commit }) {
            axios.get('/candidat/indexAll').then((response) => {
                commit('SET_CANDIDATS_ALL', response.data.candidats)
                commit('SET_PARTIE_POLITIQUE', response.data.partie_politique)
                commit('SET_DATALOAD_CANDIDAT_ALL', true)
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
        setCandidats({ commit }, idElection) {
            axios.get('/candidat/index/' + idElection).then((response) => {
                commit('SET_CANDIDATS', response.data.candidats)
                commit('SET_DATALOAD_CANDIDAT', true)
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
                    commit('SET_CANDIDAT_FIND', response.data)

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
            commit,
            dispatch
        }, payload) {
            return new Promise((resolve, reject) => {
                axios.post('/candidat/store', payload).then((response) => {
                    if (response.data.messageError) {
                        resolve(response)
                    }
                    commit('ADD_CANDIDAT', response.data.candidat)
                    dispatch('setAllCandidats')
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
            commit,
            dispatch
        }, payload) {
            var arrayPayload = {
                changePhoto: payload.changePhoto,
                photo: payload.photo,
                nom: payload.nom,
                prenom: payload.prenom,
                date_naissance: payload.date_naissance,
                programme: payload.programme,
                partie_politique_id: payload.partie_politique_id,
            }
            return new Promise((resolve, reject) => {
                axios.put('/candidat/update/' + payload.id, arrayPayload).then((response) => {
                    if (response.data.messageError) {
                        resolve(response)
                    }
                    commit('EDIT_CANDIDAT', response.data.candidat)
                    dispatch('setAllCandidats')
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
                    commit('REMOVE_CANDIDAT', id)
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