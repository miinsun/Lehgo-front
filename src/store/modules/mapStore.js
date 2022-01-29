import axios from 'axios'

const mapStore = {
    namespaced: true,
    state: {
        lat: '',
        lng: '',
    },
    getters: {
        getLat : state => state.lat,
        getLng: state => state.lng,
    },
    mutations: {
        setLat: (state, payload) => {
            state.lat = payload
        },
        setLng: (state, payload) => {
            state.lng = payload
        },
    },
    actions: {
        // postLogin: ({ commit, rootState }, payload) => {
        //         return new Promise((resolve) => {
        //             let api = rootState.domain + '/user'
        //             axios.post(api, JSON.stringify({
        //             id : payload.id,
        //             password : payload.password
        //             }), {
        //             headers: { "Content-Type": 'application/json'
        //             }
        //             }).then(res => {
        //                 commit('setLoginResult', true);
        //                 commit('setErrorMessage', '');
        //                 commit('setUserId', res.data);
        //                 VueCookie.set('accessToken', res.headers.authorization);
        //                 axios.defaults.headers.common["authorization"] = res.headers.authorization;
        //                 resolve(true);
        //             }).catch(function(error){
        //                 commit('setLoginResult', false);
        //                 commit('setErrorMessage', error.response.data.message);
        //             });
        //     })
        // },
        setLocation: ({ commit }, payload) => {
            commit('setLat', payload.lat);
            commit('setLat', payload.lng);
        },
        openSideArea: ({ commit }, payload) => {
            commit('setLat', payload.lat);
            commit('setLat', payload.lng);
        }
    }
}

export default mapStore