<template>
<transition name="map">
  <div v-if="loaded">
    <naver-maps :height="height" :width="width" :mapOptions="mapOptions" :initLayers="initLayers" @load="onLoad" @idle="checkMacker">
        <div v-if="getLoaded">
        <naver-info-window class="info-window" @load="onWindowLoad" :isOpen="info" :marker="selectedMarker" :moreOptions="windowOptions">
          <draggable class="list-group mainCourse"  v-if="info" :list="[{place : selectedPlace}]"
            :group="{name : 'mainCourse', pull: 'clone', put: false }">
            <v-btn text class="list-group-item placeTitleBtn" elevation="4">
                {{selectedPlace.placeName}}
            </v-btn>
          </draggable>
        </naver-info-window>
        <naver-marker v-for="p, i in placeList" :key="'p' + i"
          :lat="p.place.latitude" :lng="p.place.longitude" @click="onMarkerClicked(p.place)" @load="onMarkerLoaded(p.place, $event)"/>
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
const { mapActions : placeMapActions } = createNamespacedHelpers("placeStore");
const { mapGetters : listMapGetters } = createNamespacedHelpers("placeListStore");

//assets
import selectMarkerIcon from '@/assets/marker-select.png'
import courseMarker from '@/assets/marker-course.png'

  export default {
    name: 'Map',
    props: ['coursePlaceList', 'clickedPlace', 'mapCol', 'mapKey'],
    components:{
        draggable
    },
    data() {
      return {
        placeList : [],
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
        this.checkMacker();
      },
      checkMacker(){
        for(let i in this.marker){
          let lat = this.marker[i].position._lat;
          let lng = this.marker[i].position._lng;
          if(lat > this.map.getBounds()._max._lat || lat < this.map.getBounds()._min._lat ||
            lng >  this.map.getBounds()._max._lng || lng < this.map.getBounds()._min._lng){
              this.marker[i].onRemove()
          }
          else{
            this.marker[i].onAdd()
          }
        }
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
          setTimeout(() => this.changeSelected(place), 500);
        }
      },
      changeSelected(place){
        let length, i, c;
        for ((length=i=0); (c=place.placeName.charCodeAt(i++));(length+=c>>11?3:c>>7?2:1));
        this.windowOptions.pixelOffset.x = (length < 15) ? -50 : length * (-3.3)
        this.setPlace(place)
        this.selectedPlace = place;
        this.selectedMarker.setPosition({y : place.latitude, x: place.longitude});
        this.selectedMarker.setVisible(true);
        this.info = true;
      },
      onWindowLoad(){
      },
      onMarkerLoaded(place, event) {
        let newMarker = event.marker;
        newMarker.setTitle(this.marker.length);
        this.placeMarkerList[place.placeId] = this.marker.length
        this.marker.push(event.marker);
      },
      onCourseMarkerLoaded(place, event) {
        let newMarker = event.marker;
        newMarker.setIcon(courseMarker)
        newMarker.setTitle(this.marker.length);
        newMarker.setZIndex(10);
        this.placeMarkerList[place.placeId] = this.marker.length
        this.marker.push(newMarker);  
      },
      onSelectedMarkerLoaded(event){
        let newMarker = event.marker;
        newMarker.setIcon(selectMarkerIcon);
        newMarker.setZIndex(20);
        newMarker.setVisible(false);
        this.selectedMarker = newMarker;
      },
      reRoadPath(){
        this.reLoad = false
        setTimeout(() =>(this.reLoad = true), 1);
      },
      setMapPlace(){
        console.log(this.getPlaceList.length, this.getCoursePlaceList.length)
        this.marker = [];
        this.loaded = false;
        if(this.getCoursePlaceList.length && this.getCoursePlaceList.length > 0 && this.getPlaceList.length > 0){
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
      ...placeMapActions(['setPlace'])
    },
    mounted() {
        setInterval(() => this.count++, 1000);
        this.width = window.innerWidth * this.mapCol;
    },
    computed: {
        ...listMapGetters(['getLoaded', 'getPlaceList', 'getCoursePlaceList'])
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
        clickedPlace: function(){
          this.onMarkerClicked(this.clickedPlace);
        },
        mapCol : function(){
          this.map.setSize({width: window.innerWidth * this.mapCol, height: this.height})
        },
    },
    created() {
      this.setMapPlace();
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
  border: none;
  color: #000;
  background-color: white;
}
.courseMarker{
  z-index: 10;
}
</style>