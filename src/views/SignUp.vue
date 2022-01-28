<template>
  <v-container class="my-10">
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
        <v-text-field class="mb-5" color="orange lighten-1" hide-details="auto" maxlength="20" required
          label="아이디" v-model="id" :rules="[validation.firstError('id'), validation.firstError('existId')]"></v-text-field>
        <v-text-field class="my-5"  color="orange lighten-1" hide-details="auto" maxlength="20" required
            label="비밀번호" v-model="pw" :type="'password'" :rules="[validation.firstError('pw')]"></v-text-field>
        <v-text-field class="my-5"  color="orange lighten-1" hide-details="auto" maxlength="20" required
            label="비밀번호 확인" v-model="pwCheck" :type="'password'" :rules="[validation.firstError('pwCheck')]"></v-text-field>
        <v-text-field class="my-5"  color="orange lighten-1" hide-details="auto" maxlength="20" required
            label="이름" v-model="name" :rules="[validation.firstError('name')]"></v-text-field>
        <v-text-field class="my-5"  color="orange lighten-1" hide-details="auto" maxlength="50" required
            label="이메일" v-model="email" :type="'email'" :rules="[validation.firstError('email'), validation.firstError('existEmail')]"></v-text-field>
        <v-text-field class="my-5"  color="orange lighten-1" hide-details="auto" maxlength="20" required
            label="닉네임" v-model="nickname" :rules="[validation.firstError('nickname'), validation.firstError('existNickname')]"></v-text-field>
        <v-row>
          <v-col cols="2 my-auto">성별</v-col>
          <v-col cols="10">
          <v-radio-group row class="justify-space-between" v-model="gender" :rules="[validation.firstError('gender')]">
            <v-radio label="여성" color="orange" value="femail" class="mr-10"></v-radio>
            <v-radio label="남성" color="orange" value="mail"></v-radio>
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

  export default {
    name: 'Main',
    data: () => ({
      id : '',
      pw : '',
      pwCheck: '',
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
      existNickname : false
    }),
    validators: {
      id : function (value) {
        return this.$Validator.value(value).required().maxLength(20).custom(function(){
          if(!/^[a-zA-Z0-9]*$/.test(value)){
            return '아이디는 영문 또는 숫자만 입력 가능합니다'
          }
        })
      },
      'existId, id' : function(existId, id){
        return this.$Validator.value(id).custom(function(){
          if(existId) { 
            return '이미 존재하는 아이디입니다' } 
        });
      },
      pw : function (value) {
        return this.$Validator.value(value).required().maxLength(20).minLength(8)
      },
      'pwCheck, pw' : function (pwcheck, pw) {
        return this.$Validator.value(pw).match(pwcheck);
      },
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
          name : this.name,
          email : this.email,
          nickname : this.nickname,
          gender : this.gender,
          age :  this.age
        };
        this.$validate()
          .then(success => {
            if(success){
              console.log(signUpUser)
              userInfoService.signUp(signUpUser)
              .then(success => {
                if(success){
                  this.$router.push({
                    name: 'Main'
                  })
                }
              })
            }
        })
      }
    },
    created(){
      this.initLogin();
    },
    watch:{
      id : function() {
        if(this.id != ''){
          userInfoService.checkId(this.id)
          .then(checkResult => {
              this.existId = checkResult
          })
        }
      },
      email : function() {
        if(this.nickname != ''){
          userInfoService.checkEmail(this.email)
          .then(checkResult => {
              this.existEmail = checkResult
          })
        }
      },
      nickname : function() {
        if(this.nickname != ''){
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
</style>