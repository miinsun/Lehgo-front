<template>
  <v-container fluid>
    <v-row class="content">
      <v-col cols="1"><SideBar/></v-col>
      <v-col cols="3">
        <div>
          <ProfileCard @openUserInfo="openUserInfo"/>
          <MyPageList id="listArea" 
            @openLikedList="openLikedList"
            @openSearchList="openSearchList"
            @openCourseList="openCourseList"/>
        </div>
      </v-col>
      <v-col v-if="openSide" cols="3">
          <div v-if="openSide" id="sideArea" v-bar>
            <UserInfo v-if="isUserInfo"/>
            <SearchList v-if="isSearchedList"/>
            <FolderList @clickedPlace="clickedPlace" v-if="isLikedList"/>
          </div>
      </v-col>
      <v-col :cols="mapCol">
          <div id="mapArea">
            <Map :clickedPlace="newPlace" :mapCol="mapCol" :placeList="placeList"/>
          </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import SideBar from '../components/SideBar'
  import Map from '../components/map/MyPageMap'
  import UserInfo from '../components/user/UserInfo'
  import ProfileCard from '../components/user/ProfileCard'
  import MyPageList from '../components/user/MyPageList'
  import SearchList from '../components/user/SearchList'
  import FolderList from '../components/user/FolderList'
  import placeListService from '@/services/placeListService';

  export default {
    name: 'MyPage',

    data:() =>({
        openSide : false,
        mapCol : 8,
        newPlace : null,
        isUserInfo : false,
        isVisitedList : false,
        isSearchedList : false,
        isLikedList : false,
        isCourseList : false,
        placeList : [],
    }),
    components: {
      SideBar,
      UserInfo, MyPageList, ProfileCard,
      SearchList, FolderList,
      Map,
    },
    methods:{
        openSideArea() {
            this.openSide = true;
            this.isUserInfo = false;
            this.isVisitedList = false;
            this.isSearchedList = false;
            this.isLikedList = false;
            this.isCourseList = false;
            this.mapCol = 5;
        },
        openUserInfo(){
            this.openSideArea();
            this.isUserInfo = true;
        },
        openLikedList(){
            this.openSideArea();
            this.isLikedList = true;
            placeListService.getLikedList()
            .then((res) => { 
              this.placeList = res; 
            })
        },
        openSearchList(){
            this.openSideArea();
            this.isSearchedList = true;
        },
        openCourseList(){
            this.openSideArea();
            this.isCourseList = true;
        },
        clickedPlace(place){
          this.newPlace = place;
        }
    },
    created() {
    },
    mounted() {
      //List<Place>로 수정 후 사용
      // placeListService.getVisitedList()
      // .then((res) => { 
      //   this.placeList = res; 
      // })
    }
  }
</script>

<style scoped>
.col{
  padding: 0;
  height: 100vh;
}
#listArea{
    height:50vh;
    overflow: auto;
}
#sideArea{
    width: 25vw;
    height: 100vh;
    background-color: white;
    overflow: auto;
}
#mapArea{
    height: 100vh;
    overflow: hidden;
}
</style>