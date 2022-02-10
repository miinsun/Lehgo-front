import axios from 'axios'

//map에 표시될 placeList
const placeListStore = {
    namespaced: true,
    state: {
        placeList : [],
    },
    getters: {
        getPlaceList : state => state.placeList,
    },
    mutations: {
        setPlaceList: (state, payload) => {
            state.placeList = payload
        },
    },
    actions: {
        setPlaceList : ({ commit }, payload) => {
            commit('setPlaceList', payload);
        },
        setListByLiked: ({ commit, rootState, rootGetters }) => {
            let api = rootState.domain + '/place/mylist'
            axios.post(api, JSON.stringify({
                id : rootGetters['userStore/getUserId']
                }), {
                headers: { "Content-Type": 'application/json'
                }
            }).then(res => {
                commit('setPlaceList', res.data);
            })
        },
        setListBySearch : ({ commit, rootState }, payload) => {
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
            })
        },
        setListByVisited : ({ commit, rootState, rootGetters }) => {
            let api = rootState.domain + '/place/visited'
            axios.post(api, JSON.stringify({
                id : rootGetters['userStore/getUserId']
                }), {
                headers: { "Content-Type": 'application/json'
                }
            }).then(res => {
                console.log(res.data)
                commit('setPlaceList', res.data);
            })
        },
    }
}

export default placeListStore