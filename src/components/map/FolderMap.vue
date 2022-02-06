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
                {{selectedPlace.PLACE_NAME}}
            </v-btn>
          </draggable>
        </naver-info-window>
        <naver-marker v-for="e, i in placeList" :key="'placeList' + i"
          :lat="e.LATITUDE" :lng="e.LONGITUDE" @click="onMarkerClicked(e)" @load="onMarkerLoaded"/>
    </naver-maps>
  </div>
</transition>
</template>

<script>
import draggable from 'vuedraggable'
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("placeListStore");
const { mapActions : placeMapActions } = createNamespacedHelpers("placeStore");

//assets
import selectMarker from '@/assets/marker-select.png'

  export default {
    name: 'FolderMap',
    components:{
        draggable
    },
    props: ['clickedPlace'],
    data() {
      return {
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
      moveCenter(){
          this.map.setCenter(35.11527763852661, 129.04013978515628)
      },
      onMarkerClicked(place){
        let idx = this.findMarkerIdx(place.LONGITUDE + '' + place.LATITUDE)
        if(!this.info){
          this.changeSelected(idx, place)
        }
        else{
          if(this.info){
            this.setPlace(null)
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
        let nameLength = place.PLACE_NAME.length 
        this.windowOptions.pixelOffset.x = (nameLength < 5) ? -50 : nameLength * (-10)
        this.setPlace(place)
        this.originIcon = this.marker[idx].getIcon()
        this.selectedMarker = this.marker[idx]
        this.marker[idx].setIcon(selectMarker)
        this.selectedIdx = idx
        this.selectedPlace = place
        this.info = true
      },
      onWindowLoad(){
      },
      onMarkerLoaded(vue) {
        let newMarker = vue.marker;
        newMarker.setTitle(vue.marker.getPosition().x + '' + vue.marker.getPosition().y)
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
      ...placeMapActions(['setPlace'])
    },
    mounted() {
      setInterval(() => this.count++, 1000);
      this.loaded = true;
    },
    computed: {
      placeList: function(){
        this.reRoadPath()
        return this.getLikedList
      },
      ...mapGetters(['getLikedList'])
    },
    watch:{
      clickedPlace: function(){
          this.onMarkerClicked(this.clickedPlace);
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