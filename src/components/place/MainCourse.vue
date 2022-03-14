<template>
<div>
  <v-snackbar v-model="snackbar">
    <div class="text-center snackContent">저장되었습니다.</div>
  </v-snackbar>
  <v-overlay :value="overlay">
    <v-card v-if="changeCourseStatus" class="changeCard" light elevation="2">
      <v-card-text id="v">저장되지 않은 변경사항은 사라집니다. <br> 정말 코스를 변경하시겠습니까?</v-card-text>
    <v-btn class="mx-2" color="primary" @click="changeCourseSubmit()">변경</v-btn>
    <v-btn class="mx-2" color="#226AB3" text @click="overlay = false">취소</v-btn>
    </v-card>
    <v-card v-if="addPlaceStatus" class="newPlaceCard text-center" light elevation="2">
      <v-form ref="form" class="text-left">
        <v-text-field label="장소 이름" hide-details="auto" v-model="placeName" 
          ref="placeName" maxlength="30" :rules="[validation.firstError('placeName')]" required>
        </v-text-field>
        <v-btn class="mt-10 mb-3" @click="daumAddress()">주소 입력</v-btn>
        <v-text-field label="주소" hide-details="auto" v-model="placeAddress" disabled required>
        </v-text-field>
        <v-text-field label="장소 설명" hide-details="auto" v-model="placeContent" maxlength="6000">
        </v-text-field>
      </v-form>
    <v-btn class="info mt-8 mr-10 px-10" @click="addPlaceSubmit()">저장</v-btn>
    <v-btn class="gray mt-8 px-10" @click="overlay = false">취소</v-btn>
    </v-card>
    <v-card v-if="saveCourseStatus" class="saveCourseCard text-center" light elevation="2">
      <v-form ref="form" class="text-left">
        <v-text-field label="코스 이름" hide-details="auto" v-model="courseName" class="mb-10" maxlength="30" required>
        </v-text-field>
        <v-switch v-model="visibility" label="공개" color="primary"></v-switch>
        <v-switch v-model="editable" label="외부인 수정 가능" color="primary"></v-switch>
      </v-form>
    <v-btn class="info mt-8 mr-10 px-10" @click="saveCourse()">추가</v-btn>
    <v-btn class="gray mt-8 px-10" @click="overlay = false">취소</v-btn>
    </v-card>
  </v-overlay>
  <v-expansion-panels>
  <v-expansion-panel id="coursePanel">
    <v-expansion-panel-content>
    <v-row class="courseListBtn">
        <v-row class="mt-0">
        <div class="ml-5" style="line-height: 30px;">현재 코스 : </div>
        <v-menu offset-y class="courseMenu">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text small :bind="attrs" v-on="on">{{getMainCourse.courseName}}</v-btn>
        </template>
          <v-list>
              <v-list-item v-for="(course, index) in getCourseList" :key="index" link @click="changeCourseBtn(course.courseId)">
              <v-list-item-title class="courseMenu" v-text="course.courseName"></v-list-item-title>
              </v-list-item>
          </v-list>
        </v-menu>
        </v-row>
        <div>
        <v-btn text small class="btn-gray lighten-5 mr-2" @click="addPlace()">장소 추가</v-btn>
        <v-btn text small class="btn-blue lighten-5" @click="saveCourseBtn()">+ 저장</v-btn>
        </div>
    </v-row>
    <v-row class="mt-8 mb-1">
      <!-- <div class="deleteArea text-center">
        <draggable class="list-group" group="mainCourse" >
          <i class="far fa-trash-alt" color="info"></i>
        </draggable>
      </div> -->
      <div class="text-left courseArea" v-if="loaded">
        <v-slide-group multiple show-arrows="always">
        <draggable class="list-group" group="mainCourse" :list="list" @change="updateMainCourse">
            <v-slide-item class="slide-group-item" v-for="e, i in list" :key="'mainCourse' + i">
              <v-btn text :class="'list-group-item ' + getCategory(e.place)" @click="clickedPlace(e.place)">
                  {{e.place.placeName}}
              </v-btn>
            </v-slide-item>
        </draggable>
        </v-slide-group>
      </div>
    </v-row>
    </v-expansion-panel-content>
    <v-expansion-panel-header id="panelHeader"  elevation="1">
    </v-expansion-panel-header>
  </v-expansion-panel>
  </v-expansion-panels>
