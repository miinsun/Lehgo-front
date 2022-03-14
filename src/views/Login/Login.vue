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
    <v-row class="mt-10">
      <v-btn class="signUpBtn" depressed :color="gray" x-large @click="signUp()" height="60px">SIGN UP</v-btn>
      <v-btn class="loginBtn" depressed :color="blue" x-large height="60px">LOGIN</v-btn>
    </v-row>
    <v-row>
      <v-form ref="form" class="loginForm">
        <v-col cols="10 offset-1" id="idInput">
          <v-text-field :color="blue" label="ID" hide-details="auto" v-model="userId" ref="id"
            :rules="[validation.firstError('userId')]" required>
            <template v-slot:prepend-inner>
              <svg id="Mail" width="16" height="12" viewBox="0 0 16 12">
                <path d="M14,2H2L8,7ZM0,2A2.006,2.006,0,0,1,2,0H14a2.006,2.006,0,0,1,2,2v8a2.006,2.006,0,0,1-2,2H2a2.006,2.006,0,0,1-2-2Z" fill="#0057FF" fill-rule="evenodd"/>
              </svg>
            </template>
            </v-text-field>
        </v-col>
        <v-col cols="10 offset-1" id="pwInput"> 
          <v-text-field :color="blue" label="PW" hide-details="auto" v-model="userPw" :type="'password'"
            :rules="[validation.firstError('userPw')]" required>
            <template v-slot:prepend-inner>
              <svg id="Lock" width="16" height="16" viewBox="0 0 16 16">
                <path d="M7,8a2,2,0,1,1-2,2A2.006,2.006,0,0,1,7,8ZM7,2A2.006,2.006,0,0,0,5,4H9A2.006,2.006,0,0,0,7,2Zm5,14H2a2.006,2.006,0,0,1-2-2V6A2.006,2.006,0,0,1,2,4H3a4,4,0,0,1,8,0h1a2.006,2.006,0,0,1,2,2v8A2.006,2.006,0,0,1,12,16Z" transform="translate(1)" fill="#0057FF" fill-rule="evenodd"/>
              </svg>
            </template>
          </v-text-field>
        </v-col>
      </v-form>
    </v-row>
    <v-row>
      <v-col cols="10 offset-1">
        <v-alert class="loginError" text type="error" v-if="!getLoginResult">
          {{ getErrorMessage }} </v-alert>
      </v-col>
      <v-col cols="10 offset-1">
        <v-btn block depressed :color="blue" x-large @click="submit" class="submitBtn">CONTINUE</v-btn>
        <div class="text-right my-2 findText">
        <a @click="findId()">아이디</a> /  <a @click="findPw()">비밀번호 찾기</a>
        </div>
      </v-col>
    </v-row>
    <v-row class="socialLoginBtnArea">
      <v-col cols="4">
        <a href="http://localhost:8080/oauth/kakao">
        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
          <g id="facebook" transform="translate(-0.054 0.317)">
            <circle cx="28" cy="28" r="28" transform="translate(0.054 -0.317)" fill="#ffdf00"/>
            <g transform="translate(13.254 14.02)">
              <path d="M74.571,139.027c-8.2,0-14.848,5.25-14.848,11.728,0,4.166,2.755,7.816,6.891,9.9l-1.4,5.224a.432.432,0,0,0,.106.445.423.423,0,0,0,.3.125.431.431,0,0,0,.257-.1L71.9,162.29a18.729,18.729,0,0,0,2.673.2c8.2,0,14.849-5.25,14.849-11.73s-6.65-11.728-14.849-11.728" transform="translate(-59.723 -139.027)" fill="#2b1718"/>
              <path d="M66.211,152.853H64.595a1.06,1.06,0,0,1-.574-.154.629.629,0,0,1-.3-.433c-.009-.05-.018-.107-.024-.166a.65.65,0,0,1,.253-.549,1,1,0,0,1,.636-.2h4.941a1.052,1.052,0,0,1,.572.153.638.638,0,0,1,.3.434.836.836,0,0,1,.011.162.676.676,0,0,1-.247.558.994.994,0,0,1-.631.195H67.919l0,5.568a.9.9,0,0,1-.234.644.817.817,0,0,1-.626.244.872.872,0,0,1-.547-.175.81.81,0,0,1-.288-.484.935.935,0,0,1-.015-.228Z" transform="translate(-61 -142.983)" fill="#ffdf00"/>
              <path d="M73.076,151.691a.762.762,0,0,1,.312-.418.984.984,0,0,1,.523-.125h.411a1.075,1.075,0,0,1,.558.135.894.894,0,0,1,.353.516l2.064,5.983a3.443,3.443,0,0,1,.14.477,2.017,2.017,0,0,1,.031.205.754.754,0,0,1-.242.553.774.774,0,0,1-.568.227.73.73,0,0,1-.767-.488l-.442-1.3H72.7l-.444,1.3a.714.714,0,0,1-.766.488.794.794,0,0,1-.5-.156.715.715,0,0,1-.262-.442.838.838,0,0,1-.016-.182.959.959,0,0,1,.046-.314c.032-.122.072-.247.115-.367Zm1.034,1.388h-.022l-1.008,3.139h2Z" transform="translate(-63.247 -142.918)" fill="#ffdf00"/>
              <path d="M81.055,152.035a.9.9,0,0,1,.234-.644.824.824,0,0,1,.627-.242.843.843,0,0,1,.548.178.855.855,0,0,1,.3.709l0,5.571h2.857a1.027,1.027,0,0,1,.578.151.655.655,0,0,1,.291.435,1.142,1.142,0,0,1,.024.163.661.661,0,0,1-.253.553,1.015,1.015,0,0,1-.636.2H82.056a1.118,1.118,0,0,1-.643-.164.774.774,0,0,1-.324-.528,2.512,2.512,0,0,1-.037-.349Z" transform="translate(-66.569 -142.918)" fill="#ffdf00"/>
              <path d="M89.346,152.035a.907.907,0,0,1,.232-.644.826.826,0,0,1,.626-.242.84.84,0,0,1,.547.178.789.789,0,0,1,.287.483.808.808,0,0,1,.017.225l.005,2.59,2.685-3.087a1.9,1.9,0,0,1,.326-.294.633.633,0,0,1,.356-.1.875.875,0,0,1,.511.158.636.636,0,0,1,.285.418c0,.005.005.031.013.066a.3.3,0,0,0,0,.072.669.669,0,0,1-.079.325,1.583,1.583,0,0,1-.2.287L93.2,154.391l2.078,3.292.063.1a1.778,1.778,0,0,1,.246.5c0,.007.005.028.013.054a.348.348,0,0,0,0,.056.78.78,0,0,1-.257.657.991.991,0,0,1-.622.2.867.867,0,0,1-.426-.092,1.13,1.13,0,0,1-.335-.373l-1.971-3.171-.939.978.01,1.77a.907.907,0,0,1-.236.644.823.823,0,0,1-.627.244.875.875,0,0,1-.548-.175.809.809,0,0,1-.287-.484,1.092,1.092,0,0,1-.015-.228Z" transform="translate(-69.231 -142.918)" fill="#ffdf00"/>
            </g>
          </g>
        </svg>
        </a>
      </v-col>
      <v-col cols="4">
        <a href="http://localhost:8080/oauth/google">
        <svg width="56" height="56" viewBox="0 0 56 56">
          <defs>
            <clipPath id="clip-path">
              <rect width="16" height="16" fill="none"/>
            </clipPath>
          </defs>
            <g transform="translate(-88 -449)">
              <g transform="translate(88 449)" fill="none" stroke="#bce0fd" stroke-width="1">
                <circle cx="28" cy="28" r="28" stroke="none"/>
                <circle cx="28" cy="28" r="27.5" fill="none"/></g>
              <g transform="translate(108 469)" clip-path="url(#clip-path)">
                <rect width="16" height="16" fill="none"/>
                <path  d="M16,4.4V5.9H14.5V7.4H13V5.8H11.5V4.4H13V2.9h1.5V4.4ZM5.1,4.4H9.9c0,.3.1.5.1.8a4.7,4.7,0,0,1-4.9,5A5.1,5.1,0,0,1,5.1,0,4.938,4.938,0,0,1,8.5,1.3L7.1,2.7a2.666,2.666,0,0,0-2-.8A3.222,3.222,0,0,0,1.9,5.1,3.159,3.159,0,0,0,5.1,8.3,2.724,2.724,0,0,0,8,6.1H5.1Z" transform="translate(0 3)" fill="#186ec5" fill-rule="evenodd"/>
              </g>
            </g>
        </svg>
        </a>
      </v-col>
      <v-col cols="4">
        <a href="http://localhost:8080/oauth/naver/">
        <img type="button" src="@/assets/naverIco.png" height="56" width="56" id="naverBtn"/>
        </a>
      </v-col>
    </v-row>
  </v-container>
  </v-col>
