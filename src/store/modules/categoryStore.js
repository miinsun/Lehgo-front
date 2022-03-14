import { axios } from '../index';

const courseStore = {
    namespaced: true,
    state: {
        keyword : 0,
        mainCategory : [0, 1, 2],
        categoryList : [
            {category : '식당', placeList : []}, 
            {category : '카페/디저트/술', placeList : []}, 
            {category : '바다', placeList : []}, 
            {category : '액티비티', placeList : []}, 
            {category : '문화', placeList : []}, 
            {category : '힐링', placeList : []}, 
            {category : '포토스팟', placeList : []}, 
        ],
    },
    getters: {
        getKeyword : state => state.keyword,
        getMainCategory : state => state.mainCategory,
        getCategoryList : state => state.categoryList,
    },
    mutations: {
        setKeyword : (state, payload) => {
            state.keyword = payload
        },
        setCategoryList : (state, payload) => {
            state.categoryList = payload
        },
        addCategoryList : (state, payload) => {
            state.categoryList = payload
        },
    },
    actions: {
        setCategoryList: ({ commit, state, rootState, rootGetters }, payload) => {
            let categoryList = state.categoryList;
            for (let i = 0; i < 2; i++){
                let api = rootState.domain + '/ai?category=' + state.categoryList[i].category;
                axios.post(api, JSON.stringify({
                    id : rootGetters['userStore/getUserId']
                    }), {
                    headers: { "Content-Type": 'application/json'
                    }
                }).then(res => {
                    let placeList = []
                    for (let i in res.data){
                        placeList.push(res.data[i].place)
                    }
                    categoryList[i].placeList = placeList;
                }).catch(function(error){
                    console.log(error.response.data.message);
                });
            }
            for (let i = 2; i < 7; i++){
                let api = rootState.domain + '/place/search/category?category=' + state.categoryList[i].category;
                axios.get(api).then(res => {
                    categoryList[i].placeList = res.data;
                }).catch(function(error){
                    console.log(error.response.data.message);
                });
            }
            commit('setCategoryList', categoryList);
            commit('setKeyword', payload);
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