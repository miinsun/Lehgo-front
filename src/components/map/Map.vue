<template>
<transition name="map">
  <div v-if="loaded">
    <div class="visitedPlaceArea">
     <div class="visitedTitle">최근 본</div>
     <div type="button" @click="onMarkerClicked(p.place)" class="ma-1 mt-3" v-for="p in getVisitedList" :key="'visited' + p.place.placeId">
       <div :class="getCategory(p.place) + '-border placeImg'" v-if="p.place.img1" :style="'background-image : url(' + p.place.img1 + ');'"></div>
        <div :class="getCategory(p.place) + '-border noImg'" v-if="!p.place.img1"><i class="far fa-image"></i> </div>
        <div class="visitedText">{{p.place.placeName}}</div>
     </div>
     </div>
    <naver-maps :height="height" :width="width" :mapOptions="mapOptions" :initLayers="initLayers" @load="onLoad">
        <div v-if="getLoaded">
        <naver-info-window class="info-window" @load="onWindowLoad" :isOpen="info" :marker="selectedMarker" :moreOptions="windowOptions">
          <draggable class="list-group"  v-if="info" :list="[{place : selectedPlace}]"
            :group="{name : 'mainCourse', pull: 'clone', put: false }">
            <div :class="getCategory(selectedPlace) + '-background list-group-item placeTitleBtn'">
                {{selectedPlace.placeName}}
            </div>
          </draggable>
        </naver-info-window>
        <naver-marker v-for="p, i in placeList" :key="'p' + i"
          :lat="p.place.latitude" :lng="p.place.longitude" @click="onMarkerClicked(p.place, $event)" @load="onMarkerLoaded(p.place, $event)"/>
        <naver-marker v-for="c, i  in coursePlaceList" :key="'c' + i"
          :lat="c.place.latitude" :lng="c.place.longitude" @click="onMarkerClicked(c.place)" @load="onCourseMarkerLoaded(c.place, $event)"/>
        <naver-marker 
          :lat="0"  :lng="0" @click="cancelMarkerClicked()" @load="onSelectedMarkerLoaded"/>
        <div v-for="p, i in coursePlaceList" :key="'line' + i">
        <naver-polyline  v-if="i != 0 && reLoad"
        :path="[{lat: coursePlaceList[i - 1].place.latitude, lng:coursePlaceList[i - 1].place.longitude},
            {lat: coursePlaceList[i].place.latitude, lng:coursePlaceList[i].place.longitude}]"/>
        </div>
        </div>
    </naver-maps>
  </div>
</transition>
</template>

<script>
import draggable from 'vuedraggable'
import courseService from '@/services/courseService';
import { createNamespacedHelpers } from "vuex";
const { mapGetters : placeMapGetters , mapActions : placeMapActions } = createNamespacedHelpers("placeStore");
const { mapGetters : listMapGetters,  mapActions : listMapActions } = createNamespacedHelpers("placeListStore");

