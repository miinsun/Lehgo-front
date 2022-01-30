<template>
  <v-container fluid>
      <div class="top">
          <TestBar/>
      </div>
      <v-row class="text-center body" >
          <v-col cols="3">
              <div>
                <ProfileCard @openSideArea="openSideArea"/>
                <MyPageList id="listArea" @openSideArea="openSideArea"/>
              </div>
          </v-col>
          <v-col v-if="openSide" cols="3">
              <div v-if="openSide" id="sideArea" v-bar>
                <UserInfo v-if="sideArea == 'userInfo'"/>
                <SearchList v-if="sideArea == 'searchList'"/>
              </div>
          </v-col>
          <v-col :cols="mapCol">
              <div id="mapArea">
                <Map/>
              </div>
          </v-col>
      </v-row>
      <v-row class="text-center footer">
          <v-footer>footer</v-footer>
      </v-row>
  </v-container>
</template>

<script>
  import MyPageList from '../components/user/MyPageList'
  import ProfileCard from '../components/user/ProfileCard'
  import UserInfo from '../components/user/UserInfo'
  import SearchList from '../components/user/SearchList'
  import Map from '../components/Map'
  import TestBar from '../components/TestBar'

  export default {
    name: 'MyPage',

    data:() =>({
        openSide : false,
        sideArea : '',
        mapCol : 9,
        mapAreaStyle : ''
    }),
    components: {
      MyPageList,
      ProfileCard,
      Map,
      TestBar,
      UserInfo,
      SearchList
    },
    methods:{
        openSideArea(value) {
            this.openSide = true;
            this.sideArea = value;
            this.mapCol = 6
            console.log(this.sideArea)
        },
    },
    created() {
    },
  }
</script>

<style scoped>
.body{
    height:80vh;
}
#listArea{
    height:50vh;
    overflow: auto;
}
#sideArea{
    height:90vh;
    width:25vw;
    background-color: white;
    overflow: auto;
}
#mapArea{
    height:80vh;
    overflow: disabled;
}
</style>