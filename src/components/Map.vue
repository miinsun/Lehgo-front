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
        :marker="marker">
        <div class="info-window-container">
          <draggable class="list-group"   :group="{name : 'mainCourse', pull: 'clone', put: false }" :list="list2">
          <!-- <v-btn class="list-group-item" text @click="addPlace('부산역')" key="부산역">부산역</v-btn> -->
            <v-btn text class="list-group-item" v-for="e in list2" :key="e.id">
                {{e.name}}
            </v-btn>
          </draggable>
          드래그하여 이동 가능
        </div>
      </naver-info-window>
      <naver-marker :lat="35.11527763852661" :lng="129.04223978515628" @click="onMarkerClicked" @load="onMarkerLoaded"/>
    </naver-maps>
  </div>
</transition>
</template>

<script>
import draggable from 'vuedraggable'
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("courseStore");

  export default {
    name: 'Map',
    components:{
        draggable
    },
    data() {
      return {
        list2 : [{name : '부산역', id : 5}],
        loaded : false,
        width: window.innerWidth * 0.75,
        height: window.innerHeight - 100,
        info: false,
        marker: null,
        count: 1,
        map: null,
        isCTT: false,
        mapOptions: {
          lat: 35.11527763852661, 
          lng: 129.04223978515628,
          zoom: 13,
          mapTypeControl: true,
        },
        initLayers: ['BACKGROUND', 'BACKGROUND_DETAIL', 'POI_KOREAN', 'TRANSIT', 'ENGLISH', 'CHINESE', 'JAPANESE']
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
      onMarkerClicked(){
        this.info = !this.info
      },
      onWindowLoad(){
      },
      onMarkerLoaded(vue) {
        this.marker = vue.marker;
      },
      addPlace(value){
        this.addPlaceList(value);
      }, 
      ...mapActions(['addPlaceList'])
    },
    mounted() {
      setInterval(() => this.count++, 1000);
      this.loaded = true;
    },
  }
</script>
<style scoped>
  .info-window-container {
    padding: 10px;
    width: 300px;
    height: 100px;
  }
  .map-enter-active, .map-leave-active {
  transition: opacity .5s;
}
.map-enter, .map-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>