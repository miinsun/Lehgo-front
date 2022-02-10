<template>
  <v-container>
    <div class="searchArea">
      <v-form ref="form">
      <v-text-field id="searchInput" outlined placeholder="검색어를 입력하세요" hide-details="auto"
        v-model="keyword" :rules="[validation.firstError('keyword')]" color="#2699fb" required>
        <template v-slot:append>
          <div type="submit" class="mx-2" @click="searchPlace">
          <svg width="19" height="19" viewBox="0 0 20 20">
            <path d="M18.8,17.142l-3.9-3.9a8.094,8.094,0,0,0,1.655-4.965A8.225,8.225,0,0,0,8.276,0,8.225,8.225,0,0,0,0,8.276a8.225,8.225,0,0,0,8.276,8.276A8.094,8.094,0,0,0,13.241,14.9l3.9,3.9ZM2.364,8.276A5.854,5.854,0,0,1,8.276,2.364a5.854,5.854,0,0,1,5.911,5.911,5.854,5.854,0,0,1-5.911,5.911A5.854,5.854,0,0,1,2.364,8.276Z" fill="#2699fb"/>
          </svg>
          </div>
        </template>
      </v-text-field>
      </v-form>
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
    validators: {
      keyword : function (value) {
        return this.$Validator.value(value).required() 
      },
    },
    methods: {
      bgImg(place) {
        return 'background-image : url("' + place.img1 + '");'
      },
      searchPlace(){
        this.$refs.form.validate()
        this.$validate().then(() => {
          if(this.keyword){
            this.setListBySearch(this.keyword)
          }
        })
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
  height: 90vh;
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