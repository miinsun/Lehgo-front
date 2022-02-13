import { axios } from '../index';

//map에 표시될 placeList
const placeListStore = {
    namespaced: true,
    state: {
        loaded : false,
        placeList : [],
    },
    getters: {
        getLoaded : state => state.loaded,
        getPlaceList : state => state.placeList,
    },
    mutations: {
        setLoaded: (state, payload) => {
            state.loaded = payload
        },
        setPlaceList: (state, payload) => {
            state.placeList = payload
            state.loaded = true
        },
        initList : (state) => {
            state.loaded = false
            state.placeList = null
        },
    },
    actions: {
        setPlaceList : ({ commit }, payload) => {
            commit('setPlaceList', payload);
        },
        setListByLiked: ({ commit, rootState, rootGetters }) => {
            commit('initList');
            let api = rootState.domain + '/place/mylist'
            axios.post(api, JSON.stringify({
                id : rootGetters['userStore/getUserId']
                }), {
                headers: { "Content-Type": 'application/json'
                }
            }).then(res => {
                commit('setPlaceList', res.data);
                
            }).catch(function(error){
                console.log(error.response.data.message);
            });
        },
        setListBySearch : ({ commit, rootState }, payload) => {
            commit('initList');
            let api = rootState.domain + '/place/search/content?content='+ payload
            axios.get(api, {
                headers: { "Content-Type": 'application/json'
                }
            }).then(res => {
                //임시
                let placeList = []
                for (let i in res.data){
                    placeList.push({place : res.data[i]})
                }
                commit('setPlaceList', placeList);
                
            }).catch(function(error){
                console.log(error.response.data.message);
            });
        },
        setListByVisited : ({ commit, rootState, rootGetters }) => {
            commit('initList');
            let api = rootState.domain + '/place/visited'
            axios.post(api, JSON.stringify({
                id : rootGetters['userStore/getUserId']
                }), {
                headers: { "Content-Type": 'application/json'
                }
            }).then(res => {
                commit('setPlaceList', res.data);
            }).catch(function(error){
                console.log(error.response.data.message);
            });
        },
        setListByFolder : ({ commit, rootState }, payload) => {
            commit('initList');
            let api = rootState.domain + '/folder/place/list?folder=' + payload
            axios.get(api, {
                headers: { "Content-Type": 'application/json'
                }
            }).then(res => {
                commit('setPlaceList', res.data);
            }).catch(function(error){
                console.log(error.response.data.message);
            });
        },
    }
}

export default placeListStore