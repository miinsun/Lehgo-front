<template>
    <div class="myPageList" v-bar>
    <div>
      <v-list rounded>
        <v-list-item-group  color="gray"  class="text-left" >
                
          <v-list-item class="py-3">
            <span class="placeImg rounded-circle"></span>
            <v-list-item-content > <v-list-item-title><b>부산 남항</b></v-list-item-title>
            부산 영도구 대평북로 6</v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
    </div>
</template>

<script>

  export default {
    name: 'SearchList',

    data: () => ({
    }),
    methods: {
    },
  }
</script>

<style scoped>
.SearchList{
    overflow-y: scroll;
}
.placeImg{
    background-image: url("https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=264a874f-7a2e-4733-9349-044794a845ee");
    background-size: cover; 
    background-position: center; 
    width: 100px; 
    height: 100px;
    margin-right: 20px
}
</style>