<template>
  <v-container fluid>
      <v-row class="mainContainer">
        <v-col cols="1" class="info"> </v-col>
        <v-col cols="11">
        <v-row class="text-center mainContent">
            <v-col cols="5">
                <div class="mainCourse">
                    <MainNav/>
                </div>
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
       </v-col>
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
        },
    },
    created() {
    },
  }
</script>

<style scoped>
.mainContainer{
    height: 100vh;
    width: 100vw;
}
.mainCourse{
    height:10vh;
}
.mainCategory{
    height:20vh;
}
.placeInfo{
    height:65vh;
}
.mapArea{
    overflow: disabled;
}
.footer{
    height: hidden;
}
</style>