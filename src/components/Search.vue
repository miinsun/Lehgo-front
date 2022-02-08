<template>
  <v-container>
    <v-text-field label="검색" v-model="keyword"></v-text-field>
    <v-btn @click="searchPlace">검색</v-btn>
    <div>
    {{result}}
    </div>
  </v-container>
</template>

<script>
import placeListService from '@/services/placeListService';
// import { createNamespacedHelpers } from "vuex";
// const { mapActions : placeMapActions, mapGetters : placeMapGetters } = createNamespacedHelpers("placeStore");

  export default {
    name: 'Search',
    components:{
    },
    data: () => ({
      keyword : '',
      result : [],
    }),
    methods: {
      searchPlace(){
        placeListService.getSearchList(this.keyword)
        .then((res) => {
          this.result = res
          console.log(res.length)
        })
      }
    },
    mounted(){
    },
    computed: {
    },
    watch: {
    }
  }
</script>

<style scoped>
</style>