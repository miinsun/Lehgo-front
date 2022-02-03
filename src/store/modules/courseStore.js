
const courseStore = {
    namespaced: true,
    state: {
        placeList : [{ name: '장소1', id: 1 }, { name: '장소2', id: 2 }, { name: '장소3', id: 3 }, { name: '장소4', id: 4 }]
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