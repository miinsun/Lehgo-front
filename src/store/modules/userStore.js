import { axios } from '../index';

const userStore = {
    namespaced: true,
    state: {
        userId : '',
        userName: '',
        loginResult : false,
        errorMessage: '',
        accessToken : '',
    },
    getters: {
        getUserId : state => state.userId,
        getUserName: state => state.userName,
        getLoginResult : state => state.loginResult,
        getErrorMessage: state => state.errorMessage,
        getAccessToken: state => state.accessToken,
        getUserInfo: (state) => {
                let api = 'http://localhost:8080' + '/users/' + state.userId
                axios.defaults.headers.common['authorization'] = state.accessToken;
                axios.get(api, {
                        headers: { 
                            "Content-Type": 'application/json',
                    }
                }).then(res => {
                   console.log(res.data)
                }).catch(function(error){
                    console.log(error.response.data.status)
                })
            }
    },
    mutations: {
        setUserId: (state, payload) => {
            state.userId = payload
        },
        setUserName: (state, payload) => {
            state.userName = payload
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
        postLogin: ({ commit, rootState }, payload) => {
                delete axios.defaults.headers.common["authorization"];
                return new Promise((resolve) => {
                    let api = rootState.domain + '/user'
                    axios.post(api, JSON.stringify({
                        id : payload.id,
                        password : payload.password
                    }), {
                    headers: { "Content-Type": 'application/json'
                    }
                    }).then(res => {
                        commit('setLoginResult', true);
                        commit('setErrorMessage', '');
                        commit('setUserId', res.data);
                        commit('setAccessToken', res.headers.authorization);
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