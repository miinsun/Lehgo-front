<template>
  <v-container>
    <div class="resultArea" v-bar>
      <v-list rounded>
        <v-list-item-group color="gray"  class="text-left">
          <v-list-item class="py-3" v-for="c, i in getCourseList" :key="i"> 
            <v-list-item-content @click="clickedPlace(p.place)">
                <v-list-item-title><b>{{c.courseName}}</b></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions : courseMapActions, mapGetters : courseMapGetters } = createNamespacedHelpers("courseStore");

  export default {
    name: 'Search',
    components:{
    },
    data: () => ({
      keyword : '',
      result : null,
      selected : 0,
      items : ['전체', '이름', '주소', '설명']
    }),
    validators: {
      keyword : function (value) {
        return this.$Validator.value(value).required() 
      },
    },
    methods: {
      clickedPlace(place){
          this.setPlace(place);
      },
      ...courseMapActions(['setCorseListByAll']),
    },
    mounted(){
    },
    computed: {
      ...courseMapGetters(['getCourseList'])
    },
    created(){
        this.setCorseListByAll()
    }
  }
</script>

<style scoped>
.searchArea{
  height: 12vh;
}
.resultArea{
  height: 90vh;
  overflow: auto;
  overflow-y: scroll;
}
.placeImg{
    background-size: cover; 
    background-position: center; 
    width: 100px; 
    height: 100px;
    margin-right: 20px
}
.noImg{
    background-color: lightgray;
    text-align: center;
    width: 100px; 
    height: 100px;
    margin-right: 20px;
}
.noImg i{
    color: white;
    font-size: 30px;
    margin-top: 35px
}
.v-text-field >>> input {
  padding: 0px 10px;
  font-size: 14px;
  font-weight: 500;
  color : #186EC5;
}
.searchOption .v-btn{
  font-size: 12px;
  width: 50px;
  margin-top: -7px;
  color : #186EC5;
}
.searchOption .v-list-item__title{
  font-size: 12px;
  color: gray;
  text-align: center;
}
.noResult{
  font-size: 14px;
  margin-top: 20px;
  text-align: center;
}
</style>