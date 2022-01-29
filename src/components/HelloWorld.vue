<template>
  <v-container>
    <v-row class="text-center">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Vuetify
        </h1>
    </v-row>
        <button @click="testBtn">테스트</button>
        {{userInfo}}
  </v-container>
</template>

<script>
import userInfoService from '@/services/userInfoService';
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("userStore");

  export default {
    name: 'HelloWorld',

    data: () => ({
      userInfo : ''
    }),
    methods: {
      testBtn() {
        userInfoService.getUserInfo(this.getUserId)
        .then(resInfo => {
          this.userInfo = resInfo
        })
      }
    },
    created() {
      userInfoService.setHeader();
    },
    computed: {
      ...mapGetters(['getUserId']),
    }
  }
</script>