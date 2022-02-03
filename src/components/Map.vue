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
          id="testtest"
          @load="onWindowLoad"
          :isOpen="info"
          :marker="selectedMarker"
          :moreOptions="windowOptions">
             <draggable class="list-group mainCourse"  v-if="info" :list="[selectedPlace]"
          :group="{name : 'mainCourse', pull: 'clone', put: false }">
          <v-btn text class="list-group-item placeTitleBtn" elevation="4">
              {{selectedPlace.PLACE_NAME}}
          </v-btn>
         </draggable>
          </naver-info-window>
        <naver-marker v-for="e, idx in placeList" :key="e.PLACE_ID"
          :lat="e.LATITUDE" :lng="e.LONGITUDE" @click="onMarkerClicked(idx, e)" @load="onMarkerLoaded"/>
        <naver-marker v-for="e, idx in coursePlaceList" :key="e.PLACE_ID"
          :lat="e.LATITUDE" :lng="e.LONGITUDE" @click="onMarkerClicked(idx + placeList.length, e)" @load="onCourseMarkerLoaded"/>
    </naver-maps>
  </div>
</transition>
</template>

<script>
import draggable from 'vuedraggable'
import courseService from '@/services/courseService';
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapGetters } = createNamespacedHelpers("courseStore");

//assets
import places from '@/assets/testPlaceData.js'
import selectMarker from '@/assets/marker-select.png'
import courseMarker from '@/assets/marker-course.png'

  export default {
    name: 'Map',
    components:{
        draggable
    },
    data() {
      return {
        placeList : [],
        coursePlaceList : [],
        loaded : false,
        width: window.innerWidth * 0.75,
        height: window.innerHeight - 100,
        info: false,
        marker: [],
        count: 1,
        map: null,
        isCTT: false,
        mapOptions: {
          lat: 35.11527763852661, 
          lng: 129.04223978515628,
          zoom: 12,
          mapTypeControl: true,
        },
        windowOptions : {
          disableAnchor : true,
          pixelOffset : {x : -50, y : -40 },
          borderWidth : 0,
        },
        initLayers: ['BACKGROUND', 'BACKGROUND_DETAIL', 'POI_KOREAN', 'TRANSIT', 'ENGLISH', 'CHINESE', 'JAPANESE'],
        selectedPlace : null,
        selectedMarker : null,
        selectedIdx : -1,
        originIcon : null,
      }
    },
    methods: {
      onLoad(vue)
        {
        this.map = vue;
      },
      moveCenter(){
          this.map.setCenter(35.11527763852661, 129.04013978515628)
      },
      onMarkerClicked(idx, place){
        if(!this.info){
          this.changeSelected(idx, place)
        }
        else{
          if(this.info){
            this.info = false
            this.selectedMarker.setIcon(this.originIcon)
          }
          if(this.selectedIdx != idx){
            this.info = false
            setTimeout(() => this.changeSelected(idx, place), 1);
          }
        }
      },
      changeSelected(idx, place){
        this.originIcon = this.marker[idx].getIcon()
        this.marker[idx].setIcon(selectMarker)
        this.selectedMarker = this.marker[idx]
        this.selectedIdx = idx
        this.selectedPlace = place
        this.info = true
      },
      onWindowLoad(){
      },
      onMarkerLoaded(vue) {
        this.marker.push(vue.marker);
      },
      onCourseMarkerLoaded(vue) {
        let newMarker = vue.marker;
        newMarker.setIcon(courseMarker)
        this.marker.push(newMarker);
      },
      addPlace(value){
        this.addPlaceList(value);
      }, 
      ...mapActions(['addPlaceList'])
    },
    mounted() {
      setInterval(() => this.count++, 1000);
      this.loaded = true;
      this.coursePlaceList = this.getPlaceList;
      this.placeList = courseService.notCoursePlaceList(places);
    },
    computed: {
      ...mapGetters(['getPlaceList'])
    }
  }
</script>
<style scoped>
.info-window-container {
  all: none;
  width: 100px;
  height: 40px;
  margin-bottom: -30px;
}
  .map-enter-active, .map-leave-active {
  transition: opacity .5s;
}
.map-enter, .map-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.naver-info-window{
  all:none;
  margin-bottom: 200px
}
.placeTitleBtn {
  border: none;
  color: #000;
  background-color: white;
}
</style>