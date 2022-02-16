<template>
  <v-container fluid>
      <v-row class="content">
        <v-col cols="1"><SideBar/></v-col>
        <v-col cols="5" class="text-center">
            <div class="mainCourse"> <MainNav/> </div>
            <div class="mainCategory" v-bar> <MainCategory/> </div>
            <div class="placeInfo text-left" v-bar> <PlaceInfo/> </div>
        </v-col>
        <v-col cols="6">
            <div class="mapArea">
                <Map :mapCol="0.5" :coursePlaceList="getNowCourse"/>
            </div>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
  import Map from '../components/map/Map'
  import MainNav from '../components/place/MainNav'
  import MainCategory from '../components/place/MainCategory'
  import PlaceInfo from '../components/place/PlaceInfo'
  import SideBar from '../components/SideBar'
  import places from '@/assets/testPlaceData.js'
  import { createNamespacedHelpers } from "vuex";
  const { mapActions : listMapActions } = createNamespacedHelpers("placeListStore");
  const { mapGetters : courseGetters } = createNamespacedHelpers("courseStore");

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
        ...listMapActions(['setPlaceList'])
    },
    computed:{
      ...courseGetters(['getNowCourse'])
    },
    mounted() {
    },
    created(){
      this.setPlaceList(places)
    }
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
.mapArea{
    overflow: disabled;
}
</style>