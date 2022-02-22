import { axios } from '../index';

//선택한 place
const placeStore = {
    namespaced: true,
    state: {
        place : null,
    },
    getters: {
        getPlace : state => state.place,
        getId: state => state.place.placeId,
        getName: state => state.place.placeName,
        getTel : state => {
            if(state.place.tel) { return state.place.tel }
            else { return "-" }
        },
        getTime : state => {
            if(state.place.time) { return state.place.time }
            else { return "-" }
        },
        getImg1: state => state.place.img1,
        getImgList: state => {
            let list = []
            if(state.place.img1) { list.push(state.place.img1) }
            if(state.place.img2) { list.push(state.place.img2) }
            if(state.place.img3) { list.push(state.place.img3) }
            if(state.place.img4) { list.push(state.place.img4) }
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
                    console.log(error.response.data.status)
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
                    console.log(error.response.data.status)
                });
            })
        },
        addPlaceToFolder: ({ state, rootState }, payload) => {
            return new Promise(function() {
                let api = rootState.domain + '/folder/place/new?place=' +  state.place.placeId + '&folder=' + payload
                axios.get(api).then(() => {
                }).catch(function(error){
                    console.log(error.response.data.status)
                });
            })
        },
        checkPlaceInFolder : ({ state, rootState }, payload) => {
            return new Promise(function() {
                let api = rootState.domain + '/folder/place/list?folder=' + payload
                axios.get(api).then((res) => {
                    for (let i in res.data){
                        if(res.data[i].placeId == state.place.placeId){
                            //
                        }
                    }
                }).catch(function(error){
                    console.log(error.response.data.status)
                });
            })
        },
        addPlaceToCourse: ({ state, rootState }, payload) => {
            return new Promise(function() {
                let api = rootState.domain + '/course/detail/new?cid=' +  payload + '&pid=' + state.place.placeId
                axios.get(api).then(() => {
                }).catch(function(error){
                    console.log(error.response.data.status)
                });
            })
        },
        addUserPlace: ({ rootGetters, rootState }, payload) => {
            
            console.log(payload)
            return new Promise(function(resolve) {
                let api = rootState.domain  + '/open/naver/map?query=' + payload.address
                axios.get(api)
                .then(res => {
                    let api = rootState.domain  + '/place/new?id=' + rootGetters["userStore/getUserId"]
                    console.log(res.data.addresses[0].x)
                    axios.post(api, JSON.stringify({
                        userId : rootGetters["userStore/getUserId"],
                        placeName : payload.name,
                        address : payload.address,
                        latitude : res.data.addresses[0].y,
                        longitude : res.data.addresses[0].x
                    }), {
                        headers: { "Content-Type": 'application/json'
                        }
                    }).then(res => {
                        resolve(res.data)
                        console.log(res.data)
                    }).catch(function(error){
                        console.log(error.response.data)
                    });
                })
            })
        },
    },
}

export default placeStore