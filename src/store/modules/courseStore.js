import { axios } from '../index';

const courseStore = {
    namespaced: true,
    state: {
        courseList : [],
        nowCourse : []
    },
    getters: {
        getCourseList : state => state.courseList,
        getNowCourse : state => state.nowCourse,
    },
    mutations: {
        setCourseList : (state, payload) => {
            state.courseList = payload
        },
        setNowCourse: (state, payload) => {
            state.nowCourse = payload
        },
        addNowCourse: (state, payload) => {
            state.nowCourse.push(payload)
        },
    },
    actions: {
        setCourseList: ({ commit, rootState, rootGetters }) => {
            let api = rootState.domain + '/course/list?user=' + rootGetters['userStore/getUserId']
            axios.get(api).then(res => {
                commit('setCourseList', res.data);
            }).catch(function(error){
                console.log(error.response.data.message);
            });
        },
        setNowCourse: ({ commit }, payload) => {
            commit('setNowCourse', payload);
        },
        addNowCourse: ({ commit }, payload) => {
            let placeElement = { place : payload }
            commit('addNowCourse', placeElement);
        },
    },
}

export default courseStore