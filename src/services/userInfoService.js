import axios from 'axios'
const domain = 'http://localhost:8080'

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
            console.log(newUser)
            axios.post(api, JSON.stringify({
                id : newUser.id, 
                password : newUser.password,
                name : newUser.name,
                email : newUser.email,
                nickname : newUser.nickname,
                gender : (newUser.gender == 'femail') ? 0 : 1,
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
}

export default new userInfoService()
