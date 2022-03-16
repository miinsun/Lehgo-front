import { axios } from '../index';

//map에 표시될 placeList
const placeListStore = {
    namespaced: true,
    state: {
        loaded : false,
        likedCourse : false,
        folderId : null, //folder에서 리스트를 불러온 경우 저장
        courseId : null, //course에서 리스트를 불러온 경우 저장
        placeList : [],
        course : [],
        visitedList : [],
    },
    getters: {
        getLoaded : state => state.loaded,
        getLikedCourse : state => state.likedCourse,
        getPlaceList : state => state.placeList,
        getCourse : state => state.course,
        getCoursePlaceList : state => {
            if(state.course) {
                return state.course.coursePlace }
            else {
                return []}
        },
        getFolderId : state => state.folderId,
        getCourseId : state => state.courseId,
        getVisitedList : state => state.visitedList,
    },
    mutations: {
        setLoaded: (state, payload) => {
            state.loaded = payload
        },
        setPlaceList: (state, payload) => {
            state.placeList = payload;
            state.loaded = true
        },
        setCourse: (state, payload) => {
            state.course = payload
            state.loaded = true
        },
        setCoursePlace : (state, payload) => {
            state.course.coursePlace = payload
        }, 
        setFolderId : (state, payload) => {
            state.folderId = payload
        },
        setCourseId : (state, payload) => {
            state.courseId = payload
        },
        initList : (state) => {
            state.loaded = false
            state.course = null
            state.placeList = []
        },
        setLikedCourse : (state, payload) => {
            state.likedCourse = payload;
        }, 
        setVistiedList : (state, payload) => {
            state.visitedList = payload;
        }, 
        addVisitedList: (state, payload) => {
            state.visitedList.push(payload);
            state.visitedList.shift()
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
            let course;
            let api = rootState.domain + '/course?cid=' + payload
            return new Promise(function(resolve) {
                axios.get(api, {
                    headers: { "Content-Type": 'application/json'
                    }
                }).then(res => {
                    course = res.data
                    api = rootState.domain + '/course/detail?cid=' + payload
                    axios.get(api, {
                        headers: { "Content-Type": 'application/json'
                        }
                    })
                    .then(res => { 
                        course.coursePlace = res.data
                        dispatch('setCourse', course);
                    })
                    resolve(true)
                })
                .catch(function(){
                    commit('setCourse', null);
                    resolve(false)
                });
            })
        },
        setListByAI: ({ commit, rootState, rootGetters }) => {
            commit('initList');
            let api = rootState.domain + '/ai'
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
        setCourse : ({ commit, rootState, rootGetters }, payload) => {
            let api = rootState.domain + '/course/like?id=' + rootGetters["userStore/getUserId"]
            axios.get(api).then(res => {
                let isLiked = false;
                for (let i in res.data){
                    if(payload.courseId == res.data[i].courseId){
                        isLiked = true
                    }
                }
                commit('setLikedCourse', isLiked);
                commit('setCourseId', payload.courseId);
                commit('setCourse', payload);
            })
        },
        setVistiedList : ({ commit, rootState, rootGetters }) => {
            let api = rootState.domain + '/place/visited'
            axios.post(api, JSON.stringify({
                id : rootGetters['userStore/getUserId']
                }), {
                headers: { "Content-Type": 'application/json'
                }
            }).then(res => {
                commit('setVistiedList', res.data.slice(0, 3));
            }).catch(function(error){
                console.log(error.response.data.message);
            });
        },
        addVisitedList: ({ commit }, payload) => {
            commit('addVisitedList', payload);
        },
        
        //selectedCourse
        editCourse: ({ commit, rootState}, payload) => {
            commit('initList');
            commit('setCourseId', payload);
            let api = rootState.domain + '/course/update'
            axios.put(api, JSON.stringify( payload ), {
                headers: { "Content-Type": 'application/json'
                }
            }).then(() => {
                commit('setCourse', payload);
            })
        },
        deleteCourse: ({ state, rootState, rootGetters }) => {
            let api = rootState.domain + '/course/delete?cid=' + state.courseId
            axios.delete(api, JSON.stringify({
                id : rootGetters['userStore/getUserId']
                }), {
                headers: { "Content-Type": 'application/json'
                }
            })
        },

        //selectedFolder
        editFolder: ({ state, rootState, rootGetters }, payload) => {
            let api = rootState.domain + '/folder/update?id='+ state.folderId + '&name=' + payload
            axios.put(api, JSON.stringify({
                id : rootGetters['userStore/getUserId']
                }), {
                headers: { "Content-Type": 'application/json'
                }
            });
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

        //deletePlaceFrom...
        deletePlaceFromFolder: ({ state, rootState, dispatch }, paylaod) => {
            let api = rootState.domain + '/folder/place/delete?place=' + paylaod + '&folder=' + state.folderId
            axios.get(api)
            .then(() => {
                dispatch('setListByFolder', state.folderId)
            })
        },
        deletePlaceFromCourse: ({ state, rootState, dispatch }, paylaod) => {
            let api = rootState.domain + '/course/detail/delete?cid=' + state.courseId + '&pid=' + paylaod
            axios.get(api)
            .then(() => {
                dispatch('setListByCourse', state.courseId)
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

        //like dislike course
        likeCourse: ({ commit, state, rootState, rootGetters }) => {
            return new Promise(function() {
                let api = rootState.domain + '/course/like?cid=' + state.courseId
                axios.post(api, JSON.stringify({
                        id : rootGetters["userStore/getUserId"]
                    }), {
                        headers: { "Content-Type": 'application/json'
                    }
                }).then(() => {
                    commit('setLikedCourse', true);
                }).catch(function(error){
                    console.log(error.response.data.status)
                });
            })
        },
        dislikeCourse: ({ commit, state, rootState, rootGetters }) => {
            return new Promise(function() {
                let api = rootState.domain + '/course/dislike?cid=' + state.courseId
                axios.post(api, JSON.stringify({
                        id : rootGetters["userStore/getUserId"]
                    }), {
                        headers: { "Content-Type": 'application/json'
                    }
                }).then(() => {
                    commit('setLikedCourse', false);
                }).catch(function(error){
                    console.log(error.response.data.status)
                });
            })
        },
    }
}

export default placeListStore