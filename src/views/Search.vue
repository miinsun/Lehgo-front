<template>
  <v-container fluid>
    <v-row class="content">
      <v-col cols="1"><SideBar/></v-col>
      <v-col cols="3">
        <div>
          <SearchArea/>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import SideBar from '../components/SideBar'
  import SearchArea from '../components/Search'
//   import placeListService from '@/services/placeListService';

  export default {
    name: 'sesarch',

    data:() =>({
    }),
    components: {
      SideBar,
      SearchArea
    },
    methods:{
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
</style>