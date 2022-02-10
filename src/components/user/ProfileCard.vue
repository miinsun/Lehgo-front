<template>
    <div class="profileCard text-center">
        <i class="fas fa-user-circle fa-10x mb-5"></i>
        <h3><a @click="openUserInfo" class="userId">{{userId}}</a>님, 안녕하세요.</h3>   
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("userStore");

  export default {
    name: 'ProfileCard',

    data: () => ({
        userId : ''
    }),
    methods: {
        openUserInfo : function() {
            this.$emit('openUserInfo')
        },
      ...mapActions(['postLogout'])
    },
    created() {
        this.userId = this.getUserId
        if (this.getUserId == ''){
          this.postLogout();
          this.$router.push({
            name: 'Login'
          })
        }
    }, 
    computed: {
      ...mapGetters(['getUserId']),
    },
  }
</script>

<style scoped>
.profileCard{
    height:30vh;
    padding:30px;
}
.fa-user-circle{
    color: lightgray;
}
.userId{
  text-decoration: none;
  color : #E65100;
}
</style>