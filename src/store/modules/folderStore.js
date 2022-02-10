import axios from 'axios'

//map에 표시될 placeList
const folderStore = {
    namespaced: true,
    state: {
        folderList : [],
    },
    getters: {
        getFolderList : state => state.folderList,
    },
    mutations: {
        setFolderList: (state, payload) => {
            state.folderList = payload
        },
        addFolder: (state, payload) => {
            state.folderList.push(payload)
        },
    },
    actions: {
        setFolderList : ({ commit, rootState, rootGetters }) => {
            let api = rootState.domain + '/folder/list?user=' + rootGetters['userStore/getUserId']
            axios.get(api, {
                headers: { "Content-Type": 'application/json'
                }
            }).then(res => {
                commit('setFolderList', res.data);
            })
        },
        addFolder: ({ commit, rootState, rootGetters }, payload) => {
            let api = rootState.domain + '/folder/new?name=' + payload
            axios.post(api, JSON.stringify({
                id : rootGetters['userStore/getUserId']
                }), {
                headers: { "Content-Type": 'application/json'
                }
            }).then(res => {
                commit('addFolder', res.data.folderName);
            })
        },
    }
}

export default folderStore