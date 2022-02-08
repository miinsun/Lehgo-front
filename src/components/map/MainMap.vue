<template>
<transition name="map">
  <div v-if="loaded">
    <naver-maps
      :height="height"
      :width="width"
      :mapOptions="mapOptions"
      :initLayers="initLayers"
      @load="onLoad">
        <naver-info-window
          class="info-window"
          @load="onWindowLoad"
          :isOpen="info"
          :marker="selectedMarker"
          :moreOptions="windowOptions">
          <draggable class="list-group mainCourse"  v-if="info" :list="[selectedPlace]"
            :group="{name : 'mainCourse', pull: 'clone', put: false }">
            <v-btn text class="list-group-item placeTitleBtn" elevation="4">
                {{selectedPlace.placeName}}
            </v-btn>
          </draggable>
        </naver-info-window>
        <naver-marker v-for="p, i in placeList" :key="'p' + i"
          :lat="p.LATITUDE" :lng="p.LONGITUDE" @click="onMarkerClicked(p, $event)" @load="onMarkerLoaded"/>
        <naver-marker v-for="p, i  in coursePlaceList" :key="'coursePlaceList' + i"
          :lat="p.LATITUDE" :lng="p.LONGITUDE" @click="onMarkerClicked(p, $event)" @load="onCourseMarkerLoaded"/>
          <div v-for="p, i in coursePlaceList" :key="'c' + i">
          <naver-polyline  v-if="i != 0 && reLoad"
            :path="[{lat: coursePlaceList[i - 1].LATITUDE, lng:coursePlaceList[i - 1].LONGITUDE},
                {lat: coursePlaceList[i].LATITUDE, lng:coursePlaceList[i].LONGITUDE}]"/>
          </div>
    </naver-maps>
  </div>
</transition>
</template>

<script>
import draggable from 'vuedraggable'
import courseService from '@/services/courseService';
import { createNamespacedHelpers } from "vuex";
const { mapActions : courseActions, mapGetters : courseGetters } = createNamespacedHelpers("courseStore");
const { mapActions : placeMapActions } = createNamespacedHelpers("placeStore");

//assets
import places from '@/assets/testPlaceData.js'
import selectMarkerIcon from '@/assets/marker-select.png'
import courseMarker from '@/assets/marker-course.png'

  export default {
    name: 'Map',
    components:{
        draggable
    },
    data() {
      return {
        placeList : [],
        loaded : false,
        width: window.innerWidth * 0.5,
        height: window.innerHeight,
        info: false,
        marker: [],
        count: 1,
        map: null,
        isCTT: false,
        mapOptions: {
          lat : 35.11527763852661,
          lng : 129.04223978515628,
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
        testOriginIcon : null
      }
    },
    methods: {
      onLoad(vue)
      {
        this.map = vue;
      },
      onMarkerClicked(place, event){
        let idx = event.overlay.title;
        if(!this.info){
            this.map.morph(event.overlay.position)
            setTimeout(() => this.changeSelected(idx, place), 500);
        }
        else{
          this.selectedMarker.setIcon(this.originIcon)
          if(this.info){
            this.setPlace(null)
            this.info = false
          }
          if(this.selectedPlace != place){
            this.info = false
            this.map.morph(event.overlay.position)
            setTimeout(() => this.changeSelected(idx, place), 500);
          }
        }
      },
      changeSelected(idx, place){
        let length, i, c;
        for ((length=i=0); (c=place.placeName.charCodeAt(i++));(length+=c>>11?3:c>>7?2:1));
        this.windowOptions.pixelOffset.x = (length < 15) ? -50 : length * (-3.3)
        this.setPlace(place)
        this.originIcon = this.marker[idx].getIcon()
        this.selectedMarker = this.marker[idx]
        this.marker[idx].setIcon(selectMarkerIcon)
        this.selectedPlace = place
        this.info = true
      },
      onWindowLoad(){
      },
      onMarkerLoaded(vue) {
        let newMarker = vue.marker;
        newMarker.setTitle(this.marker.length);
        this.marker.push(newMarker);
      },
      onCourseMarkerLoaded(vue) {
        let newMarker = vue.marker;
        newMarker.setIcon(courseMarker)
        newMarker.setTitle(this.marker.length);
        this.marker.push(newMarker);  
      },
      addPlace(value){
        this.addPlaceList(value);
      },
      findMarkerIdx(title){
        for(let m in this.marker){
          if(title == this.marker[m].getTitle()){
            return m
          }
        }
      },
      reRoadPath(){
        this.reLoad = false
        setTimeout(() =>(this.reLoad = true), 1);
      },
      ...courseActions(['addPlaceList']),
      ...placeMapActions(['setPlace'])
    },
    mounted() {
      this.setPlace(null);
      setInterval(() => this.count++, 1000);
      this.loaded = true;
      if(this.coursePlaceList.length > 0){
        this.mapOptions.lat = this.coursePlaceList[0].LATITUDE;
        this.mapOptions.lng = this.coursePlaceList[0].LONGITUDE;
      }
      this.placeList = courseService.notCoursePlaceList(places, this.coursePlaceList);
    },
    computed: {
      coursePlaceList: function(){
        this.reRoadPath()
        return this.getPlaceList
      },
      ...courseGetters(['getPlaceList'])
    },
    watch:{
      coursePlaceList: function(){
        this.placeList = courseService.notCoursePlaceList(places, this.coursePlaceList);
      },
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
</style>