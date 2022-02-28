<template>
  <v-container fluid>
    <div class="mainCourse"> <MainCourse/> </div>
    <v-row class="content">
      <div class="sideBarArea"><SideBar/></div>
      <div class="contentArea" :style="'width:' + mainWidth">
      <v-row class="lehgo-background">
      <div class="mainArea">
        <div>
          <ProfileCard @openUserInfo="openUserInfo"/>
          <MyPageList id="listArea" 
            @openLikedList="openLikedList"
            @openVisitedList="openVisitedList"
            @openCoursePlaceList="openCoursePlaceList"
            @openFolderPlaceList="openFolderPlaceList"/>
        </div>
      </div>
      <div class="sideArea" v-if="openSide">
          <div v-if="openSide">
            <UserInfo v-if="isUserInfo"/>
            <LikedList @clickedPlace="clickedPlace" v-if="isLikedList"/>
            <VisitedList @clickedPlace="clickedPlace" v-if="isVisitedList"/>
            <FolderPlaceList @clickedPlace="clickedPlace" v-if="isFolderPlaceList"/>
            <CoursePlaceList @clickedPlace="clickedPlace" v-if="isCoursePlaceList" :courseEditable="true"/>
          </div>
      </div>
      </v-row>
      </div>
      <div id="mapArea">
        <Map :mapCol="mapCol / 12" :key="mapKey"/>
      </div>
    </v-row>
    <v-bottom-sheet v-model="sheet">
      <v-sheet height="250px" >
       <PlaceInfo/>
      </v-sheet>
    </v-bottom-sheet>
  </v-container>
</template>

<script>
  import SideBar from '../components/SideBar'
  import MainCourse from '../components/place/MainCourse'
  import Map from '../components/map/Map'
  import UserInfo from '../components/user/UserInfo'
  import ProfileCard from '../components/user/ProfileCard'
  import MyPageList from '../components/user/MyPageList'
  import CoursePlaceList from '../components/placeList/CoursePlaceList'
  import LikedList from '../components/placeList/LikedList'
  import VisitedList from '../components/placeList/VisitedList'
  import FolderPlaceList from '../components/placeList/FolderPlaceList'
  import PlaceInfo from '../components/place/PlaceInfo'
  import { createNamespacedHelpers } from "vuex";
  const { mapActions : courseMapActions } = createNamespacedHelpers("courseStore");
  const { mapActions : placeMapActions } = createNamespacedHelpers("placeStore");
  const { mapGetters : listMapGetters, mapActions : listMapActions } = createNamespacedHelpers("placeListStore");

  export default {
    name: 'MyPage',

    data:() =>({
      mainWidth : '22vw',
      openSide : false,
      isUserInfo : false,
      isVisitedList : false,
      isLikedList : false,
      isCoursePlaceList : false,
      isFolderPlaceList : false,
      sheet : false,
      newPlace : null,
      mapCol : 8.7,
      mapKey : 0,
    }),
    components: {
      SideBar, MainCourse,
      UserInfo, MyPageList, ProfileCard,
      CoursePlaceList,  LikedList, VisitedList, FolderPlaceList,
      Map, PlaceInfo
    },
    methods:{
      openSideArea() {
        this.openSide = true;
        this.isUserInfo = false;
        this.isVisitedList = false;
        this.isCoursePlaceList = false;
        this.isFolderPlaceList = false;
        this.isLikedList = false;
        this.setCoursePage(false);
        this.mainWidth = '49vw';
        this.mapCol = 5.4;
      },
      openUserInfo(){
          this.openSideArea();
          this.isUserInfo = true;
      },
      openLikedList(){
          this.setListByLiked();
          this.openSideArea();
          this.isLikedList = true;
      },
      openVisitedList(){
          this.setListByVisited();
          this.openSideArea();
          this.isVisitedList = true;
      },
      openCoursePlaceList(courseId){
          this.setListByCourse(courseId);
          this.openSideArea();
          this.setCoursePage(true);
          this.coursePlaceList = this.getCoursePlaceList
          this.isCoursePlaceList = true;
      },
      openFolderPlaceList(folderId){
          this.setListByFolder(folderId);
          this.openSideArea();
          this.isFolderPlaceList = true;
      },
      clickedPlace(place){
        this.setPlace(place)
      },
      ...placeMapActions(['setPlace']),
      ...courseMapActions(['setCoursePage']),
      ...listMapActions(['setPlaceList', 'setListByLiked', 'setListByVisited', 'setListByFolder', 'setListByCourse'])
    },
    computed: {
      ...listMapGetters(['getPlaceList', 'getCoursePlaceList'])
    },
    created() {
      this.setPlaceList(null);
      //List<Place>로 수정 후 사용
      // placeListService.getVisitedList()
      // .then((res) => { 
      //   this.placeList = res; 
      // })
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
.sideBarArea{
  width: 5vw;
}
.mainArea{
  width: 20vw;
  height: 95vh;
  overflow: hidden;
  overflow: hidden;
  background-color:white;
  border-radius: 20px;
  margin: 30px 30px 30px 30px;
  padding: 0px 20px;
}
.sideArea{
  width: 25vw;
  height: 95vh;
  overflow: hidden;
  overflow: hidden;
  background-color:white;
  border-radius: 20px;
  margin: 30px 25px 30px 0px;
}
.content{
  width: 100vw;
}
.contentArea{
  overflow: hidden;
}
</style>