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
        getUserNickName: state => state.setUserNickName,
        getLoginResult : state => state.loginResult,
        getErrorMessage: state => state.errorMessage,
        getAccessToken: state => state.accessToken,
    },
    mutations: {
        setUserId: (state, payload) => {
            state.userId = payload
        },
        setUserNickName: (state, payload) => {
            state.setUserNickName = payload
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
                axios.post(api, JSON.stringify({
                    id : payload.id,
                    password : payload.password,
                    nickname : ''
                }), {
                headers: { "Content-Type": 'application/json'
                }
                }).then(res => {
                    commit('setLoginResult', true);
                    commit('setErrorMessage', '');
                    commit('setAccessToken', res.headers.authorization);
                    commit('setUserId', res.data.username);
                    commit('setUserNickName',res.data.nickname);
                    axios.defaults.headers.common['authorization'] = res.headers.authorization;
                    resolve(true);
                }).catch(function(error){
                    commit('setLoginResult', false);
                    commit('setErrorMessage', error.response.data.message);
                });
            })
        },
        socialLogin: ({ commit, rootState }, payload) => {
            delete axios.defaults.headers.common["authorization"];
            return new Promise((resolve) => {
                let api = rootState.domain + '/oauth/' + payload.type + '/login?code=' + payload.code
                axios.get(api).then(res => {
                    commit('setLoginResult', true);
                    commit('setErrorMessage', '');
                    commit('setAccessToken', res.headers.authorization);
                    commit('setUserId', res.data.username);
                    commit('setUserNickName',res.data.nickname);
                    axios.defaults.headers.common['authorization'] = res.headers.authorization;
                    resolve(true);
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
    }
}

export default userStore