<template>
  <v-container class="loginContainer">
    <div class="text-center">
      <h1>아이디 찾기</h1>
    </div>
    <v-row>
      <v-form ref="form" class="loginForm">
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
    <v-row>
      <v-col cols="10 offset-1" v-if="resultId">
          해당 이메일로 가입된 아이디입니다.
          <v-card class="resultId" outlined elevation="2">{{ resultId }} </v-card>
      </v-col>
      <v-col cols="10 offset-1">
        <v-alert class="findError" text type="error" v-if="errorMessage">
          {{ errorMessage }} </v-alert>
      </v-col>
      <v-col cols="10 offset-1" >
        <v-btn v-if="!resultId" block depressed :color="blue" x-large @click="submit" class="submitBtn">CONTINUE</v-btn>
        <v-btn v-if="resultId" block depressed :color="blue" x-large @click="goToLogin()" class="submitBtn">LOGIN</v-btn>
      </v-col>
      <v-col cols="10 offset-1" class="text-right">
        <a @click="findPw()">비밀번호 찾기</a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import userInfoService from '@/services/userInfoService';

  export default {
    name: 'Login',
    data: () => ({
      email : '',
      resultId : '',
      errorMessage : '',
      blue : '#186EC5',
      gray : '#DEDCDC',
    }),
    validators: {
      email : function (value) {
        return this.$Validator.value(value).required().email()
      },
    },
    computed :{
    },
    methods: {
      submit: function () {
        this.$refs.form.validate()
        this.$validate()
          .then(success => {
            if(success){
                this.findId();
            }
        })
      },
      findId : function(){
        userInfoService.findId(this.email)
        .then(success => {
            this.resultId = success
        }).catch(error => {
            this.errorMessage = error
        })
      },
      findPw : function(){
        this.$router.push({
          name: 'FindPw'
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
.loginContainer{
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
.findError{
  font-size: 13px;
  margin: -10px 0px;
}
 .loginForm{
  width : 460px;
  margin: 50px 0px 30px 0px;
 }
#emailInput .v-text-field >>> input {
  font-size: 13px;
  color : #186EC5;
  font-weight: 500;
}
#Mail{
  margin-top: 5px;
  margin-right: 10px;
}
.resultId{
    text-align: center;
    font-size: 20px;
    padding : 20px 0px;
    margin-top: 10px;
}
</style>
