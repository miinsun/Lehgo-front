<template>
  <v-container fluid>
      <div class="mainCourse"> <MainCourse/> </div>
      <v-row class="content">
        <div class="sideBarArea"><SideBar/></div>
        <div class="text-center mainArea lehgo-background">
          <div class="lehgo-main"></div>
            <div class="mainCategory"><MainCategory :categoryheight="getPlace != null ? '41vh' : '74vh'"/></div>
            <transition name="placeInfoTransition">
            <div class="placeInfo text-left" v-bar v-show="getPlace" > <PlaceInfo :infoCols="8" :titleImg="true"/> </div>
            </transition>
          </div>
        <div>
            <div class="mapArea">
                <Map :mapCol="0.3"/>
            </div>
        </div>
      </v-row>
  </v-container>
</template>

<script>
  import Map from '../components/map/Map'
  import MainCourse from '../components/place/MainCourse'
  import MainCategory from '../components/place/MainCategory'
  import PlaceInfo from '../components/place/PlaceInfo'
  import SideBar from '../components/SideBar'
  import { createNamespacedHelpers } from "vuex";
  import userInfoService from '@/services/userInfoService';
  const { mapActions : categorymapActions } = createNamespacedHelpers("categoryStore");
  const { mapGetters : placeMapGetters } = createNamespacedHelpers("placeStore");
  const { mapGetters : listMapGetters, mapActions : listMapActions } = createNamespacedHelpers("placeListStore");
  const { mapGetters : courseGetters, mapActions : courseMapActions } = createNamespacedHelpers("courseStore");

  export default {
    name: 'Main',
    data:() =>({
    }),
    components: {
      Map,
      MainCourse,
      MainCategory,
      PlaceInfo,
      SideBar
    },
    methods:{
      ...courseMapActions(['setCoursePage']),
      ...listMapActions(['setListByAI', 'setCourse']),
      ...categorymapActions(['setCategoryList', 'setCategoryInit'])
    },
    computed:{
      ...placeMapGetters(['getPlace']),
      ...listMapGetters(['getLoaded']),
      ...courseGetters(['getMainCourse']),
    },
    mounted() {
      // this.setListByAI()
      this.setCoursePage(false);
      this.setCourse(this.getMainCourse)
      userInfoService.getUserInfo().then().catch(
        () => {
            this.$router.push({ name: 'Login' })
        }
      )
    },
    created(){
    },
  }
</script>

<style scoped>
.col{
  padding: 0;
  height: 100vh;
}
.lehgo-background{
  margin-left: -10px;
  padding-left: 10px;
}
.sideBarArea{
  width: 5vw;
}
.mainArea{
  width: 60vw;
}
.mapArea{
  overflow: disabled;
}
.placeInfo{
  height : 30vh;
  overflow: hidden;
  background-color:white;
  border-radius: 20px;
  padding: 20px 0px 0px 20px;
  margin: 10px 20px 20px 20px;
}
.lehgo-main{
  margin: 20px;
  margin-bottom: 0px;
  width: 150px;
  height: 70px;
}
</style>