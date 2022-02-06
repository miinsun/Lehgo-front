// import axios from 'axios'

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
    },
    actions: {
        setPlace: ({ commit }, payload) => {
            commit('setPlace', payload);
        },
    }
}

export default placeStore