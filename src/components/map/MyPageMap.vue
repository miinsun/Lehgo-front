<template>
<transition name="map">
  <div v-if="loaded">
    <naver-maps
      :height="height"
      :width="mapSize"
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
        <naver-marker v-for="e, i in placeList" :key="'placeList' + i"
          :lat="e.place.latitude" :lng="e.place.longitude" @click="onMarkerClicked(e.place)" @load="onMarkerLoaded"/>
    </naver-maps>
  </div>
</transition>
</template>

<script>
import draggable from 'vuedraggable'
import { createNamespacedHelpers } from "vuex";
const { mapActions : placeMapActions } = createNamespacedHelpers("placeStore");

//assets
import selectMarker from '@/assets/marker-select.png'

  export default {
    name: 'FolderMap',
    components:{
        draggable
    },
    props: ['placeList', 'clickedPlace', 'mapSize', 'mapCol'],
    data() {
      return {
        loaded : false,
        height: window.innerHeight,
        info: false,
        marker: [],
        count: 1,
        map: null,
        isCTT: false,
        mapOptions: {
          lat: 35.15, 
          lng: 129.05,
          zoom: 11,
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
        testOriginIcon : null
      }
    },
    methods: {
      onLoad(vue)
      {
        this.map = vue;
      },
      moveCenter(){
        this.map.setCenter({x: 219.8977951388889, y: 101.2692443674243})
      },
      onMarkerClicked(place){
        let idx = this.findMarkerIdx(place.longitude + '' + place.latitude)
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
            setTimeout(() => this.changeSelected(idx, place), 2);
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
      findMarkerIdx(title){
        for(let m in this.marker){
          if(title == this.marker[m].getTitle()){
            return m
          }
        }
      },
      ...placeMapActions(['setPlace'])
    },
    mounted() {
      setInterval(() => this.count++, 1000);
      this.loaded = true;
    },
    computed: {
      // placeList: function(){
      //   return this.getLikedList
      // },
      // ...mapGetters(['getLikedList'])
    },
    watch:{
      clickedPlace: function(){
          this.onMarkerClicked(this.clickedPlace);
      },
      mapCol : function(){
         this.map.setSize({width: this.map.getSize().width / 8 * this.mapCol, height: this.height})
      }
    }
  }
</script>
<style scoped>
.map-enter-active{
  transition: opacity .5s;
}
.map-leave-active {
  transition: opacity 0.8s ease 0.2s;
  position: absolute;
}
.map-enter, .map-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.map-move{
  transition: transform 1s;
}
.placeTitleBtn {
  border: none;
  color: #000;
  background-color: white;
}
</style>