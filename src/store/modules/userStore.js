import axios from 'axios'

const userStore = {
    namespaced: true,
    state: {
        token : '',
        userId : '',
        userName: '',
        loginResult : false,
        errorMessage: ''
    },
    getters: {
        getAccessToken : state => state.token,
        getUserId : state => state.userId,
        getUserName: state => state.userName,
        getLoginResult : state => state.loginResult,
        getErrorMessage: state => state.errorMessage
    },
    mutations: {
        setToken: (state, payload) => {
            state.token = payload
        },
        setUserId: (state, payload) => {
            state.userId = payload.userId
        },
        setUserName: (state, payload) => {
            state.userName = payload.userName
        },
        setLoginResult : (state, payload) => {
            state.loginResult = payload
        },
        setErrorMessage: (state, payload) => {
            state.errorMessage = payload
        }
    },
    actions: {
        setUserId: ({ commit }, payload) => {
            commit('setUserId', payload)
        },
        setUserName: ({ commit }, payload) => {
            commit('setUserName', payload)
        },
        postLogin: ({ commit, rootState }, payload) => {
            let api = rootState.domain + '/user'
            axios.post(api, JSON.stringify({
              id : payload.id,
              password : payload.password
            }), {
              headers: { "Content-Type": 'application/json'
              }
            }).then(res => {
                console.log("Login Success");
                commit('setLoginResult', true);
                commit('setToken', res.headers.authorization);
                commit('setErrorMessage', '');
            }).catch(function(error){
                console.log("Login Fail");
                commit('setLoginResult', false);
                commit('setErrorMessage', error.response.data.message);
            });
        },
        initLogin: ({ commit }) => {
            commit('setLoginResult', true);
            commit('setErrorMessage', '');
        }
    }
}

export default userStore