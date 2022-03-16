<template>
  <div>
    <v-snackbar v-model="shareSnackBar">
      <div class="text-center">클립보드에 주소가 복사되었습니다.</div>
    </v-snackbar>
    <v-snackbar v-model="editSnackBar">
      <div class="text-center">수정되었습니다.</div>
    </v-snackbar>
    <v-overlay :z-index="zIndex" :value="overlay" >
      <v-card v-if="deleteCourseStatus" color="white" elevation="2">
        <v-card-text>정말 코스를 삭제하시겠습니까?</v-card-text>
      <v-btn class="mx-2" color="#226AB3" @click="deleteCourseSubmit()">삭제</v-btn>
      <v-btn class="mx-2" color="#226AB3" text @click="overlay = false">취소</v-btn>
      </v-card>
      <v-card v-if="editCourseStatus" class="editPlaceCard text-center" light elevation="2">
       <v-text-field label="이름" class="mb-7" hide-details="auto" v-model="courseName" required></v-text-field>
        <v-switch v-model="visibility" label="공개" color="primary"></v-switch>
        <v-switch v-model="editable" label="수정 가능" color="primary"></v-switch>
        <v-btn class="info mt-8 mr-3 px-10" @click="editCourseSubmit()">저장</v-btn>
        <v-btn class="gray mt-8 px-10" @click="overlay = false">취소</v-btn>
      </v-card>
    </v-overlay>
    <v-progress-circular v-if="!getLoaded" :size="50" :width="7" indeterminate color="#2699fb"></v-progress-circular>
    <div v-if="getLoaded">
    <v-row class="editCourse">
      <v-col cols="1" class="ml-7 mt-2">
        <button @click="settingCourseStatus = !settingCourseStatus" v-if="courseEditable">
        <svg width="21.998" height="19.751" viewBox="0 0 21.998 19.751">
            <path id="Menu" d="M0,19.751V15.535H14.078v4.216Zm0-7.767V7.768H22v4.216ZM0,4.217V0H22V4.217Z" fill="#0057ff"/>
          </svg>
        </button>
        <transition name="editCourseArea">
        <v-card v-if="settingCourseStatus" elevation="2" id="content">
          <v-btn text block color="#0057FF" @click="editCourseBtn()">
            <svg class="mr-2" width="21.406" height="21.407" viewBox="0 0 21.406 21.407">
              <g transform="translate(12234.379 4472.779)">
                <path d="M1.7,0H3.4A1.7,1.7,0,0,1,5.1,1.7v14.17L2.542,20.2,0,15.871V1.7A1.7,1.7,0,0,1,1.7,0Z" transform="translate(-12217.994 -4471.365) rotate(45)" fill="none" stroke="#000" stroke-width="2"/>
                <line x2="20" transform="translate(-12233.5 -4453.073)" fill="none" stroke="#000" stroke-width="2"/>
              </g>
            </svg>
            코스 수정
          </v-btn>
          <v-btn text block color="#0057FF" @click="shareCourseBtn()">
            <svg class="mr-2" width="27.108" height="11.23" viewBox="0 0 27.108 11.23">
              <g transform="translate(1 1)">
                <path d="M29.792,122.949h0a4.629,4.629,0,0,1-4.615,4.615H19.407a4.629,4.629,0,0,1-4.615-4.615h0a4.629,4.629,0,0,1,4.615-4.615h2.308" transform="translate(-14.792 -118.333)" fill="none" stroke="#000" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"/>
                <path d="M147.917,122.949h0a4.629,4.629,0,0,1,4.615-4.615H158.3a4.629,4.629,0,0,1,4.615,4.615h0a4.629,4.629,0,0,1-4.615,4.615h-2.308" transform="translate(-137.809 -118.333)" fill="none" stroke="#000" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"/>
              </g>
            </svg>
            링크 공유
          </v-btn>
          <v-btn text block color="#0057FF" @click="deleteCourseBtn()">
            <svg class="mr-2" width="19.59" height="20.846" viewBox="0 0 19.59 20.846">
              <g transform="translate(1 1)">
                <path d="M11,4.141h0A3.141,3.141,0,0,1,14.141,1h0a3.141,3.141,0,0,1,3.141,3.141h0" transform="translate(-5.346 -1)" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="2"/>
                <path d="M18.82,10,17.564,23.192H6.256L5,10" transform="translate(-3.115 -4.346)" fill="none" stroke="#000" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"/>
                <line x1="17.59" transform="translate(0 3.141)" fill="none" stroke="#000" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"/>
              </g>
            </svg>
            코스 삭제
            </v-btn>
        </v-card>
        </transition>
      </v-col>
      <v-col cols="8" class="courseName">
        {{getCourse.courseName}}
      </v-col>
      <v-col cols="2">
        <div v-if="!likedCourse" class="likeButton" type="button" @click="likeCourseBtn()">{{likeCount}}</div>
        <div v-if="likedCourse" class="dislikeButton" type="button"  @click="dislikeCourseBtn()">{{likeCount}}</div>
      </v-col>
    </v-row>
    <v-row><div class="distance">총 <span>{{distance}}</span> km</div></v-row>
    <TimelinePlaceList class="placeListArea" :showCheck="true" @selectedList="changeSelectedList"/>
    <input type="text" id='urlInput'/>
    </div>
  </div>
