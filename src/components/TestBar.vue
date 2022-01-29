<template>
    <v-row class="text-center">
        <v-col cols="2"><h1 @click="goToMain">LEHGO</h1></v-col>
        <v-col cols="8"></v-col>
        <v-col cols="2">
            <v-btn @click="logout">로그아웃</v-btn>
        </v-col>
    </v-row>
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
      goToMain(){
        this.$router.push({
            name: 'Main'
        })
      },
      ...mapActions(['postLogout'])
    },
  }
</script>