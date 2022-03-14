<template>
  <v-container fluid>
    <div class="mainCourse"> <MainCourse/> </div>
    <v-row class="content lehgo-background">
      <div class="sideBarArea"><SideBar/></div>
      <div class="mainArea">
        <div class="lehgo-main"></div>
        <div class="mainCategory"><MainCategory :categoryheight="getPlace != null ? '41vh' : '74vh'"/></div>
        <transition name="placeInfoTransition">
        <div class="placeInfo text-left" v-bar v-show="getPlace" > <PlaceInfo :infoCols="8" :titleImg="true"/> </div>
        </transition>
      </div>
      <div class="mapArea">
        <Map/>
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
.content{
  padding: 0;
  height: 100vh;
  overflow: hidden;
}
.sideBarArea{
  width: 5vw;
}
.mainArea{
  display:flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
  margin: -12px;
  width: 55vw;
  height: 95vh;
}
.mapArea{
  width: 40vw;
  overflow: hidden;
}
.mainCategory{
  margin-left: 0.5vw;
}
.placeInfo{
  height : 28vh;
  width: 53vw;
  overflow: hidden;
  background-color:white;
  border-radius: 20px;
  padding: 1vw 0px 0px 1vw;
  margin: 0px 2vw;
}
.lehgo-main{
  margin: 30px;
  margin-bottom: 0px;
  width: 150px;
  height: 8vh;
}
</style>