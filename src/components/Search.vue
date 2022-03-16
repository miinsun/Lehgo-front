<template>
  <v-container>
    <div class="searchArea">
      <v-form ref="form">
      <v-text-field id="placeSearchInput" outlined placeholder="검색어를 입력하세요" hide-details="auto"
        v-model="keyword" :rules="[validation.firstError('keyword')]" color="#2699fb" @keydown.enter.prevent="searchPlace">
        <template v-slot:prepend-inner>
          <div class="text-center searchOption">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="white" depressed v-bind="attrs" v-on="on">{{items[selected]}} ▼</v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item, index) in items" :key="index" link>
                  <v-list-item-title v-text="item" @click="selected = index"></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </template>
        <template v-slot:append>
          <div type="submit" class="mx-2" @click="searchPlace">
          <svg width="19" height="19" viewBox="0 0 20 20">
            <path d="M18.8,17.142l-3.9-3.9a8.094,8.094,0,0,0,1.655-4.965A8.225,8.225,0,0,0,8.276,0,8.225,8.225,0,0,0,0,8.276a8.225,8.225,0,0,0,8.276,8.276A8.094,8.094,0,0,0,13.241,14.9l3.9,3.9ZM2.364,8.276A5.854,5.854,0,0,1,8.276,2.364a5.854,5.854,0,0,1,5.911,5.911,5.854,5.854,0,0,1-5.911,5.911A5.854,5.854,0,0,1,2.364,8.276Z" fill="#0057FF"/>
          </svg>
          </div>
        </template>
      </v-text-field>
      </v-form>
    </div>
    <div class="placeListArea">
      <PlaceList :showCheck="false"/>
    </div>
  </v-container>
</template>

<script>
import PlaceList from './placeList/placeList'
import { createNamespacedHelpers } from "vuex";
const { mapActions : placeMapActions } = createNamespacedHelpers("placeStore");
const { mapActions : listMapActions, mapGetters : listMapGetters } = createNamespacedHelpers("placeListStore");

  export default {
    name: 'Search',
    components:{
      PlaceList
    },
    data: () => ({
      keyword : '',
      result : null,
      selected : 0,
      items : ['전체', '이름', '주소', '설명']
    }),
    validators: {
      keyword : function (value) {
        return this.$Validator.value(value).required() 
      },
    },
    methods: {
      getHover(hover){
        if(hover){
          return 'on-hover'
        }
      },
      bgImg(place) {
        return 'background-image : url("' + place.img1 + '");'
      },
      searchPlace(){
        this.$refs.form.validate()
        this.$validate().then(() => {
          if(this.keyword){
            if(this.selected == 0){
              this.setListBySearchAll(this.keyword)
            }
            else if(this.selected == 1){
              this.setListBySearchName(this.keyword)
            }
            else if(this.selected == 2){
              this.setListBySearchArea(this.keyword)
            }
            else if(this.selected == 3){
              this.setListBySearchContent(this.keyword)
            }
          }
        })
      },
      clickedPlace(place){
        console.log(this.getPlaceList)
          this.setPlace(place);
      },
      ...placeMapActions(['setPlace']),
      ...listMapActions(['setListBySearchAll', 'setListBySearchName', 'setListBySearchArea', 'setListBySearchContent'])
    },
    created(){
    },
    mounted(){
    },
    computed: {
      ...listMapGetters(['getLoaded', 'getPlaceList'])
    },
    watch: {
      getPlaceList: function(){
        this.result = this.getPlaceList
      }
    }
  }
</script>

<style scoped>
.searchArea{
  height: 8vh;
  padding: 20px;
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
.v-text-field >>> input {
  padding: 0px 10px;
  font-size: 14px;
  font-weight: 500;
  color : #0057FF;
  font-family: 'Noto Sans KR' !important;
}
.searchOption .v-btn{
  font-size: 12px;
  width: 50px;
  margin-top: -7px;
  color : #0057FF;
  font-weight: 300;
  font-family: 'Noto Sans KR' !important;
}
.v-list-item__title {
  font-size: 0.9vw !important;
  color: gray;
  text-align: center;
  font-weight: 300;
  font-family: 'Noto Sans KR' !important;
}
.placeListArea{
  overflow: hidden;
  border-radius: 20px;
}
</style>