<template>
  <v-container fluid>
    <v-row class="content">
      <v-col cols="1"><SideBar/></v-col>
      <v-col cols="3">
        <CourseList/>
      </v-col>
      <v-col :cols="8">
          <div id="mapArea">
            <Map :mapCol="9 / 12" :key="mapKey"/>
          </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import SideBar from '../../components/SideBar'
  import Map from '../../components/map/Map'
  import CourseList from '../../components/CourseList'
  import { createNamespacedHelpers } from "vuex";
  const { mapActions : courseMapActions } = createNamespacedHelpers("courseStore");
  const { mapGetters : listMapGetters, mapActions : listMapActions } = createNamespacedHelpers("placeListStore");

  export default {
    name: 'ShareCourse',

    data:() =>({
        sheet : false,
        newPlace : null,
        mapCol : 9,
        mapKey : 0,
    }),
    components: {
      SideBar, CourseList, Map
    },
    methods:{
      clickedPlace(place){
        this.setPlace(place)
        setTimeout(() =>(this.sheet = true), 500);
      },
      ...courseMapActions(['setCoursePage']),
      ...listMapActions(['setPlaceList', 'setListByLiked', 'setListByVisited', 'setListByFolder', 'setListByCourse'])
    },
    computed: {
      ...listMapGetters(['getPlaceList', 'getCoursePlaceList'])
    },
    created() {
    },
    mounted(){
      this.setPlaceList([]);
      this.setListByCourse(this.$route.query.cId)
      this.setCoursePage(true);
      this.coursePlaceList = this.getCoursePlaceList
    },
    watch:{
      getPlaceList: function(){
        this.mapKey += 1
      },
    }
  }
</script>

<style scoped>
.col{
  padding: 0;
  height: 100vh;
}
#listArea{
    height:70vh;
    overflow: auto;
}
#mapArea{
    height: 100vh;
    overflow: hidden;
}
</style>