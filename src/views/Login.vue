<template>
  <v-container class="loginContainer">
    <v-row>
      <v-btn class="signUpBtn" depressed :color="gray" x-large @click="signUp()" height="60px">SIGN UP</v-btn>
      <v-btn class="loginBtn" depressed :color="blue" x-large height="60px">LOGIN</v-btn>
    </v-row>
    <v-row>
      <v-form ref="form" class="loginForm">
        <v-col cols="10 offset-1">
          <v-text-field :color="blue" label="ID" hide-details="auto" v-model="userId" ref="id"
            :rules="[validation.firstError('userId')]" required>
            <template v-slot:prepend-inner>
              <svg id="Mail" width="16" height="12" viewBox="0 0 16 12">
                <path d="M14,2H2L8,7ZM0,2A2.006,2.006,0,0,1,2,0H14a2.006,2.006,0,0,1,2,2v8a2.006,2.006,0,0,1-2,2H2a2.006,2.006,0,0,1-2-2Z" fill="#186ec5" fill-rule="evenodd"/>
              </svg>
            </template>
            </v-text-field>
        </v-col>
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
      </v-form>
    </v-row>
    <v-row>
      <v-col cols="10 offset-1">
        <v-alert class="loginError" text type="error" v-if="!getLoginResult">
          {{ getErrorMessage }} </v-alert>
      </v-col>
      <v-col cols="10 offset-1">
        <v-btn block depressed :color="blue" x-large @click="submit" class="submitBtn">CONTINUE</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("userStore");

  export default {
    name: 'Login',
    data: () => ({
      userId : '',
      userPw : '',
      loginError : false,
      errorMessage : '',
      blue : '#186EC5',
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
        then(success => {
          if(success){
            this.$router.push({
              name: 'Main'
            })
          }
        })
      },
      signUp : function(){
        this.$router.push({
          name: 'signUp'
        })
      },
      ...mapActions(['postLogin', 'initLogin'])
    },
    created(){
      this.initLogin();
    }
  }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@800&display=swap');
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
.loginError{
  font-size: 13px;
  margin: -10px 0px;
}
 .loginForm{
  width : 460px;
  margin: 50px 0px 30px 0px;
 }
.v-text-field >>> label {
  font-size: 13px;
}
.v-text-field >>> input {
  font-size: 13px;
  font-weight: 500;
  color : #186EC5;
}
#pwInput .v-text-field >>> input {
  letter-spacing: 2px;
  font-family: 'Open Sans', sans-serif;
}
#Lock, #Mail{
  margin-top: 1px;
  margin-right: 10px;
}
</style>
