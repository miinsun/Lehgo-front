<template>
  <div class="postListArea" v-bar>
    <div>
        <!-- <v-progress-circular v-if="!getLoaded" :size="50" :width="7" indeterminate color="#2699fb"></v-progress-circular> -->
        <div v-for="p, i in getPostList.items" :key="i" :class="getFirstCategory + '-border-1 postArea'"> 
            <h3>{{getText(p.title)}}</h3>
            <div class="text-right">{{getText(p.postdate).replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3')}}</div>
            <a :href="p.link"><div class="text-right">{{getText(p.bloggername)}}</div></a>
            <v-divider></v-divider>
            <div>{{getText(p.description)}}</div>
        </div>
    </div>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from "vuex";
  const { mapGetters : placeMapGetters } = createNamespacedHelpers("placeStore");

  export default {
    name: 'PlacePost',

    data: () => ({
    }),
    methods: {
      getText(text){
        return text.replace(/<b>/g, '').replace(/<\/b>/g, '')
      }
    },
    computed:{
      ...placeMapGetters(['getPostList', 'getFirstCategory'])
    },
    mounted() {
    },
  }
</script>

<style scoped>
.postListArea{
  height: 60vh;
  overflow: auto;
  overflow-y: scroll;
}
.postArea{
  margin: 0px 0px 10px 10px;
  padding: 10px;
  border-radius: 5px;
  font-family: 'Noto Sans KR';
}
</style>