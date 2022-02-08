import axios from 'axios';

const placeStore = {
    namespaced: true,
    state: {
        place : null
    },
    getters: {
        getPlace : state => state.place,
        getId: state => state.place.PLACE_ID,
        getName: state => state.place.PLACE_NAME,
        getLat: state => state.place.LATITUDE,
        getLng: state => state.place.LONGITUDE,
        getAddress: state => state.place.ADDRESS,
        getTel: state => state.place.TEL,
        getTime: state => state.place.TIME,
        getContent: state => state.place.CONTENT,
        getLikeCount: state => state.place.LIKE_COUNT,
        getImg1: state => state.place.IMG1,
        getImg2: state => state.place.IMG2,
        getImg3: state => state.place.IMG3,
        getImg4: state => state.place.IMG4,
        getImgList: state => {
            let list = []
            if(state.place.IMG1 != '') { list.push(state.place.IMG1) }
            if(state.place.IMG2 != '') { list.push(state.place.IMG2) }
            if(state.place.IMG3 != '') { list.push(state.place.IMG3) }
            if(state.place.IMG4 != '') { list.push(state.place.IMG4) }
            return list
        },
    },
    mutations: {
        setPlace: (state, payload) => {
            state.place = payload
        },
        setLiked: (state, payload) => {
            state.place.liked = payload
        },
    },
    actions: {
        setPlace: ({ commit, rootState, rootGetters }, payload) => {
            return new Promise(function() {
                if(payload != null) {
                    let api = rootState.domain + '/place/mylist/'
                    axios.post(api, JSON.stringify({
                            id : rootGetters["userStore/getUserId"]
                        }), {
                            headers: { "Content-Type": 'application/json'
                        }
                    }).then(res => {
                        let isLiked = false;
                        for (let i in res.data){
                            if(payload.placeId == res.data[i].place.placeId){
                                isLiked = true
                            }
                        }
                        payload.liked = isLiked
                        commit('setPlace', payload);
                    }).then(() => {
                        let api = rootState.domain + '/place/visited/add?id=' + payload.placeId
                        axios.post(api, JSON.stringify({
                            id : rootGetters["userStore/getUserId"]
                        }), {
                            headers: { "Content-Type": 'application/json' } 
                        })
                    })
                }
                else{
                    commit('setPlace', null);
                }
            })
        },
        likePlace: ({ commit, rootState, rootGetters }, payload) => {
            return new Promise(function() {
                let api = rootState.domain + '/place/mylist/like?id=' + payload
                axios.post(api, JSON.stringify({
                        id : rootGetters["userStore/getUserId"]
                    }), {
                        headers: { "Content-Type": 'application/json'
                    }
                }).then(() => {
                    commit('setLiked', true);
                }).catch(function(error){
                    console.log(error.response.data.message);
                });
            })
        },
        dislikePlace: ({ commit, rootState, rootGetters }, payload) => {
            return new Promise(function() {
                let api = rootState.domain + '/place/mylist/delete?id=' + payload
                axios.post(api, JSON.stringify({
                        id : rootGetters["userStore/getUserId"]
                    }), {
                        headers: { "Content-Type": 'application/json'
                    }
                }).then(() => {
                    commit('setLiked', false);
                }).catch(function(error){
                    console.log(error.response.data.message);
                });
            })
        }
    }
}

export default placeStore