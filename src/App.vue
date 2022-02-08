<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
    }
  }
}
</script>

<style>
  body {
    margin: 0;
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif;
  }
  #app {
    width : 100vw;
    height: 100vh;
    position: relative;
  }
</style>
