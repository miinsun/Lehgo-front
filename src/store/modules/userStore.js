import axios from 'axios'
import VueCookie from 'vue-cookie'

const userStore = {
    namespaced: true,
    state: {
        userId : '',
        userName: '',
        loginResult : false,
        errorMessage: ''
    },
    getters: {
        getUserId : state => state.userId,
        getUserName: state => state.userName,
        getLoginResult : state => state.loginResult,
        getErrorMessage: state => state.errorMessage
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
        }
    },
    actions: {
        postLogin: ({ commit, rootState }, payload) => {
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
                        VueCookie.set('accessToken', res.headers.authorization);
                        axios.defaults.headers.common["authorization"] = res.headers.authorization;
                        resolve(true);
                    }).catch(function(error){
                        commit('setLoginResult', false);
                        commit('setErrorMessage', error.response.data.message);
                    });
            })
        },
        postLogout:({ commit }) => {
            commit('setUserId', '');
            VueCookie.set('accessToken', null);
            delete axios.defaults.headers.common["authorization"];
        },
        initLogin: ({ commit }) => {
            commit('setLoginResult', true);
            commit('setErrorMessage', '');
        },
    }
}

export default userStore