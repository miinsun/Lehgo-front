//저장되지 않은, 메인 페이지 내 반환 코스 Store
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
        setPlaceList: ({ commit }, payload) => {
            commit('setPlaceList', payload);
        },
        addPlaceList: ({ commit }, payload) => {
            let placeElement = { place : payload }
            commit('addPlaceList', placeElement);
        },
    },
}

export default courseStore