</div>
</template>

<script>
import draggable from 'vuedraggable'
import { createNamespacedHelpers } from "vuex";
const { mapActions : placeMapActions } = createNamespacedHelpers("placeStore");
const { mapActions : listMapActions } = createNamespacedHelpers("placeListStore");
const { mapGetters : courseMapGetters, mapActions : courseMapActions } = createNamespacedHelpers("courseStore");

  export default {
    name: 'mainCourse',
    components:{
        draggable
    },
    data: () => ({
      loaded : true,
      list : [],
      overlay : false,
      addPlaceStatus : false,
      saveCourseStatus : false,
      changeCourseStatus : false,
      placeName : '',
      placeContent : '',
      placeAddress : '',
      courseName : '',
      visibility : false,
      editable : false,
      selectedCourseId : null,
      snackbar : false,
    }),
    validators: {
      placeName : function (value) {
        return this.$Validator.value(value).maxLength(30).required() 
      },
    },
    methods: {
      clickedPlace(place){
        this.setPlace(place);
      },
      initStatus(){
        this.addPlaceStatus = false;
        this.saveCourseStatus = false;
        this.changeCourseStatus = false;
      },
      addPlace(){
        this.initStatus()
        this.addPlaceStatus = true;
        this.overlay = true;
      },
      addPlaceSubmit(){
        this.$refs.form.validate()
        this.$validate()
          .then(success => {
            if(success){
               let newPlace = {  
                name : this.placeName, 
                content : this.placeContent, 
                address : this.placeAddress
              }
              this.addUserPlace(newPlace)
              .then(res => {
                this.addMainCoursePlace(res)
              })
              this.overlay = false;
            }
        })
      },
      changeCourseBtn(courseId){
        this.initStatus()
        this.overlay = true;
        this.changeCourseStatus = true;
        this.selectedCourseId = courseId;
      },
      changeCourseSubmit(){
        this.setMainCourseById(this.selectedCourseId)
        this.list = this.getMainCourse.coursePlace;
        this.overlay = false;
      },
      updateMainCourse(){
        this.setMainCoursePlace(this.list);
        this.loaded = false;
        setTimeout(() =>(this.loaded = true), 1);
      },
      getCategory(place){
        if(place.attraction != null){
                return place.attraction.category.split(', ')[0]
            }
            else if(place.restaurant != null){
                return place.restaurant.category.split(', ')[0]
            }
        else{
          return ''
        }
      },
      saveCourseBtn(){
        if(!this.getMainCourse.courseId){
          this.initStatus()
          this.overlay = true;
          this.saveCourseStatus = true;
        }
        else{
          this.saveMainCourseSeq(this.getMainCourse.courseId)
          this.snackbar = true;
          setTimeout(() =>(this.snackbar = false), 1000);
        }
      },
      saveCourse(){
        if(this.courseName != ''){
          let courseInfo = {
            courseName : this.courseName,
            visibility : this.visibility ? 0 : 1,
            editable : this.editable ? 0 : 1,
          }
          this.addCourse(courseInfo)
          .then(() => {
            this.editCourse(this.getMainCourse)
          })
          this.overlay = false;
        }
      },
      daumAddress() {
        new window.daum.Postcode({
          oncomplete: (data) => {
            let addr = '';
            let extraAddr = '';

            if (data.userSelectedType === 'R') { addr = data.roadAddress; } 
            else {  addr = data.jibunAddress; }
            
            if(data.userSelectedType === 'R'){
              if(data.bname !== '' && /[동|로|가]$/g.test(data.bname))
                { extraAddr += data.bname;  }
              if(data.buildingName !== '' && data.apartment === 'Y')
                { extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName); }
              if(extraAddr !== '')
                { extraAddr = ' (' + extraAddr + ')'; }

              this.placeAddress = extraAddr;
            } 
            else { this.placeAddress = '';}
            this.placeAddress = addr;
          }
        }).open();
      },
      ...placeMapActions(['setPlace', 'addUserPlace']),
      ...listMapActions(['editCourse']),
      ...courseMapActions(['addCourse', 'setMainCourse', 'setMainCourseById', 'setMainCoursePlace', 'saveMainCourseSeq', 'addMainCoursePlace'])
    },
    computed:{
      ...courseMapGetters(['getLoaded', 'getMainCourse', 'getCourseList'])
    },
    mounted(){
        this.list = this.getMainCourse.coursePlace
    },
    watch:{
      getLoaded: function(){
        this.list = this.getMainCourse.coursePlace
        this.loaded = this.getLoaded
      }
    }
  }
