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
}

export default new placeListService()
