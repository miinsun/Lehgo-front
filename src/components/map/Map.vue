<template>
<transition name="map">
  <div v-if="loaded">
    <naver-maps
      :height="height"
      :width="width"
      :mapOptions="mapOptions"
      :initLayers="initLayers"
      @load="onLoad"
      @idle="checkMacker">
        <naver-info-window
          class="info-window"
          @load="onWindowLoad"
          :isOpen="info"
          :marker="selectedMarker"
          :moreOptions="windowOptions">
          <draggable class="list-group mainCourse"  v-if="info" :list="[{place : selectedPlace}]"
            :group="{name : 'mainCourse', pull: 'clone', put: false }">
            <v-btn text class="list-group-item placeTitleBtn" elevation="4">
                {{selectedPlace.placeName}}
            </v-btn>
          </draggable>
        </naver-info-window>
        <naver-marker v-for="p, i in placeList" :key="'p' + i"
          :lat="p.place.latitude" :lng="p.place.longitude" @click="onMarkerClicked(p.place, $event)" @load="onMarkerLoaded(p.place, $event)"/>
        <naver-marker v-for="p, i  in coursePlaceList" :key="'c' + i"
          :lat="p.place.latitude" :lng="p.place.longitude" @click="onMarkerClicked(p.place, $event)" @load="onCourseMarkerLoaded(p.place, $event)"/>
        <div v-for="p, i in coursePlaceList" :key="'line' + i">
        <naver-polyline  v-if="i != 0 && reLoad"
        :path="[{lat: coursePlaceList[i - 1].place.latitude, lng:coursePlaceList[i - 1].place.longitude},
            {lat: coursePlaceList[i].place.latitude, lng:coursePlaceList[i].place.longitude}]"/>
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
      onMarkerClicked(place, event){
        let idx = event.overlay.title;
        this.onPlaceClicked(place, idx);
      },
      onPlaceClicked(place, idx){
        if(this.info){
          this.selectedMarker.setIcon(this.originIcon)
          this.selectedMarker.setZIndex(0)
          this.setPlace(null)
          this.info = false
        }
        else if(this.selectedPlace == place){
          this.changeSelected(idx, place);
        }
        if(this.selectedPlace != place){
          this.map.morph({y : place.latitude, x: place.longitude})
          setTimeout(() => this.changeSelected(idx, place), 500);
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
        this.marker[idx].setZIndex(1)
        this.selectedPlace = place
        this.info = true
      },
      onWindowLoad(){
      },
      onMarkerLoaded(place, event) {
        let newMarker = event.marker;
        newMarker.setTitle(this.marker.length);
        this.placeMarkerList[place.placeId] = this.marker.length
        this.marker.push(newMarker);
      },
      onCourseMarkerLoaded(place, event) {
        let newMarker = event.marker;
        newMarker.setIcon(courseMarker)
        newMarker.setTitle(this.marker.length);
        this.placeMarkerList[place.placeId] = this.marker.length
        this.marker.push(newMarker);  
      },
      reRoadPath(){
        this.reLoad = false
        setTimeout(() =>(this.reLoad = true), 1);
      },
      setMapPlace(){
        this.marker = [];
        this.loaded = false;
        setInterval(() => this.loaded = true, 100);
        if(this.coursePlaceList.length > 0){
            this.selectedPlace = this.coursePlaceList[0].place
            this.mapOptions.lat = this.selectedPlace.latitude;
            this.mapOptions.lng = this.selectedPlace.longitude;
            this.placeList = courseService.notCoursePlaceList(this.getPlaceList, this.coursePlaceList);
        }
        else{
            this.placeList = this.getPlaceList
        }
      },
      ...placeMapActions(['setPlace'])
    },
    mounted() {
        setInterval(() => this.count++, 1000);
        this.width = window.innerWidth * this.mapCol;
    },
    computed: {
        ...listMapGetters(['getPlaceList'])
    },
    watch:{
        coursePlaceList: function(){
          this.reRoadPath()
          this.placeList = courseService.notCoursePlaceList(this.getPlaceList, this.coursePlaceList);
        },
        clickedPlace: function(){
          this.onPlaceClicked(this.clickedPlace, this.placeMarkerList[this.clickedPlace.placeId]);
        },
        mapCol : function(){
          this.map.setSize({width: window.innerWidth * this.mapCol, height: this.height})
        }
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
</style>