<template>
    <div class="profileCard text-cleft">
        <h3>
        <a @click="openUserInfo" class="userNickName">{{userNickName}}</a> 님!<br>
        좋은 하루 보내세요.</h3>   
        <v-divider class="vDivider"></v-divider>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("userStore");

  export default {
    name: 'ProfileCard',

    data: () => ({
        userNickName : ''
    }),
    methods: {
        openUserInfo : function() {
            this.$emit('openUserInfo')
        },
      ...mapActions(['postLogout'])
    },
    created() {
        this.userNickName = this.getUserNickName
        if (this.getUserNickName == ''){
          this.postLogout();
          this.$router.push({
            name: 'Login'
          })
        }
    }, 
    computed: {
      ...mapGetters(['getUserNickName']),
    },
  }
</script>

<style scoped>
.profileCard{
  padding:0px 10px;
  margin-top: 30px;
  font-family: 'Noto Sans KR';
}
.fa-user-circle{
    color: lightgray;
}
.userNickName{
  text-decoration: none;
  color : #0057FF;
}
.vDivider{
  margin-top: 20px;
  border: #0057FF solid 1px;
}
</style>