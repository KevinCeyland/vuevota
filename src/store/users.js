/* eslint-disable */
import axios from 'axios'
import router from "/src/router";
export default {
    namespaced: true,
    state: {
        users: [],
        userSelected: [],
        userFind: null,
        dataload: false,
    },
    mutations: {
        SET_ELECTIONS(state, datas) {
            state.users = datas
        },
        SET_ELECTION_FIND(state, data) {
            state.userFind = data
        },
        SET_DATALOAD(state, data) {
            state.dataload = data
        },
        ADD_ELECTION(state, data) {
            state.users.push(data)
        },
        EDIT_ELECTION(state, data) {
            state.users = state.users.map(user => {
                if (user.id === data.id) {
                    return Object.assign({}, user, data)
                }
            })
        },
        REMOVE_ELECTION(state, id) {
            var index = state.users.findIndex(user => user.id == id)
            state.users.splice(index, 1)
        },
    },
    getters: {
        getUsers(state) {
            return state.users
        },
        getUserFind(state) {
            return state.userFind
        },
        dataLoad(state) {
            return state.dataload
        },
        getUserById: (state) => (id) => {
            return state.users.find(user => user.id == id)
        },

    },
    actions: {
        setUsers({ commit }) {
            axios.get('/user/index').then((response) => {
                commit('SET_ELECTIONS', response.data.users)
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
        setUsersById({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios.get('/user/getUserById/' + id).then((response) => {
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
        editUser({
            commit,
            dispatch
        }, payload) {
            var arrayPayload = {
                nom: payload.nom,
                prenom: payload.prenom,
                email: payload.email,
                carte_identite: payload.carte_identite,
                ville: payload.ville,
                codePostal: payload.codePostal,
                rue: payload.rue,
            }
            return new Promise((resolve, reject) => {
                axios.put('/user/update/' + payload.id, arrayPayload).then((response) => {
                    if (response.data.messageError) {
                        resolve(response)
                    }
                    dispatch('setUsers')
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
        removeUser({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios.delete('/user/delete/' + id).then((response) => {
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