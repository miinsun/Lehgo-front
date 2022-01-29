<template>
    <v-btn @click="logout">로그아웃</v-btn>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("userStore");

  export default {
    name: 'TestBar',

    data: () => ({
      userInfo : ''
    }),
    methods: {
      logout() {
        this.postLogout(this.getUserId)
        .then(() => {
            this.$router.push({
            name: 'Main'
            })
        })
      },
      ...mapActions(['postLogout'])
    },
  }
</script>