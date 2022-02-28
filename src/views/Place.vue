<template>
  <v-container fluid>
      <div class="mainCourse"> <MainCourse/> </div>
      <v-row class="content">
        <div class="sideBarArea"><SideBar/></div>
        <div class="text-center mainArea lehgo-background">
            <div class="placeInfoArea text-left" v-bar>
                <div v-if="getPlace">
                <div class="topArea">
                    <PlaceInfo :infoCols="9" titleImg="true"/>
                    <v-divider class="mt-5"></v-divider>
                </div>
                <div class="bottomArea">
                    <v-row>
                        <v-col cols="3.5">
                            <div class="imageArea" v-bar>
                            <div>
                                <div class="placeImage" v-for="img in getImgList" :key="img" :style="bgImg(img)"/>
                                <div class="placeImage" v-for="img in getNaverImg" :key="img" :style="bgImg(img.thumbnail)"/>
                            </div>
                            </div></v-col>
                        <v-col cols="3.5">
                            <div :class="getFirstCategory + '-border-1 contentArea'" v-bar>
                                <div><div>{{getPlace.content}}</div></div>
                            </div></v-col>
                        <v-col cols="5" class="postArea">
                            <PlacePost/>
                        </v-col>
                    </v-row>
                </div>
                </div>
            </div>
        </div>
        <div>
            <div class="mapArea">
                <Map :mapCol="0.416"/>
            </div>
        </div>
      </v-row>
  </v-container>
</template>

<script>
  import Map from '../components/map/Map'
  import MainCourse from '../components/place/MainCourse'
  import PlaceInfo from '../components/place/PlaceInfo'
  import PlacePost from '../components/place/PlacePost'
  import SideBar from '../components/SideBar'
  import { createNamespacedHelpers } from "vuex";
  const { mapGetters : placeMapGetters, mapActions : placeMapActions } = createNamespacedHelpers("placeStore");
  const { mapGetters : listMapGetters, mapActions : listMapActions } = createNamespacedHelpers("placeListStore");
  const { mapGetters : courseGetters, mapActions : courseMapActions } = createNamespacedHelpers("courseStore");

  export default {
    name: 'Place',
    data:() =>({
        naverImgList : []
    }),
    components: {
      Map,
      MainCourse,
      PlaceInfo,
      PlacePost,
      SideBar
    },
    methods:{
        bgImg(src) {
            return 'background-image : url("' + src + '");'
        },
        ...placeMapActions(['setPlaceByPlaceId']),
        ...courseMapActions(['setCoursePage']),
        ...listMapActions(['setListByVisited', 'setCourse'])
    },
    computed:{
      ...placeMapGetters(['getPlace', 'getCategory', 'getImgList', 'getNaverImg', 'getFirstCategory']),
      ...listMapGetters(['getLoaded']),
      ...courseGetters(['getMainCourse']),
    },
    mounted() {
      this.setCoursePage(false);
      this.setCourse(this.getMainCourse)
    },
    created(){
      // this.setPlaceList(null);
      this.setPlaceByPlaceId(this.$route.query.pId)
    },
    watch:{
    }
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
  width: 53vw;
}
.mapArea{
  overflow: disabled;
}
.placeInfoArea{
  overflow: hidden;
  background-color:white;
  border-radius: 20px;
  margin: 25px;
}
.topArea{
    height: 30vh;
    padding: 20px;
}
.bottomArea{
    height: 64vh;
    padding: 20px 30px 50px 50px;
}
.contentArea{
  height: 60vh;
  padding: 5px;
  border-radius: 5px;
  overflow: auto;
  font-family: 'Noto Sans KR';
}
.imageArea{
  height: 60vh;
  margin-right: 10px;
}
.placeImage{
  width: 100%;
  height: 10vw;
  background-size: cover; 
  background-position: center; 
  box-sizing: content-box;
  margin-bottom: 10px;
  border-radius: 5px;
}
.postArea{
  height: 60vh;
}
</style>