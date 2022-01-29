<template>
  <v-container>
      <v-row class="text-center my-10">
      <v-col cols="12" class="my-10">
        <h1 class="display-2 font-weight-bold">
          LEHGO
        </h1>
      </v-col>
      </v-row>
      <v-form ref="form">
      <v-row>
        <v-col cols="6 mx-auto">
        <v-text-field color="orange lighten-1" label="ID" hide-details="auto" v-model="userId" ref="id"
          :rules="[validation.firstError('userId')]" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6 mx-auto">
        <v-text-field color="orange lighten-1" label="PW" hide-details="auto" v-model="userPw" :type="'password'"
            :rules="[validation.firstError('userPw')]" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6 mx-auto">
          <v-alert text type="error" v-if="!getLoginResult">
            {{ getErrorMessage }}
          </v-alert>
        </v-col>
      </v-row>
      </v-form>
      <v-row>
        <v-col cols="6 mx-auto">
          <v-btn block elevation="3" color="orange lighten-1" x-large @click="submit" class="font-weight-bold">LOGIN</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6 mx-auto" class="text-right">
          <router-link to="/signUp" class="link">회원 가입</router-link>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

const userStore = 'userStore'

  export default {
    name: 'Main',
    data: () => ({
      userId : '',
      userPw : '',
      loginError : false,
      errorMessage : ''
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
      ...mapGetters(userStore, ['getLoginResult', 'getErrorMessage'])
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
              name: 'MyPage'
            })
          }
        })
      },
      ...mapActions(userStore, ['postLogin', 'initLogin'])
    },
    created(){
      this.initLogin();
    }
  }
</script>

<style scoped>
.link{
  text-decoration: none;
  color : gray;
}
</style>