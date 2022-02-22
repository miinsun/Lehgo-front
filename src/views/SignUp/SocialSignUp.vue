<template>
  <v-container class="container my-10">
      <v-row class="text-center">
      <v-col cols="12" class="my-10">
        <h1 class="display-2 font-weight-bold">
          Sign Up
        </h1>
      </v-col>
      </v-row>
      <v-form ref="form" v-model="isFormValid">
      <v-row>
        <v-col cols="6 mx-auto">
        <v-text-field class="my-5"  color="orange lighten-1" hide-details="auto" maxlength="20" required
            label="이름" v-model="name" :readonly="true" :disabled="true"></v-text-field>
        <v-text-field class="my-5"  color="orange lighten-1" hide-details="auto" maxlength="50" required
            label="이메일" v-model="email" :type="'email'" :readonly="true" :disabled="true"></v-text-field>
        <v-text-field class="my-5"  color="orange lighten-1" hide-details="auto" maxlength="20" required
            label="닉네임" v-model="nickname" :rules="[validation.firstError('nickname'), validation.firstError('existNickname')]"></v-text-field>
        <v-row>
          <v-col cols="2 my-auto">성별</v-col>
          <v-col cols="10">
          <v-radio-group row class="justify-space-between" v-model="gender" :rules="[validation.firstError('gender')]">
            <v-radio label="여성" color="orange" value="female" class="mr-10"></v-radio>
            <v-radio label="남성" color="orange" value="male"></v-radio>
          </v-radio-group>
          </v-col>
        </v-row>
        <v-row class="my-auto">
          <v-col cols="2 my-5">생년</v-col>
          <v-col cols="6">
            <v-combobox color="orange lighten-1" hide-details="auto" maxlength="4" required
               v-model="age" :items="ageList" :rules="[validation.firstError('age')]" soutlined>
            </v-combobox>
          </v-col>
        </v-row>
        </v-col>
      </v-row>
      </v-form>
      <v-row>
        <v-col cols="6 mx-auto">
          <v-btn block elevation="3" color="orange lighten-1" x-large @click="submit" 
            :disabled="!isFormValid" class="font-weight-bold">SIGN UP</v-btn>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import userInfoService from '@/services/userInfoService';
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("userStore");

  export default {
    name: 'SocialSignUp',
    data: () => ({
      id : '',
      name : '',
      email : '',
      nickname : '',
      gender : '',
      age : '2003',
      ageList: Array(100).fill().map((v,i)=> new Date().getFullYear() - i),
      loginError : false,
      errorMessage : '',
      isFormValid: false,
      existId : false,
      existEmail : false,
      existNickname : false,
      origName : '',
      origEmail : '',
      origNickname : '',
    }),
    validators: {
      name : function (value) {
        return this.$Validator.value(value).required().maxLength(20)
      },
      email : function (value) {
        return this.$Validator.value(value).required().email().maxLength(50)
      },
      'existEmail, email' : function(existEmail, email){
        return this.$Validator.value(email).custom(function(){
          if(existEmail) { 
            return '이미 존재하는 이메일입니다' } 
        });
      },
      nickname : function (value) {
        return this.$Validator.value(value).required().maxLength(20)
      },
      'existNickname, nickname' : function(existNickname, nickname){
        return this.$Validator.value(nickname).custom(function(){
          if(existNickname) { 
            return '이미 존재하는 닉네임입니다' } 
        });
      },
      gender : function (value) {
        return this.$Validator.value(value).required()
      },
      age : function (value) {
        return this.$Validator.value(value).required().integer().lessThanOrEqualTo(2022)
      },
    },
    methods: {
      submit: function () {
        this.$refs.form.validate()
        const signUpUser = { 
          id : this.id, 
          password : this.pw,
          name : this.origName,
          email : this.origEmail,
          nickname : this.nickname,
          gender : this.gender,
          age :  this.age
        };
        this.$validate()
          .then(success => {
            if(success){
              console.log(signUpUser)
              userInfoService.updateUserInfo(signUpUser)
              .then(res => {
                if(res.status){
                  this.$router.push({
                    name: 'Main'
                  })
                }
              })
            }
        })
      },
    },
    created() {
      userInfoService.getUserInfo(this.getUserId)
        .then(userInfo => {
          this.id = userInfo.id
          this.name = userInfo.name
          this.origName = this.name
          this.email = userInfo.email
          this.origEmail = this.email
          this.nickname = userInfo.nickname
          this.origNickname = this.nickname
          this.gender = (userInfo.gender == 0)? 'female' : 'male'
          this.age = (new Date().getFullYear() - Number(userInfo.age) + 1)
        }).catch(error => {
            if(error == 500){
              this.postLogout();
              this.$router.push({
                name: 'Login'
              })
            }
        })
    },
    computed: {
      ...mapGetters(['getUserId', 'getUserInfo']),
    },
    watch:{
      nickname : function() {
        if(this.nickname != '' & this.nickname != this.origNickname){
          userInfoService.checkNickname(this.nickname)
          .then(checkResult => {
              this.existNickname = checkResult
          })
        }
      }
    }  
  }
</script>

<style scoped>
.container{
  padding-bottom: 150px;
}
</style>