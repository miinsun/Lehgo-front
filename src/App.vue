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
  }
  #app {
    width : 100vw;
    height : 90vh;
    min-height: 100%;
    position: relative;
  }
</style>
