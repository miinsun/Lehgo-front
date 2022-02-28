<template>
  <v-container fluid>
      <div class="mainCourse"> <MainCourse/> </div>
      <v-row class="contetnArea">
        <div class="sideBarArea"><SideBar/></div>
        <v-row class="lehgo-background">
          <div class="searchArea">
            <Search/>
          </div>
          <div class="placeInfoArea" v-if="getPlace">
              <PlaceInfo/>
              <v-row class="buttonArea">
                  <div class="morePlaceInfo">더보기</div>
                  <a :href="'http://localhost:8081/place?pId=' + getPlace.placeId">
                  <svg class="mb-2" width="43" height="25.705" viewBox="0 0 43 25.705">
                  <path d="M11.148,0,8.811,2.337l8.846,8.846H-19v3.338H17.657L8.811,23.368,11.148,25.7,24,12.852Z" transform="translate(19)" :class="getFirstCategory + '-fill'"/>
                  </svg>
                  </a>
              </v-row>
              <v-row class="contentArea">
                <v-col cols="6">
                <div class="imageArea" v-bar>
                <div>
                    <div class="placeImage" v-for="img in getImgList" :key="img" :style="bgImg(img)"/>
                    <div class="placeImage" v-for="img in getNaverImg" :key="img" :style="bgImg(img.thumbnail)"/>
                </div>
                </div></v-col>
                <v-col cols="6" class="postArea">
                    <PlacePost/>
                </v-col>
            </v-row>
          </div>
        </v-row>
        <div class="mapArea">
            <Map :mapCol="0.36"/>
        </div>
      </v-row>
  </v-container>
</template>

<script>
  import Map from '../components/map/Map'
  import SideBar from '../components/SideBar'
  import Search from '../components/Search'
  import MainCourse from '../components/place/MainCourse'
  import PlaceInfo from '../components/place/PlaceInfo'
  import PlacePost from '../components/place/PlacePost'
  import { createNamespacedHelpers } from "vuex";
  const { mapGetters : placeMapGetters } = createNamespacedHelpers("placeStore");
  const { mapActions : courseMapActions } = createNamespacedHelpers("courseStore");
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
      PlaceInfo,
      PlacePost,
      MainCourse
    },
    methods:{
        bgImg(src) {
            return 'background-image : url("' + src + '");'
        },
      ...courseMapActions(['setCoursePage']),
      ...listMapActions(['setPlaceList'])
    },
    computed:{
      ...placeMapGetters(['getPlace', 'getCategory', 'getImgList', 'getNaverImg', 'getFirstCategory']),
    },
    mounted() {
    },
    created() {
      this.setPlaceList(null);
      this.setCoursePage(false);
    }
  }
</script>

<style scoped>
.col{
  padding: 0;
  height: 100vh;
}
.sideBarArea{
  width: 5vw;
}
.footer{
    height: hidden;
}
.searchArea{
  width: 27vw;
  height: 95vh;
  overflow: hidden;
  overflow: hidden;
  background-color:white;
  border-radius: 20px;
  margin: 30px 25px 0px 35px;
}
.placeInfoArea{
  width: 27vw;
  height: 95vh;
  overflow: hidden;
  overflow: hidden;
  background-color:white;
  border-radius: 20px;
  margin: 30px 0px 0px 0px;
  padding: 20px 20px;
}
.mapArea{
  overflow: disabled;
}
.contetnArea{
  overflow: hidden;
}
.contentArea{
  height: 60vh;
  padding: 20px;
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
.buttonArea{
  justify-content: right;
  padding-right: 20px;
  margin-top: -20px;
}
.morePlaceInfo{
  font-size: 16px;
  line-height: 25px;
  padding-right: 10px;
}
</style>