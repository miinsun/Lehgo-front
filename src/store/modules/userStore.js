import { axios } from '../index';

const userStore = {
    namespaced: true,
    state: {
        userId : '',
        userNickName: '',
        loginResult : false,
        errorMessage: '',
        accessToken : '',
    },
    getters: {
        getUserId : state => state.userId,
        getUserNickName: state => state.userNickName,
        getLoginResult : state => state.loginResult,
        getErrorMessage: state => state.errorMessage,
        getAccessToken: state => state.accessToken,
    },
    mutations: {
        setUserId: (state, payload) => {
            state.userId = payload
        },
        setUserNickName: (state, payload) => {
            state.userNickName = payload
        },
        setLoginResult : (state, payload) => {
            state.loginResult = payload
        },
        setErrorMessage: (state, payload) => {
            state.errorMessage = payload
        },
        setAccessToken: (state, payload) => {
            state.accessToken = payload
        }
    },
    actions: {
        setUserInfo : ({ commit }, payload) => {
            return new Promise(function() {
                commit('setUserId', payload.username);
                commit('setUserNickName', payload.nickname);
            })
        },
        postLogin: ({ commit, rootState }, payload) => {
            delete axios.defaults.headers.common["authorization"];
            return new Promise((resolve) => {
                let api = rootState.domain + '/user'
                axios.post(api, {
                    id : payload.id,
                    password : payload.password
                }, {
                headers: { "Content-Type": 'application/json'
                }
                }).then(res => {
                    commit('setLoginResult', true);
                    commit('setErrorMessage', '');
                    commit('setAccessToken', res.headers.authorization);
                    commit('setUserId', res.data.username);
                    commit('setUserNickName',res.data.nickname);
                    axios.defaults.headers.common['authorization'] = res.headers.authorization;
                    api = rootState.domain + '/user/keyword/isin?id=' + res.data.username
                    axios.get(api)
                    .then(res => resolve(res.data))
                }).catch(function(error){
                    commit('setLoginResult', false);
                    commit('setErrorMessage', error.response.data.message);
                });
            })
        },
        socialLogin: ({ commit, rootState }, payload) => {
            delete axios.defaults.headers.common["authorization"];
            let api = rootState.domain + '/oauth/' + payload.type + '/login?code=' + payload.code
            return new Promise((resolve) => {
                axios.get(api).then(res => {
                    axios.defaults.headers.common['authorization'] = res.headers.authorization;
                    api = rootState.domain + '/user/keyword/isin?id=' + res.data.username;

                    commit('setUserNickName',res.data.nickname);
                    commit('setLoginResult', true);
                    commit('setErrorMessage', '');
                    commit('setAccessToken', res.headers.authorization);
                    commit('setUserId', res.data.username);
                }).then(() => {
                    axios.get(api)
                    .then(res =>  resolve(res.data))
                }).catch(function(error){
                    commit('setLoginResult', false);
                    commit('setErrorMessage', error.response.data.message);
                }); 
            })
        },
        postLogout:({ commit }) => {
            commit('setUserId', '');
            commit('setUserNickName', '');
            commit('setAccessToken', null);
            delete axios.defaults.headers.common["authorization"];
        },
        initLogin: ({ commit }) => {
            commit('setLoginResult', true);
            commit('setErrorMessage', '');
        },
        setType: ({ rootState, rootGetters }, payload) => {
            return new Promise(function() {
                let api = rootState.domain + '/users/type?type=' + payload
                axios.post(api, JSON.stringify({
                        id : rootGetters["userStore/getUserId"]
                    }), {
                        headers: { "Content-Type": 'application/json'
                    }
                }).then(() => {
                }).catch(function(error){
                    console.log(error.response.data.status)
                });
            })
        },
    }
}

export default userStore