<template>
  <div>
    <v-row class="deletePlace mb-3">
      <v-col cols="2 offset-10">
         <v-btn text @click="deletePlace()"><i class="far fa-trash-alt"></i></v-btn>
      </v-col>
    </v-row>
    <v-progress-circular v-if="!getLoaded" :size="50" :width="7" indeterminate color="#2699fb"></v-progress-circular>
    <div class="placeList" v-bar>
    <div>
      <v-list rounded>
        <v-list-item-group color="gray"  class="text-left" >
          <v-list-item class="py-3" v-for="p, i in getPlaceList" :key="i"> 
            <span class="placeImg rounded-circle" v-if="p.place.img1" :style="bgImg(p.place)"></span>
            <span class="noImg rounded-circle" v-if="!p.place.img1">
                <i class="far fa-image"></i>
            </span>
            <v-list-item-content @click="clickedPlace(p.place)">
                <v-list-item-title><b>{{p.place.placeName}}</b></v-list-item-title>
                <small>{{p.place.address}}</small>
            </v-list-item-content>
          <v-checkbox class="checkbox" v-model="selectedList" color="error" :value="p.place.placeId" hide-details></v-checkbox>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
    </div>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from "vuex";
  const { mapActions : listMapActions, mapGetters : listMapGetters } = createNamespacedHelpers("placeListStore");

  export default {
    name: 'VisitedList',

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
.placeImg{
    /* background-image: url("https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=264a874f-7a2e-4733-9349-044794a845ee"); */
    background-size: cover; 
    background-position: center; 
    width: 100px; 
    height: 100px;
    margin-right: 20px
}
.noImg{
    background-color: lightgray;
    text-align: center;
    width: 100px; 
    height: 100px;
    margin-right: 20px;
}
.noImg i{
    color: white;
    font-size: 30px;
    margin-top: 35px
}
.deletePlace{
  margin-right: 0px;
  height: 50px;
  border-bottom : #226AB3 solid;
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