//assets
import restaurant from '@/assets/restaurant.png'
import culture from '@/assets/culture.png'
import sea from '@/assets/sea.png'
import activity from '@/assets/activity.png'
import cafe from '@/assets/cafe.png'
import photospot from '@/assets/photospot.png'
import healing from '@/assets/healing.png'
import defaultMarker from '@/assets/default.png'

  export default {
    name: 'Map',
    props: ['mapCol', 'mapKey'],
    components:{
        draggable
    },
    data() {
      return {
        placeList : [],
        coursePlaceList : [],
        placeMarkerList : {},
        loaded : false,
        width : 0,
        height: window.innerHeight,
        info: false,
        marker: [],
        count: 1,
        map: null,
        isCTT: false,
        mapOptions: {
          lat: 35.12193161669285, 
          lng: 129.06362730078128,
          zoom: 12,
          mapTypeControl: true,
        },
        windowOptions : {
          disableAnchor : true,
          pixelOffset : {x : 0, y : -40 },
          borderWidth : 0,
        },
        initLayers: ['BACKGROUND', 'BACKGROUND_DETAIL', 'POI_KOREAN', 'TRANSIT', 'ENGLISH', 'CHINESE', 'JAPANESE'],
        selectedPlace : null,
        selectedMarker : null,
        selectedIdx : -1,
        originIcon : null,
        reLoad : true,
      }
    },
    methods: {
      onLoad(vue)
      {
        this.map = vue;
      },
      cancelMarkerClicked(){
        this.info = false;
        this.setPlace(null);
        this.selectedMarker.setVisible(false);
      },
      onMarkerClicked(place){
        if(this.selectedPlace == place){
          this.changeSelected(place);
        }
        else{
          this.info = false;
          this.map.morph({y : place.latitude, x: place.longitude})
          this.selectedMarker.setIcon(this.getIcon(this.getCategory(place)))
          setTimeout(() => this.changeSelected(place), 500);
        }
      },
      changeSelected(place){
        let length, i, c;
        for ((length=i=0); (c=place.placeName.charCodeAt(i++));(length+=c>>11?3:c>>7?2:1));
        this.windowOptions.pixelOffset.x = -25 - (3 * length)
        this.windowOptions.pixelOffset.y = -50
        this.setPlace(place)
        this.selectedPlace = place;
        this.selectedMarker.setPosition({y : place.latitude, x: place.longitude});
        this.selectedMarker.setVisible(true);
        this.info = true;
      },
      onWindowLoad(){
      },
      getCategory(place){
        if(place.attraction != null)
        { return place.attraction.category.split(', ')[0] }
        else if(place.restaurant != null)
        {
          if (place.restaurant.category.split(', ')[0] == '카페/디저트/술')
          {  return '카페' }
          else{ return place.restaurant.category.split(', ')[0] }
        }
        else{ return '기본' }
      },
      getIcon(category){
          switch (category){
            case '액티비티': { return activity }
            case '힐링': { return healing }
            case '바다': { return sea }
            case '문화': { return culture }
            case '포토스팟': { return photospot }
            case '식당': { return restaurant }
            case '카페': { return cafe }
            default: return defaultMarker
          }
      },
      onMarkerLoaded(place, event) {
        let newMarker = event.marker;
        newMarker.setTitle(this.marker.length);
        newMarker.setIcon(this.getIcon(this.getCategory(place)))
        this.placeMarkerList[place.placeId] = this.marker.length
        this.marker.push(event.marker);
      },
      onCourseMarkerLoaded(place, event) {
        let newMarker = event.marker;
        newMarker.setIcon(this.getIcon(this.getCategory(place)))
        newMarker.setTitle(this.marker.length);
        newMarker.setZIndex(10);
        this.placeMarkerList[place.placeId] = this.marker.length
        this.marker.push(newMarker);  
      },
      onSelectedMarkerLoaded(event){
        let newMarker = event.marker;
        newMarker.setZIndex(20);
        // newMarker.setIcon(defaultMarker)
        newMarker.setVisible(false);
        this.selectedMarker = newMarker;
      },
      reRoadPath(){
        this.reLoad = false
        setTimeout(() =>(this.reLoad = true), 1);
      },
      setMapPlace(){
        this.marker = [];
        this.loaded = false;
        if(this.getCoursePlaceList && this.getPlaceList && this.getCoursePlaceList.length > 0 && this.getPlaceList.length > 0){
            this.selectedPlace = this.getCoursePlaceList[0].place
            this.mapOptions.lat = this.selectedPlace.latitude;
            this.mapOptions.lng = this.selectedPlace.longitude;
            this.coursePlaceList = this.getCoursePlaceList;
            this.placeList = courseService.notCoursePlaceList(this.getPlaceList, this.getCoursePlaceList);
        }
        else if (this.getPlaceList == null){
          this.placeList = [];
        }
        else{
            this.selectedPlace =  this.getPlaceList[0]
            this.placeList = this.getPlaceList
        }
        setInterval(() => this.loaded = true, 100);
      },
      ...listMapActions(['setVistiedList', 'addVisitedList']),
      ...placeMapActions(['setPlace'])
    },
    mounted() {
      this.coursePlaceList = this.getCoursePlaceList;
      setInterval(() => this.count++, 1000);
      this.width = window.innerWidth * this.mapCol;
    },
    computed: {
        ...listMapGetters(['getLoaded', 'getPlaceList', 'getCoursePlaceList', 'getVisitedList']),
        ...placeMapGetters(['getPlace'])
    },
    watch:{
        getCoursePlaceList: function(){
          this.coursePlaceList = this.getCoursePlaceList;
          this.placeList = courseService.notCoursePlaceList(this.getPlaceList, this.getCoursePlaceList);
          this.reRoadPath()
        },
        getPlaceList:function(){
            this.coursePlaceList = this.getCoursePlaceList;
            this.placeList = courseService.notCoursePlaceList(this.getPlaceList, this.getCoursePlaceList);
        },
        getPlace: function(){
          this.onMarkerClicked(this.getPlace);
          this.setVistiedList();
        },
        mapCol : function(){
          this.map.setSize({width: window.innerWidth * this.mapCol, height: this.height})
        },
    },
    created() {
      this.reRoadPath();
      this.setMapPlace();
      this.setVistiedList();
    }
  }
</script>
<style scoped>
.map-enter-active, .map-leave-active {
  transition: opacity .5s;
}
.map-enter, .map-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.placeTitleBtn {
  font-weight: 400;
  margin-bottom: 100px;
  border-radius: 50px;
  padding: 10px 30px;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  max-width: 200px;
  font-family: 'Noto Sans KR';
  display:inline-block;
}
.courseMarker{
  z-index: 10;
}
.visitedPlaceArea{
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 100px;
  height: 350px;
  z-index: 1000;
  padding: 10px;
  border: #0057FF solid 3px;
  border-radius: 10px;
  background:white;
  text-align: center;
  font-family: 'Noto Sans KR';
}
.visitedTitle{
  color : #0057FF;
  font-size:15px;
  font-weight: 800;
}
.visitedText{
  width: 90px;
  text-align: center;
  padding-right: 20px;
  overflow: hidden;
  white-space : nowrap;
  text-overflow: ellipsis;
}
.placeImg{
  background-size: cover; 
  background-position: center;
  border-radius: 10px;
  width: 3vw;
  height: 3vw;
  box-sizing: content-box;
  border: gray solid 5px;
}
.noImg{
  background-color: lightgray;
  text-align: center;
  border-radius: 10px;
  width: 3vw;
  height: 3vw;
  box-sizing: content-box;
  border: gray solid 5px;
}
.noImg i{
  color: white;
  font-size: 30px;
  line-height: 3vw;
}
</style>