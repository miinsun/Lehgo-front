<template>
  <v-container>
    <div class="searchArea">
      <v-text-field label="검색" v-model="keyword"></v-text-field>
      <v-btn @click="searchPlace">검색</v-btn>
    </div>
    <div class="resultArea" v-bar>
      <v-list rounded>
        <v-list-item-group color="gray"  class="text-left">
          <v-list-item class="py-3" v-for="p, i in result" :key="i"> 
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
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions : listMapActions, mapGetters : listMapGetters } = createNamespacedHelpers("placeListStore");

  export default {
    name: 'Search',
    components:{
    },
    data: () => ({
      keyword : '',
      result : [],
    }),
    methods: {
      bgImg(place) {
        return 'background-image : url("' + place.img1 + '");'
      },
      searchPlace(){
        this.setListBySearch(this.keyword)
      },
      clickedPlace(place){
          this.$emit('clickedPlace', place);
      },
      ...listMapActions(['setListBySearch'])
    },
    mounted(){
    },
    computed: {
      ...listMapGetters(['getPlaceList'])
    },
    watch: {
      getPlaceList: function(){
        this.result = this.getPlaceList
        console.log(this.result)
      }
    }
  }
</script>

<style scoped>
.searchArea{
  height: 20vh;
}
.resultArea{
  height: 80vh;
  overflow: auto;
  overflow-y: scroll;
}
.placeImg{
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