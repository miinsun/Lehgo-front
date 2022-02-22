<template>
  <v-container fluid>
      <v-row class="content">
        <v-col cols="1"><SideBar/></v-col>
        <v-col cols="3">
          <div class="searchArea">
            <Search @clickedPlace="clickedPlace"/>
          </div>
        </v-col>
        <v-col cols="4">
          <div class="searchArea">
              <PlaceInfo/>
          </div>
        </v-col>
        <v-col cols="4">
            <div id="mapArea">
                <Map :clickedPlace="newPlace" :mapCol="0.416" :coursePlaceList="[]"/>
            </div>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
  import Map from '../components/map/Map'
  import SideBar from '../components/SideBar'
  import Search from '../components/Search'
  import PlaceInfo from '../components/place/PlaceInfo'
  import { createNamespacedHelpers } from "vuex";
  const { mapActions : listMapActions } = createNamespacedHelpers("placeListStore");

  export default {
    name: 'Main',
    data:() =>({
      newPlace : null,
    }),
    components: {
      Map,
      SideBar,
      Search,
      PlaceInfo
    },
    methods:{
      clickedPlace(place){
        this.newPlace = place;
      },
        ...listMapActions(['setPlaceList'])
    },
    computed:{
    },
    mounted() {
    },
    created() {
      this.setPlaceList(null)
    }
  }
</script>

<style scoped>
.col{
  padding: 0;
  height: 100vh;
}
.footer{
    height: hidden;
}
.searchArea{
    height: 100vh;
    overflow: hidden;
}
#mapArea{
    height: 100vh;
    overflow: hidden;
}
</style>