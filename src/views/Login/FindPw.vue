<template>
  <v-container class="findPwContainer">
    <transition name="slide" mode="out-in">
    <div v-if="!resultUser" key="findPw">
      <div class="text-center">
        <h1>비밀번호 찾기</h1>
      </div>
      <v-row>
        <v-form ref="findPwForm" class="findPwForm">
          <v-col cols="10 offset-1" id="idInput">
            <v-text-field :color="blue" label="ID" hide-details="auto" v-model="userId" ref="id"
              :rules="[validation.firstError('userId')]" required>
              <template v-slot:prepend-inner>
                <v-icon class="mr-1" color="#186ec5">mdi-account</v-icon>
              </template>
              </v-text-field>
          </v-col>
          <v-col cols="10 offset-1" id="emailInput">
            <v-text-field :type="'email'" :color="blue" label="EMAIL" hide-details="auto" v-model="email" ref="email"
              :rules="[validation.firstError('email')]" required>
              <template v-slot:prepend-inner>
                <svg id="Mail" width="16" height="12" viewBox="0 0 16 12">
                  <path d="M14,2H2L8,7ZM0,2A2.006,2.006,0,0,1,2,0H14a2.006,2.006,0,0,1,2,2v8a2.006,2.006,0,0,1-2,2H2a2.006,2.006,0,0,1-2-2Z" fill="#186ec5" fill-rule="evenodd"/>
                </svg>
              </template>
              </v-text-field>
          </v-col>
        </v-form>
      </v-row>
    </div>
    <div v-if="resultUser" key="resetPw">
      <div class="text-center">
        <h1>비밀번호 재설정</h1>
      </div>
      <v-row>
        <v-form ref="resetPwForm" class="findPwForm">
          <v-col cols="10 offset-1" id="pwInput"> 
            <v-text-field :color="blue" label="PW" hide-details="auto" v-model="userPw" :type="'password'"
              :rules="[validation.firstError('userPw')]" required>
              <template v-slot:prepend-inner>
                <svg id="Lock" width="16" height="16" viewBox="0 0 16 16">
                  <path d="M7,8a2,2,0,1,1-2,2A2.006,2.006,0,0,1,7,8ZM7,2A2.006,2.006,0,0,0,5,4H9A2.006,2.006,0,0,0,7,2Zm5,14H2a2.006,2.006,0,0,1-2-2V6A2.006,2.006,0,0,1,2,4H3a4,4,0,0,1,8,0h1a2.006,2.006,0,0,1,2,2v8A2.006,2.006,0,0,1,12,16Z" transform="translate(1)" fill="#186ec5" fill-rule="evenodd"/>
                </svg>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="10 offset-1" id="pwInput"> 
            <v-text-field :color="blue" label="PW CHECK" hide-details="auto" v-model="pwCheck" :type="'password'"
              :rules="[validation.firstError('pwCheck')]" required>
              <template v-slot:prepend-inner>
                <svg id="Lock" width="16" height="16" viewBox="0 0 16 16">
                  <path d="M7,8a2,2,0,1,1-2,2A2.006,2.006,0,0,1,7,8ZM7,2A2.006,2.006,0,0,0,5,4H9A2.006,2.006,0,0,0,7,2Zm5,14H2a2.006,2.006,0,0,1-2-2V6A2.006,2.006,0,0,1,2,4H3a4,4,0,0,1,8,0h1a2.006,2.006,0,0,1,2,2v8A2.006,2.006,0,0,1,12,16Z" transform="translate(1)" fill="#186ec5" fill-rule="evenodd"/>
                </svg>
              </template>
            </v-text-field>
          </v-col>
        </v-form>
      </v-row>
    </div>
    </transition>
    <v-row class="btnArea">
      <v-col cols="10 offset-1">
        <v-alert class="findError" text type="error" v-if="errorMessage">
          {{ errorMessage }} </v-alert>
        <v-alert class="findSuccess" text type="success" v-if="result">
          비밀번호 변경이 완료되었습니다. </v-alert>
      </v-col>
      <v-col cols="10 offset-1" >
        <v-btn v-if="!result" block depressed :color="blue" x-large @click="submit" class="submitBtn">CONTINUE</v-btn>
        <v-btn v-if="result" block depressed color="success" x-large @click="goToLogin()" class="submitBtn">LOGIN</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import userInfoService from '@/services/userInfoService';

  export default {
    name: 'Login',
    data: () => ({
      test : false,
      userId : '',
      email : '',
      userPw : 'lehgo2022',
      pwCheck : 'lehgo2022',
      resultUser : null,
      result : false,
      errorMessage : '',
      blue : '#186EC5',
      gray : '#DEDCDC',
    }),
    validators: {
      userId : function (value) {
        return this.$Validator.value(value).required() 
      },
      email : function (value) {
        return this.$Validator.value(value).required().email()
      },
      userPw : function (value) {
        return this.$Validator.value(value).required().maxLength(20).minLength(8).custom(function(){
          if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)){
            return '하나 이상의 문자와 숫자를 포함하세요.'
          }
        })
      },
      'pwCheck, userPw' : function (pwcheck, userPw) {
        return this.$Validator.value(userPw).match(pwcheck);
      }
    },
    computed :{
    },
    methods: {
      submit: function () {
        if(!this.resultUser){
          this.$refs.findPwForm.validate()
          this.$validate()
          .then(success => {
              if(success){
                this.findPw();
            }
          })
        }
        else{
          this.$refs.resetPwForm.validate()
          this.$validate()
          .then(success => {
            if(success){
              this.resetPw();
            }
          })
        }
      },
      findPw : function(){
        userInfoService.findPw(this.userId, this.email)
        .then(success => {
            this.userPw = ''
            this.pwCheck = ''
            this.errorMessage = ''
            this.resultUser = success
            console.log(success)
        }).catch(error => {
            this.errorMessage = error
        })
      },
      resetPw : function(){
        userInfoService.resetPw(this.resultUser.id, this.userPw)
        .then(() => {
            this.result = true
        }).catch(error => {
            this.errorMessage = error
        })
      },
      goToLogin: function(){
        this.$router.push({
          name: 'Login'
        })
      },
    },
  }
</script>

<style scoped>
.findPwContainer{
  width : 460px;
  margin: auto;
}
.loginBtn, .signUpBtn{
  width : 230px;
  height: 60px;
  color : white;
  font-size: 14px;
  border-radius: 0%;
}
.submitBtn{
  font-size: 14px;
  color : white;
}
.findError, .findSuccess{
  font-size: 13px;
  margin: -10px 0px;
}
 .findPwForm{
  width : 460px;
  margin: 50px 0px 30px 0px;
 }
#idInput .v-text-field >>> input, #emailInput .v-text-field >>> input {
  font-size: 13px;
  color : #186EC5;
  font-weight: 500;
}
#Lock, #Mail{
  margin-top: 5px;
  margin-right: 10px;
}
.resultUser{
    text-align: center;
    font-size: 20px;
    padding : 20px 0px;
    margin-top: 10px;
}
.slide-enter-active, .slide-leave-active {
  transition: 1s !important;
}
.slide-enter, .slide-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
</style>
