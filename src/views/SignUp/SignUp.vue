<template>
  <v-row class="pageContainer">
  <v-col cols="7">
    <div class="leftArea lehgo-background">
      <div><span>여행 가고는 싶지만</span></div>
      <div><span>계획짜기는 힘든 당신을 위해</span></div>
      <div><span>나를 찾는 여행 유형 테스트로</span></div>
      <div><span>쉽고 간편한 여행 코스 만들기</span></div>
      <div><span>당신만의 특별한 곳으로</span></div>
      <div><span> 지금, <div class="lehgo-main d-inline-block"></div>!</span></div>
    </div>
  </v-col>
  <v-col cols="5">
  <v-container class="loginContainer">
    <v-row  class="mt-10">
      <v-btn class="signUpBtn" depressed :color="blue" x-large height="60px">SIGN UP</v-btn>
      <v-btn class="loginBtn" depressed :color="gray" x-large @click="goToLogin()" height="60px">LOGIN</v-btn>
    </v-row>
    <v-row> 
      <v-form ref="form" class="loginForm">
        <hooper class="hooper">
        <slide>
            <v-col cols="10 offset-1" id="idInput">
            <v-text-field color="#0057FF" hide-details="auto" maxlength="20" required
            label="아이디" v-model="id" :rules="[validation.firstError('id'), validation.firstError('existId')]"></v-text-field>
            <v-text-field color="#0057FF" hide-details="auto" maxlength="20" required
                label="비밀번호" v-model="pw" :type="'password'" :rules="[validation.firstError('pw')]"></v-text-field>
            <v-text-field color="#0057FF" hide-details="auto" maxlength="20" required
                label="비밀번호 확인" v-model="pwCheck" :type="'password'" :rules="[validation.firstError('pwCheck')]"></v-text-field>
            <v-text-field color="#0057FF" hide-details="auto" maxlength="20" required
                label="이름" v-model="name" :rules="[validation.firstError('name')]"></v-text-field>
            </v-col>
        </slide>
        <slide>
            <v-col cols="10 offset-1" id="idInput">
            <v-text-field color="#0057FF" hide-details="auto" maxlength="50" required
                label="이메일" v-model="email" :type="'email'" :rules="[validation.firstError('email'), validation.firstError('existEmail')]"></v-text-field>
            <v-text-field class="my-5"  color="#0057FF" hide-details="auto" maxlength="20" required
                label="닉네임" v-model="nickname" :rules="[validation.firstError('nickname'), validation.firstError('existNickname')]"></v-text-field>
            <v-row>
            <v-col cols="2 my-auto">성별</v-col>
            <v-col cols="10">
            <v-radio-group row class="justify-space-between" v-model="gender" :rules="[validation.firstError('gender')]">
                <v-radio label="여성" color="#0057FF" value="female" class="mr-5"></v-radio>
                <v-radio label="남성" color="#0057FF" value="male"></v-radio>
            </v-radio-group>
            </v-col>
            </v-row>
            <v-row style="margin-top:-2vw;">
              <v-col cols="2 my-10">생년</v-col>
              <v-col cols="6">
                  <v-combobox color="#0057FF" hide-details="auto" maxlength="4" required
                  v-model="age" :items="ageList" :rules="[validation.firstError('age')]" soutlined>
                  </v-combobox>
              </v-col>
            </v-row>
           </v-col>
        </slide>
        <hooper-navigation slot="hooper-addons"></hooper-navigation>
        </hooper>
      </v-form>
    </v-row>
    <v-row>
      <v-col cols="10 offset-1">
        <v-btn block depressed :color="blue" x-large @click="submit" class="submitBtn">CONTINUE</v-btn>
        <div class="text-right my-2 findText">
        <a @click="findId()">아이디</a> /  <a @click="findPw()">비밀번호 찾기</a>
        </div>
      </v-col>
    </v-row>
  </v-container>
  </v-col>
</v-row>
</template>

<script>
import userInfoService from '@/services/userInfoService';
import { Hooper, Slide,  Navigation as HooperNavigation } from 'hooper';
import 'hooper/dist/hooper.css';


  export default {
    name: 'SignUp',
    components:{
        Hooper,
        Slide,
        HooperNavigation
    },
    data: () => ({
      blue : '#0057FF',
      gray : '#DEDCDC',
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
        return this.$Validator.value(value).required().maxLength(20).minLength(8).custom(function(){
          if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)){
            return '하나 이상의 문자와 숫자를 포함하세요.'
          }
        })
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
      goToLogin : function(){
        this.$router.push({ name: 'Login' })
      },
      findId : function(){
        this.$router.push({ name: 'FindId' })
      },
      findPw : function(){
        this.$router.push({ name: 'FindPw' })
      },
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
                    name: 'Login'
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
        if(this.email != ''){
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
.leftArea{
  width : 100%;
  height : 100vh;
  padding : 7vw 10vw;
  font-family: Noto Sans KR;
  font-size: 2.6vw;
  line-height: (172 / 117);
  font-weight: 700;
  color: #fff;
  /* background-image: linear-gradient(to right top, #186ec5, #006bd6, #0066e5, #0060f3, #0057ff); */
}
.loginContainer{
  width : 25vw;
  margin: auto;
  margin-top: 5vw;
}
.loginBtn, .signUpBtn{
  width : 50%;
  color : white;
  font-size: 14px;
  border-radius: 0%;
  z-index: 10;
}
.socialLoginBtnArea{
  width : 100%;
  padding : 0px 40px;
  margin: 20px 20px;
}
.submitBtn{
  font-size: 14px;
  color : white;
}
.loginError{
  font-size: 13px;
  margin: -10px 0px;
}
 .loginForm{
  height: 20vw;
  margin: 1vw 0px 1vw 0px;
 }
#idInput .v-text-field >>> input {
  font-size: 0.9vw;
  color : #186EC5;
  font-weight: 500;
}
#pwInput .v-text-field >>> input {
  color : #186EC5;
  font-size: 0.9vw;
  font-weight: 900;
  letter-spacing: 0.5px;
  font-family: 'Open Sans', sans-serif;
}
#Lock, #Mail{
  margin-top: 5px;
  margin-right: 10px;
}
#naverBtn{
  border-radius: 100%;
  border: #bce0fd solid 1px;
}
.findText{
  color : #0057FF;
  font-family: 'Noto Sans KR' !important;
}
.hooper{
    margin-top: -9vw;
    margin-left: -2vh;
    height: 30vw;
    width: 27vw;
}
.leftArea>div>span{
  color: #0057FF;
  font-weight: 900;
  padding: 0px 3px;
  background-color: white;
}
.leftArea div{
  margin-top: 20px;
}
.lehgo-main{
  margin-bottom: 0px;
  width: 130px;
  height: 70px;
}
.v-text-field{
  padding-top: 1.5vw;
}
</style>
