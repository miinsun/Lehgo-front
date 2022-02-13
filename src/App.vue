<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
let vh = window.innerHeight * 0.01
document.documentElement.style.setProperty('--vh', vh + 'px')

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', vh + 'px')
})

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
html, body {
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
}
.v-progress-circular {
  position: absolute;
  left: 50%;
  margin: 50px 0px 0px -30px;
}
</style>
