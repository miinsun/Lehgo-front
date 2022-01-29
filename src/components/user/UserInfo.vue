<template>
  <v-container>
      <v-form ref="form" v-model="isFormValid">
      <v-row>
        <v-col cols="11 mx-auto">
        <v-text-field class="mb-5" color="orange lighten-1" hide-details="auto" maxlength="20" required
          label="아이디" v-model="printId" :readonly="true" :disabled="true"></v-text-field>
        <v-text-field class="my-5"  color="orange lighten-1" hide-details="auto" maxlength="20" required
            label="비밀번호" v-model="pw" :type="'password'" :rules="[validation.firstError('pw')]"></v-text-field>
        <v-text-field class="my-5"  color="orange lighten-1" hide-details="auto" maxlength="20" required
            label="이름" v-model="name" :rules="[validation.firstError('name')]"></v-text-field>
        <v-text-field class="my-5"  color="orange lighten-1" hide-details="auto" maxlength="50" required
            label="이메일" v-model="email" :type="'email'" :rules="[validation.firstError('email'), validation.firstError('existEmail')]"></v-text-field>
        <v-text-field class="my-5"  color="orange lighten-1" hide-details="auto" maxlength="20" required
            label="닉네임" v-model="nickname" :rules="[validation.firstError('nickname'), validation.firstError('existNickname')]"></v-text-field>
        <v-row class="selectField">
          <v-col cols="2 my-auto">성별</v-col>
          <v-col cols="10">
          <v-radio-group row class="justify-space-between" v-model="gender" :rules="[validation.firstError('gender')]">
            <v-radio label="여성" color="orange" value="female" class="mr-10" :checked="isFemale()"></v-radio>
            <v-radio label="남성" color="orange" value="male" :checked="isMale()"></v-radio>
          </v-radio-group>
          </v-col>
        </v-row>
        <v-row class="selectField my-auto">
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
      <v-row class="notiArea" v-if="updateError || updateSuccess">
        <v-col cols="11 mx-auto">
          <v-alert text type="error" v-if="updateError">
            {{ resultMessage }}
          </v-alert>
          <v-alert text type="success" v-if="updateSuccess">
            {{ resultMessage }}
          </v-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6 mx-auto">
          <v-btn block elevation="3" color="orange lighten-1" x-large @click="submit" 
            :disabled="!isFormValid" class="font-weight-bold">UPDATE</v-btn>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import userInfoService from '@/services/userInfoService';
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("userStore");

  export default {
    name: 'UserInfo',

    data: () => ({
      id : '',
      printId : '',
      pw : '',
      name : '',
      email : '',
      origEmail : '',
      nickname : '',
      origNickname : '',
      gender : '',
      age : '',
      ageList: Array(100).fill().map((v,i)=> new Date().getFullYear() - i),
      updateError : false,
      updateSuccess : false,
      errorMessage : '',
      existEmail : false,
      existNickname : false
    }),
    validators: {
      pw : function (value) {
        return this.$Validator.value(value).required()
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
      testBtn() {
        userInfoService.getUserInfo(this.getUserId)
        .then(resInfo => {
          this.userInfo = resInfo
        })
      },
      submit: function () {
        this.$refs.form.validate()
        const updateUser = { 
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
              userInfoService.checkIdPw(updateUser)
              .then(() => {
                userInfoService.updateUserInfo(updateUser)
                .then(res => {
                  console.log(res)
                  this.updateSuccess = res.status
                  this.updateError = !res.status
                  this.resultMessage = res.message
                })
              }).catch(err =>{
                this.updateSuccess = err.status
                this.updateError = !err.status
                this.resultMessage = err.message
              })
            }
        })
      },
      isFemale() {
        if(this.gender == 'female'){
          return true
        }
      },
      isMale() {
        if(this.gender == 'male'){
          return true
        }
      },
      ...mapActions(['postLogout'])
    },
    created() {
      userInfoService.setHeader();
      userInfoService.getUserInfo(this.getUserId)
        .then(userInfo => {
          this.id = userInfo.id
          this.printId = this.id
          this.name = userInfo.name
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
                name: 'Main'
              })
            }
        })
    },
    computed: {
      ...mapGetters(['getUserId']),
    },
    watch:{
      email : function() {
        if(this.email != '' & this.email != this.origEmail){
          userInfoService.checkEmail(this.email)
          .then(checkResult => {
              this.existEmail = checkResult
          })
        }
      },
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
.selectField{
  height: 80px;
  margin-top: -20px;
}
.notiArea{
  height: 80px;
}
</style>