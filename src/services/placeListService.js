import axios from 'axios'
import store from '../store';
const domain = store.state.domain;
const userId = store.getters["userStore/getUserId"]

class placeListService{
    getLikedList() {
        return new Promise(function(resolve) {
            let api = domain + '/place/mylist/'
            axios.post(api, JSON.stringify({
                    id : userId
                }), {
                    headers: { "Content-Type": 'application/json'
                }
            }).then(res => {
                resolve(res.data);
            }).catch(function(error){
                console.log(error.response.data.message);
            });
        })
    }
    getVisitedList() {
        return new Promise(function(resolve) {
            let api = domain + '/place/visited'
            axios.post(api, JSON.stringify({
                    id : userId
                }), {
                    headers: { "Content-Type": 'application/json'
                }
            }).then(res => {
                resolve(res.data);
            }).catch(function(error){
                console.log(error.response.data.message);
            });
        })
    }
    deleteVisitPlace(placeId){
        return new Promise(function(resolve) {
            let api = domain + '/place/visited/delete?id=' + placeId
            axios.post(api, JSON.stringify({
                    id : userId
                }), {
                    headers: { "Content-Type": 'application/json'
                }
            }).then(() => {
                resolve(true);
            }).catch(function(error){
                console.log(error.response.data.message);
            });
        })
    }
    getSearchList(keyword) {
        return new Promise(function(resolve) {
            let api = domain + '/place/search/content?content=' + keyword
            console.log(api)
            axios.get(api, {
                headers: { 
                    "Content-Type": 'application/json',
                }
            }).then(res => {
                resolve(res.data);
            }).catch(function(error){
                console.log(error.response.data.message);
            });
        })
    }
}

export default new placeListService()
