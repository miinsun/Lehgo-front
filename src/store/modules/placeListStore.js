import axios from 'axios'

const placeListStore = {
    namespaced: true,
    state: {
        likedList : [],
        visitedList : [],
        folderList : [],
    },
    getters: {
        getLikedList : state => state.likedList,
        getVisitedList : state => state.visitedList,
        getFolderList : state => state.folderList,
    },
    mutations: {
        addLikedPlace: (state, payload) => {
            state.likedList.push(payload)
        },
        setLikedList: (state, payload) => {
            state.likedList = payload
        },
        addVistiedPlace: (state, payload) => {
            state.visitedList.push(payload)
        },
        setVistiedList: (state, payload) => {
            state.visitedList = payload
        },
        addFolder: (state, payload) => {
            state.folderList.push(payload)
        },
        setFolderList: (state, payload) => {
            state.folderList = payload
        },
    },
    actions: {
        addLikedPlace: ({ commit }, payload) => {
            commit('addLikedPlace', payload);
        },
        addVistiedPlace: ({ commit }, payload) => {
            commit('addVistiedPlace', payload);
        },
        addFolder: ({ commit }, payload) => {
            // let folder = { name : payload.name, color : payload.color }
            // commit('addFolder', folder);
            commit('addFolder', payload);
        },
        removeLikedPlace: ({ commit, state }, payload) => {
            let newLikedList = state.likedList
            for (let i in newLikedList){
                if(newLikedList[i].PLACE_ID == payload.PLACE_ID){
                    newLikedList.splice(i, 1);
                }
            }
            commit('setLikedList', newLikedList);
        },
        removeVistiedPlace: ({ commit, state }, payload) => {
            let newVisitedList = state.visitedList
            for (let i in newVisitedList){
                if(newVisitedList[i].PLACE_ID == payload.PLACE_ID){
                    newVisitedList.splice(i, 1);
                }
            }
            commit('setVistiedList', newVisitedList);
        },
        removeFolder: ({ commit, state }, payload) => {
            let newFolderList = state.folderList
            for (let i in newFolderList){
                if(newFolderList[i] == payload){
                    newFolderList.splice(i, 1);
                }
            }
            // for (let i in newFolderList){
            //     // if(newFolderList[i].PLACE_NAME == payload.PLACE_NAME){
            //         newFolderList.splice(i, 1);
            //     }
            // }
            commit('setFolderList', newFolderList);
        },
        setLikedList: ({ commit, rootState, rootGetters }) => {
            let api = rootState.domain + '/place/mylist'
            axios.post(api, JSON.stringify({
                id : rootGetters['userStore/getUserId']
                }), {
                headers: { "Content-Type": 'application/json'
                }
                }).then(res => {
                    let likedList = []
                    for (let i in res.data){
                        likedList.push(res.data[i].place)
                    }
                    commit('setLikedList', likedList)
                })
        },
    }
}

export default placeListStore