</template>

<script>
import TimelinePlaceList from '.././placeList/TimelinePlaceList'
import { createNamespacedHelpers } from "vuex";
const { mapGetters : listMapGetters, mapActions : listMapActions } = createNamespacedHelpers("placeListStore");

  export default {
    name: 'CoursePlaceList',
    components:{
      TimelinePlaceList
    },
    props: ['courseEditable'],
    data: () => ({
      zIndex : 1000,
      overlay : false,
      likedCourse : false,
      likeCount : 0,
      editCourseStatus : false,
      settingCourseStatus : false,
      deleteCourseStatus : false,
      switchTest : false,
      courseName : '',
      visibility : true,
      editable : true,
      distance : 0,
      editSnackBar : false,
      shareSnackBar : false,
    }),
    methods: {
      clickedPlace(place){
          this.$emit('clickedPlace', place);
      },
      shareCourseBtn(){
        const urlInput = document.getElementById("urlInput");
        urlInput.value = window.location.origin + "/course?cId=" + this.getCourse.courseId
        urlInput.select();
        document.execCommand("copy");
        urlInput.value = ''
        this.settingCourseStatus = false;
        this.shareSnackBar = true;
        setTimeout(() =>(this.shareSnackBar = false), 1000);
      },
      editCourseBtn(){
        this.editCourseStatus = true
        this.deleteCourseStatus = false
        this.overlay = true;
        this.settingCourseStatus = false;
      },
      editCourseSubmit(){
        let courseInfo = {
          courseId : this.getCourse.courseId,
          userId : this.getCourse.userId,
          courseName : this.courseName,
          visibility : this.visibility ? 0 : 1,
          editable : this.editable ? 0 : 1,
          coursePlace : this.getCoursePlaceList
        }
        this.editCourse(courseInfo)
        this.editCourseStatus = false;
        this.overlay = false;
        this.editSnackBar = true;
        setTimeout(() =>(this.editSnackBar = false), 1000);
      },
      deleteCourseBtn(){
        this.editCourseStatus = false
        this.deleteCourseStatus = true
        this.overlay = true;
        this.settingCourseStatus = false;
      },
      deleteCourseSubmit(){
        this.deleteCourse()
        this.setCourseList()
        this.overlay = false;
        this.deleteCourseStatus = false
        this.$router.go();
      },
      deletePlace(){
        for(let i in this.selectedList){
          this.deletePlaceFromCourse(this.selectedList[i])
        }
      },
      getDistance(){
        let result = 0;
        for (let i = 0; i < this.getCoursePlaceList.length - 1; i++){
          result += this.getDistanceFromLatLonInKm(this.getCoursePlaceList[i].place, this.getCoursePlaceList[i + 1].place)
        }
        this.distance = result.toFixed(2);
      },
      getDistanceFromLatLonInKm(place1, place2) {
        let lat1 = place1.latitude; 
        let lng1 = place1.longitude; 
        let lat2 = place2.latitude;
        let lng2 = place2.longitude;  
        let R = 6371;
        let dLat = this.deg2rad(lat2-lat1);
        let dLon = this.deg2rad(lng2-lng1); 
        let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        let d = (R * c);
        return d; 
      },
      deg2rad(deg) { 
        return deg * (Math.PI/180)
      },
      setCourseInfo(){
        if (this.getLoaded){
          this.getDistance()
          console.log(this.getLikedCourse)
          this.likedCourse = this.getLikedCourse
          this.courseName = this.getCourse.courseName
          this.visibility = this.getCourse.visibility == 0 ? true : false
          this.editable = this.getCourse.editable == 0 ? true : false
        }
      },
      dislikeCourseBtn(){
        this.likedCourse = false;
        this.likeCount--;
        this.dislikeCourse()
      },
      likeCourseBtn(){
        this.likedCourse = true;
        this.likeCount++;
        this.likeCourse()
      },
      ...listMapActions(['setListByCourse', 'setCourseList', 'editCourse', 'deleteCourse', 'deletePlaceFromCourse', 'likeCourse', 'dislikeCourse']),
    },
    computed:{
      ...listMapGetters(['getLoaded', 'getCourse', 'getCoursePlaceList', 'getLikedCourse']),
    },
    mounted(){
      this.setCourseInfo()
    },
    created(){
      this.likeCount = this.getCourse.likeCount;
    },
    watch: {
      getCourse : function(){
        this.likeCount = this.getCourse.likeCount;
        this.setCourseInfo()
      }
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
  height: 70px;
  padding-top: 10px;
  color: #0057FF;
  border-bottom : #0057FF solid;
  font-family: 'Noto Sans KR';
}
.deletePlace{
  margin: 0 0 10px 0;
  padding-left: 10px;
  height: 55px;
}
.editCourse i{
  color: #0057FF;
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
  align-content: center;
  width : 200px;
  height : 150px;
  border: #0057FF 1px solid;
}
#content .v-btn{
  height : 50px;
  font-size: 15px;
  color: black !important;
}
.editCourseArea-enter-active, .editCourseArea-leave-active {
  transition: opacity .5s;
}
.editCourseArea-enter, .editCourseArea-leave-to{
  opacity: 0;
}
#urlInput{
  opacity: 0;
}
.courseName{
  font-size: 18px;
  line-height: 35px;
  color: black;
}
.editPlaceCard{
  padding: 40px;
  width: 320px;
  height: 350px;
}
.dislikeButton{
  color: white;
  width: 30px;
  height: 50px;
  padding-top: 2px;
  margin-top: 5px;
  margin-left: 20px;
  text-align: center;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='63.178' height='55.751' viewBox='0 0 63.178 55.751'%3E%3Cpath id='Heart' d='M58.153,5.075a16.975,16.975,0,0,0-24.162,0L31.614,7.452,29.237,5.075A17.085,17.085,0,0,0,5.075,29.237L31.614,55.776,58.153,29.237a16.975,16.975,0,0,0,0-24.162' transform='translate(-0.025 -0.025)' fill='%230057ff' fill-rule='evenodd'/%3E%3C/svg%3E%0A");
}
.likeButton{
  color: #0057FF;
  width: 30px;
  height: 50px;
  padding-top: 2px;
  margin-top: 5px;
  margin-left: 20px;
  text-align: center;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='68.178' height='61.786' viewBox='0 0 68.178 61.786'%3E%3Cpath id='Heart' d='M58.153,5.075a16.975,16.975,0,0,0-24.162,0L31.614,7.452,29.237,5.075A17.085,17.085,0,0,0,5.075,29.237L31.614,55.776,58.153,29.237a16.975,16.975,0,0,0,0-24.162' transform='translate(2.475 2.475)' fill='none' stroke='%230057ff' stroke-width='5' fill-rule='evenodd'/%3E%3C/svg%3E%0A");
}
.distance{
  margin: 10px 30px;
  font-size: 16px;
  font-family: 'Noto Sans KR';
}
.distance>span{
  color: #0057FF;
  font-weight: 800;
}
</style>