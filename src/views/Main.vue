<template>
  <v-container fluid>
      <v-row class="content">
        <v-col cols="1"><SideBar/></v-col>
        <v-col cols="5">
            <v-row class="text-center mainContent">
                <div class="mainCourse">
                    <MainNav/>
                </div>
                <div class="mainCategory" v-bar>
                    <MainCategory/>
                </div>
                <div class="placeInfo" v-bar>
                    <PlaceInfo/>
                </div>
            </v-row>
        </v-col>
        <v-col cols="6">
            <div class="mapArea">
                <Map/>
            </div>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
  import Map from '../components/map/MainMap'
  import MainNav from '../components/place/MainNav'
  import MainCategory from '../components/place/MainCategory'
  import PlaceInfo from '../components/place/PlaceInfo'
  import SideBar from '../components/SideBar'

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
      SideBar
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
.col{
  padding: 0;
  height: 100vh;
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