</v-row>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("userStore");
const { mapGetters : categoryGetters, mapActions : categoryActions } = createNamespacedHelpers("categoryStore");
const { mapActions : courseMapActions } = createNamespacedHelpers("courseStore");

  export default {
    name: 'Login',
    data: () => ({
      userId : '',
      userPw : '',
      loginError : false,
      errorMessage : '',
      blue : '#0057FF',
      gray : '#DEDCDC',
    }),
    validators: {
      userId : function (value) {
        return this.$Validator.value(value).required() 
      },
      userPw : function (value) {
        return this.$Validator.value(value).required() 
      }
    },
    computed :{
      ...categoryGetters(['getKeyword']),
      ...mapGetters(['getLoginResult', 'getErrorMessage']),
    },
    methods: {
      submit: function () {
        this.$refs.form.validate()
        this.$validate()
          .then(success => {
            if(success){
              this.login();
            }
        })
      },
      login : function(){
        const loginUser = { id : this.userId, password : this.userPw };
        this.postLogin(loginUser).
        then(res => {
          if(res != 0){
            if(res != this.getKeyword){
              this.setCategoryList(res)
            }
            this.initMainCourse()
            this.$router.push({ name: 'Main' })
          }
          else{
            this.initMainCourse()
            this.$router.push({ name: 'Survey' })
          }
        })
      },
      signUp : function(){
        this.$router.push({ name: 'signUp' })
      },
      findId : function(){
        this.$router.push({ name: 'FindId' })
      },
      findPw : function(){
        this.$router.push({ name: 'FindPw' })
      },
      ...categoryActions(['setCategoryList']),
      ...mapActions(['postLogin', 'initLogin', 'socialLogin']),
      ...courseMapActions(['initMainCourse'])
    },
    created(){
      if(this.$route.query.socialLoginType){
        this.socialLogin({
            type : this.$route.query.socialLoginType, 
            code : this.$route.query.code
        }).then(res => {
          if(res != 0){
            if(res != this.getKeyword){
              this.setCategoryList(res)
            }
            this.initMainCourse()
            this.$router.push({ name: 'Main' })
          }
          else{
            this.initMainCourse()
            this.$router.push({ name: 'Survey' })
          }
        })
      }
      else{
        this.initLogin();
      }
    }
  }
</script>

<style scoped>
.leftArea{
  width : 100%;
  height : 100%;
  padding : 200px;
  font-family: Noto Sans KR;
  font-size: 50px;
  line-height: (172 / 117);
  font-weight: 700;
  color: #fff;
  /* background-image: linear-gradient(to right top, #186ec5, #006bd6, #0066e5, #0060f3, #0057ff); */
}
.loginContainer{
  width : 450px;
  margin: auto;
  margin-top: 25%;
}
.loginBtn, .signUpBtn{
  width : 225px;
  height: 60px;
  color : white;
  font-size: 14px;
  border-radius: 0%;
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
  width : 460px;
  margin: 50px 0px 30px 0px;
 }
#idInput .v-text-field >>> input {
  font-size: 13px;
  color : #0057FF;
  font-weight: 500;
}
#pwInput .v-text-field >>> input {
  color : #0057FF;
  font-size: 16px;
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
</style>
