import { axios } from '../index';

//상단에서 다뤄지는 코스
const courseStore = {
    namespaced: true,
    state: {
        loaded : false,
        coursePage : false,
        courseList : [],
        mainCourse : {}
    },
    getters: {
        getLoaded : state => state.loaded,
        getCourseList : state => state.courseList,
        getMainCourse : state => state.mainCourse,
    },
    mutations: {
        setLoaded : (state, payload) => {
            state.loaded = payload;
        }, 
        setCoursePage : (state, payload) => {
            state.coursePage = payload;
        },
        setCourseList : (state, payload) => {
            state.courseList = payload;
        },
        addCourse: (state, payload) => {
            state.courseList.push(payload);
        },
        addMainCoursePlace: (state, payload) => { 
            state.mainCourse.coursePlace.splice(0, 0, { placeId : payload.placeId, place : payload })
            state.loaded = true;
        },
        addPlaceToCourse: (state, payload) => { 
            state.mainCourse.coursePlace.push({
                courseId : state.mainCourse.courseId,
                placeId : payload.placeId,
                priority : state.mainCourse.coursePlace.length,
                place : payload});
        },
        setMainCourse: (state, payload) => {
            state.mainCourse = payload;
            state.loaded = true;
        },
        setMainCoursePlace: (state, payload) => {
            state.mainCourse.coursePlace = payload;
            state.loaded = true;
        },
        setMainCourseInfo : (state, payload) => {
            state.mainCourse.courseId = payload.courseId;
            state.mainCourse.courseName = payload.courseName;
            state.mainCourse.visibility = payload.visibility;
            state.mainCourse.editable = payload.editable;
            state.mainCourse.userId = payload.userId;
        },
        initMainCourse: (state) => {
            state.mainCourse = { 
                "coursePlace" : 
                    [{
                    "placeId": 13,
                    "priority": 1,
                    "place":{
                        placeId : 2569,
                        placeName : '부산역',
                        latitude : 35.11527763852661,
                        longitude : 129.04223978515628,
                        address : '부산광역시 동구 초량3동 중앙대로',
                        tel : '1544-7788',
                        time : '',
                        content : '',
                        like_count : 0,
                        img1 : '',
                        }
                    }],
                "visibility": 1,
                "editable": 1,
                "likeCount": 0,
                "courseName": "임시 코스"
            }
        }
    },
    actions: {
        setCoursePage : ({ commit }, payload) => {
            commit('setCoursePage', payload);
        },
        setCourseList: ({ commit, rootState, rootGetters }) => {
            let api = rootState.domain + '/course/list?user=' + rootGetters['userStore/getUserId']
            axios.get(api).then(res => {
                commit('setCourseList', res.data);
            }).catch(function(error){
                console.log(error.response.data.message);
            });
        },
        setMainCourseById : ({ commit, state, rootState, dispatch }, payload) => {
            commit('setLoaded', false);
            let api = rootState.domain + '/course?cid=' + payload
            let mainCourse;
            axios.get(api, {
                headers: { "Content-Type": 'application/json'
                }
            }).then(res => {
                mainCourse = res.data
                api = rootState.domain + '/course/detail?cid=' + payload
                axios.get(api, {
                    headers: { "Content-Type": 'application/json'
                    }
                })
                .then(res => { 
                    mainCourse.coursePlace = res.data;
                    commit('setMainCourse', mainCourse);
                    if(!state.coursePage){
                      dispatch('placeListStore/setCourse', mainCourse, {root : true})
                    }
                })
            }).catch(function(error){
                console.log(error.response.data.message);
            });
        },
        addCourse: ({ commit, rootState, rootGetters, dispatch }, payload) => { //새로운 코스를 DB에 저장
            let api = rootState.domain + '/course/new?name=' + payload.courseName
            axios.post(api, {
                id : rootGetters['userStore/getUserId']
                }, {
                headers: { "Content-Type": 'application/json'
                }
            }).then(res => {
                commit('addCourse', res.data);
                payload.courseId = res.data.courseId
                payload.userId = rootGetters['userStore/getUserId']
                commit('setMainCourseInfo', payload);
                dispatch('saveMainCourseSeq', res.data.courseId)
            })
        },
        addPlaceToCourse: ({ commit }, payload) => {
            commit('addPlaceToCourse', payload);
        },
        addMainCoursePlace: ({ commit }, payload) => { //코스 리스트에 장소 추가 (개인 장소 등록)
            commit('setLoaded', false);
            commit('addMainCoursePlace', payload);
        },
        setMainCoursePlace: ({ commit }, payload) => { //코스 리스트를 store에 저장
            commit('setLoaded', false);
            commit('setMainCoursePlace', payload);
        },
        setMainCourse: ({ commit }, payload) => { //코스를 store에 저장
            commit('setMainCourse', payload);
        },
        saveMainCourseSeq: ({ rootState, state }, payload) => { //코스 순서를 DB에 저장
            let status = true;
            for (let c in state.mainCourse.coursePlace){
                state.mainCourse.coursePlace[c].courseId = payload
                state.mainCourse.coursePlace[c].placeId = state.mainCourse.coursePlace[c].place.placeId
                state.mainCourse.coursePlace[c].priority = Number(c) + 1
            }
            let addCourse = { 
                courseId : state.mainCourse.courseId,
                courseName :  state.mainCourse.courseName,
                editable : state.mainCourse.editable,
                likeCount : 0,
                userId : state.mainCourse.userId,
                visibility : state.mainCourse.visibility
            }
            let api = rootState.domain + '/course/update'
            axios.put(api, addCourse, {
                headers: { "Content-Type": 'application/json'
                }
            }).then(() => { 
                for (let c in state.mainCourse.coursePlace){
                    let api = rootState.domain + '/course/detail/update'
                    let cp = state.mainCourse.coursePlace[c]
                    let place = {   
                        courseId : payload,
                        placeId : cp.place.placeId,
                        priority : Number(c) + 1,
                        place : cp.place 
                    }
                    axios.put(api, place, {
                        headers: { "Content-Type": 'application/json'
                        }
                    }).catch(() => { status = false; })
                }
            })
            return status;
        },
        setCourseListByAll: ({ commit, rootState }) => {
            let api = rootState.domain + '/course/all'
            axios.get(api).then(res => {
                commit('setCourseList', res.data);
            }).catch(function(error){
                console.log(error.response.data.message);
            });
        },
        initMainCourse: ({ commit }) => {
            commit('initMainCourse');
        }
    },
}

export default courseStore