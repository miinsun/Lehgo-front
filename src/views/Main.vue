<template>
  <v-container fluid>
      <div class="top">
          <MainNav/>
      </div>
      <v-row class="text-center mainContent">
          <v-col cols="5">
            <div class="mainCategory" v-bar>
                <MainCategory/>
            </div>
            <div class="placeInfo" v-bar>
                <PlaceInfo/>
            </div>
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
  import Map from '../components/map/MainMap'
  import MainNav from '../components/place/MainNav'
  import MainCategory from '../components/place/MainCategory'
  import PlaceInfo from '../components/place/PlaceInfo'

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
      MainCategory,
      PlaceInfo,
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
.mainContent{
    height:80vh;
}
.mainCategory{
    height:20vh;
}
.placeInfo{
    height:60vh;
}
.mapArea{
    height:80vh;
    overflow: disabled;
}
.footer{
    height: hidden;
}
</style>