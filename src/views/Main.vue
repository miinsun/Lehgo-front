<template>
  <v-container fluid>
      <div class="top">
          <MainNav/>
      </div>
      <v-row class="text-center body" >
          <v-col cols="5">
            <MainCategory/>
          </v-col>
          <v-col cols="7">
              <div class="mapArea">
                <Map/>
              </div>
          </v-col>
      </v-row>
      <v-row class="text-center footer">
          <v-footer>footer</v-footer>
      </v-row>
  </v-container>
</template>

<script>
  import Map from '../components/Map'
  import MainNav from '../components/place/MainNav'
  import MainCategory from '../components/place/MainCategory'

  export default {
    name: 'Main',
    data:() =>({
        openSide : false,
        sideArea : '',
        mapCol : 9,
        mapAreaStyle : ''
    }),
    components: {
      Map,
      MainNav,
      MainCategory
    },
    methods:{
        openSideArea(value) {
            this.openSide = true;
            this.sideArea = value;
            this.mapCol = 6
            console.log(this.sideArea)
        },
    },
    created() {
    },
  }
</script>

<style scoped>
.top{
    height: 10vh;
}
.body{
    height:80vh;
}
.sideArea{
    height:90vh;
    width:25vw;
    background-color: white;
    overflow: auto;
}
.mapArea{
    height:80vh;
    overflow: disabled;
}
.footer{
    height: hidden;
}
</style>