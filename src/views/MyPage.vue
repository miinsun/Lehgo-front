<template>
  <v-container fluid>
    <v-row class="content">
      <v-col cols="1"><SideBar/></v-col>
      <v-col cols="3">
        <div>
          <ProfileCard @openUserInfo="openUserInfo"/>
          <MyPageList id="listArea" 
            @openLikedList="openLikedList"
            @openVisitedList="openVisitedList"
            @openCoursePlaceList="openCoursePlaceList"
            @openFolderPlaceList="openFolderPlaceList"/>
        </div>
      </v-col>
      <v-col v-if="openSide" cols="3">
          <div v-if="openSide">
            <UserInfo v-if="isUserInfo"/>
            <LikedList @clickedPlace="clickedPlace" v-if="isLikedList"/>
            <VisitedList @clickedPlace="clickedPlace" v-if="isVisitedList"/>
            <FolderPlaceList @clickedPlace="clickedPlace" v-if="isFolderPlaceList"/>
            <CoursePlaceList @clickedPlace="clickedPlace" v-if="isCoursePlaceList"/>
          </div>
      </v-col>
      <v-col :cols="mapCol">
          <div id="mapArea">
            <Map :clickedPlace="newPlace" :mapCol="mapCol / 12" :key="mapKey"/>
          </div>
      </v-col>
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
  const { mapGetters : listMapGetters, mapActions : listMapActions } = createNamespacedHelpers("placeListStore");

  export default {
    name: 'MyPage',

    data:() =>({
        openSide : false,
        isUserInfo : false,
        isVisitedList : false,
        isLikedList : false,
        isCoursePlaceList : false,
        isFolderPlaceList : false,
        sheet : false,
        newPlace : null,
        mapCol : 8,
        mapKey : 0,
    }),
    components: {
      SideBar,
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
          this.mapCol = 5;
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
            this.coursePlaceList = this.getCoursePlaceList
            this.isCoursePlaceList = true;
            console.log(courseId)
            console.log(this.getCoursePlaceList[0].place)
            console.log(this.getPlaceList)
        },
        openFolderPlaceList(folderId){
            this.setListByFolder(folderId);
            this.openSideArea();
            this.isFolderPlaceList = true;
        },
        clickedPlace(place){
          this.sheet = true;
          this.newPlace = place;
        },
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
</style>