<template>
  <div>
    <v-row class="deletePlace">
      <v-col cols="2 offset-10">
         <v-btn text @click="deletePlace()"><i class="far fa-trash-alt"></i></v-btn>
      </v-col>
    </v-row>
    <PlaceList class="placeListArea" :showCheck="true" @selectedList="changeSelectedList"/>
  </div>
</template>

<script>
import PlaceList from '.././placeList/placeList'
  import { createNamespacedHelpers } from "vuex";
  const { mapActions : listMapActions, mapGetters : listMapGetters } = createNamespacedHelpers("placeListStore");

  export default {
    name: 'VisitedList',
    components:{
      PlaceList
    },
    data: () => ({
      selectedList : []
    }),
    methods: {
        bgImg(place) {
            return 'background-image : url("' + place.img1 + '");'
        },
        clickedPlace(place){
            this.$emit('clickedPlace', place);
        },
        changeSelectedList(list){
          this.selectedList = list;
        },
        deletePlace(){
          for(let i in this.selectedList){
            this.deletePlaceFromVisited(this.selectedList[i])
          }
        },
        ...listMapActions(['deletePlaceFromVisited']),
    },
    computed:{
      ...listMapGetters(['getLoaded', 'getPlaceList'])
    },
    mounted() {
    },
    created(){
    }
  }
</script>

<style scoped>
.placeList{
    height: 100vh;
    overflow: auto;
}
.deletePlace{
  margin-right: 0px;
  height: 55px;
  margin-top: 2px;
  border-bottom : #0057FF solid;
}
.v-btn.v-size--default{
  min-width: 20px;
}
.checkbox{
  position: absolute;
  height : 10px;
  right: 0;
  top : 0;
}
</style>