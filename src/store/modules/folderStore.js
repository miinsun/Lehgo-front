import { axios } from '../index';

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
            axios.get(api).then(res => {
                commit('setFolderList', res.data);
            }).catch(function(error){
                console.log(error.response.data.message);
            });
        },
        addFolder: ({ commit, rootState, rootGetters }, payload) => {
            let api = rootState.domain + '/folder/new?name=' + payload
            axios.post(api, JSON.stringify({
                id : rootGetters['userStore/getUserId']
                }), {
                headers: { "Content-Type": 'application/json'
                }
            }).then(res => {
                commit('addFolder', res.data);
            })
        },
        addPlaceToFolder: ({ rootState }, payload) => {
            return new Promise(function() {
                let api = rootState.domain + '/folder/place/new?place=' +  payload.place.placeId + '&folder=' + payload.fId
                axios.get(api).then(() => {
                }).catch(function(error){
                    console.log(error.response.data.status)
                });
            })
        },
    }
}

export default folderStore