</script>

<style scoped>
.menuBtn {
  background-color:white;
}
#menu{
    margin-top: -20px;
}
.v-expansion-panels{
  background: white;
  border-radius: 0px 0px 30px 30px;
}
#panelHeader{
  background: rgb(235, 235, 235);
  position: absolute;
  min-height:30px;
  padding:0;
  margin:0;
  left : 50%;
  width : 24px;
  padding: 0px 74px 0px 50px;
  border-radius: 0px 0px 30px 30px;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)!important;
}
div.v-expansion-panels:not(.v-expansion-panels--accordion):not(.v-expansion-panels--tile) > .v-expansion-panel--active {
  border-radius: 0px 0px 30px 30px;
}
#coursePanel{
  position: relative;
  background: none;
}
.col{
  padding: 12px 0px;
}
.courseArea {
  width: 95%;
}
.courseArea .list-group{
  margin-left: -5px;
}
.courseArea .slide-group-item{
  font-size: 1vw;
  font-family: 'Noto Sans KR';
  font-weight: 400;
  padding: 22px 20px;
  border-radius: 10px;
  background-color: #333333;
  margin-left: 7px;
  color : white;
}
.courseArea .slide-group-item::after {
    background-color: #333333;
    width: 30px;
    height: 10px;
    border-radius: 10px;
    content: ' ';
    display: inline-block;
    position: absolute;
    z-index: -1;
    right: 0;
    margin-right: -20px;
}
.courseMenu{
  z-index : 100;
  font-size: 13px;
}
.deleteArea{
  width : 30px;
  height : 30px;
  overflow: hidden;
  border-radius: 50%;
  line-height: 30px;
  margin-left: 25px;
  margin-top: 5px;
  background: orange;
}
.explain{
  margin-left : 20px;
  height : 30px;
  line-height: 30px;
  z-index : 0;
}
.courseListBtn{
  margin-top: 10px;
  justify-content:space-between;
}
.newPlaceCard{
  padding: 60px 70px;
}
.changeCard {
  padding: 30px 50px 50px 50px;
  text-align: center;
  font-weight: 400;
  font-family: 'Noto Sans KR' !important;
}
.saveCourseCard{
  padding : 30px;
}
.snackContent{
  font-size:18px;
}
#changeCardText{
  line-height: 30px;
  padding: 50px 0px 30px 0px;
  font-weight: 400;
  font-family: 'Noto Sans KR' !important;
  color : black;
}
.btn-gray {
  font-size: 15px !important;
  font-weight: 400;
  font-family: 'Noto Sans KR';
  color:#2256F2
}
.btn-blue {
  font-size: 15px !important;
  font-weight: 400;
  font-family: 'Noto Sans KR';
  background:#2256F2;
  color:white !important;
}
.courseListBtn{
  font-size: 14px !important;
  font-weight: 400;
  font-family: 'Noto Sans KR'!important;
}
.courseListBtn .v-btn{
  font-size: 15px !important;
  font-weight: 400;
  font-family: 'Noto Sans KR'!important;
}
.list-group-item.액티비티, .slide-group-item.액티비티::after{
  background-color: #4BEF82;
}
.list-group-item.힐링, .slide-group-item.힐링::after{
  background-color: #FC178B;
}
.list-group-item.바다, .slide-group-item.바다::after{
  background-color: #39C2FF;
}
.list-group-item.문화, .slide-group-item.문화::after{
  background-color: #5D24FE;
}
.list-group-item.포토스팟, .slide-group-item.포토스팟::after{
  color: black;
  background-color: #FFE600;
}
.list-group-item.식당, .slide-group-item.식당::after{
  background-color: #D059DE;
}
.list-group-item.카페, .list-group-item.카페\/디저트\/술, .slide-group-item.카페::after, .slide-group-item.카페\/디저트\/술::after{
  background-color: #FE9C00;
}
</style>