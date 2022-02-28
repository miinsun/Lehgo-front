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
  font-size: 13px;
  font-family: Arial, Helvetica, sans-serif;
  font-family: 'Noto Sans KR' !important;
  font-weight: 400;
  word-break: keep-all;
  overflow : hidden;
}
.mainCourse{
  position: absolute;
  z-index: 100;
  width: 70vw;
  left: 15vw;
  margin: -12px;
}
.v-progress-circular {
  position: absolute;
  left: 50%;
  margin: 50px 0px 0px -30px;
}
.word-box { 
  text-align:center; 
  color:#fff; 
  width:500px; 
  height:600px; 
  margin:20px auto; 
  background:url("https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=818&q=80"); 
  background-size:100%; 
  font-size:12px; 
} 
.word-box h2 { 
  font-size:20px; 
  margin:20px 0 0 0; 
} 
.word-box h4 { 
  text-align:right; 
  font-size:14px; 
  margin:0 20px 50px 0; 
} 
.vb > .vb-dragger { 
  z-index: 5; 
  width: 12px; 
  right: 0; 
} 
.vb > .vb-dragger > .vb-dragger-styler { 
  -webkit-backface-visibility: hidden; 
  backface-visibility: hidden; 
  -webkit-transform: rotate3d(0,0,0,0); 
  transform: rotate3d(0,0,0,0); 
  -webkit-transition: background-color 100ms ease-out, margin 100ms ease-out, height 100ms ease-out; 
  transition: background-color 100ms ease-out, margin 100ms ease-out, height 100ms ease-out; 
  background-color: rgba(88, 137, 244, 0.1); 
  margin: 5px 5px 5px 0; 
  border-radius: 20px; 
  height: calc(100% - 10px); 
  display: block; 
} 
.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler { 
  background-color: rgba(88, 137, 244, 0.3); 
} 
.vb > .vb-dragger:hover > .vb-dragger-styler { 
  background-color: rgba(88, 137, 244, 0.5); 
  margin: 0px; 
  height: 100%; 
} 
.vb.vb-dragging > .vb-dragger > .vb-dragger-styler { 
  background-color: rgba(88, 137, 244, 0.5); 
  margin: 0px; 
  height: 100%; 
} 
.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler { 
  background-color: rgba(88, 137, 244, 0.5); 
}
.lehgo-background{
  background-image: url('~@/assets/background.png');
  background-size: cover;
}
.lehgo-main{
  background-image: url('~@/assets/LOGO.png');
  background-size: contain;
}
.액티비티-text{ color: #4BEF82 !important; } 
.액티비티-border{ border: #4BEF82 solid 5px !important; } 
.액티비티-border-1{ border: #4BEF82 solid 1px !important; } 
.액티비티-chip-1{ color: #4BEF82 !important; border: #4BEF82 solid 1px !important; } 
.액티비티-fill{ fill : #4BEF82; } 
.액티비티-background{ background : #4BEF82; } 
.힐링-text{ color: #FC178B !important; } 
.힐링-border{ border: #FC178B solid 5px !important; } 
.힐링-border-1{ border: #FC178B solid 1px !important; } 
.힐링-chip-1{ color: #FC178B !important; border: #FC178B solid 1px !important; } 
.힐링-fill{ fill : #FC178B; }
.힐링-background{ color: white; background : #FC178B; }
.바다-text{ color: #39C2FF !important; } 
.바다-border{ border: #39C2FF solid 5px !important; } 
.바다-border-1{ border: #39C2FF solid 1px !important; } 
.바다-chip-1{ color: #39C2FF !important; border: #39C2FF solid 1px !important; } 
.바다-fill{ fill : #39C2FF; }
.바다-background{ color: white; background : #39C2FF; }
.문화-text{ color: #5D24FE !important; } 
.문화-border{ border: #5D24FE solid 5px !important; } 
.문화-border-1{ border: #5D24FE solid 1px !important; } 
.문화-chip-1{ color: #5D24FE !important; border: #5D24FE solid 1px !important; } 
.문화-fill{ fill : #5D24FE; }
.문화-background{  color: white; background : #5D24FE; }
.포토스팟-text{ color: #FE9C00 !important; } 
.포토스팟-border{ border: #FE9C00 solid 5px !important; } 
.포토스팟-border-1{ border: #FE9C00 solid 1px !important; } 
.포토스팟-chip-1{ color: #FE9C00 !important; border: #FE9C00 solid 1px !important; } 
.포토스팟-chip-1{ color: #FE9C00 !important; border: #FE9C00 solid 1px !important; } 
.포토스팟-fill{ fill : #FE9C00; }
.포토스팟-background{ background : #FE9C00; }
.식당-text{ color: #D059DE !important; } 
.식당-border{ border: #D059DE solid 5px !important; } 
.식당-border-1{ border: #D059DE solid 1px !important; } 
.식당-chip-1{ color: #D059DE !important; border: #D059DE solid 1px !important; } 
.식당-fill{  fill : #D059DE; }
.식당-background{ color: white; background : #D059DE; }
.카페-text{ color: #FFE600 !important; } 
.카페-border{ border: #FFE600 solid 5px !important; } 
.카페-border-1{ border: #FFE600 solid 1px !important; } 
.카페-chip-1{ color: #FFE600 !important; border: #FFE600 solid 1px !important; } 
.카페-fill{ fill : #FFE600; }
.카페-background{ background : #FFE600; }
.기본-background{ color: white; background : #333333; }
</style>
