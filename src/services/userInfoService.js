import { axios } from '../store';
import store from '../store';

const domain = store.state.domain

class userInfoService{
    checkId(userId) {
        return new Promise(function(resolve) {
            let api = domain + '/exists/id/' + userId
            axios.post(api, JSON.stringify({
                    userId : userId
                }), {
                    headers: { "Content-Type": 'application/json'
                }
            }).then(res => {
                if(res.data == 0){ resolve(false); }
                else{ resolve(true); }
            }).catch(function(error){
                console.log('setErrorMessage', error.response.data.message);
            });
        })
    }
    checkEmail(email) {
        return new Promise(function(resolve) {
            let api = domain + '/exists/email/' + email
            axios.post(api, JSON.stringify({
                email : email
                }), {
                    headers: { "Content-Type": 'application/json'
                }
            }).then(res => {
                if(res.data == 0){ resolve(false); }
                else{ resolve(true); }
            }).catch(function(error){
                console.log('setErrorMessage', error.response.data.message);
            });
        })
    }
    checkNickname(nickname) {
        return new Promise(function(resolve) {
            let api = domain + '/exists/nickname/' + nickname
            axios.post(api, JSON.stringify({
                nickname : nickname
                }), {
                    headers: { "Content-Type": 'application/json'
                }
            }).then(res => {
                if(res.data == 0){ resolve(false); }
                else{ resolve(true); }
            }).catch(function(error){
                console.log('setErrorMessage', error.response.data.message);
            });
        })
    }

    signUp(newUser){
        return new Promise(function(resolve) {
            let api = domain + '/users/new'
            axios.post(api, JSON.stringify({
                id : newUser.id, 
                password : newUser.password,
                name : newUser.name,
                email : newUser.email,
                nickname : newUser.nickname,
                gender : (newUser.gender == 'female') ? 0 : 1,
                age : new Date().getFullYear() - newUser.age + 1
            }),{
                headers: { "Content-Type": 'application/json'
            }
            })
            .then(() => {
                resolve(true);
            }).catch(function(error) {
                console.log(error.response.data.message);
            })
        })
    }

    checkIdPw(user){
        return new Promise(function(resolve, reject) {
            let api = domain + '/user'
            axios.post(api, JSON.stringify({
                id : user.id, 
                password : user.password,
            }),{
                headers: { "Content-Type": 'application/json'
                }
            })
            .then(() => {
                resolve({status : false, message : '비밀번호가 일치하지 않습니다.'});
            }).catch(function() {
                reject({status : false, message : '비밀번호가 일치하지 않습니다.'});
            })
        })
    }
    
    updateUserInfo(updateUser){
        return new Promise(function(resolve) {
            let api = domain + '/users/' + updateUser.id
            axios.defaults.headers.common['authorization'] = store.getters['userStore/getAccessToken'];
            axios.post(api, JSON.stringify({
                id : updateUser.id,
                password : updateUser.password,
                name : updateUser.name,
                email : updateUser.email,
                nickname : updateUser.nickname,
                gender : (updateUser.gender == 'female') ? 0 : 1,
                age : new Date().getFullYear() - updateUser.age + 1
            }),{
                headers: { "Content-Type": 'application/json'
            }
            })
            .then(res => {
                console.log(res)
                resolve({status : true, message : '정보가 변경되었습니다.'});
            }).catch(function(error) {
                console.log(error.response.data.message);
                resolve({status : false, message : '정보 변경에 실패했습니다.'});
            })
        })
    }
    
    getUserInfo(userId) {
        return new Promise(function(resolve, reject) {
            let api = domain + '/users/' + userId
            axios.defaults.headers.common['authorization'] = store.getters['userStore/getAccessToken'];
            axios.get(api, {
                    headers: { 
                        "Content-Type": 'application/json',
                }
            }).then(res => {
                resolve(res.data)
            }).catch(function(error){
                console.log(error.response.data.status)
                reject(error.response.data.status)
            });
        })
    }
}

export default new userInfoService()
