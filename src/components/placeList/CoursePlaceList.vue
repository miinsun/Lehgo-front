<template>
  <div>
    <v-overlay :z-index="zIndex" :value="overlay" >
        <v-card color="white" elevation="2">
          <v-card-text>정말 코스를 삭제하시겠습니까?</v-card-text>
        <v-btn class="mx-2" color="#226AB3" @click="deleteCourseBtn()">삭제</v-btn>
        <v-btn class="mx-2" color="#226AB3" text @click="overlay = false">취소</v-btn>
        </v-card>
      </v-overlay>
      <v-row class="editCourse">
        <v-col fluid cols="2 offset-8">
            <v-btn  v-if="!editCourse" text @click="editCourse = true"><v-icon small color="white">mdi-cog</v-icon></v-btn>
            <v-btn v-if="editCourse" text @click="editCourseBtn()"><i class="far fa-check-circle"></i></v-btn>
            <v-card v-if="editCourse" elevation="2" id="content">
              <v-switch v-model="switchTest" label="공개" color="primary"></v-switch>
              <v-switch v-model="switchTest" label="수정 가능" color="primary"></v-switch>
            </v-card>
        </v-col>
        <v-col cols="2">
          <v-btn text @click="overlay = !overlay"><i class="far fa-trash-alt"></i></v-btn>
        </v-col>
      </v-row>
      <v-row class="deletePlace">
        <v-col cols="2 offset-10">
          <v-btn text @click="deletePlace()"><i class="far fa-trash-alt"></i></v-btn>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <div class="myPageList" v-bar>
      <div>
         <v-timeline align-top dense >
      <v-timeline-item small v-for="(item, i) in getCoursePlaceList" :key="i" fill-dot>
      <!-- <v-card :color="item.color" dark > -->
      {{item.place.placeName}}
    </v-timeline-item>
  </v-timeline>
      </div>
      </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters : listMapGetters, mapActions : listMapActions } = createNamespacedHelpers("placeListStore");

  export default {
    name: 'CoursePlaceList',

    data: () => ({
      zIndex : 1000,
      overlay : false,
      editCourse : false,
      switchTest : false
    }),
    methods: {
      editCourseBtn(){
        this.editCourse = false;
      },
      ...listMapActions(['deleteFolder', 'deletePlaceFromFolder']),
    },
    computed:{
      ...listMapGetters(['getLoaded', 'getCoursePlaceList']),
    }
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
.v-btn.v-size--default{
  min-width: 20px;
}
.v-card {
  width: 300px;
  height: 170px;
  text-align: center;
}
.v-card .v-card__text{
  padding: 50px 0px 30px 0px;
  color:black;
}
.editCourse{
  margin-right: 0px;
  height: 50px;
  background-color:#226AB3;
}
.editCourse i{
  color: white;
}
.deletePlace{
  margin: 0px;
  height: 50px;
}
.checkbox{
  position: absolute;
  height : 10px;
  right: 0;
  top : 0;
}
#content{
  position: absolute;
  z-index: 10;
  margin : 10px;
  padding : 10px 30px;
  align-content: center;
  width : 200px;
  height : 150px;
}
</style>