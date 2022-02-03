
const courseStore = {
    namespaced: true,
    state: {
        placeList : []
    },
    getters: {
        getPlaceList : state => state.placeList,
    },
    mutations: {
        setPlaceList: (state, payload) => {
            state.placeList = payload
        },
        addPlaceList: (state, payload) => {
            state.placeList.push(payload)
        },
    },
    actions: {
        addPlaceList: ({ commit }, payload) => {
            commit('addPlaceList', payload);
        },
        setPlaceList: ({ commit }, payload) => {
            commit('setPlaceList', payload);
        },
    },
}

export default courseStore