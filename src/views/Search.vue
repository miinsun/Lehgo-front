<template>
  <v-container fluid>
      <div class="mainCourse"> <MainCourse/> </div>
      <v-row class="content lehgo-background">
        <div class="sideBarArea"><SideBar/></div>
        <v-row>
          <div class="searchArea">
            <Search/>
          </div>
          <div class="placeInfoArea" v-if="getPlace">
              <PlaceInfo/>
              <div class="buttonArea" type="button" @click="goToPlace(getPlace.placeId)">
                <div class="morePlaceInfo">더보기</div>
                <svg class="morePlaceInfoSvg" width="43" height="25.705" viewBox="0 0 43 25.705">
                  <path d="M11.148,0,8.811,2.337l8.846,8.846H-19v3.338H17.657L8.811,23.368,11.148,25.7,24,12.852Z" transform="translate(19)" :class="getFirstCategory + '-fill'"/>
                </svg>
            </div>
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
            <Map/>
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
      goToPlace(placeId){
        this.$router.push({
            name: 'Place', query: {pId: placeId}
        })
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
.searchArea{
  width: 25vw;
  height: 95vh;
  overflow: hidden;
  background-color:white;
  border-radius: 20px;
  margin: 30px 1.5vw 0px 2vw;
}
.placeInfoArea{
  width: 25vw;
  height: 95vh;
  overflow: hidden;
  background-color:white;
  border-radius: 20px;
  margin: 30px 0px 0px 0px;
  padding: 20px 20px;
}
.mapArea{
  width: 40vw;
  height: 100vh;
  overflow: disabled;
}
.contentArea{
  height: 65vh;
  padding: 20px;
  overflow: hidden;
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
  position: relative;
  padding-right: 20px;
  margin-top: -2vw;
  margin-bottom: 2vw;
}
.morePlaceInfo{
  position: absolute;
  right: 55px;
  font-size: 16px;
  line-height: 25px;
  padding-right: 10px;
}
.morePlaceInfoSvg{
  position: absolute;
  right: 10px;
}
</style>