<template>
  <div class="placeList" v-bar>
    <v-list rounded>
      <v-list-item-group  color="gray"  class="text-left" >
        <v-list-item class="py-3" v-for="p, i in getPlaceList" :key="i"> 
          <span class="placeImg rounded-circle" v-if="p.place.img1" :style="bgImg(p.place)"></span>
          <span class="noImg rounded-circle" v-if="!p.place.img1">
              <i class="far fa-image"></i>
          </span>
          <v-list-item-content @click="clickedPlace(p.place)">
              <v-list-item-title><b>{{p.place.placeName}}</b></v-list-item-title>
              <small>{{p.place.address}}</small>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from "vuex";
  const { mapGetters : listMapGetters } = createNamespacedHelpers("placeListStore");

  export default {
    name: 'LikedList',

    data: () => ({
    }),
    methods: {
        bgImg(place) {
            return 'background-image : url("' + place.img1 + '");'
        },
        clickedPlace(place){
            this.$emit('clickedPlace', place);
        },
    },
    computed:{
      ...listMapGetters(['getPlaceList'])
    },
    mounted() {
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
</style>