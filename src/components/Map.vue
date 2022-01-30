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
      </naver-info-window>
      <naver-marker :lat="35.11527763852661" :lng="129.04223978515628" @click="onMarkerClicked" @load="onMarkerLoaded"/>
    </naver-maps>
  </div>
</transition>
</template>

<script>

  export default {
    name: 'Map',
    data() {
      return {
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
      onMarkerLoaded(vue) {
        this.marker = vue.marker;
      },
      moveCenter(){
          this.map.setCenter(35.11527763852661, 129.04013978515628)
      },
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