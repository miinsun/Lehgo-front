import { axios } from '../index';

//map에 표시될 placeList
const placeListStore = {
    namespaced: true,
    state: {
        loaded : false,
        folderId : null, //folder에서 리스트를 불러온 경우 저장
        courseId : null, //course에서 리스트를 불러온 경우 저장
        placeList : [],
        coursePlaceList : []
    },
    getters: {
        getLoaded : state => state.loaded,
        getPlaceList : state => state.placeList,
        getCoursePlaceList : state => state.coursePlaceList,
        getFolderId : state => state.folderId,
        getCourseId : state => state.courseId,
    },
    mutations: {
        setLoaded: (state, payload) => {
            state.loaded = payload
        },
        setPlaceList: (state, payload) => {
            state.placeList = payload
            state.loaded = true
        },
        setCoursePlaceList: (state, payload) => {
            state.coursePlaceList = payload
            state.loaded = true
        },
        setFolderId : (state, payload) => {
            state.folderId = payload
        },
        setCourseId : (state, payload) => {
            state.courseId = payload
        },
        initList : (state) => {
            state.loaded = false
            state.coursePlaceList = []
            state.placeList = []
        },
    },
    actions: {
        setPlaceList : ({ commit }, payload) => {
            commit('setPlaceList', payload);
        },
        setListByLiked: ({ commit, rootState, rootGetters }) => {
            commit('initList');
            let api = rootState.domain + '/place/mylist'
            axios.post(api, JSON.stringify({
                id : rootGetters['userStore/getUserId']
                }), {
                headers: { "Content-Type": 'application/json'
                }
            }).then(res => {
                commit('setPlaceList', res.data);
                
            }).catch(function(error){
                console.log(error.response.data.message);
            });
        },
        setListBySearchAll : ({ commit, rootState }, payload) => {
            commit('initList');
            let api = rootState.domain + '/place/search/all?query='+ payload
            axios.get(api, {
                headers: { "Content-Type": 'application/json'
                }
            }).then(res => {
                let placeList = []
                for (let i in res.data){
                    placeList.push({place : res.data[i]})
                }
                commit('setPlaceList', placeList);
            }).catch(function(error){
                console.log(error.response.data.message);
            });
        },
        setListBySearchName : ({ commit, rootState }, payload) => {
            commit('initList');
            let api = rootState.domain + '/place/search/name?name='+ payload
            axios.get(api, {
                headers: { "Content-Type": 'application/json'
                }
            }).then(res => {
                let placeList = []
                for (let i in res.data){
                    placeList.push({place : res.data[i]})
                }
                commit('setPlaceList', placeList);
                
            }).catch(function(error){
                console.log(error.response.data.message);
            });
        },
        setListBySearchContent : ({ commit, rootState }, payload) => {
            commit('initList');
            let api = rootState.domain + '/place/search/content?content='+ payload
            axios.get(api, {
                headers: { "Content-Type": 'application/json'
                }
            }).then(res => {
                let placeList = []
                for (let i in res.data){
                    placeList.push({place : res.data[i]})
                }
                commit('setPlaceList', placeList);
                
            }).catch(function(error){
                console.log(error.response.data.message);
            });
        },
        setListBySearchArea : ({ commit, rootState }, payload) => {
            commit('initList');
            let api = rootState.domain + '/place/search/area?area='+ payload
            axios.get(api, {
                headers: { "Content-Type": 'application/json'
                }
            }).then(res => {
                let placeList = []
                for (let i in res.data){
                    placeList.push({place : res.data[i]})
                }
                commit('setPlaceList', placeList);
                
            }).catch(function(error){
                console.log(error.response.data.message);
            });
        },
        setListByVisited : ({ commit, rootState, rootGetters }) => {
            commit('initList');
            let api = rootState.domain + '/place/visited'
            axios.post(api, JSON.stringify({
                id : rootGetters['userStore/getUserId']
                }), {
                headers: { "Content-Type": 'application/json'
                }
            }).then(res => {
                commit('setPlaceList', res.data);
            }).catch(function(error){
                console.log(error.response.data.message);
            });
        },
        setListByFolder : ({ commit, rootState }, payload) => {
            commit('initList');
            commit('setFolderId', payload);
            let api = rootState.domain + '/folder/place/list?folder=' + payload
            axios.get(api, {
                headers: { "Content-Type": 'application/json'
                }
            }).then(res => {
                commit('setPlaceList', res.data);
            }).catch(function(error){
                console.log(error.response.data.message);
            });
        },
        setListByCourse : ({ commit, dispatch, rootState }, payload) => {
            commit('initList');
            commit('setCourseId', payload);
            let api = rootState.domain + '/course?cid=' + payload
            axios.get(api, {
                headers: { "Content-Type": 'application/json'
                }
            }).then(res => {
                dispatch('setCoursePlaceList', res.data.coursePlace);
            }).catch(function(error){
                console.log(error.response.data.message);
            });
        },
        setCoursePlaceList : ({ commit }, payload) => {
            commit('setCoursePlaceList', payload);
        },
        
        //selectedFolder
        editFolder: ({ commit, rootState, rootGetters }, payload) => {
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
        deleteFolder: ({ state, rootState, rootGetters }) => {
            let api = rootState.domain + '/folder/delete?id=' + state.folderId
            axios.post(api, JSON.stringify({
                id : rootGetters['userStore/getUserId']
                }), {
                headers: { "Content-Type": 'application/json'
                }
            })
        },
        deletePlaceFromFolder: ({ state, rootState, dispatch }, paylaod) => {
            let api = rootState.domain + '/folder/place/delete?place=' + paylaod + '&folder=' + state.folderId
            axios.get(api)
            .then(() => {
                dispatch('setListByFolder', state.folderId)
            })
        },
        deletePlaceFromLiked: ({ rootGetters, rootState, dispatch }, paylaod) => {
            let api = rootState.domain + '/place/mylist/delete?id=' + paylaod
            axios.post(api, JSON.stringify({
                id : rootGetters['userStore/getUserId']
                }), {
                headers: { "Content-Type": 'application/json'
                }
            }).then(() => {
                dispatch('setListByLiked')
            })
        },
        deletePlaceFromVisited: ({ rootGetters, rootState, dispatch }, paylaod) => {
            let api = rootState.domain + '/place/visited/delete?id=' + paylaod
            axios.post(api, JSON.stringify({
                id : rootGetters['userStore/getUserId']
                }), {
                headers: { "Content-Type": 'application/json'
                }
            }).then(() => {
                dispatch('setListByVisited')
            })
        },
    }
}

export default placeListStore