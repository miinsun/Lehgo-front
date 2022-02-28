import { axios } from '../index';

const courseStore = {
    namespaced: true,
    state: {
        categoryList : [ {}, {}, {} ],
    },
    getters: {
        getCategoryList : state => state.categoryList,
    },
    mutations: {
        setCategoryList : (state, payload) => {
            state.categoryList[payload.index] = { category : payload.category, list : payload.data }
        },
        addCategoryList : (state, payload) => {
            state.categoryList = payload
        },
    },
    actions: {
        setCategoryList: ({ commit, rootState, rootGetters }, payload) => {
            console.log(rootGetters['userStore/getUserId'])
            for (let i = 0; i < 3; i++){
                let api = rootState.domain + '/ai/category?category=' + payload[i]
                axios.post(api, JSON.stringify({
                    id : rootGetters['userStore/getUserId']
                    }), {
                    headers: { "Content-Type": 'application/json'
                    }
                }).then(res => {
                    console.log(res.data)
                    commit('setCategoryList', {index : i, data : res.data, category : payload[i]});
                }).catch(function(error){
                    console.log(error.response.data.message);
                });
            }
        },
        setNowCourse: ({ commit }, payload) => {
            commit('setNowCourse', payload);
        },
        addNowCourse: ({ commit }, payload) => {
            commit('addNowCourse', payload);
        },
    },
}

export default courseStore